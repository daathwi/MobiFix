(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  if (reduce) {
    document.querySelectorAll("[data-in-view], [data-stagger], [data-text-reveal]").forEach((el) => {
      el.classList.add("is-in-view", "is-staggered");
    });
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

  /* Index stagger children */
  document.querySelectorAll("[data-stagger]").forEach((group) => {
    [...group.children].forEach((child, i) => {
      child.style.setProperty("--i", String(i));
    });
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

  /* Also reveal nested stagger when parent section enters */
  document.querySelectorAll("[data-in-view] [data-stagger]").forEach((group) => {
    io.observe(group);
  });

  /* Magnetic buttons */
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    const strength = Number(el.dataset.magnetic || 18);
    el.addEventListener("pointermove", (event) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate3d(${x / strength}px, ${y / strength}px, 0)`;
    });
    el.addEventListener("pointerleave", () => {
      el.style.transform = "";
    });
  });

  /* Trail class on homepage primary CTAs */
  document.querySelectorAll(".hero-ctas .btn-primary").forEach((btn) => {
    btn.classList.add("mp-trail");
  });

  /* FAQ accordion — one open at a time, smoother feel */
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
})();
