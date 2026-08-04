/** Shared issues — estimate dropdown + services before/after grid */
window.MOBIFIX_ISSUES = [
  {
    id: "display",
    label: "Cracked Screen",
    price: 1199,
    time: "About 30 mins",
    icon: "smartphone",
    /* Drop real pairs at these paths anytime */
    before: "/static/images/services/ba/display-before.jpg",
    after: "/static/images/services/ba/display-after.jpg",
    fallback: "/static/images/services/display.jpg",
  },
  {
    id: "back-glass",
    label: "Back Glass / Cover",
    price: 1199,
    time: "About 45 mins",
    icon: "phone_iphone",
    before: "/static/images/services/ba/back-glass-before.jpg",
    after: "/static/images/services/ba/back-glass-after.jpg",
    fallback: "/static/images/services/display.jpg",
  },
  {
    id: "battery",
    label: "Battery Replacement",
    price: 899,
    time: "About 15 mins",
    icon: "battery_charging_full",
    before: "/static/images/services/ba/battery-before.jpg",
    after: "/static/images/services/ba/battery-after.jpg",
    fallback: "/static/images/services/battery.jpg",
  },
  {
    id: "charging-port",
    label: "Charging Port",
    price: 399,
    time: "About 30 mins",
    icon: "power",
    before: "/static/images/services/ba/charging-before.jpg",
    after: "/static/images/services/ba/charging-after.jpg",
    fallback: "/static/images/services/charging.jpg",
  },
  {
    id: "no-power",
    label: "No Power / Dead",
    price: 199,
    time: "About 30 mins",
    icon: "power_off",
    before: "/static/images/services/ba/no-power-before.jpg",
    after: "/static/images/services/ba/no-power-after.jpg",
    fallback: "/static/images/services/more.jpg",
  },
  {
    id: "water-damage",
    label: "Water Damage",
    price: 499,
    time: "2–24 hrs",
    icon: "water_drop",
    before: "/static/images/services/ba/water-before.jpg",
    after: "/static/images/services/ba/water-after.jpg",
    fallback: "/static/images/services/water-damage.jpg",
  },
  {
    id: "speaker",
    label: "No Mic / Speaker",
    price: 399,
    time: "About 30 mins",
    icon: "volume_up",
    before: "/static/images/services/ba/speaker-before.jpg",
    after: "/static/images/services/ba/speaker-after.jpg",
    fallback: "/static/images/services/speaker.jpg",
  },
  {
    id: "camera",
    label: "Camera Issue",
    price: 499,
    time: "About 45 mins",
    icon: "photo_camera",
    before: "/static/images/services/ba/camera-before.jpg",
    after: "/static/images/services/ba/camera-after.jpg",
    fallback: "/static/images/services/camera.jpg",
  },
  {
    id: "unlocking",
    label: "Phone Unlocking",
    price: 299,
    time: "About 30 mins",
    icon: "lock_open",
    before: "/static/images/services/ba/unlocking-before.jpg",
    after: "/static/images/services/ba/unlocking-after.jpg",
    fallback: "/static/images/services/face-id.jpg",
  },
  {
    id: "software",
    label: "Software Update",
    price: 399,
    time: "About 30 mins",
    icon: "system_update",
    before: "/static/images/services/ba/software-before.jpg",
    after: "/static/images/services/ba/software-after.jpg",
    fallback: "/static/images/services/more.jpg",
  },
  {
    id: "hang-logo",
    label: "Hang on Logo / Soft Brick",
    price: 399,
    time: "About 45 mins",
    icon: "restart_alt",
    before: "/static/images/services/ba/hang-logo-before.jpg",
    after: "/static/images/services/ba/hang-logo-after.jpg",
    fallback: "/static/images/services/more.jpg",
  },
  {
    id: "motherboard",
    label: "Motherboard Works",
    price: 999,
    time: "1–2 days",
    icon: "memory",
    before: "/static/images/services/ba/motherboard-before.jpg",
    after: "/static/images/services/ba/motherboard-after.jpg",
    fallback: "/static/images/services/more.jpg",
  },
  {
    id: "touch",
    label: "Touch / Digitizer",
    price: 1199,
    time: "About 30 mins",
    icon: "touch_app",
    before: "/static/images/services/ba/touch-before.jpg",
    after: "/static/images/services/ba/touch-after.jpg",
    fallback: "/static/images/services/display.jpg",
  },
  {
    id: "network",
    label: "Network / SIM Issue",
    price: 399,
    time: "After diagnosis",
    icon: "signal_cellular_alt",
    before: "/static/images/services/ba/network-before.jpg",
    after: "/static/images/services/ba/network-after.jpg",
    fallback: "/static/images/services/more.jpg",
  },
  {
    id: "fingerprint",
    label: "Fingerprint / Face Unlock",
    price: 499,
    time: "About 45 mins",
    icon: "fingerprint",
    before: "/static/images/services/ba/fingerprint-before.jpg",
    after: "/static/images/services/ba/fingerprint-after.jpg",
    fallback: "/static/images/services/face-id.jpg",
  },
  {
    id: "overheat",
    label: "Overheating",
    price: 199,
    time: "After diagnosis",
    icon: "device_thermostat",
    before: "/static/images/services/ba/overheat-before.jpg",
    after: "/static/images/services/ba/overheat-after.jpg",
    fallback: "/static/images/services/more.jpg",
  },
  {
    id: "other",
    label: "Other Issue",
    price: 199,
    time: "After diagnosis",
    icon: "build",
    before: "/static/images/services/ba/other-before.jpg",
    after: "/static/images/services/ba/other-after.jpg",
    fallback: "/static/images/services/more.jpg",
  },
];

