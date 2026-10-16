(function () {
  "use strict";
  const SESSION_KEY = "gombe-environment-admin-demo-session";
  const ALLOWED_PAGES = new Set([
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
  ]);
  const mount = document.getElementById("adminMount");

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = function () {
        reject(new Error("Could not load " + src));
      };
      document.body.appendChild(script);
    });
  }

  async function start() {
    const page = window.location.pathname.split("/").pop() || "dashboard.html";
    if (!ALLOWED_PAGES.has(page)) {
      window.location.replace("dashboard.html");
      return;
    }
    let signedIn = false;
    try {
      signedIn = sessionStorage.getItem(SESSION_KEY) === "active";
    } catch (error) {
      /* restricted preview */
    }
    if (!signedIn) {
      window.location.replace("index.html?next=" + encodeURIComponent(page));
      return;
    }
    try {
      const response = await fetch("partials/admin-shell.html");
      if (!response.ok)
        throw new Error("Shared admin shell could not be loaded.");
      mount.innerHTML = await response.text();
      await loadScript("js/data.js");
      const pageModules = [
        "dashboard.js",
        "services.js",
        "reports.js",
        "inspections.js",
        "projects.js",
        "programs.js",
        "forestry.js",
        "sanitation.js",
        "portal.js",
        "pages.js",
        "newsroom.js",
        "media.js",
        "departments.js",
        "staff.js",
        "analytics.js",
        "audit.js",
        "settings.js",
        "search.js",
      ];
      await Promise.all(
        pageModules.map((file) => loadScript("js/pages/" + file)),
      );
      await loadScript("js/admin.js");
    } catch (error) {
      mount.innerHTML =
        '<main class="content"><section class="card card-pad"><h1>Could not open the admin workspace</h1><p>Serve this folder through a local HTTP server so shared HTML and JavaScript files can load.</p><p><a href="index.html">Return to sign in</a></p></section></main>';
      console.error(error);
    }
  }

  start();
})();
