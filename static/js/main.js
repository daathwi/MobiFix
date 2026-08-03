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
      "Hi SS Mobifix! I'd like to book a phone repair. Please share availability and next steps.",
    custom:
      "Hi SS Mobifix! I need a custom / other repair (board, software, buttons, etc.). Please help.",
    accessory: (name, price) =>
      `Hi SS Mobifix! I'm interested in ${name} (${formatINR(price)}). Is it available?`,
    service: (name, priceFrom) =>
      `Hi SS Mobifix! I need ${name} repair for my phone (from ${formatINR(priceFrom)}). Please share availability and quote.`,
    review:
      "Hi SS Mobifix! I'd like to share a review of my repair experience with you.",
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

  /* Theme toggle */
  const THEME_KEY = "mobifix-theme";
  const root = document.documentElement;
  const themeToggle = $("#theme-toggle");

  function getTheme() {
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (_) {
      /* ignore */
    }
    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        theme === "light" ? "Switch to dark mode" : "Switch to light mode"
      );
    }
  }

  themeToggle?.addEventListener("click", () => {
    setTheme(getTheme() === "dark" ? "light" : "dark");
  });
  setTheme(getTheme());

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

    grid.classList.add("services-gallery");

    const limitAttr = grid.dataset.limit || "all";
    const limited = limitAttr !== "all";
    const list = limited ? services.slice(0, Number(limitAttr) || 4) : services;

    const tiles = list
      .map(
        (s, i) => `
      <figure class="service-tile${i === 0 ? " featured" : ""}" data-service="${s.id}" tabindex="0" role="link" aria-label="WhatsApp about ${s.name} repair">
        <img src="${s.image_url}" alt="${s.name} repair" loading="lazy" width="800" height="600"/>
        <figcaption class="service-overlay">
          <span class="service-overlay-icon material-symbols-outlined">${s.icon}</span>
          <div class="service-overlay-copy">
            <h3>${s.name}</h3>
            <p><span class="number-display">${formatINR(s.price_from)}</span> · ${s.time_label}</p>
          </div>
          <span class="service-overlay-cta">Repair Now <span class="material-symbols-outlined icon-sm">arrow_forward</span></span>
        </figcaption>
      </figure>`
      )
      .join("");

    grid.innerHTML = tiles;

    grid.querySelectorAll("[data-service]").forEach((tile) => {
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

    grid.innerHTML = list
      .map(
        (a) => `
      <article class="accessory-card">
        <img src="${a.image_url}" alt="${a.name}" loading="lazy"/>
        <div class="accessory-overlay">
          <h3>${a.name}</h3>
          <p>${a.description}</p>
          <button class="btn btn-white" type="button" data-accessory="${a.id}">
            Shop on WhatsApp · ${formatINR(a.price)}
          </button>
        </div>
      </article>`
      )
      .join("");

    grid.querySelectorAll("[data-accessory]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = items.find((a) => a.id === btn.dataset.accessory);
        if (!item) {
          openWhatsApp(MSG.repair);
          return;
        }
        openWhatsApp(MSG.accessory(item.name, item.price));
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

  function reviewCardHtml(r) {
    const quote = escapeHtml(r.headline || r.text);
    const name = escapeHtml(r.name);
    const device = escapeHtml(r.device || "");
    const avatar = r.avatar_url
      ? `<div class="avatar photo"><img src="${escapeHtml(r.avatar_url)}" alt="${name}" loading="lazy"/></div>`
      : `<div class="avatar">${escapeHtml(r.initials || "")}</div>`;

    return `
      <article class="review-ticker-card">
        <div class="review-stars" aria-hidden="true">${starsHtml(r.rating)}</div>
        <blockquote>“${quote}”</blockquote>
        <div class="reviewer">
          ${avatar}
          <div>
            <strong>${name}</strong>
            <span>${device}</span>
          </div>
        </div>
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
