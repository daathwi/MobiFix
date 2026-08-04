(() => {
  const zones = document.querySelectorAll("[data-timezone]");
  if (!zones.length) return;

  function partsInTimeZone(date, timeZone) {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const bits = Object.fromEntries(fmt.formatToParts(date).map((p) => [p.type, p.value]));
    return {
      weekday: bits.weekday,
      minutes: Number(bits.hour) * 60 + Number(bits.minute),
    };
  }

  function hoursFor(weekday) {
    // Mon–Sat 10:00–20:00 · Sun 11:00–16:00 (Asia/Kolkata)
    if (weekday === "Sun") return { open: 11 * 60, close: 16 * 60, label: "11:00 AM – 04:00 PM" };
    return { open: 10 * 60, close: 20 * 60, label: "10:00 AM – 08:00 PM" };
  }

  function statusLine() {
    const { weekday, minutes } = partsInTimeZone(new Date(), "Asia/Kolkata");
    const slot = hoursFor(weekday);
    const open = minutes >= slot.open && minutes < slot.close;
    if (open) {
      return {
        open: true,
        text: `Open today · ${slot.label}`,
      };
    }
    return {
      open: false,
      text: `Closed now · Opens ${weekday === "Sat" ? "Sun" : "tomorrow"} ${
        weekday === "Sat" ? "11:00 AM" : "10:00 AM"
      }`,
    };
  }

  function paint() {
    const status = statusLine();
    zones.forEach((el) => {
      el.classList.toggle("is-open", status.open);
      el.classList.toggle("is-closed", !status.open);
      const text = el.querySelector(".open-status-text");
      if (text) text.textContent = status.text;
    });
  }

  paint();
  setInterval(paint, 60_000);
})();
