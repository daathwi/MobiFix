/** Shared issues — estimate dropdown + services GIF grid */
window.MOBIFIX_ISSUES = [
  {
    id: "display",
    label: "Cracked Screen",
    price: 1199,
    time: "About 30 mins",
    icon: "smartphone",
    gif: "/static/images/services/gifs/display.gif",
    fallback: "/static/images/services/display.jpg",
  },
  {
    id: "back-glass",
    label: "Back Glass / Cover",
    price: 1199,
    time: "About 45 mins",
    icon: "phone_iphone",
    gif: "/static/images/services/gifs/back-glass.gif",
    fallback: "/static/images/services/display.jpg",
  },
  {
    id: "battery",
    label: "Battery Replacement",
    price: 899,
    time: "About 15 mins",
    icon: "battery_charging_full",
    gif: "/static/images/services/gifs/battery.gif",
    fallback: "/static/images/services/battery.jpg",
  },
  {
    id: "charging-port",
    label: "Charging Port",
    price: 399,
    time: "About 30 mins",
    icon: "power",
    gif: "/static/images/services/gifs/charging-port.gif",
    fallback: "/static/images/services/charging.jpg",
  },
  {
    id: "no-power",
    label: "No Power / Dead",
    price: 199,
    time: "About 30 mins",
    icon: "power_off",
    gif: "/static/images/services/gifs/no-power.gif",
    fallback: "/static/images/services/more.jpg",
  },
  {
    id: "water-damage",
    label: "Water Damage",
    price: 499,
    time: "2–24 hrs",
    icon: "water_drop",
    gif: "/static/images/services/gifs/water-damage.gif",
    fallback: "/static/images/services/water-damage.jpg",
  },
  {
    id: "speaker",
    label: "No Mic / Speaker",
    price: 399,
    time: "About 30 mins",
    icon: "volume_up",
    gif: "/static/images/services/gifs/speaker.gif",
    fallback: "/static/images/services/speaker.jpg",
  },
  {
    id: "camera",
    label: "Camera Issue",
    price: 499,
    time: "About 45 mins",
    icon: "photo_camera",
    gif: "/static/images/services/gifs/camera.gif",
    fallback: "/static/images/services/camera.jpg",
  },
  {
    id: "unlocking",
    label: "Phone Unlocking",
    price: 299,
    time: "About 30 mins",
    icon: "lock_open",
    gif: "/static/images/services/gifs/unlocking.gif",
    fallback: "/static/images/services/face-id.jpg",
  },
  {
    id: "software",
    label: "Software Update",
    price: 399,
    time: "About 30 mins",
    icon: "system_update",
    gif: "/static/images/services/gifs/software.gif",
    fallback: "/static/images/services/more.jpg",
  },
  {
    id: "hang-logo",
    label: "Hang on Logo / Soft Brick",
    price: 399,
    time: "About 45 mins",
    icon: "restart_alt",
    gif: "/static/images/services/gifs/hang-logo.gif",
    fallback: "/static/images/services/more.jpg",
  },
  {
    id: "motherboard",
    label: "Motherboard Works",
    price: 999,
    time: "1–2 days",
    icon: "memory",
    gif: "/static/images/services/gifs/motherboard.gif",
    fallback: "/static/images/services/more.jpg",
  },
  {
    id: "touch",
    label: "Touch / Digitizer",
    price: 1199,
    time: "About 30 mins",
    icon: "touch_app",
    gif: "/static/images/services/gifs/touch.gif",
    fallback: "/static/images/services/display.jpg",
  },
  {
    id: "network",
    label: "Network / SIM Issue",
    price: 399,
    time: "After diagnosis",
    icon: "signal_cellular_alt",
    gif: "/static/images/services/gifs/network.gif",
    fallback: "/static/images/services/more.jpg",
  },
  {
    id: "fingerprint",
    label: "Fingerprint / Face Unlock",
    price: 499,
    time: "About 45 mins",
    icon: "fingerprint",
    gif: "/static/images/services/gifs/fingerprint.gif",
    fallback: "/static/images/services/face-id.jpg",
  },
  {
    id: "overheat",
    label: "Overheating",
    price: 199,
    time: "After diagnosis",
    icon: "device_thermostat",
    gif: "/static/images/services/gifs/overheat.gif",
    fallback: "/static/images/services/more.jpg",
  },
  {
    id: "other",
    label: "Other Issue",
    price: 199,
    time: "After diagnosis",
    icon: "build",
    gif: "/static/images/services/gifs/other.gif",
    fallback: "/static/images/services/more.jpg",
  },
];

(() => {
  const board = document.querySelector("[data-rate-board]");
  if (!board || !window.MOBIFIX_ISSUES?.length) return;

  const loadMoreBtn = document.getElementById("rate-load-more");
  const whatsapp = document.body?.dataset?.whatsapp || "919292353522";
  const INITIAL = 6;
  const BATCH = 3;
  const issues = window.MOBIFIX_ISSUES;
  let visible = Math.min(INITIAL, issues.length);

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

  const cardHtml = (issue) => {
    const text = `Hi SS Mobifix! ${issue.label} — please confirm quote & slot.`;
    const href = `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
    const gif = escapeHtml(issue.gif);
    const fallback = escapeHtml(issue.fallback || "/static/images/services/more.jpg");
    return `
      <a
        class="rate-card"
        role="listitem"
        href="${href}"
        target="_blank"
        rel="noopener"
        data-id="${escapeHtml(issue.id)}"
        aria-label="${escapeHtml(issue.label)}, from ${formatINR(issue.price)}. Book on WhatsApp"
      >
        <div class="rate-card-inner">
          <div class="rate-card-media">
            <img
              class="rate-photo rate-photo--gif"
              src="${gif}"
              data-fallback="${fallback}"
              alt=""
              loading="lazy"
              width="480"
              height="280"
            />
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

  const render = (from = 0) => {
    const slice = issues.slice(from, visible);
    if (from === 0) {
      board.innerHTML = slice.map(cardHtml).join("");
    } else {
      board.insertAdjacentHTML("beforeend", slice.map(cardHtml).join(""));
    }

    const cards = [...board.querySelectorAll(".rate-card")];
    const newCards = cards.slice(from);
    newCards.forEach((card, i) => {
      bindCard(card);
      card.style.setProperty("--i", String(i));
    });

    if (from === 0) {
      window.MobifixMotion?.indexStagger?.(board);
      if (board.classList.contains("is-staggered") || board.classList.contains("is-in-view")) {
        window.MobifixMotion?.enter?.(newCards, 0);
      }
    } else {
      window.MobifixMotion?.enter?.(newCards, 0);
    }

    updateLoadMore();
  };

  loadMoreBtn?.addEventListener("click", () => {
    const from = visible;
    visible = Math.min(visible + BATCH, issues.length);
    render(from);
  });

  render(0);
})();
