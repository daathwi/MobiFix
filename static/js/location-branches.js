(() => {
  const root = document.getElementById("location-finder");
  const dd = document.getElementById("location-branch-cdd");
  if (!root || !dd) return;

  let branches = [];
  try {
    branches = JSON.parse(root.dataset.branches || "[]");
  } catch {
    branches = [];
  }
  if (!branches.length) return;

  const byId = Object.fromEntries(branches.map((b) => [b.id, b]));
  const trigger = dd.querySelector(".cdd-trigger");
  const menu = dd.querySelector(".cdd-menu");
  const valueEl = document.getElementById("location-branch-value");
  const titleEl = document.getElementById("location-title");
  const addressEl = document.getElementById("location-address");
  const phoneEl = document.getElementById("location-phone");
  const hoursEl = document.getElementById("location-hours");
  const directionsEl = document.getElementById("location-directions");
  const mapEl = document.getElementById("location-map");

  function closeMenu() {
    dd.classList.remove("is-open");
    if (menu) menu.hidden = true;
    trigger?.setAttribute("aria-expanded", "false");
  }

  function openMenu() {
    dd.classList.add("is-open");
    if (menu) menu.hidden = false;
    trigger?.setAttribute("aria-expanded", "true");
  }

  function setActive(id) {
    const branch = byId[id];
    if (!branch) return;

    root.dataset.active = id;
    if (valueEl) valueEl.textContent = branch.name;
    if (titleEl) titleEl.textContent = branch.title || `${branch.name}, Vijayawada`;
    if (addressEl) addressEl.textContent = branch.address;
    if (hoursEl) hoursEl.textContent = branch.hours;
    if (phoneEl) {
      phoneEl.textContent = branch.phone;
      phoneEl.href = `tel:${String(branch.phone).replace(/\s+/g, "")}`;
    }
    if (directionsEl) directionsEl.href = branch.maps_url;
    if (mapEl) {
      mapEl.src = branch.maps_embed_url;
      mapEl.title = `SS Mobifix — ${branch.title || branch.name}`;
    }

    dd.querySelectorAll(".cdd-option").forEach((opt) => {
      const selected = opt.dataset.value === id;
      opt.classList.toggle("is-selected", selected);
      opt.setAttribute("aria-selected", selected ? "true" : "false");
    });
  }

  trigger?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (dd.classList.contains("is-open")) closeMenu();
    else openMenu();
  });

  dd.addEventListener("click", (e) => {
    const opt = e.target.closest(".cdd-option");
    if (!opt) return;
    e.preventDefault();
    e.stopPropagation();
    setActive(opt.dataset.value);
    closeMenu();
  });

  document.addEventListener("click", () => {
    closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  setActive(root.dataset.active || branches[0].id);
})();
