// Small enhancements: the assessor tabs and copy buttons. The page works without this file.

// The tab roles are added here, not in the template, so that without
// JavaScript the page shows every example instead of buttons that do nothing.
for (const root of document.querySelectorAll("[data-assessor]")) {
  const list = root.querySelector(".choices");
  const tabs = [...list.querySelectorAll("button")];

  list.setAttribute("role", "tablist");
  list.setAttribute("aria-labelledby", "assessor-q");
  tabs.forEach((tab, i) => {
    const panel = document.getElementById(tab.getAttribute("aria-controls"));
    tab.setAttribute("role", "tab");
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", tab.id);
    panel.tabIndex = 0;
    tab.setAttribute("aria-selected", String(i === 0));
    tab.tabIndex = i === 0 ? 0 : -1;
  });

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
    if (focus) {
      tab.focus();
      tab.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
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

// When the clipboard is unavailable, select the command so the visitor can
// copy it themselves, and say so in the live region for screen readers.
const copyStatus = document.querySelector("[data-copy-status]");

for (const button of document.querySelectorAll("[data-copy]")) {
  button.addEventListener("click", async () => {
    let message;
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      button.textContent = "Copied";
      message = "Command copied.";
    } catch {
      const code = button.parentElement.querySelector("code");
      const range = document.createRange();
      range.selectNodeContents(code);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      button.textContent = "Selected";
      message = "Could not copy. The command is selected, so you can copy it yourself.";
    }
    if (copyStatus) copyStatus.textContent = message;
    setTimeout(() => (button.textContent = "Copy"), 1800);
  });
}

// Theme switcher in the masthead: auto (follow the system), light, dark; remembered per browser.
// The inline script in base.njk applies the saved choice early so the page never flashes.
(() => {
  const btn = document.getElementById("theme-toggle");
  const root = document.documentElement;
  const LABEL = { auto: "Auto", light: "Light", dark: "Dark" };
  const apply = mode => {
    if (mode === "auto") root.removeAttribute("data-theme"); else root.setAttribute("data-theme", mode);
    btn.dataset.mode = mode; btn.querySelector(".theme-label").textContent = LABEL[mode];
    btn.setAttribute("aria-label", mode === "auto" ? "Theme: follows your system. Click to change" : `Theme: ${mode}. Click to change`);
  };
  let mode = "auto";
  try { const saved = localStorage.getItem("ayeo-compass-theme"); if (saved === "light" || saved === "dark") mode = saved; } catch {}
  apply(mode);
  btn.addEventListener("click", () => {
    mode = mode === "auto" ? "light" : mode === "light" ? "dark" : "auto";
    apply(mode);
    try { if (mode === "auto") localStorage.removeItem("ayeo-compass-theme"); else localStorage.setItem("ayeo-compass-theme", mode); } catch {}
  });
})();
