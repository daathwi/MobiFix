(() => {
  const root = document.getElementById("repair-selector");
  if (!root) return;

  const WHATSAPP = root.dataset.whatsapp || document.body?.dataset?.whatsapp || "919292353522";

const MODELS = {
    Apple: [
      "iPhone 16 Pro Max",
      "iPhone 16 Pro",
      "iPhone 16 Plus",
      "iPhone 16",
      "iPhone 15 Pro Max",
      "iPhone 15 Pro",
      "iPhone 15 Plus",
      "iPhone 15",
      "iPhone 14 Pro Max",
      "iPhone 14 Pro",
      "iPhone 14 Plus",
      "iPhone 14",
      "iPhone 13 Pro Max",
      "iPhone 13 Pro",
      "iPhone 13",
      "iPhone 13 Mini",
      "iPhone 12 Pro Max",
      "iPhone 12 Pro",
      "iPhone 12",
      "iPhone 12 Mini",
      "iPhone 11 Pro Max",
      "iPhone 11 Pro",
      "iPhone 11",
      "iPhone XS Max",
      "iPhone XR",
      "iPhone X",
      "iPhone SE (2022)",
      "iPhone SE (2020)",
      "Other iPhone",
    ],
    Samsung: [
      "Galaxy S25 Ultra",
      "Galaxy S25+",
      "Galaxy S25",
      "Galaxy S24 Ultra",
      "Galaxy S24+",
      "Galaxy S24",
      "Galaxy S23 Ultra",
      "Galaxy S23+",
      "Galaxy S23",
      "Galaxy S22 Ultra",
      "Galaxy S22",
      "Galaxy S21 FE",
      "Galaxy Z Fold 6",
      "Galaxy Z Flip 6",
      "Galaxy Z Fold 5",
      "Galaxy Z Flip 5",
      "Galaxy A55",
      "Galaxy A54",
      "Galaxy A35",
      "Galaxy A34",
      "Galaxy A25",
      "Galaxy A23",
      "Galaxy A15",
      "Galaxy A14",
      "Galaxy M55",
      "Galaxy M34",
      "Galaxy M14",
      "Galaxy F54",
      "Galaxy F34",
      "Other Samsung",
    ],
    Xiaomi: [
      "Xiaomi 14 Ultra",
      "Xiaomi 14",
      "Xiaomi 13 Pro",
      "Xiaomi 13",
      "Xiaomi 12 Pro",
      "Xiaomi 12",
      "Xiaomi 11T Pro",
      "Xiaomi 11i",
      "Other Xiaomi",
    ],
    Redmi: [
      "Redmi Note 13 Pro+",
      "Redmi Note 13 Pro",
      "Redmi Note 13",
      "Redmi Note 12 Pro+",
      "Redmi Note 12 Pro",
      "Redmi Note 12",
      "Redmi Note 11 Pro+",
      "Redmi Note 11",
      "Redmi 13C",
      "Redmi 12",
      "Redmi A3",
      "Other Redmi",
    ],
    Realme: [
      "Realme GT 6",
      "Realme GT Neo 6",
      "Realme 12 Pro+",
      "Realme 12 Pro",
      "Realme 12+",
      "Realme 11 Pro+",
      "Realme 11",
      "Realme Narzo 70 Pro",
      "Realme Narzo 60",
      "Realme C67",
      "Realme C55",
      "Other Realme",
    ],
    OnePlus: [
      "OnePlus 13",
      "OnePlus 12",
      "OnePlus 12R",
      "OnePlus 11",
      "OnePlus 11R",
      "OnePlus 10 Pro",
      "OnePlus 10T",
      "OnePlus Nord 4",
      "OnePlus Nord CE 4",
      "OnePlus Nord 3",
      "OnePlus Nord CE 3",
      "OnePlus Nord CE 2",
      "Other OnePlus",
    ],
    Vivo: [
      "Vivo X100 Pro",
      "Vivo X100",
      "Vivo X90 Pro",
      "Vivo V30 Pro",
      "Vivo V30",
      "Vivo V29",
      "Vivo V27",
      "Vivo T3",
      "Vivo Y200",
      "Vivo Y100",
      "Vivo Y56",
      "Vivo Y22",
      "Other Vivo",
    ],
    Oppo: [
      "Oppo Find X7 Ultra",
      "Oppo Reno 12 Pro",
      "Oppo Reno 12",
      "Oppo Reno 11 Pro",
      "Oppo Reno 11",
      "Oppo Reno 10",
      "Oppo F25 Pro",
      "Oppo F23",
      "Oppo A79",
      "Oppo A59",
      "Oppo A38",
      "Other Oppo",
    ],
    Motorola: [
      "Motorola Edge 50 Ultra",
      "Motorola Edge 50 Pro",
      "Motorola Edge 50 Fusion",
      "Motorola Edge 40",
      "Motorola G85",
      "Motorola G64",
      "Motorola G54",
      "Motorola G34",
      "Motorola G24",
      "Other Motorola",
    ],
    Nothing: [
      "Nothing Phone (2a) Plus",
      "Nothing Phone (2a)",
      "Nothing Phone (2)",
      "Nothing Phone (1)",
      "Other Nothing",
    ],
    Google: [
      "Pixel 9 Pro XL",
      "Pixel 9 Pro",
      "Pixel 9",
      "Pixel 8 Pro",
      "Pixel 8",
      "Pixel 8a",
      "Pixel 7 Pro",
      "Pixel 7",
      "Pixel 7a",
      "Pixel 6a",
      "Other Pixel",
    ],
    iQOO: [
      "iQOO 12",
      "iQOO Neo 9 Pro",
      "iQOO Neo 7",
      "iQOO Z9",
      "iQOO Z7",
      "Other iQOO",
    ],
    Poco: [
      "Poco F6 Pro",
      "Poco F6",
      "Poco X6 Pro",
      "Poco X6",
      "Poco M6 Pro",
      "Poco M6",
      "Poco C65",
      "Other Poco",
    ],
    Honor: [
      "Honor 200 Pro",
      "Honor 200",
      "Honor 90",
      "Honor X9b",
      "Honor X8b",
      "Other Honor",
    ],
    Nokia: [
      "Nokia G42",
      "Nokia G22",
      "Nokia C32",
      "Nokia C22",
      "Other Nokia",
    ],
    Infinix: [
      "Infinix Note 40 Pro",
      "Infinix Note 40",
      "Infinix Hot 40",
      "Infinix Hot 30",
      "Infinix Smart 8",
      "Other Infinix",
    ],
    Tecno: [
      "Tecno Camon 30",
      "Tecno Spark 20 Pro",
      "Tecno Spark 20",
      "Tecno Pova 6",
      "Other Tecno",
    ],
    Asus: [
      "ROG Phone 8",
      "ROG Phone 7",
      "Zenfone 11 Ultra",
      "Zenfone 10",
      "Other Asus",
    ],
    Other: ["Other Android", "Feature phone / keypad", "Not sure"],
  };

const ISSUES = window.MOBIFIX_ISSUES || [];

  const BRAND_LOGOS = {
    Apple: "/static/images/brands/apple.svg",
    Samsung: "/static/images/brands/samsung.svg",
    OnePlus: "/static/images/brands/oneplus.svg",
    Vivo: "/static/images/brands/vivo.svg",
    Oppo: "/static/images/brands/oppo.svg",
    Xiaomi: "/static/images/brands/xiaomi.svg",
    Redmi: "/static/images/brands/xiaomi.svg",
  };

  const FEATURED = ["Apple", "Samsung", "Xiaomi", "Redmi", "OnePlus", "Vivo", "Oppo", "Realme"];
  const ALL_BRANDS = Object.keys(MODELS);
  const MORE_BRANDS = ALL_BRANDS.filter((b) => !FEATURED.includes(b));

  const state = { brand: "", model: "", issueId: "", place: "shop" };

  const brandPick = document.getElementById("brand-pick");
  const resultEl = document.getElementById("selector-result");
  const summaryEl = document.getElementById("selector-summary");
  const timeEl = document.getElementById("selector-time");
  const priceEl = document.getElementById("selector-price");
  const bookEl = document.getElementById("selector-book");
  const modelDd = document.getElementById("cdd-model");
  const issueDd = document.getElementById("cdd-issue");

  const formatINR = (n) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  function brandIcon(brand) {
    const src = BRAND_LOGOS[brand];
    if (src) return `<span class="cdd-logo" style="--logo:url('${src}')" aria-hidden="true"></span>`;
    return `<span class="cdd-avatar" aria-hidden="true">${(brand || "?").charAt(0)}</span>`;
  }

  function issueIcon(id) {
    const issue = ISSUES.find((item) => item.id === id);
    const name = issue?.icon || "build";
    return `<span class="material-symbols-outlined cdd-issue-icon">${name}</span>`;
  }

  function closeAll(except) {
    root.querySelectorAll(".cdd").forEach((dd) => {
      if (dd === except) return;
      dd.classList.remove("is-open");
      dd.querySelector(".cdd-trigger")?.setAttribute("aria-expanded", "false");
    });
    const more = brandPick?.querySelector(".brand-more");
    if (more && more !== except) {
      more.classList.remove("is-open");
    }
  }

  function setTriggerContent(dd, html, placeholder = false) {
    const value = dd.querySelector(".cdd-value");
    if (!value) return;
    value.innerHTML = html;
    value.classList.toggle("is-placeholder", placeholder);
  }

  function filterList(dd, query) {
    const q = query.trim().toLowerCase();
    dd.querySelectorAll(".cdd-option").forEach((opt) => {
      const text = (opt.dataset.label || "").toLowerCase();
      opt.hidden = Boolean(q) && !text.includes(q);
    });
  }

  function bindDropdown(dd, { onPick }) {
    const trigger = dd.querySelector(".cdd-trigger");
    const menu = dd.querySelector(".cdd-menu");
    const search = dd.querySelector(".cdd-search");

    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (dd.classList.contains("is-disabled")) return;
      const willOpen = !dd.classList.contains("is-open");
      closeAll(dd);
      dd.classList.toggle("is-open", willOpen);
      trigger.setAttribute("aria-expanded", String(willOpen));
      if (willOpen && search) {
        search.value = "";
        filterList(dd, "");
        requestAnimationFrame(() => search.focus());
      }
    });

    search?.addEventListener("click", (e) => e.stopPropagation());
    search?.addEventListener("input", () => filterList(dd, search.value));

    menu?.addEventListener("click", (e) => {
      const opt = e.target.closest(".cdd-option");
      if (!opt || opt.hidden) return;
      e.preventDefault();
      e.stopPropagation();
      onPick(opt);
      closeAll();
    });
  }

  function selectBrand(brand) {
    state.brand = brand;
    state.model = "";
    state.issueId = "";
    brandPick.querySelectorAll(".brand-chip").forEach((el) => {
      el.classList.toggle("is-active", el.dataset.brand === brand);
    });
    const moreLabel = brandPick.querySelector("[data-more-label]");
    if (moreLabel) {
      moreLabel.textContent = MORE_BRANDS.includes(brand) ? brand : "More";
    }
    renderModelOptions(brand);
    setTriggerContent(issueDd, "Select issue", true);
    updateResult();
  }

  function renderBrandPick() {
    const featuredHtml = FEATURED.filter((b) => MODELS[b])
      .map(
        (b) => `
      <button type="button" class="brand-chip" data-brand="${b}" role="option" aria-selected="false">
        ${brandIcon(b)}
        <span>${b}</span>
      </button>`
      )
      .join("");

    const moreHtml = `
      <div class="brand-more">
        <button type="button" class="brand-chip brand-chip--more" data-more-toggle>
          <span class="material-symbols-outlined">more_horiz</span>
          <span data-more-label>More</span>
        </button>
        <div class="brand-more-menu" hidden>
          ${MORE_BRANDS.map(
            (b) => `
            <button type="button" class="brand-more-item" data-brand="${b}">
              ${brandIcon(b)}
              <span>${b}</span>
            </button>`
          ).join("")}
        </div>
      </div>`;

    brandPick.innerHTML = featuredHtml + moreHtml;

    brandPick.querySelectorAll(".brand-chip[data-brand]").forEach((btn) => {
      btn.addEventListener("click", () => selectBrand(btn.dataset.brand));
    });

    const more = brandPick.querySelector(".brand-more");
    const toggle = more.querySelector("[data-more-toggle]");
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const open = !more.classList.contains("is-open");
      closeAll(more);
      more.classList.toggle("is-open", open);
    });
    more.querySelectorAll(".brand-more-item").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        selectBrand(btn.dataset.brand);
        closeAll();
      });
    });
  }

  function renderModelOptions(brand) {
    const list = document.getElementById("cdd-model-list");
    const models = MODELS[brand] || [];
    modelDd.classList.toggle("is-disabled", !brand);
    modelDd.querySelector(".cdd-trigger").disabled = !brand;

    if (!brand) {
      list.innerHTML = "";
      setTriggerContent(modelDd, "Select brand first", true);
      return;
    }

    list.innerHTML = models
      .map(
        (m) => `
      <li>
        <button type="button" class="cdd-option" data-value="${m}" data-label="${m}">
          ${brandIcon(brand)}
          <span>${m}</span>
        </button>
      </li>`
      )
      .join("");
    setTriggerContent(modelDd, "Select model", true);
  }

  function renderIssueOptions() {
    document.getElementById("cdd-issue-list").innerHTML = ISSUES.map(
      (i) => `
      <li>
        <button type="button" class="cdd-option" data-value="${i.id}" data-label="${i.label}">
          ${issueIcon(i.id)}
          <span>${i.label}</span>
        </button>
      </li>`
    ).join("");
  }

  function selectedIssue() {
    return ISSUES.find((i) => i.id === state.issueId) || null;
  }

  function updateResult() {
    const issue = selectedIssue();
    const ready = Boolean(state.brand && state.model && issue);
    resultEl.hidden = !ready;
    if (!ready) return;

    const atHome = state.place === "home";
    summaryEl.textContent = `${state.brand} ${state.model} · ${issue.label} · ${atHome ? "Home" : "Shop"}`;
    timeEl.textContent = issue.time;
    priceEl.textContent = formatINR(issue.price);

    const estimate = formatINR(issue.price);
    const lines = [
      "Hi SS Mobifix!",
      "",
      `Brand: ${state.brand}`,
      `Model: ${state.model}`,
      `Issue: ${issue.label}`,
      `Repair at: ${atHome ? "Home" : "Shop"}`,
    ];

    if (atHome) {
      lines.push("", "I will share my address.");
    }

    lines.push(
      "",
      `Estimate shown: ${estimate}`,
      "Please confirm price and timing. Thanks!"
    );

    const text = lines.join("\n");
    bookEl.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
  }

  bindDropdown(modelDd, {
    onPick: (opt) => {
      state.model = opt.dataset.value;
      setTriggerContent(modelDd, `${brandIcon(state.brand)}<span>${state.model}</span>`, false);
      updateResult();
    },
  });

  bindDropdown(issueDd, {
    onPick: (opt) => {
      state.issueId = opt.dataset.value;
      const issue = selectedIssue();
      setTriggerContent(issueDd, `${issueIcon(state.issueId)}<span>${issue?.label || ""}</span>`, false);
      updateResult();
    },
  });

  root.querySelectorAll("[data-place]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.place = btn.dataset.place || "shop";
      root.querySelectorAll("[data-place]").forEach((el) => {
        el.classList.toggle("is-active", el === btn);
        el.setAttribute("aria-checked", String(el === btn));
      });
      updateResult();
    });
  });

  document.addEventListener("pointerdown", (e) => {
    if (!root.contains(e.target)) {
      closeAll();
      return;
    }
    if (!e.target.closest(".cdd, .brand-more")) closeAll();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });

  renderBrandPick();
  renderModelOptions("");
  renderIssueOptions();
  setTriggerContent(issueDd, "Select issue", true);
  updateResult();
})();
