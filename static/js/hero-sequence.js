(() => {
  const root = document.querySelector("[data-hero-seq]");
  const canvas = document.getElementById("hero-seq-canvas");
  if (!root || !canvas || document.body?.dataset?.page !== "home") return;

  const track = root.querySelector(".hero-seq-track");
  const hint = root.querySelector("[data-hero-seq-hint]");
  const copy = root.querySelector("[data-hero-seq-copy]");
  const loader = root.querySelector("[data-hero-seq-loader]");
  const bar = root.querySelector("[data-hero-seq-bar]");
  const fill = root.querySelector("[data-hero-seq-fill]");
  const pctEl = root.querySelector("[data-hero-seq-pct]");
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx || !track) return;

  const start = Number(root.dataset.frameStart || 1);
  const end = Number(root.dataset.frameEnd || 228);
  const step = Math.max(1, Number(root.dataset.frameStep || 2));
  const pad = Number(root.dataset.framePad || 3);
  const base = root.dataset.frameBase || "/static/images/mobile_phone_assembly/ezgif-frame-";
  const revealAt = 0.9;
  /** Extra sticky travel after last frame on desktop (~1s at ~1 viewport / second). */
  const HOLD_SECONDS = 1;
  const MOBILE_FPS = 28;
  const MOBILE_HOLD_MS = 2000;

  const frameNums = [];
  for (let i = start; i <= end; i += step) frameNums.push(i);
  if (frameNums[frameNums.length - 1] !== end) frameNums.push(end);

  const frames = new Array(frameNums.length);
  let drawn = -1;
  let ready = false;
  let revealed = false;
  let raf = 0;
  let loadedCount = 0;
  let autoplayTimer = 0;
  let mode = "desktop";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobileMq = window.matchMedia("(max-width: 1023px)");

  function isMobile() {
    return mobileMq.matches;
  }

  function frameUrl(n) {
    return `${base}${String(n).padStart(pad, "0")}.jpg`;
  }

  function setLoadProgress(loaded, total) {
    const pct = total ? Math.round((loaded / total) * 100) : 0;
    if (fill) fill.style.width = `${pct}%`;
    if (bar) bar.setAttribute("aria-valuenow", String(pct));
    if (pctEl) pctEl.textContent = String(pct);
    root.style.setProperty("--hero-load-progress", String(pct / 100));
  }

  function loadImage(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  async function preload(concurrency = 10) {
    const total = frameNums.length;
    setLoadProgress(0, total);
    let cursor = 0;

    async function worker() {
      while (cursor < total) {
        const i = cursor++;
        frames[i] = await loadImage(frameUrl(frameNums[i]));
        loadedCount += 1;
        setLoadProgress(loadedCount, total);
      }
    }

    await Promise.all(Array.from({ length: Math.min(concurrency, total) }, worker));
  }

  function dismissLoader() {
    document.documentElement.classList.add("hero-seq-ready");
    document.documentElement.classList.remove("hero-seq-loading");
    if (loader) {
      loader.setAttribute("aria-busy", "false");
      loader.setAttribute("aria-hidden", "true");
    }
  }

  function lockScroll(on) {
    document.body.style.overflow = on ? "hidden" : "";
  }

  function sizeTrack() {
    if (reduceMotion || isMobile()) {
      track.style.height = "100svh";
      return;
    }
    const vh = window.innerHeight;
    const seqTravel = vh * 1.9;
    const holdTravel = vh * HOLD_SECONDS;
    track.style.height = `${Math.round(seqTravel + holdTravel + vh)}px`;
  }

  function resize() {
    sizeTrack();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.floor(window.innerWidth));
    const h = Math.max(1, Math.floor(window.innerHeight));
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (drawn >= 0) paint(drawn, true);
  }

  function paint(index, force = false) {
    const img = frames[index] || frames.find(Boolean);
    if (!img) return;
    if (!force && index === drawn) return;
    drawn = index;

    const cw = canvas.clientWidth || window.innerWidth;
    const ch = canvas.clientHeight || window.innerHeight;
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;
    let dw;
    let dh;
    if (ir > cr) {
      dh = ch;
      dw = ch * ir;
    } else {
      dw = cw;
      dh = cw / ir;
    }
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;
    ctx.fillStyle = "#d4d4d4";
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }

  function scrollState() {
    const rect = track.getBoundingClientRect();
    const travel = Math.max(1, track.offsetHeight - window.innerHeight);
    const holdTravel = Math.min(travel * 0.55, window.innerHeight * HOLD_SECONDS);
    const seqTravel = Math.max(1, travel - holdTravel);
    const scrolled = Math.min(travel, Math.max(0, -rect.top));
    if (scrolled <= seqTravel) {
      return { seq: scrolled / seqTravel, overall: scrolled / travel };
    }
    return { seq: 1, overall: scrolled / travel };
  }

  function setRevealed(on) {
    if (revealed === on) return;
    revealed = on;
    document.documentElement.classList.toggle("hero-seq-done", on);
    root.classList.toggle("is-revealed", on);
    if (hint) hint.setAttribute("aria-hidden", on ? "true" : "false");
    if (copy) copy.setAttribute("aria-hidden", on ? "false" : "true");
    if (on && mode === "mobile") lockScroll(false);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearTimeout(autoplayTimer);
      autoplayTimer = 0;
    }
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }

  function tickScroll() {
    raf = 0;
    if (!ready || mode !== "desktop") return;
    const { seq, overall } = scrollState();
    const idx = Math.round(seq * (frameNums.length - 1));
    paint(idx);
    setRevealed(seq >= revealAt);
    root.style.setProperty("--hero-seq-progress", overall.toFixed(4));
  }

  function requestScrollTick() {
    if (raf || mode !== "desktop") return;
    raf = requestAnimationFrame(tickScroll);
  }

  function playAutoplay() {
    mode = "mobile";
    root.classList.add("is-autoplay");
    if (hint) hint.setAttribute("aria-hidden", "true");
    lockScroll(true);

    const last = frames.length - 1;
    const frameMs = 1000 / MOBILE_FPS;
    let index = 0;
    let lastTs = 0;

    function stepAuto(ts) {
      if (mode !== "mobile") return;
      if (!lastTs) lastTs = ts;
      const elapsed = ts - lastTs;
      if (elapsed >= frameMs) {
        const advance = Math.max(1, Math.floor(elapsed / frameMs));
        lastTs = ts;
        index = Math.min(last, index + advance);
        paint(index);
        root.style.setProperty("--hero-seq-progress", (index / last).toFixed(4));
      }

      if (index >= last) {
        paint(last, true);
        autoplayTimer = window.setTimeout(() => {
          setRevealed(true);
        }, MOBILE_HOLD_MS);
        return;
      }

      raf = requestAnimationFrame(stepAuto);
    }

    paint(0, true);
    raf = requestAnimationFrame(stepAuto);
  }

  function startDesktop() {
    mode = "desktop";
    root.classList.remove("is-autoplay");
    lockScroll(false);
    if (hint) hint.setAttribute("aria-hidden", "false");
    requestScrollTick();
  }

  function startExperience() {
    ready = true;
    dismissLoader();
    resize();

    if (reduceMotion) {
      paint(frames.length - 1, true);
      setRevealed(true);
      lockScroll(false);
      return;
    }

    if (isMobile()) {
      playAutoplay();
    } else {
      paint(0, true);
      startDesktop();
    }
  }

  function onBreakpointChange() {
    if (!ready || reduceMotion) {
      sizeTrack();
      return;
    }

    const wantMobile = isMobile();
    if (wantMobile && mode !== "mobile") {
      stopAutoplay();
      setRevealed(false);
      playAutoplay();
      resize();
      return;
    }
    if (!wantMobile && mode !== "desktop") {
      stopAutoplay();
      setRevealed(false);
      paint(0, true);
      startDesktop();
      resize();
    }
  }

  document.documentElement.classList.add("hero-seq-active", "hero-seq-loading");
  lockScroll(true);
  if (copy) copy.setAttribute("aria-hidden", "true");
  sizeTrack();
  setLoadProgress(0, frameNums.length);

  preload(reduceMotion ? 6 : 12)
    .then(startExperience)
    .catch(startExperience);

  window.addEventListener(
    "scroll",
    () => {
      if (mode === "desktop") requestScrollTick();
    },
    { passive: true }
  );

  window.addEventListener("resize", () => {
    if (!ready) {
      sizeTrack();
      return;
    }
    resize();
    if (mode === "desktop") requestScrollTick();
  });

  if (typeof mobileMq.addEventListener === "function") {
    mobileMq.addEventListener("change", onBreakpointChange);
  } else {
    mobileMq.addListener(onBreakpointChange);
  }
})();
