(function () {
  "use strict";
  const SESSION_KEY = "gombe-environment-admin-demo-session";
  const ALLOWED_PAGES = [
    "dashboard.html",
    "services.html",
    "reports.html",
    "inspections.html",
    "projects.html",
    "programs.html",
    "forestry.html",
    "sanitation.html",
    "portal.html",
    "pages.html",
    "newsroom.html",
    "media.html",
    "departments.html",
    "staff.html",
    "analytics.html",
    "audit.html",
    "settings.html",
  ];
  const params = new URLSearchParams(window.location.search);
  const requestedPage = params.get("next");
  const nextPage = ALLOWED_PAGES.includes(requestedPage)
    ? requestedPage
    : "dashboard.html";
  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");
  const form = document.getElementById("loginForm");
  const message = document.getElementById("loginMessage");

  function showMessage(text) {
    if (!message) return;
    message.textContent = text;
    message.hidden = !text;
  }

  try {
    if (sessionStorage.getItem(SESSION_KEY) === "active") {
      window.location.replace(nextPage);
      return;
    }
  } catch (error) {
    // Storage can be unavailable in restricted previews; the demo still works in this page.
  }

  if (params.get("signedout") === "1") {
    showMessage(
      "You have signed out. Local demo records remain in this browser.",
    );
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    showMessage("");
    if (
      !emailInput.value.trim() ||
      !emailInput.checkValidity() ||
      !passwordInput.value
    ) {
      showMessage(
        "Enter a valid-format demo email and a non-empty demo password.",
      );
      return;
    }
    emailInput.value = "";
    passwordInput.value = "";
    try {
      sessionStorage.setItem(SESSION_KEY, "active");
    } catch (error) {
      /* demo-only fallback */
    }
    window.location.replace(nextPage);
  });
})();
