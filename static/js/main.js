(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const formatINR = (n) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  const WHATSAPP =
    document.body?.dataset?.whatsapp ||
    "919292353522";

  function waUrl(text) {
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
  }

  function openWhatsApp(text) {
    window.open(waUrl(text), "_blank", "noopener,noreferrer");
  }

  const MSG = {
    repair:
      "Hi SS Mobifix! I need a phone repair. Please help.",
    custom:
      "Hi SS Mobifix! I need help with another phone issue. Please help.",
    accessory: (name, price) =>
      `Hi SS Mobifix! I'd like to order ${name} (${formatINR(price)}) from your shop. Is it available for pickup?`,
    service: (name, priceFrom) =>
      `Hi SS Mobifix! I need ${name} (from ${formatINR(priceFrom)}). Please confirm quote and timing.`,
    review:
      "Hi SS Mobifix! I'd like to share a review of my repair.",
  };

  async function api(path, options) {
    const res = await fetch(path, {
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      ...options,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const detail = data.detail;
      const message = Array.isArray(detail)
        ? detail.map((d) => d.msg).join(", ")
        : detail || "Something went wrong";
      throw new Error(message);
    }
    return data;
  }

  /* Theme fixed to light */
  document.documentElement.setAttribute("data-theme", "light");

  /* Mobile nav drawer */
  const navToggle = $("#nav-toggle");
  const mobileMenu = $("#mobile-menu");
  const navScrim = $("#nav-scrim");

  function setNavOpen(open) {
    if (!mobileMenu || !navToggle) return;
    if (open) {
      mobileMenu.hidden = false;
      if (navScrim) navScrim.hidden = false;
      requestAnimationFrame(() => {
        mobileMenu.classList.add("open");
      });
    } else {
      mobileMenu.classList.remove("open");
      window.setTimeout(() => {
        if (!mobileMenu.classList.contains("open")) {
          mobileMenu.hidden = true;
          if (navScrim) navScrim.hidden = true;
        }
      }, 260);
    }
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    const icon = navToggle.querySelector(".material-symbols-outlined");
    if (icon) icon.textContent = open ? "close" : "menu";
    document.body.classList.toggle("nav-open", open);
  }

  navToggle?.addEventListener("click", () => {
    const open = !mobileMenu.classList.contains("open");
    setNavOpen(open);
  });

  navScrim?.addEventListener("click", () => setNavOpen(false));

  $$(".mobile-menu a, .mobile-menu-cta a").forEach((link) => {
    link.addEventListener("click", () => setNavOpen(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu?.classList.contains("open")) {
      setNavOpen(false);
    }
  });

  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth >= 1024) setNavOpen(false);
    },
    { passive: true }
  );

  /* Mobile: hide navbar on scroll down, show on scroll up */
  const topNav = $("#top-nav");
  if (topNav) {
    let lastY = window.scrollY || 0;
    let ticking = false;
    const MOBILE_MAX = 1023;
    const TOP_SHOW = 24;
    const MIN_DELTA = 6;

    const updateNavHide = () => {
      ticking = false;
      if (window.innerWidth > MOBILE_MAX) {
        topNav.classList.remove("is-nav-hidden");
        lastY = window.scrollY || 0;
        return;
      }
      if (document.body.classList.contains("nav-open")) {
        topNav.classList.remove("is-nav-hidden");
        lastY = window.scrollY || 0;
        return;
      }

      const y = window.scrollY || 0;
      const delta = y - lastY;

      if (y <= TOP_SHOW) {
        topNav.classList.remove("is-nav-hidden");
      } else if (delta > MIN_DELTA) {
        topNav.classList.add("is-nav-hidden");
      } else if (delta < -MIN_DELTA) {
        topNav.classList.remove("is-nav-hidden");
      }

      lastY = y;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(updateNavHide);
        }
      },
      { passive: true }
    );
  }

  /* Smooth scroll only for in-page hash targets */
  $$('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* WhatsApp CTAs — no forms / modals */
  $$("[data-wa]").forEach((el) => {
    el.addEventListener("click", (e) => {
      const intent = el.dataset.wa;
      if (intent === "repair") {
        e.preventDefault();
        openWhatsApp(MSG.repair);
      } else if (intent === "custom") {
        e.preventDefault();
        openWhatsApp(MSG.custom);
      } else if (intent === "review") {
        e.preventDefault();
        openWhatsApp(MSG.review);
      }
    });
  });

  let servicesCache = [];

  function renderServices(services) {
    const grid = $("#services-grid");
    if (!grid) return;

    grid.classList.add("catalog-grid");
    grid.classList.remove("services-gallery");

    const limitAttr = grid.dataset.limit || "all";
    const limited = limitAttr !== "all";
    const list = limited ? services.slice(0, Number(limitAttr) || 4) : services;

    const tiles = list
      .map(
        (s) => `
      <article class="catalog-card card-surface" data-service="${s.id}" tabindex="0" role="link" aria-label="WhatsApp about ${escapeHtml(s.name)} repair">
        <div class="catalog-card-media">
          <img src="${escapeHtml(s.image_url)}" alt="${escapeHtml(s.name)} repair" loading="lazy" width="800" height="500"/>
        </div>
        <div class="catalog-card-body">
          <h3>${escapeHtml(s.name)}</h3>
          <p class="catalog-meta"><strong>from ${formatINR(s.price_from)}</strong> · ${escapeHtml(s.time_label)}</p>
          <span class="catalog-cta">WhatsApp <span aria-hidden="true">→</span></span>
        </div>
      </article>`
      )
      .join("");

    grid.innerHTML = tiles;

    const tilesEl = grid.querySelectorAll("[data-service]");
    window.MobifixMotion?.enter?.(tilesEl, 0);

    tilesEl.forEach((tile) => {
      const service = servicesCache.find((s) => s.id === tile.dataset.service);
      const go = () => {
        if (!service) {
          openWhatsApp(MSG.repair);
          return;
        }
        openWhatsApp(MSG.service(service.name, service.price_from));
      };
      tile.addEventListener("click", go);
      tile.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          go();
        }
      });
    });
  }

  function renderAccessories(items) {
    const grid = $("#accessories-grid");
    if (!grid) return;

    const limitAttr = grid.dataset.limit || "all";
    const list =
      limitAttr !== "all" ? items.slice(0, Number(limitAttr) || 2) : items;

    const categoryLabel = {
      protection: "Cases",
      power: "Charging",
      audio: "Audio",
    };

    grid.classList.add("catalog-grid", "shop-grid");

    grid.innerHTML = list
      .map(
        (a) => `
      <article class="catalog-card shop-card card-surface" data-accessory-card="${a.id}" tabindex="0" role="link" aria-label="Order ${escapeHtml(a.name)} on WhatsApp">
        <div class="catalog-card-media">
          <img src="${escapeHtml(a.image_url)}" alt="${escapeHtml(a.name)}" loading="lazy" width="800" height="500"/>
          <span class="shop-card-tag">${escapeHtml(categoryLabel[a.category] || a.category || "Accessory")}</span>
        </div>
        <div class="catalog-card-body">
          <h3>${escapeHtml(a.name)}</h3>
          <p class="catalog-desc">${escapeHtml(a.description || "")}</p>
          <div class="shop-card-foot">
            <p class="shop-price">${formatINR(a.price)}</p>
            <span class="catalog-cta">Order on WhatsApp <span aria-hidden="true">→</span></span>
          </div>
        </div>
      </article>`
      )
      .join("");

    const cards = grid.querySelectorAll("[data-accessory-card]");
    window.MobifixMotion?.enter?.(cards, 0);

    cards.forEach((card) => {
      const go = () => {
        const item = items.find((a) => a.id === card.dataset.accessoryCard);
        if (!item) {
          openWhatsApp(MSG.repair);
          return;
        }
        openWhatsApp(MSG.accessory(item.name, item.price));
      };
      card.addEventListener("click", go);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          go();
        }
      });
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function starsHtml(rating) {
    return Array.from({ length: 5 }, (_, i) => {
      const filled = i < Math.round(rating);
      return `<span class="material-symbols-outlined filled icon-sm">${filled ? "star" : "star"}</span>`;
    }).join("");
  }

  function shortReviewerName(name) {
    const parts = String(name || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (!parts.length) return "Local customer";
    if (parts.length === 1) return parts[0];
    return `${parts[0]} ${parts[parts.length - 1][0]}.`;
  }

  function reviewCardHtml(r) {
    const body = escapeHtml(r.text || r.headline || "");
    const name = escapeHtml(r.name);
    const credit = escapeHtml(shortReviewerName(r.name));
    const device = escapeHtml(r.device || "");
    const avatar = r.avatar_url
      ? `<div class="avatar photo"><img src="${escapeHtml(r.avatar_url)}" alt="" loading="lazy"/></div>`
      : `<div class="avatar">${escapeHtml(r.initials || name.slice(0, 1))}</div>`;

    return `
      <article class="review-ticker-card">
        <div class="review-stars" aria-label="${Math.round(r.rating)} out of 5 stars">${starsHtml(r.rating)}</div>
        <blockquote>
          <p class="review-quote-lead">“${body}”</p>
        </blockquote>
        <footer class="review-card-foot">
          <div class="reviewer">
            ${avatar}
            <div>
              <strong class="review-credit">— ${credit}</strong>
              <span class="review-platform">Customer</span>
            </div>
          </div>
          ${device ? `<div class="review-card-meta"><span class="review-device-tag">${device}</span></div>` : ""}
        </footer>
      </article>`;
  }

  function renderReviews(reviews) {
    const track = $("#reviews-track");
    if (!track) return;

    const list = reviews.length ? reviews : [];
    if (!list.length) {
      track.innerHTML = `<p style="padding:0 24px;color:var(--on-surface-variant);">No reviews yet.</p>`;
      return;
    }

    /* Duplicate set so CSS -50% loop is seamless */
    const strip = list.map(reviewCardHtml).join("");
    track.innerHTML =
      `<div class="reviews-marquee-set">${strip}</div>` +
      `<div class="reviews-marquee-set" aria-hidden="true">${strip}</div>`;
  }

  /* Glass mouse highlight */
  $$(".glass").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    });
  });

  /* Boot */
  async function boot() {
    try {
      const needsCatalog =
        $("#services-grid") || $("#accessories-grid") || $("#reviews-track");

      if (!needsCatalog) return;

      const [services, accessories, reviews, storeInfo] = await Promise.all([
        api("/api/services"),
        api("/api/accessories"),
        api("/api/reviews"),
        api("/api/store"),
      ]);
      servicesCache = services;
      renderServices(services);
      renderAccessories(accessories);
      renderReviews(reviews);

      const score = $(".reviews-rating .score");
      if (score && storeInfo.rating) {
        score.textContent = `${storeInfo.rating}/5`;
      }
    } catch (err) {
      console.error(err);
      const grid = $("#services-grid");
      if (grid) {
        grid.innerHTML =
          `<p style="grid-column:1/-1;color:var(--on-surface-variant);text-align:center;">Unable to load store data. Please refresh.</p>`;
      }
    }
  }

  boot();
})();
