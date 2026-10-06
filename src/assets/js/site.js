// Small enhancements: the assessor tabs and copy buttons. The page works without this file.

for (const root of document.querySelectorAll("[data-assessor]")) {
  const tabs = [...root.querySelectorAll('[role="tab"]')];

  const select = (tab, focus) => {
    for (const t of tabs) {
      const on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute("aria-controls"));
      if (on) {
        panel.removeAttribute("data-hidden");
        replayMeters(panel);
      } else {
        panel.setAttribute("data-hidden", "");
      }
    }
    if (focus) tab.focus();
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(tab, false));
    tab.addEventListener("keydown", (e) => {
      const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
      if (e.key in keys) {
        e.preventDefault();
        select(tabs[(i + keys[e.key] + tabs.length) % tabs.length], true);
      } else if (e.key === "Home") {
        e.preventDefault();
        select(tabs[0], true);
      } else if (e.key === "End") {
        e.preventDefault();
        select(tabs[tabs.length - 1], true);
      }
    });
  });
}

// Refill the meter ticks so the change of assessment is visible.
function replayMeters(panel) {
  const meters = panel.querySelectorAll(".meter[data-level]");
  const levels = [...meters].map((m) => m.dataset.level);
  meters.forEach((m) => (m.dataset.level = "0"));
  requestAnimationFrame(() =>
    requestAnimationFrame(() => meters.forEach((m, i) => (m.dataset.level = levels[i])))
  );
}

for (const button of document.querySelectorAll("[data-copy]")) {
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      button.textContent = "Copied";
    } catch {
      button.textContent = "Select and copy";
    }
    setTimeout(() => (button.textContent = "Copy"), 1800);
  });
}
