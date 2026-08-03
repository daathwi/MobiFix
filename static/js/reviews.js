(() => {
  if (!document.getElementById("reviews-bento")) return;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const bento = $("#reviews-bento");
  const loadMoreBtn = $("#load-more-reviews");

  let allReviews = [];
  let filter = "all";
  let visible = 5;

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

  function stars(rating, sizeClass = "") {
    return Array.from({ length: 5 }, (_, i) => {
      const filled = i < rating;
      return `<span class="material-symbols-outlined ${filled ? "filled" : ""} ${sizeClass}">${
        filled ? "star" : "star"
      }</span>`;
    }).join("");
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function avatarHtml(r, variant = "square") {
    const src = r.avatar_url || "";
    if (src) {
      const cls = variant === "circle" ? "review-avatar circle photo" : "review-avatar photo";
      return `<div class="${cls}"><img src="${escapeHtml(src)}" alt="${escapeHtml(r.name)}" loading="lazy"/></div>`;
    }
    if (variant === "icon") {
      return `<div class="review-avatar icon-tile"><span class="material-symbols-outlined icon-sm">${escapeHtml(r.icon || "rate_review")}</span></div>`;
    }
    if (variant === "circle") {
      return `<div class="review-avatar circle">${escapeHtml(r.initials)}</div>`;
    }
    return `<div class="review-avatar circle">${escapeHtml(r.initials)}</div>`;
  }

  function cardHtml(r) {
    const layout = r.layout || "compact";
    const live = r.live ? `<div class="status-live" aria-hidden="true"></div>` : "";
    const headline = r.headline
      ? `<p class="review-headline">“${escapeHtml(r.headline)}”</p>`
      : "";
    const tags = (r.tags || [])
      .map((t) => `<span class="review-tag">${escapeHtml(t)}</span>`)
      .join("");

    if (layout === "featured") {
      return `
        <article class="review-card glass featured" data-category="${escapeHtml(r.category)}">
          <div class="review-card-top">
            <div class="review-person">
              ${avatarHtml(r, "square")}
              <div>
                <h3>${escapeHtml(r.name)}</h3>
                ${
                  r.verified
                    ? `<div class="verified"><span class="material-symbols-outlined filled icon-sm">verified</span> Verified Owner</div>`
                    : ""
                }
              </div>
            </div>
            <div class="review-stars">${stars(r.rating)}</div>
          </div>
          ${headline}
          <p class="review-text">${escapeHtml(r.text)}</p>
          <div class="review-footer">
            <div class="review-tags">${tags}</div>
            ${r.date_label ? `<div class="review-date">${escapeHtml(r.date_label)}</div>` : ""}
          </div>
        </article>`;
    }

    if (layout === "vertical") {
      return `
        <article class="review-card glass vertical" data-category="${escapeHtml(r.category)}">
          <div>
            <div class="review-card-top">
              ${avatarHtml(r, "circle")}
              <div class="review-stars">${stars(r.rating, "icon-sm")}</div>
            </div>
            ${headline || `<p class="review-headline" style="font-size:18px;">“${escapeHtml(r.text)}”</p>`}
            ${r.headline ? `<p class="review-text">${escapeHtml(r.text)}</p>` : ""}
          </div>
          <div class="review-footer" style="flex-direction:column;align-items:flex-start;border:none;padding-top:16px;">
            <div class="h-line" style="width:100%;height:1px;background:var(--muted-border);margin-bottom:16px;"></div>
            <span class="review-meta-name">${escapeHtml(r.name)}</span>
            <span class="review-meta-cat">${escapeHtml((r.tags && r.tags[0]) || r.category)}</span>
          </div>
        </article>`;
    }

    return `
      <article class="review-card glass compact" data-category="${escapeHtml(r.category)}">
        ${live}
        <div class="review-person" style="margin-bottom:16px;">
          ${avatarHtml(r, r.avatar_url ? "circle" : "icon")}
          <div class="font-bold" style="font-weight:700;color:var(--heading);">${escapeHtml(r.name)}</div>
        </div>
        <p class="review-text" style="margin-bottom:16px;">“${escapeHtml(r.text)}”</p>
        <div class="review-stars">${stars(r.rating, "icon-sm")}</div>
      </article>`;
  }

  function filtered() {
    if (filter === "all") return allReviews;
    return allReviews.filter((r) => r.category === filter);
  }

  function render() {
    const list = filtered();
    const slice = list.slice(0, visible);

    if (!slice.length) {
      bento.innerHTML = `<p class="reviews-empty">No reviews in this category yet.</p>`;
      loadMoreBtn.classList.add("hidden");
      return;
    }

    bento.innerHTML = slice.map(cardHtml).join("");
    loadMoreBtn.classList.toggle("hidden", slice.length >= list.length);
  }

  $$("#review-filters .filter-chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$("#review-filters .filter-chip").forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      filter = btn.dataset.filter || "all";
      visible = 5;
      render();
    });
  });

  loadMoreBtn?.addEventListener("click", () => {
    visible += 4;
    render();
  });

  async function boot() {
    try {
      const [reviews, stats] = await Promise.all([
        api("/api/reviews"),
        api("/api/reviews/stats"),
      ]);
      allReviews = reviews;
      const ratingEl = $("#hero-rating");
      if (ratingEl) ratingEl.textContent = `${stats.average_rating}/5`;
      const values = $$("#reviews-stats .stat-value");
      if (values.length === 4) {
        values[0].textContent = stats.devices_repaired;
        values[1].textContent = stats.success_rate;
        values[2].textContent = stats.five_star_count;
        values[3].textContent = stats.average_turnaround;
      }
      render();
    } catch (err) {
      console.error(err);
      bento.innerHTML = `<p class="reviews-empty">Unable to load reviews. Please refresh.</p>`;
    }
  }

  boot();
})();
