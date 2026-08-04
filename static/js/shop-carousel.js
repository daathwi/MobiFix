(() => {
  const root = document.querySelector("[data-shop-carousel]");
  if (!root) return;

  const track = root.querySelector(".shop-carousel-track");
  const items = Array.from(root.querySelectorAll(".shop-carousel-item"));
  const prevBtn = root.querySelector("[data-carousel-prev]");
  const nextBtn = root.querySelector("[data-carousel-next]");
  if (!track || !items.length || !prevBtn || !nextBtn) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const AUTO_MS = 4000;
  let index = 0;
  let timer = null;
  let paused = false;

  function visibleCount() {
    const w = window.innerWidth;
    if (w < 640) return 1;
    if (w < 960) return 2;
    return 3;
  }

  function maxIndex() {
    return Math.max(0, items.length - visibleCount());
  }

  function stepPx() {
    const first = items[0];
    if (!first) return 0;
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
    return first.getBoundingClientRect().width + gap;
  }

  function update() {
    index = Math.min(Math.max(0, index), maxIndex());
    track.style.transform = `translate3d(-${index * stepPx()}px, 0, 0)`;
    prevBtn.disabled = index <= 0;
    nextBtn.disabled = index >= maxIndex() && maxIndex() === 0;
    // Keep next enabled when looping via autoplay; for manual at end, allow click to wrap
    if (maxIndex() > 0) {
      prevBtn.disabled = false;
      nextBtn.disabled = false;
    }
  }

  function go(delta) {
    const max = maxIndex();
    if (max <= 0) {
      index = 0;
    } else {
      index = (index + delta + (max + 1)) % (max + 1);
    }
    update();
  }

  function stopAuto() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function startAuto() {
    stopAuto();
    if (reduceMotion || paused || maxIndex() <= 0) return;
    timer = setInterval(() => go(1), AUTO_MS);
  }

  prevBtn.addEventListener("click", () => {
    go(-1);
    startAuto();
  });

  nextBtn.addEventListener("click", () => {
    go(1);
    startAuto();
  });

  root.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
      startAuto();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
      startAuto();
    }
  });

  root.addEventListener("pointerenter", () => {
    paused = true;
    stopAuto();
  });
  root.addEventListener("pointerleave", () => {
    paused = false;
    startAuto();
  });
  root.addEventListener("focusin", () => {
    paused = true;
    stopAuto();
  });
  root.addEventListener("focusout", (event) => {
    if (root.contains(event.relatedTarget)) return;
    paused = false;
    startAuto();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAuto();
    else if (!paused) startAuto();
  });

  window.addEventListener("resize", () => {
    update();
    startAuto();
  });

  root.tabIndex = 0;
  update();
  startAuto();
})();
