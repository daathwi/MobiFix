(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const bento = $("#reviews-bento");
  const loadMoreBtn = $("#load-more-reviews");
  if (!bento) return;

  let allReviews = [];
  let filter = "all";
  let visible = 6;

  async function api(path) {
    const res = await fetch(path, { headers: { Accept: "application/json" } });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.detail || "Request failed");
    return data;
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

  function cardHtml(r) {
    const body = escapeHtml(r.text || r.headline || "");
    const name = escapeHtml(r.name);
    const credit = escapeHtml(shortReviewerName(r.name));
    const device = escapeHtml(r.device || "");
    const avatar = r.avatar_url
      ? `<div class="avatar photo"><img src="${escapeHtml(r.avatar_url)}" alt="" loading="lazy"/></div>`
      : `<div class="avatar">${escapeHtml(r.initials || name.slice(0, 1))}</div>`;

    return `
      <article class="review-ticker-card" data-category="${escapeHtml(r.category)}">
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

  function filtered() {
    if (filter === "all") return allReviews;
    return allReviews.filter((r) => r.category === filter);
  }

  function render() {
    const list = filtered();
    const slice = list.slice(0, visible);

    if (!slice.length) {
      bento.innerHTML = `<p class="reviews-empty">No reviews in this category yet.</p>`;
      loadMoreBtn?.classList.add("hidden");
      return;
    }

    bento.innerHTML = slice.map(cardHtml).join("");
    loadMoreBtn?.classList.toggle("hidden", slice.length >= list.length);
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
      visible = 6;
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
      if (ratingEl && stats.average_rating) {
        ratingEl.textContent = `${stats.average_rating}`;
      }
      const values = $$("#reviews-stats .stat-value");
      if (values.length >= 4) {
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
