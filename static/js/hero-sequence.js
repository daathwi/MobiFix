(() => {
  const root = document.querySelector("[data-hero-seq]");
  const canvas = document.getElementById("hero-seq-canvas");
  if (!root || !canvas || document.body?.dataset?.page !== "home") return;

  const track = root.querySelector(".hero-seq-track");
  const hint = root.querySelector("[data-hero-seq-hint]");
  const copy = root.querySelector("[data-hero-seq-copy]");
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx || !track) return;

  const start = Number(root.dataset.frameStart || 1);
  const end = Number(root.dataset.frameEnd || 228);
  const step = Math.max(1, Number(root.dataset.frameStep || 2));
  const pad = Number(root.dataset.framePad || 3);
  const base = root.dataset.frameBase || "/static/images/mobile_phone_assembly/ezgif-frame-";
  const revealAt = 0.9;
  /** Extra sticky travel after last frame (~2s at ~1 viewport / second). */
  const HOLD_SECONDS = 2;

  const frameNums = [];
  for (let i = start; i <= end; i += step) frameNums.push(i);
  if (frameNums[frameNums.length - 1] !== end) frameNums.push(end);

  const frames = new Array(frameNums.length);
  let drawn = -1;
  let ready = false;
  let revealed = false;
  let raf = 0;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function frameUrl(n) {
    return `${base}${String(n).padStart(pad, "0")}.jpg`;
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

  async function preload(concurrency = 8) {
    let cursor = 0;
    async function worker() {
      while (cursor < frameNums.length) {
        const i = cursor++;
        frames[i] = await loadImage(frameUrl(frameNums[i]));
        if (i === 0 && frames[0]) {
          ready = true;
          resize();
          paint(0);
        }
      }
    }
    await Promise.all(Array.from({ length: Math.min(concurrency, frameNums.length) }, worker));
  }

  function sizeTrack() {
    if (reduceMotion) {
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
  }

  function tick() {
    raf = 0;
    if (!ready) return;
    const { seq, overall } = scrollState();
    const idx = Math.round(seq * (frameNums.length - 1));
    paint(idx);
    setRevealed(seq >= revealAt);
    root.style.setProperty("--hero-seq-progress", overall.toFixed(4));
  }

  function requestTick() {
    if (raf) return;
    raf = requestAnimationFrame(tick);
  }

  function finishImmediately() {
    ready = true;
    const last = frames.length - 1;
    if (!frames[last]) {
      loadImage(frameUrl(frameNums[last])).then((img) => {
        frames[last] = img;
        resize();
        paint(last, true);
        setRevealed(true);
      });
      return;
    }
    resize();
    paint(last, true);
    setRevealed(true);
  }

  document.documentElement.classList.add("hero-seq-active");
  if (copy) copy.setAttribute("aria-hidden", "true");
  sizeTrack();

  if (reduceMotion) {
    preload(4).then(finishImmediately);
  } else {
    preload(8).then(() => requestTick());
  }

  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", () => {
    resize();
    requestTick();
  });
})();
