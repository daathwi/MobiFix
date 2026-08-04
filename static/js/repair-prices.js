/** Shared issues — estimate dropdown + services detail list */
window.MOBIFIX_ISSUES = [
  {
    id: "display",
    label: "Cracked Screen",
    price: 1199,
    time: "About 30 mins",
    icon: "smartphone",
    gif: "/static/images/services/gifs/display.gif",
    fallback: "/static/images/services/display.jpg",
    summary: "Replace a cracked, blacked-out, or dull display with a calibrated screen assembly.",
    bullets: [
      "Full screen assembly replacement (LCD / OLED as per model)",
      "Pixel and colour calibration after fitment",
      "Free check-up before we open the phone",
      "90-day warranty on our workmanship",
    ],
  },
  {
    id: "back-glass",
    label: "Back Glass / Cover",
    price: 1199,
    time: "About 45 mins",
    icon: "phone_iphone",
    gif: "/static/images/services/gifs/back-glass.gif",
    fallback: "/static/images/services/display.jpg",
    summary: "Restore a shattered back glass or damaged rear cover without harming the internals.",
    bullets: [
      "Careful rear glass / cover removal",
      "Clean frame and secure re-sealing",
      "Camera lens alignment checked after fit",
      "Fits major iPhone and Android models",
    ],
  },
  {
    id: "battery",
    label: "Battery Replacement",
    price: 899,
    time: "About 15 mins",
    icon: "battery_charging_full",
    gif: "/static/images/services/gifs/battery.gif",
    fallback: "/static/images/services/battery.jpg",
    summary: "Swap a weak or swollen battery so your phone lasts a full day again.",
    bullets: [
      "Health check before replacement",
      "Quality battery matched to your model",
      "Safe adhesive removal — no bent frame",
      "Most jobs finish while you wait",
    ],
  },
  {
    id: "charging-port",
    label: "Charging Port",
    price: 399,
    time: "About 30 mins",
    icon: "power",
    gif: "/static/images/services/gifs/charging-port.gif",
    fallback: "/static/images/services/charging.jpg",
    summary: "Fix loose charging, slow charge, or a port that no longer recognises the cable.",
    bullets: [
      "Port cleaning and corrosion check",
      "Flex / dock replacement when needed",
      "Charge and data transfer tested",
      "Advice on cables that keep killing ports",
    ],
  },
  {
    id: "no-power",
    label: "No Power / Dead",
    price: 199,
    time: "About 30 mins",
    icon: "power_off",
    gif: "/static/images/services/gifs/no-power.gif",
    fallback: "/static/images/services/more.jpg",
    summary: "Diagnose a phone that won’t turn on — battery, boot loop, or board-level fault.",
    bullets: [
      "Free diagnosis for power failures",
      "Battery, charging, and boot checks",
      "Clear quote before any repair starts",
      "Board work quoted separately if needed",
    ],
  },
  {
    id: "water-damage",
    label: "Water Damage",
    price: 499,
    time: "2–24 hrs",
    icon: "water_drop",
    gif: "/static/images/services/gifs/water-damage.gif",
    fallback: "/static/images/services/water-damage.jpg",
    summary: "Stop corrosion early with ultrasonic cleaning and component recovery.",
    bullets: [
      "Ultrasonic cleaning of liquid damage",
      "Corrosion mapping on the board",
      "Parts replaced only where needed",
      "Bring it in as soon as it gets wet",
    ],
  },
  {
    id: "speaker",
    label: "No Mic / Speaker",
    price: 399,
    time: "About 30 mins",
    icon: "volume_up",
    gif: "/static/images/services/gifs/speaker.gif",
    fallback: "/static/images/services/speaker.jpg",
    summary: "Repair earpiece, loudspeaker, or microphone issues for clear calls and media.",
    bullets: [
      "Earpiece, loudspeaker, and mic testing",
      "Mesh cleaning or module replacement",
      "Call and video audio verified",
      "Same-day for most models",
    ],
  },
  {
    id: "camera",
    label: "Camera Issue",
    price: 499,
    time: "About 45 mins",
    icon: "photo_camera",
    gif: "/static/images/services/gifs/camera.gif",
    fallback: "/static/images/services/camera.jpg",
    summary: "Fix blurry photos, black camera view, focus failure, or flash problems.",
    bullets: [
      "Front and rear camera diagnostics",
      "Module replacement with focus check",
      "Flash and night mode verified",
      "Lens glass fitment if cracked",
    ],
  },
  {
    id: "unlocking",
    label: "Phone Unlocking",
    price: 299,
    time: "About 30 mins",
    icon: "lock_open",
    gif: "/static/images/services/gifs/unlocking.gif",
    fallback: "/static/images/services/face-id.jpg",
    summary: "Network unlock, pattern recovery, and account unlock help when you’re locked out.",
    bullets: [
      "Network / carrier unlock support",
      "Pattern, PIN, and password recovery",
      "Google / Apple account unlock help",
      "Data safety explained before we start",
    ],
  },
  {
    id: "software",
    label: "Software Update",
    price: 399,
    time: "About 30 mins",
    icon: "system_update",
    gif: "/static/images/services/gifs/software.gif",
    fallback: "/static/images/services/more.jpg",
    summary: "Fix lag, update OS, flash firmware, or recover after a failed software install.",
    bullets: [
      "OS update and flashing (Apple & Android)",
      "FRP / software lock assistance",
      "Backup discussion before wipe jobs",
      "Performance check after install",
    ],
  },
  {
    id: "hang-logo",
    label: "Hang on Logo / Soft Brick",
    price: 399,
    time: "About 45 mins",
    icon: "restart_alt",
    gif: "/static/images/services/gifs/hang-logo.gif",
    fallback: "/static/images/services/more.jpg",
    summary: "Recover phones stuck on the logo, boot loop, or soft-brick after an update.",
    bullets: [
      "Boot-loop and soft-brick recovery",
      "Firmware reflash when required",
      "Hardware check if software isn’t enough",
      "Honest call if data can’t be saved",
    ],
  },
  {
    id: "motherboard",
    label: "Motherboard Works",
    price: 999,
    time: "1–2 days",
    icon: "memory",
    gif: "/static/images/services/gifs/motherboard.gif",
    fallback: "/static/images/services/more.jpg",
    summary: "Chip-level diagnostics and microsoldering for deeper board faults.",
    bullets: [
      "Board-level diagnosis under microscope",
      "IC replacement and microsoldering",
      "No-power and short circuit repair",
      "Quoted after diagnosis — bill before work",
    ],
  },
  {
    id: "touch",
    label: "Touch / Digitizer",
    price: 1199,
    time: "About 30 mins",
    icon: "touch_app",
    gif: "/static/images/services/gifs/touch.gif",
    fallback: "/static/images/services/display.jpg",
    summary: "Fix dead spots, ghost touch, or a screen that doesn’t respond.",
    bullets: [
      "Digitizer / touch panel replacement",
      "Ghost-touch and dead-zone testing",
      "Display brightness and colour re-check",
      "Often combined with screen assembly",
    ],
  },
  {
    id: "network",
    label: "Network / SIM Issue",
    price: 399,
    time: "After diagnosis",
    icon: "signal_cellular_alt",
    gif: "/static/images/services/gifs/network.gif",
    fallback: "/static/images/services/more.jpg",
    summary: "Troubleshoot no signal, SIM not detected, or weak network on one band.",
    bullets: [
      "SIM tray and contact cleaning",
      "Antenna / baseband fault checks",
      "Software and IMEI-related diagnosis",
      "Clear next step after free check-up",
    ],
  },
  {
    id: "fingerprint",
    label: "Fingerprint / Face Unlock",
    price: 499,
    time: "About 45 mins",
    icon: "fingerprint",
    gif: "/static/images/services/gifs/fingerprint.gif",
    fallback: "/static/images/services/face-id.jpg",
    summary: "Repair fingerprint readers and face unlock that stop recognising you.",
    bullets: [
      "In-display and side fingerprint repair",
      "Face unlock sensor / flex checks",
      "Recalibration after module swap",
      "Security features re-tested with you",
    ],
  },
  {
    id: "overheat",
    label: "Overheating",
    price: 199,
    time: "After diagnosis",
    icon: "device_thermostat",
    gif: "/static/images/services/gifs/overheat.gif",
    fallback: "/static/images/services/more.jpg",
    summary: "Find why the phone heats up — battery, short, or software load — then fix it.",
    bullets: [
      "Heat source diagnosis under load",
      "Battery and charging path check",
      "Thermal paste / pad where applicable",
      "Quote only after we find the cause",
    ],
  },
  {
    id: "other",
    label: "Other Issue",
    price: 199,
    time: "After diagnosis",
    icon: "build",
    gif: "/static/images/services/gifs/other.gif",
    fallback: "/static/images/services/more.jpg",
    summary: "Not sure what’s wrong? Bring it in — we diagnose first, then quote clearly.",
    bullets: [
      "Free check-up for unclear faults",
      "Written price before any repair",
      "Shop visit or free home repair nearby",
      "WhatsApp us photos or a short video",
    ],
  },
];