(() => {
  const board = document.querySelector("[data-rate-board]");
  if (!board || !window.MOBIFIX_ISSUES?.length) return;

  const loadMoreBtn = document.getElementById("rate-load-more");
  const whatsapp = document.body?.dataset?.whatsapp || "919292353522";
  const BATCH = 4;
  const issues = window.MOBIFIX_ISSUES;
  let visible = Math.min(BATCH, issues.length);

  const formatINR = (n) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  const escapeHtml = (str) =>
    String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

  const onImgError = (img) => {
    const fallback = img.getAttribute("data-fallback");
    if (fallback && img.src !== fallback) {
      img.src = fallback;
    }
  };

  const canHover = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const setBa = (card, after) => {
    card.classList.toggle("is-after", after);
    const tag = card.querySelector("[data-ba-tag]");
    if (tag) tag.textContent = after ? "After" : "Before";
  };

  const cardHtml = (issue) => {
    const text = `Hi SS Mobifix! ${issue.label} — please confirm quote & slot.`;
    const href = `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
    const before = escapeHtml(issue.before);
    const after = escapeHtml(issue.after);
    const fallback = escapeHtml(issue.fallback || "/static/images/services/more.jpg");
    return `
      <a
        class="rate-card"
        role="listitem"
        href="${href}"
        target="_blank"
        rel="noopener"
        data-id="${escapeHtml(issue.id)}"
        aria-label="${escapeHtml(issue.label)}, from ${formatINR(issue.price)}. Tap to see after, then book on WhatsApp"
      >
        <div class="rate-card-inner">
          <div class="rate-card-media">
            <img
              class="rate-photo rate-photo--before"
              src="${before}"
              data-fallback="${fallback}"
              alt=""
              loading="lazy"
              width="640"
              height="480"
            />
            <img
              class="rate-photo rate-photo--after"
              src="${after}"
              data-fallback="${fallback}"
              alt=""
              loading="lazy"
              width="640"
              height="480"
            />
            <span class="rate-ba-tag" data-ba-tag aria-hidden="true">Before</span>
          </div>
          <div class="rate-card-body">
            <div class="rate-card-top">
              <h3 class="rate-card-title">${escapeHtml(issue.label)}</h3>
              <span class="rate-card-link" aria-hidden="true">
                <span class="material-symbols-outlined">link</span>
              </span>
            </div>
            <p class="rate-card-meta">
              <span class="rate-card-price">${formatINR(issue.price)}</span>
              <span class="rate-card-time">
                <span class="material-symbols-outlined" aria-hidden="true">schedule</span>
                ${escapeHtml(issue.time)}
              </span>
            </p>
          </div>
        </div>
      </a>`;
  };

  const bindCard = (card) => {
    card.querySelectorAll(".rate-photo").forEach((img) => {
      img.addEventListener("error", () => onImgError(img));
      if (img.complete && img.naturalWidth === 0) onImgError(img);
    });

    card.addEventListener("pointerenter", () => {
      if (canHover()) setBa(card, true);
    });
    card.addEventListener("pointerleave", () => {
      if (canHover()) setBa(card, false);
    });
    card.addEventListener("focus", () => {
      if (canHover()) setBa(card, true);
    });
    card.addEventListener("blur", () => {
      if (canHover()) setBa(card, false);
    });

    card.addEventListener("click", (e) => {
      if (canHover()) return;
      if (!card.classList.contains("is-after")) {
        e.preventDefault();
        board.querySelectorAll(".rate-card.is-after").forEach((other) => {
          if (other !== card) setBa(other, false);
        });
        setBa(card, true);
      }
      /* second tap follows WhatsApp href */
    });
  };

  const updateLoadMore = () => {
    if (!loadMoreBtn) return;
    const remaining = issues.length - visible;
    if (remaining <= 0) {
      loadMoreBtn.hidden = true;
      return;
    }
    loadMoreBtn.hidden = false;
    loadMoreBtn.textContent = `Load more (${remaining})`;
  };

  const render = () => {
    board.innerHTML = issues.slice(0, visible).map(cardHtml).join("");
    board.querySelectorAll(".rate-card").forEach(bindCard);
    updateLoadMore();
  };

  loadMoreBtn?.addEventListener("click", () => {
    visible = Math.min(visible + BATCH, issues.length);
    render();
  });

  render();
})();
