(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* Scroll progress */
  const progress = document.createElement("div");
  progress.className = "scroll-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.prepend(progress);

  let ticking = false;
  function updateProgress() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
    progress.style.width = `${pct}%`;
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    },
    { passive: true }
  );
  updateProgress();

  /* Index stagger children */
  function indexStagger(group) {
    [...group.children].forEach((child, i) => {
      child.style.setProperty("--i", String(i));
    });
  }

  document.querySelectorAll("[data-stagger]").forEach(indexStagger);

  /* Mobile drawer link delays */
  document.querySelectorAll(".mobile-menu a, .mobile-menu-cta > *").forEach((el, i) => {
    el.style.setProperty("--i", String(i));
  });

  /* Sticky CTA — reveal after leaving hero */
  const sticky = document.querySelector(".mobile-sticky-cta");
  const stickyAnchor =
    document.querySelector(".hero") ||
    document.querySelector(".page-hero") ||
    document.querySelector("main");

  function updateSticky() {
    if (!sticky || reduce) {
      sticky?.classList.add("is-visible");
      return;
    }
    if (window.innerWidth > 1023) {
      sticky.classList.remove("is-visible");
      return;
    }
    const anchorBottom = stickyAnchor
      ? stickyAnchor.getBoundingClientRect().bottom
      : 120;
    const show = anchorBottom < 64 || window.scrollY > 280;
    sticky.classList.toggle("is-visible", show);
  }

  if (sticky) {
    let stickyTick = false;
    const onStickyScroll = () => {
      if (stickyTick) return;
      stickyTick = true;
      requestAnimationFrame(() => {
        stickyTick = false;
        updateSticky();
      });
    };
    window.addEventListener("scroll", onStickyScroll, { passive: true });
    window.addEventListener("resize", updateSticky, { passive: true });
    updateSticky();
  }

  if (reduce) {
    document.querySelectorAll("[data-in-view], [data-stagger], [data-text-reveal]").forEach((el) => {
      el.classList.add("is-in-view", "is-staggered");
    });
    sticky?.classList.add("is-visible");
    return;
  }

  /* Text reveal — split into words */
  document.querySelectorAll("[data-text-reveal]").forEach((el) => {
    if (el.dataset.mpSplit === "1") return;
    const mode = el.getAttribute("data-text-reveal") || "word";
    const text = el.textContent.trim();
    el.setAttribute("aria-label", text);
    el.dataset.mpSplit = "1";

    if (mode === "char") {
      el.innerHTML = [...text]
        .map((ch, i) =>
          ch === " "
            ? `<span class="mp-space" aria-hidden="true">&nbsp;</span>`
            : `<span class="mp-char" style="--i:${i}" aria-hidden="true">${ch}</span>`
        )
        .join("");
      return;
    }

    const words = text.split(/\s+/);
    el.innerHTML = words
      .map(
        (word, i) =>
          `<span class="mp-word" style="--i:${i}" aria-hidden="true">${word}</span>${
            i < words.length - 1 ? `<span class="mp-space" aria-hidden="true"> </span>` : ""
          }`
      )
      .join("");
  });

  /* In-view observer */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("is-in-view");
        if (el.hasAttribute("data-stagger")) el.classList.add("is-staggered");
        io.unobserve(el);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  document.querySelectorAll("[data-in-view], [data-stagger], [data-text-reveal]").forEach((el) => {
    io.observe(el);
  });

  document.querySelectorAll("[data-in-view] [data-stagger]").forEach((group) => {
    io.observe(group);
  });

  /* Magnetic buttons (desktop fine pointer only) */
  function bindMagnetic(el) {
    /* Disabled — buttons stay still; hover uses shade only */
    return;
  }

  /* Shade trail on key primary CTAs (no magnetic slide) */
  document
    .querySelectorAll(
      ".hero-ctas .btn-primary, .nav-book, .page-hero-ctas .btn-primary, .page-cta .btn-primary, .location-copy .btn-primary"
    )
    .forEach((btn) => {
      btn.classList.add("mp-trail");
      btn.removeAttribute("data-magnetic");
    });

  /* FAQ accordion — one open at a time */
  document.querySelectorAll("[data-faq-accordion]").forEach((list) => {
    list.querySelectorAll("details.faq-item").forEach((item) => {
      item.addEventListener("toggle", () => {
        if (!item.open) return;
        list.querySelectorAll("details.faq-item").forEach((other) => {
          if (other !== item) other.open = false;
        });
      });
    });
  });

  /* Public helpers for dynamically rendered grids */
  window.MobifixMotion = {
    indexStagger,
    observe(el) {
      if (!el || reduce) {
        el?.classList.add("is-in-view", "is-staggered");
        return;
      }
      if (el.hasAttribute("data-stagger")) indexStagger(el);
      io.observe(el);
    },
    enter(nodes, startIndex = 0) {
      [...nodes].forEach((node, i) => {
        node.style.setProperty("--i", String(startIndex + i));
        node.classList.remove("mp-enter");
        void node.offsetWidth;
        node.classList.add("mp-enter");
      });
    },
  };
})();