(() => {
  const list = document.querySelector("[data-service-list]");
  const board = document.querySelector("[data-rate-board]");
  if (!window.MOBIFIX_ISSUES?.length) return;

  const whatsapp = document.body?.dataset?.whatsapp || "919292353522";
  const issues = window.MOBIFIX_ISSUES;

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

  const bindMedia = (root) => {
    root.querySelectorAll("img[data-fallback]").forEach((img) => {
      img.addEventListener("error", () => onImgError(img));
      if (img.complete && img.naturalWidth === 0) onImgError(img);
    });
  };

  /* —— Professional services list (image + copy separate) —— */
  if (list) {
    const loadMoreBtn = document.getElementById("svc-load-more");
    const INITIAL = 5;
    const BATCH = 4;
    let visible = Math.min(INITIAL, issues.length);

    const rowHtml = (issue, index) => {
      const text = `Hi SS Mobifix! ${issue.label} — please confirm quote & slot.`;
      const href = `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
      const gif = escapeHtml(issue.gif);
      const fallback = escapeHtml(issue.fallback || "/static/images/services/more.jpg");
      const bullets = (issue.bullets || [])
        .map((b) => `<li>${escapeHtml(b)}</li>`)
        .join("");
      const reverse = index % 2 === 1 ? " svc-row--reverse" : "";

      return `
        <article class="svc-row${reverse}" id="service-${escapeHtml(issue.id)}" data-id="${escapeHtml(issue.id)}" style="--i: ${index}">
          <figure class="svc-row-media">
            <img
              src="${gif}"
              data-fallback="${fallback}"
              alt="${escapeHtml(issue.label)} repair"
              loading="lazy"
              width="640"
              height="480"
            />
          </figure>
          <div class="svc-row-copy">
            <div class="svc-row-kicker">
              <span class="material-symbols-outlined" aria-hidden="true">${escapeHtml(issue.icon || "build")}</span>
              <span>From ${formatINR(issue.price)} · ${escapeHtml(issue.time)}</span>
            </div>
            <h3 class="svc-row-title">${escapeHtml(issue.label)}</h3>
            <p class="svc-row-lead">${escapeHtml(issue.summary || "")}</p>
            <ul class="svc-row-bullets">
              ${bullets}
            </ul>
            <div class="svc-row-actions">
              <a class="btn btn-primary" href="${href}" target="_blank" rel="noopener">
                <span class="material-symbols-outlined icon-sm">chat</span>
                Book on WhatsApp
              </a>
              <button type="button" class="btn btn-tertiary" data-book-open>
                Check model price
                <span class="material-symbols-outlined icon-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </article>`;
    };

    const updateLoadMore = () => {
      if (!loadMoreBtn) return;
      const remaining = issues.length - visible;
      if (remaining <= 0) {
        loadMoreBtn.hidden = true;
        return;
      }
      loadMoreBtn.hidden = false;
      loadMoreBtn.textContent = `Show more services (${remaining})`;
    };

    const render = (from = 0) => {
      const slice = issues.slice(from, visible);
      const html = slice.map((issue, i) => rowHtml(issue, from + i)).join("");
      if (from === 0) {
        list.innerHTML = html;
      } else {
        list.insertAdjacentHTML("beforeend", html);
      }

      const rows = [...list.querySelectorAll(".svc-row")];
      const newRows = rows.slice(from);
      newRows.forEach(bindMedia);

      if (from === 0) {
        window.MobifixMotion?.indexStagger?.(list);
        if (list.classList.contains("is-staggered") || list.classList.contains("is-in-view")) {
          window.MobifixMotion?.enter?.(newRows, 0);
        }
      } else {
        window.MobifixMotion?.enter?.(newRows, 0);
      }

      updateLoadMore();
    };

    loadMoreBtn?.addEventListener("click", () => {
      const from = visible;
      visible = Math.min(visible + BATCH, issues.length);
      render(from);
    });

    render(0);
    return;
  }

  /* —— Legacy rate-board grid (kept for any leftover markup) —— */
  if (!board) return;

  const loadMoreBtn = document.getElementById("rate-load-more");
  const INITIAL = 6;
  const BATCH = 3;
  let visible = Math.min(INITIAL, issues.length);

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
    newCards.forEach(bindMedia);

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
