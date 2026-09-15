/* Color-palette review tool for client sign-off (AWS-002-ADR-008). Remove before launch. */
(function () {
  "use strict";

  var STORAGE_KEY = "aws002-theme";
  var root = document.documentElement;

  var THEMES = [
    { id: "original", label: "Original", dots: ["#E0701A", "#F5B942", "#1F5BB5"] },
    { id: "citrus", label: "Citrus Carnival", dots: ["#FF470F", "#FFB400", "#0969D7"] },
    { id: "meadow", label: "Teal Meadow", dots: ["#0FBD89", "#FFD23F", "#046E9F"] },
    { id: "coral", label: "Coral Sky", dots: ["#FF2457", "#FFC72C", "#0561D1"] }
  ];

  function currentTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY) || "original";
    } catch (e) {
      return "original";
    }
  }

  function applyTheme(id, animate) {
    if (animate) {
      root.classList.add("theme-transitioning");
      window.setTimeout(function () {
        root.classList.remove("theme-transitioning");
      }, 240);
    }
    if (id && id !== "original") {
      root.setAttribute("data-theme", id);
    } else {
      root.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch (e) {
      /* private browsing or storage disabled — theme still applies for this page view */
    }
  }

  function build() {
    var host = document.querySelector("[data-theme-switcher]");
    if (!host) return;

    var toggle = host.querySelector(".theme-switcher-toggle");
    var panel = host.querySelector(".theme-switcher-panel");
    var optionsList = host.querySelector(".theme-switcher-options");
    if (!toggle || !panel || !optionsList) return;

    var active = currentTheme();

    THEMES.forEach(function (theme) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "theme-swatch";
      btn.setAttribute("data-theme-value", theme.id);
      btn.setAttribute("aria-pressed", theme.id === active ? "true" : "false");

      var dots = document.createElement("span");
      dots.className = "theme-swatch-dots";
      dots.setAttribute("aria-hidden", "true");
      theme.dots.forEach(function (color) {
        var dot = document.createElement("i");
        dot.style.setProperty("--c", color);
        dots.appendChild(dot);
      });

      btn.appendChild(dots);
      btn.appendChild(document.createTextNode(theme.label));

      btn.addEventListener("click", function () {
        if (btn.getAttribute("aria-pressed") === "true") return;
        applyTheme(theme.id, true);
        var swatches = optionsList.querySelectorAll(".theme-swatch");
        for (var i = 0; i < swatches.length; i++) {
          swatches[i].setAttribute("aria-pressed", swatches[i] === btn ? "true" : "false");
        }
      });

      optionsList.appendChild(btn);
    });

    function openPanel() {
      panel.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      document.addEventListener("click", onOutsideClick);
      document.addEventListener("keydown", onKeydown);
    }

    function closePanel() {
      panel.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.removeEventListener("click", onOutsideClick);
      document.removeEventListener("keydown", onKeydown);
    }

    function onOutsideClick(event) {
      if (!host.contains(event.target)) closePanel();
    }

    function onKeydown(event) {
      if (event.key === "Escape") {
        closePanel();
        toggle.focus();
      }
    }

    toggle.addEventListener("click", function () {
      if (panel.classList.contains("is-open")) {
        closePanel();
      } else {
        openPanel();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
