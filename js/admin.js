(function () {
  "use strict";
  const STORAGE_KEY = "gombe-environment-admin-prototype-v2";
  const DEMO_SESSION_KEY = "gombe-environment-admin-demo-session";
  const CURRENT_DATE = "Thursday, 15 October 2026";
  const iconPaths = {
    overview:
      '<rect x="3.5" y="3.5" width="7" height="7" rx="1.4"/><rect x="13.5" y="3.5" width="7" height="5" rx="1.4"/><rect x="13.5" y="11.5" width="7" height="9" rx="1.4"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.4"/>',
    requests:
      '<path d="M7 3.5h8l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 20V5a1.5 1.5 0 0 1 2-1.5Z"/><path d="M14.5 3.8V8h4M8.5 12h7M8.5 16h7"/>',
    reports: '<path d="M12 3 21 19H3L12 3Z"/><path d="M12 9v4M12 16.3v.2"/>',
    inspections:
      '<rect x="4" y="4" width="16" height="17" rx="2"/><path d="M8 4V2.5h8V4M8 10h8M8 14h5M8 18h3"/>',
    projects:
      '<path d="M3 7.5h7l2 2h9v9A2.5 2.5 0 0 1 18.5 21h-13A2.5 2.5 0 0 1 3 18.5v-11Z"/><path d="M3 7.5V5.8A1.8 1.8 0 0 1 4.8 4h4l2 2h5.4"/>',
    forestry:
      '<path d="M12 21v-8"/><path d="M12 14c-4.8 0-7-2.8-7-6 4.5 0 7 2.2 7 6Z"/><path d="M12 11c0-4.5 2.7-7 7-7 0 3.8-2.3 7-7 7Z"/><path d="M12 17c3.4 0 5.5-1.8 6-4.5-3.7 0-6 1.5-6 4.5Z"/>',
    sanitation:
      '<path d="M4 8h11l2 3h3v6H4V8Z"/><path d="M7 8V5h6v3M7 17a2 2 0 1 0 4 0M16 17a2 2 0 1 0 4 0"/><path d="M4 11h4"/>',
    pages: '<path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    newsroom:
      '<path d="M4 4h13a2 2 0 0 1 2 2v13H6a2 2 0 0 1-2-2V4Z"/><path d="M8 8h7M8 12h7M8 16h4M3 7v11a2 2 0 0 0 2 2"/>',
    departments:
      '<rect x="3" y="5" width="18" height="15" rx="2"/><path d="M8 5V3h8v2M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h8"/>',
    staff:
      '<path d="M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20"/><circle cx="9.5" cy="7" r="3.5"/><path d="M17 11a3.5 3.5 0 0 0 0-7M21 20v-1.5a4 4 0 0 0-3-3.87"/>',
    analytics:
      '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/><path d="m4 8 6-4 6 8 6-5"/>',
    audit:
      '<path d="M4 4h16v16H4z"/><path d="M8 8h8M8 12h8M8 16h5"/><path d="m16 16 1.5 1.5L21 14"/>',
    settings:
      '<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="m19.4 15 .1.1 1.1.9-1.3 2.3-1.4-.5a7.5 7.5 0 0 1-1.6.9l-.3 1.5h-2.7l-.3-1.5a7.5 7.5 0 0 1-1.6-.9l-1.4.5-1.3-2.3 1.1-.9a7.7 7.7 0 0 1 0-1.9l-1.1-.9L10 10l1.4.5a7.5 7.5 0 0 1 1.6-.9l.3-1.5H16l.3 1.5a7.5 7.5 0 0 1 1.6.9l1.4-.5 1.3 2.3-1.1.9a7.7 7.7 0 0 1-.1 1.8Z"/>',
    search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/>',
    bell: '<path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    external:
      '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"/>',
    chevron: '<path d="m7 10 5 5 5-5"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    calendar:
      '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M4 20h16"/>',
    filter: '<path d="M4 5h16l-6 7v6l-4 2v-8L4 5Z"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z"/>',
    leaf: '<path d="M20.5 3.5C11.8 3.2 5 5.4 4.1 11.2c-.5 3.1 1.6 5.4 4.6 5.3 5.9-.3 9.7-6.2 11.8-13Z"/><path d="M3.5 21c2.4-5.5 6-8.9 11.2-11.5"/>',
    shield:
      '<path d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z"/><path d="m9 12 2 2 4-4"/>',
    pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
    phone:
      '<path d="M7 3H5a2 2 0 0 0-2 2c0 9 7 16 16 16a2 2 0 0 0 2-2v-2l-4-2-2 2a13 13 0 0 1-6-6l2-2-2-4Z"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    warning: '<path d="M12 3 21 19H3L12 3Z"/><path d="M12 9v4M12 16.3v.2"/>',
    eye: '<path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.5"/>',
    recycle:
      '<path d="m7 7 2-3h5l2 3M17 7l2.5 4-2.5 4M17 15l-2 4h-5l-2-4M7 15l-2.5-4L7 7"/><path d="m5 11 2-1M17 7l-.5 2M10 19l1-2"/>',
    chart: '<path d="M4 19V5M4 19h17"/><path d="m7 15 4-4 3 2 6-7"/>',
    tree: '<path d="M12 21v-5"/><path d="m12 3 4 5h-2l4 5h-4v3H10v-3H6l4-5H8l4-5Z"/>',
    globe:
      '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    users:
      '<path d="M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20"/><circle cx="9.5" cy="7" r="3.5"/><path d="M17 10a3 3 0 1 0 0-6M21 20v-1.5a4 4 0 0 0-3-3.87"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    refresh:
      '<path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.6 9a7 7 0 0 1 11.6-2L20 12M4 12l2.8 5a7 7 0 0 0 11.6-2"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    logout:
      '<path d="M10 17l5-5-5-5M15 12H3"/><path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 10v6M14 10v6"/>',
    seedling:
      '<path d="M12 21v-8"/><path d="M12 13c-4.5 0-7-2.5-7-6.5 4.3 0 7 2.2 7 6.5Z"/><path d="M12 10.5c0-4.2 2.5-6.5 7-6.5 0 3.8-2.5 6.5-7 6.5Z"/><path d="M7 21h10"/>',
    dots: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    star: '<path d="m12 3 2.6 5.4 5.9.9-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.9L12 3Z"/>',
  };
  function icon(name, size) {
    return (
      '<svg width="' +
      (size || 18) +
      '" height="' +
      (size || 18) +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (iconPaths[name] || iconPaths.info) +
      "</svg>"
    );
  }
  const VIEW_ROUTES = {
    overview: "dashboard.html",
    requests: "services.html",
    programs: "programs.html",
    reports: "reports.html",
    inspections: "inspections.html",
    projects: "projects.html",
    forestry: "forestry.html",
    sanitation: "sanitation.html",
    portal: "portal.html",
    pages: "pages.html",
    newsroom: "newsroom.html",
    media: "media.html",
    departments: "departments.html",
    staff: "staff.html",
    analytics: "analytics.html",
    audit: "audit.html",
    settings: "settings.html",
  };
  const navGroups = [
    {
      label: "Workspace",
      items: [{ id: "overview", label: "Overview", icon: "overview" }],
    },
    {
      label: "Operations",
      items: [
        {
          id: "requests",
          label: "Service requests",
          icon: "requests",
          badge: true,
        },
        { id: "reports", label: "Environmental reports", icon: "reports" },
        {
          id: "inspections",
          label: "Inspections & enforcement",
          icon: "inspections",
        },
        { id: "projects", label: "Projects", icon: "projects" },
        { id: "programs", label: "Programmes", icon: "overview" },
        { id: "forestry", label: "Forestry & nurseries", icon: "forestry" },
        { id: "sanitation", label: "Waste & sanitation", icon: "sanitation" },
      ],
    },
    {
      label: "Public website",
      items: [
        { id: "portal", label: "Portal manager", icon: "globe" },
        { id: "pages", label: "Website pages", icon: "pages" },
        { id: "newsroom", label: "Newsroom", icon: "newsroom" },
        { id: "media", label: "Media library", icon: "eye" },
        { id: "departments", label: "Departments", icon: "departments" },
      ],
    },
    {
      label: "Administration",
      items: [
        { id: "staff", label: "Staff & access", icon: "staff" },
        { id: "analytics", label: "Analytics & reports", icon: "analytics" },
        { id: "audit", label: "Audit log", icon: "audit" },
        { id: "settings", label: "Settings & privacy", icon: "settings" },
      ],
    },
  ];
  const DEFAULT_DATA = window.GOMBE_DEFAULT_DATA;
  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return clone(DEFAULT_DATA);
      const saved = JSON.parse(raw);
      const base = clone(DEFAULT_DATA);
      Object.keys(base).forEach(function (key) {
        if (key === "settings")
          base.settings = Object.assign(
            {},
            base.settings,
            saved.settings || {},
          );
        else if (key === "portal")
          base.portal = Object.assign({}, base.portal, saved.portal || {});
        else if (Array.isArray(saved[key])) base[key] = saved[key];
      });
      return base;
    } catch (e) {
      return clone(DEFAULT_DATA);
    }
  }
  let state = loadState();
  let activeView = document.body.dataset.view || "overview";
  let chartMode = "applications";
  let globalQuery = "";
  let pendingImageData = null;
  let pendingImageName = "";
  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[c];
    });
  }
  function mediaById(id) {
    return (
      state.media.find(function (m) {
        return m.id === id;
      }) ||
      state.media[0] ||
      null
    );
  }
  function mediaSrc(item) {
    if (!item) return "assets/img/hero-1.jpg";
    const raw = item.dataUrl || item.src || "";
    if (/^data:image\/(?:jpeg|png|webp);base64,/i.test(raw)) return raw;
    if (/^assets\/img\/[a-z0-9._-]+$/i.test(raw)) return raw;
    return "assets/img/hero-1.jpg";
  }
  function mediaSelectOptions(selected) {
    return state.media.map(function (m) {
      return { value: m.id, label: m.title + " · " + m.category };
    });
  }
  function crestSvg(className) {
    return (
      '<svg class="' +
      esc(className || "") +
      '" viewBox="0 0 64 64" role="img" aria-label="Gombe State coat of arms"><defs><linearGradient id="portalCrestGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e9d5c"/><stop offset="1" stop-color="#06391f"/></linearGradient></defs><path d="M32 2 60 11v22c0 15-11.7 25-28 29C15.7 58 4 48 4 33V11z" fill="url(#portalCrestGradient)" stroke="#d9a520" stroke-width="2.5"/><circle cx="32" cy="20" r="6.2" fill="#f0c14b"/><path d="M32 50V31" stroke="#f0c14b" stroke-width="3" stroke-linecap="round"/><path d="M32 33c-7 0-12-4.6-12-10 4 1.6 8.4 2 12 4.4 3.6-2.4 8-2.8 12-4.4 0 5.4-5 10-12 10z" fill="#e7f4ec"/><path d="M20 50h24" stroke="#d9a520" stroke-width="3" stroke-linecap="round"/></svg>'
    );
  }
  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return true;
    } catch (e) {
      return false;
    }
  }
  function signOutDemo() {
    closeModal();
    addActivity(
      "Demo session ended",
      "Local demo access closed; sample data remains in this browser",
    );
    saveState();
    try {
      sessionStorage.removeItem(DEMO_SESSION_KEY);
    } catch (e) {
      /* no-op in restricted previews */
    }
    window.location.replace("index.html?signedout=1");
  }
  function currentNavTitle(id) {
    for (const group of navGroups) {
      const match = group.items.find(function (item) {
        return item.id === id;
      });
      if (match) return match.label;
    }
    return id === "search" ? "Search results" : "Workspace";
  }
  function renderNav() {
    const nav = document.getElementById("sidebarNav");
    nav.innerHTML = navGroups
      .map(function (group) {
        return (
          '<div class="nav-group"><div class="nav-heading">' +
          esc(group.label) +
          '</div><div class="nav-list">' +
          group.items
            .map(function (item) {
              const count = item.badge
                ? state.applications.filter(function (a) {
                    return a.status === "New";
                  }).length
                : 0;
              return (
                '<a class="nav-link ' +
                (activeView === item.id ? "active" : "") +
                '" href="' +
                esc(VIEW_ROUTES[item.id] || "#") +
                '" data-view="' +
                esc(item.id) +
                '" ' +
                (activeView === item.id ? 'aria-current="page"' : "") +
                ">" +
                icon(item.icon, 17) +
                '<span class="nav-label">' +
                esc(item.label) +
                "</span>" +
                (count ? '<span class="nav-count">' + count + "</span>" : "") +
                "</a>"
              );
            })
            .join("") +
          "</div></div>"
        );
      })
      .join("");
  }
  function setActiveView(view) {
    const route = VIEW_ROUTES[view];
    if (route && document.body.dataset.view !== view) {
      window.location.href = route;
      return;
    }
    activeView = view;
    document.body.classList.remove("sidebar-open");
    document.getElementById("breadcrumb").textContent = currentNavTitle(view);
    renderNav();
    renderContent();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function pageHeader(eyebrow, title, description, actionHtml) {
    return (
      '<div class="page-header"><div class="page-header-text"><div class="eyebrow"><span class="eyebrow-dot"></span>' +
      esc(eyebrow) +
      "</div><h1>" +
      esc(title) +
      "</h1><p>" +
      esc(description) +
      '</p></div><div class="header-actions">' +
      (actionHtml || "") +
      "</div></div>"
    );
  }
  function localBadge() {
    return '<span class="local-badge"><span class="dot"></span>Prototype · local only</span>';
  }
  function metricCard(name, value, helper, iconName, tone, trend, warn) {
    return (
      '<article class="metric-card"><div class="metric-top"><span class="metric-icon ' +
      esc(tone) +
      '">' +
      icon(iconName, 16) +
      '</span><span class="metric-trend ' +
      (warn ? "warn" : "") +
      '">' +
      esc(trend || "Demo") +
      '</span></div><p class="metric-label">' +
      esc(name) +
      '</p><div class="metric-value">' +
      esc(value) +
      '</div><div class="metric-foot">' +
      esc(helper) +
      "</div></article>"
    );
  }
  function moduleStat(label, value, note) {
    return (
      '<div class="module-stat"><span class="label">' +
      esc(label) +
      "</span><strong>" +
      esc(value) +
      "</strong><span>" +
      esc(note) +
      "</span></div>"
    );
  }
  function statusClass(status) {
    const s = String(status || "").toLowerCase();
    if (/approved|resolved|on track|active|published|complete/.test(s))
      return "green";
    if (/new|dispatched|scheduled|in progress/.test(s)) return "blue";
    if (/awaiting|review|attention|due|planned/.test(s)) return "amber";
    if (/urgent|overdue|rejected|suspended/.test(s)) return "red";
    if (/draft|snapshot|publisher/.test(s)) return "purple";
    return "neutral";
  }
  function pill(status, outline) {
    return (
      '<span class="pill ' +
      (outline ? "pill-outline" : "pill-" + statusClass(status)) +
      '">' +
      esc(status) +
      "</span>"
    );
  }
  function deleteButton(type, id, label) {
    return (
      '<button class="icon-button danger-icon" type="button" data-action="confirm-delete" data-record-type="' +
      esc(type) +
      '" data-id="' +
      esc(id) +
      '" aria-label="Delete demo record: ' +
      esc(label) +
      '" title="Delete demo record">' +
      icon("trash", 14) +
      "</button>"
    );
  }
  function priorityPill(priority) {
    const cls =
      String(priority).toLowerCase() === "urgent" ||
      String(priority).toLowerCase() === "high"
        ? "pill-red"
        : String(priority).toLowerCase() === "medium"
          ? "pill-amber"
          : "pill-neutral";
    return '<span class="pill ' + cls + '">' + esc(priority) + "</span>";
  }
  function numberFormat(n) {
    return new Intl.NumberFormat("en-NG").format(Number(n || 0));
  }
  function safeRows(rows, colSpan, message) {
    return (
      rows ||
      '<tr><td colspan="' +
        colSpan +
        '" class="table-empty">' +
        esc(message || "No records match these filters.") +
        "</td></tr>"
    );
  }
  function trendChart(values, stroke, ariaLabel) {
    const w = 700,
      h = 180,
      left = 22,
      right = 10,
      top = 12,
      bottom = 27;
    const max = Math.max.apply(null, values) + 3,
      min = Math.max(0, Math.min.apply(null, values) - 3);
    const plotH = h - top - bottom,
      plotW = w - left - right;
    const points = values.map(function (value, i) {
      const x = left + (plotW / (values.length - 1)) * i;
      const y = top + plotH - ((value - min) / (max - min || 1)) * plotH;
      return [x, y];
    });
    const line = points
      .map(function (p, i) {
        return (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1);
      })
      .join(" ");
    const area =
      line +
      " L " +
      points[points.length - 1][0].toFixed(1) +
      " " +
      (h - bottom) +
      " L " +
      points[0][0].toFixed(1) +
      " " +
      (h - bottom) +
      " Z";
    const days = [
      "09 Oct",
      "10 Oct",
      "11 Oct",
      "12 Oct",
      "13 Oct",
      "14 Oct",
      "15 Oct",
    ];
    const grids = [0, 1, 2, 3]
      .map(function (i) {
        const y = top + (plotH / 3) * i;
        return (
          '<line x1="' +
          left +
          '" y1="' +
          y.toFixed(1) +
          '" x2="' +
          (w - right) +
          '" y2="' +
          y.toFixed(1) +
          '" stroke="#edf2ee" stroke-dasharray="3 5"/>'
        );
      })
      .join("");
    const labels = points
      .map(function (p, i) {
        return (
          '<text x="' +
          p[0].toFixed(1) +
          '" y="' +
          (h - 7) +
          '" text-anchor="middle" fill="#9aa79f" font-size="9">' +
          days[i] +
          "</text>"
        );
      })
      .join("");
    const dots = points
      .map(function (p, i) {
        return (
          '<circle cx="' +
          p[0].toFixed(1) +
          '" cy="' +
          p[1].toFixed(1) +
          '" r="' +
          (i === points.length - 1 ? "4" : "2.5") +
          '" fill="' +
          stroke +
          '" stroke="#fff" stroke-width="2"/>'
        );
      })
      .join("");
    return (
      '<svg viewBox="0 0 ' +
      w +
      " " +
      h +
      '" role="img" aria-label="' +
      esc(ariaLabel) +
      '"><defs><linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="' +
      stroke +
      '" stop-opacity=".16"/><stop offset="100%" stop-color="' +
      stroke +
      '" stop-opacity=".005"/></linearGradient></defs>' +
      grids +
      '<path d="' +
      area +
      '" fill="url(#areaFill)"/><path d="' +
      line +
      '" fill="none" stroke="' +
      stroke +
      '" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      dots +
      labels +
      "</svg>"
    );
  }
  function renderVisualHighlights() {
    const highlights = [
      {
        mediaId: "MED-01",
        label: "Afforestation",
        title: "Community tree planting",
      },
      {
        mediaId: "MED-02",
        label: "Land restoration",
        title: "Erosion control works",
      },
      {
        mediaId: "MED-04",
        label: "Circular economy",
        title: "Materials recovery",
      },
    ];
    return (
      '<div class="visual-highlights" aria-label="Photo highlights from the Ministry website">' +
      highlights
        .map(function (h) {
          const m = mediaById(h.mediaId);
          return (
            '<button class="visual-card" type="button" data-view="projects"><img src="' +
            esc(mediaSrc(m)) +
            '" alt="' +
            esc(m ? m.alt : h.title) +
            '" loading="lazy"><span class="visual-card-copy"><small>' +
            esc(h.label) +
            "</small><strong>" +
            esc(h.title) +
            "</strong></span></button>"
          );
        })
        .join("") +
      "</div>"
    );
  }
  function filterToolbar(group, placeholder, extraSelects, resultId) {
    return (
      '<div class="toolbar"><div class="toolbar-left"><label class="filter-wrap">' +
      icon("search", 14) +
      '<input class="filter-input" type="search" id="' +
      group +
      'Search" data-filter-group="' +
      group +
      '" placeholder="' +
      esc(placeholder) +
      '" aria-label="' +
      esc(placeholder) +
      '"></label>' +
      (extraSelects || "") +
      '</div><div class="toolbar-right"><span class="filter-result" id="' +
      resultId +
      '"></span></div></div>'
    );
  }
  function searchResults(q) {
    const needle = String(q || "")
      .toLowerCase()
      .trim();
    if (!needle)
      return '<div class="card card-pad"><p style="margin:0;color:#83928a;font-size:11px">Enter a name, reference number, service, project or page title to search the demo workspace.</p></div>';
    const results = [];
    state.applications.forEach(function (x) {
      if (
        [x.id, x.type, x.applicant, x.lga, x.status]
          .join(" ")
          .toLowerCase()
          .includes(needle)
      )
        results.push({
          type: "Service request",
          title: x.type,
          meta: x.id + " · " + x.lga + " LGA · " + x.status,
          icon: "requests",
          action: "open-app",
          id: x.id,
        });
    });
    state.reports.forEach(function (x) {
      if (
        [x.id, x.category, x.location, x.lga, x.status]
          .join(" ")
          .toLowerCase()
          .includes(needle)
      )
        results.push({
          type: "Environmental report",
          title: x.category,
          meta: x.id + " · " + x.lga + " LGA · " + x.status,
          icon: "reports",
          action: "open-report",
          id: x.id,
        });
    });
    state.projects.forEach(function (x) {
      if (
        [x.id, x.title, x.theme, x.lga].join(" ").toLowerCase().includes(needle)
      )
        results.push({
          type: "Project",
          title: x.title,
          meta: x.theme + " · " + x.progress + "% demo progress",
          icon: "projects",
          action: "open-project",
          id: x.id,
        });
    });
    state.posts.forEach(function (x) {
      if (
        [x.id, x.title, x.category, x.author]
          .join(" ")
          .toLowerCase()
          .includes(needle)
      )
        results.push({
          type: "Newsroom",
          title: x.title,
          meta: x.category + " · " + x.status,
          icon: "newsroom",
          action: "edit-post",
          id: x.id,
        });
    });
    state.pages.forEach(function (x) {
      if (
        [x.title, x.route, x.summary].join(" ").toLowerCase().includes(needle)
      )
        results.push({
          type: "Website page",
          title: x.title,
          meta: x.route + " · " + x.status,
          icon: "pages",
          action: "edit-page",
          id: x.id,
        });
    });
    state.departments.forEach(function (x) {
      if ([x.name, x.focus, x.queue].join(" ").toLowerCase().includes(needle))
        results.push({
          type: "Department",
          title: x.name,
          meta: x.director + " · " + x.queue,
          icon: "departments",
          action: "edit-department",
          id: x.id,
        });
    });
    state.media.forEach(function (x) {
      if (
        [x.title, x.category, x.alt, x.caption, x.usage]
          .join(" ")
          .toLowerCase()
          .includes(needle)
      )
        results.push({
          type: "Media asset",
          title: x.title,
          meta: x.category + " · " + (x.usage || "Unassigned"),
          icon: "eye",
          action: "edit-media",
          id: x.id,
        });
    });
    if (!results.length)
      return (
        '<div class="card card-pad"><p style="margin:0;color:#83928a;font-size:11px">No demo records matched “' +
        esc(q) +
        "”. Try a different phrase.</p></div>"
      );
    return (
      '<div class="search-results">' +
      results
        .slice(0, 30)
        .map(function (r) {
          return (
            '<button class="search-result" type="button" data-action="' +
            esc(r.action) +
            '" data-id="' +
            esc(r.id) +
            '"><span class="search-result-icon">' +
            icon(r.icon, 16) +
            '</span><span class="search-result-copy"><strong>' +
            esc(r.title) +
            "</strong><span>" +
            esc(r.meta) +
            '</span></span><span class="search-result-type">' +
            esc(r.type) +
            "</span></button>"
          );
        })
        .join("") +
      "</div>"
    );
  }
  function pageRenderContext() {
    return {
      chartMode,
      crestSvg,
      deleteButton,
      esc,
      filterToolbar,
      globalQuery,
      icon,
      localBadge,
      mediaById,
      mediaSrc,
      metricCard,
      moduleStat,
      numberFormat,
      pageHeader,
      pill,
      priorityPill,
      renderVisualHighlights,
      safeRows,
      searchResults,
      state,
      trendChart,
    };
  }
  function renderContent() {
    const renderer =
      window.GombePageModules[activeView] || window.GombePageModules.overview;
    document.getElementById("mainContent").innerHTML =
      renderer(pageRenderContext());
    if (["requests", "reports", "newsroom", "audit"].includes(activeView))
      applyFilters(activeView);
  }
  function applyFilters(group) {
    const searchEl = document.getElementById(group + "Search");
    if (!searchEl) return;
    const query = searchEl.value.trim().toLowerCase();
    const statusEl = document.getElementById(group + "Status");
    const kindEl = document.getElementById(group + "Kind");
    const status = statusEl ? statusEl.value.toLowerCase() : "";
    const kind = kindEl ? kindEl.value.toLowerCase() : "";
    const rowClass =
      group === "requests"
        ? ".request-row"
        : group === "reports"
          ? ".report-row"
          : group === "newsroom"
            ? ".newsroom-row"
            : ".audit-row";
    const rows = Array.from(document.querySelectorAll(rowClass));
    let visible = 0;
    rows.forEach(function (row) {
      const matches =
        (!query || (row.dataset.search || "").includes(query)) &&
        (!status || (row.dataset.status || "") === status) &&
        (!kind || (row.dataset.kind || "") === kind);
      row.hidden = !matches;
      if (matches) visible++;
    });
    const count = document.getElementById(group + "Result");
    if (count) count.textContent = visible + " of " + rows.length + " shown";
  }
  function openModal(title, subtitle, body, footer, options) {
    options = options || {};
    const root = document.getElementById("modalRoot");
    root.innerHTML =
      '<div class="modal-backdrop" data-action="modal-backdrop"><section class="modal ' +
      (options.wide ? "modal-wide" : "") +
      '" role="dialog" aria-modal="true" aria-labelledby="modalTitle"><div class="modal-head"><div><span class="modal-kicker">' +
      esc(options.kicker || "Gombe Environment · prototype") +
      '</span><h2 id="modalTitle">' +
      esc(title) +
      "</h2>" +
      (subtitle ? "<p>" + esc(subtitle) + "</p>" : "") +
      '</div><button class="modal-close" type="button" data-action="close-modal" aria-label="Close dialog">' +
      icon("close", 15) +
      '</button></div><div class="modal-body">' +
      body +
      "</div>" +
      (footer ? '<div class="modal-footer">' + footer + "</div>" : "") +
      "</section></div>";
    document.body.classList.add("modal-open");
    const focusable = root.querySelector("input,select,textarea,button");
    if (focusable)
      setTimeout(function () {
        focusable.focus();
      }, 0);
  }
  function closeModal() {
    document.getElementById("modalRoot").innerHTML = "";
    document.body.classList.remove("modal-open");
  }
  function showToast(message, error) {
    const region = document.getElementById("toastRegion");
    const el = document.createElement("div");
    el.className = "toast" + (error ? " error" : "");
    el.innerHTML =
      icon(error ? "warning" : "check", 15) +
      "<span>" +
      esc(message) +
      "</span>";
    region.appendChild(el);
    setTimeout(function () {
      el.remove();
    }, 3600);
  }
  function addActivity(action, subject, actor) {
    const time = new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    state.activities.unshift({
      id: "A-" + Date.now(),
      action: action,
      subject: subject,
      actor: actor || "Environment Admin (demo)",
      time: "Today · " + time,
    });
    state.activities = state.activities.slice(0, 50);
  }
  function commit(message, action, subject) {
    if (action) addActivity(action, subject || message);
    const saved = saveState();
    document.getElementById("breadcrumb").textContent =
      currentNavTitle(activeView);
    renderNav();
    renderContent();
    if (!saved) showToast(message + " (not persisted by this browser)", true);
    else showToast(message + " · saved in this browser only");
  }
  function optionsHtml(items, selected) {
    return items
      .map(function (x) {
        const v = typeof x === "string" ? x : x.value;
        const label = typeof x === "string" ? x : x.label;
        return (
          '<option value="' +
          esc(v) +
          '" ' +
          (String(v) === String(selected) ? "selected" : "") +
          ">" +
          esc(label) +
          "</option>"
        );
      })
      .join("");
  }
  function field(label, name, value, type, hint, required) {
    const id = "field-" + name;
    const inputType = type || "text";
    let html;
    if (inputType === "textarea")
      html =
        '<textarea id="' +
        id +
        '" name="' +
        esc(name) +
        '" ' +
        (required ? "required" : "") +
        ">" +
        esc(value || "") +
        "</textarea>";
    else
      html =
        '<input id="' +
        id +
        '" type="' +
        esc(inputType) +
        '" name="' +
        esc(name) +
        '" value="' +
        esc(value || "") +
        '" ' +
        (required ? "required" : "") +
        ">";
    return (
      '<div class="field"><label for="' +
      id +
      '">' +
      esc(label) +
      (required ? ' <span style="color:#b44c46">*</span>' : "") +
      "</label>" +
      html +
      (hint ? "<small>" + esc(hint) + "</small>" : "") +
      "</div>"
    );
  }
  function selectField(label, name, items, selected, hint) {
    const id = "field-" + name;
    return (
      '<div class="field"><label for="' +
      id +
      '">' +
      esc(label) +
      '</label><select id="' +
      id +
      '" name="' +
      esc(name) +
      '">' +
      optionsHtml(items, selected) +
      "</select>" +
      (hint ? "<small>" + esc(hint) + "</small>" : "") +
      "</div>"
    );
  }
  function detailCell(label, value) {
    return (
      '<div class="detail-cell"><span>' +
      esc(label) +
      "</span><strong>" +
      esc(value || "—") +
      "</strong></div>"
    );
  }
  const DELETABLE_COLLECTIONS = {
    application: "applications",
    report: "reports",
    inspection: "inspections",
    project: "projects",
    post: "posts",
    media: "media",
  };
  function demoRecord(type, id) {
    const collection = DELETABLE_COLLECTIONS[type];
    return collection
      ? state[collection].find(function (item) {
          return String(item.id) === String(id);
        })
      : null;
  }
  function demoRecordLabel(type, item) {
    if (!item) return "Demo record";
    if (type === "application") return item.id + " · " + item.type;
    if (type === "report") return item.id + " · " + item.category;
    if (type === "inspection") return item.id + " · " + item.type;
    if (type === "project" || type === "post" || type === "media")
      return item.id + " · " + item.title;
    return item.id || "Demo record";
  }
  function confirmDeleteDemo(type, id) {
    const item = demoRecord(type, id);
    if (!item) {
      showToast("That demo record is no longer available.", true);
      return;
    }
    if (
      type === "post" &&
      !["Draft", "Ready for review"].includes(item.status)
    ) {
      showToast(
        "Public-site snapshot stories are retained; archive them through the publishing workflow.",
        true,
      );
      return;
    }
    if (type === "media") {
      if (item.source !== "Local upload") {
        showToast(
          "Bundled public-site images are retained in this demo library.",
          true,
        );
        return;
      }
      const assignedToHero = state.portal.heroMediaId === item.id;
      const assignedToProject = state.projects.some(function (project) {
        return project.imageMediaId === item.id;
      });
      if (assignedToHero || assignedToProject) {
        showToast(
          "This image is in use. Change its assignments before removing it.",
          true,
        );
        return;
      }
    }
    const label = demoRecordLabel(type, item);
    const body =
      '<div class="detail-banner warning">' +
      icon("warning", 14) +
      '<span>This removes only a synthetic record from this browser’s demo workspace; it does not affect the public website. In a real Ministry system, follow records-retention rules and prefer archive/close actions over hard deletion.</span></div><div class="detail-cell"><span>Record to remove</span><strong>' +
      esc(label) +
      "</strong></div>";
    const footer =
      '<div class="modal-footer-left"><span class="pill pill-outline">Local demo only</span></div><div class="modal-footer-right"><button class="button button-secondary" type="button" data-action="close-modal">Cancel</button><button class="button button-danger" type="button" data-action="delete-demo-record" data-record-type="' +
      esc(type) +
      '" data-id="' +
      esc(id) +
      '">' +
      icon("trash", 14) +
      "Delete demo record</button></div>";
    openModal(
      "Delete this demo record?",
      "This action cannot be undone in the current browser.",
      body,
      footer,
      { kicker: "Confirm deletion" },
    );
  }
  function deleteDemoRecord(type, id) {
    const collection = DELETABLE_COLLECTIONS[type];
    if (!collection) return;
    const index = state[collection].findIndex(function (item) {
      return String(item.id) === String(id);
    });
    if (index < 0) {
      closeModal();
      showToast("That demo record is no longer available.", true);
      return;
    }
    const item = state[collection][index];
    const label = demoRecordLabel(type, item);
    state[collection].splice(index, 1);
    addActivity("Demo record deleted", label + " · local prototype only");
    saveState();
    closeModal();
    renderNav();
    renderContent();
    showToast("Demo record deleted from this browser");
  }
  function appDetail(id) {
    const a = state.applications.find(function (x) {
      return x.id === id;
    });
    if (!a) return;
    const body =
      '<div class="detail-banner">' +
      icon("lock", 14) +
      '<span>Sample service request. In a live system, verify submissions and payment receipts only through approved channels; do not store unnecessary personal data in notes.</span></div><div class="detail-grid">' +
      detailCell("Reference", a.id) +
      detailCell("Service category", a.type) +
      detailCell("Applicant type", a.applicant) +
      detailCell("Local government", a.lga) +
      detailCell("Received", a.submitted) +
      detailCell("Priority", a.priority) +
      '</div><div class="detail-cell" style="margin-bottom:14px"><span>Request summary</span><strong>' +
      esc(a.summary) +
      '</strong></div><form id="modalForm" data-form="app-update" data-id="' +
      esc(a.id) +
      '"><div class="form-grid">' +
      selectField(
        "Workflow status",
        "status",
        [
          "New",
          "Under review",
          "Awaiting documents",
          "Approved",
          "Scheduled",
          "Closed",
        ],
        a.status,
      ) +
      field("Assigned desk / officer", "assignee", a.assignee) +
      field(
        "Internal note",
        "note",
        "",
        "textarea",
        "Keep the note factual and limited to what the next officer needs. Do not add citizen contact details.",
      ) +
      "</div></form>";
    const footer =
      '<div class="modal-footer-left"><button class="button button-ghost" type="button" data-action="assign-app" data-id="' +
      esc(a.id) +
      '">' +
      icon("staff", 14) +
      'Assign to me</button></div><div class="modal-footer-right"><button class="button button-secondary" type="button" data-action="close-modal">Cancel</button><button class="button button-primary" type="submit" form="modalForm">Save local update</button></div>';
    openModal(
      "Service request · " + a.id,
      a.type + " · " + a.lga + " LGA",
      body,
      footer,
      { wide: true, kicker: "Service desk" },
    );
  }
  function reportDetail(id) {
    const r = state.reports.find(function (x) {
      return x.id === id;
    });
    if (!r) return;
    const body =
      '<div class="detail-banner warning">' +
      icon("shield", 14) +
      '<span>Reporter identity is masked in this demo. In production, restrict access to identifying details, record every access and follow the approved retention schedule. For immediate danger call the official hotline.</span></div><div class="detail-grid">' +
      detailCell("Reference", r.id) +
      detailCell("Incident category", r.category) +
      detailCell("Location", r.location) +
      detailCell("Local government", r.lga) +
      detailCell("Received", r.received) +
      detailCell("Severity", r.severity) +
      '</div><div class="detail-cell" style="margin-bottom:14px"><span>Report summary</span><strong>' +
      esc(r.summary) +
      '</strong></div><form id="modalForm" data-form="report-update" data-id="' +
      esc(r.id) +
      '"><div class="form-grid">' +
      selectField(
        "Response status",
        "status",
        ["New", "Under review", "Dispatched", "Resolved", "Closed"],
        r.status,
      ) +
      field("Assigned response team", "team", r.team) +
      field(
        "Operational note",
        "note",
        "",
        "textarea",
        "Record only verified, necessary details. Do not enter reporter identity in this prototype.",
      ) +
      "</div></form>";
    const footer =
      '<div class="modal-footer-left"><span class="pill pill-outline">Confidential sample case</span></div><div class="modal-footer-right"><button class="button button-secondary" type="button" data-action="close-modal">Cancel</button><button class="button button-primary" type="submit" form="modalForm">Save case update</button></div>';
    openModal(
      "Environmental report · " + r.id,
      r.category + " · " + r.lga + " LGA",
      body,
      footer,
      { wide: true, kicker: "Confidential response workflow" },
    );
  }
  function inspectionDetail(id) {
    const i = state.inspections.find(function (x) {
      return x.id === id;
    });
    if (!i) return;
    const body =
      '<div class="detail-grid">' +
      detailCell("Reference", i.id) +
      detailCell("Inspection type", i.type) +
      detailCell("Site", i.site) +
      detailCell("Local government", i.lga) +
      detailCell("Due date", i.due) +
      detailCell("Priority", i.priority) +
      '</div><form id="modalForm" data-form="inspection-update" data-id="' +
      esc(i.id) +
      '"><div class="form-grid">' +
      selectField(
        "Status",
        "status",
        [
          "Planned",
          "Scheduled",
          "In progress",
          "Needs report",
          "Completed",
          "Cancelled",
        ],
        i.status,
      ) +
      field("Technical lead", "lead", i.lead) +
      field(
        "Field note",
        "note",
        "",
        "textarea",
        "Use factual observations; distinguish observed conditions from reported allegations.",
      ) +
      "</div></form>";
    const footer =
      '<div class="modal-footer-left"><span class="pill pill-outline">Demo schedule · no dispatch sent</span></div><div class="modal-footer-right"><button class="button button-secondary" type="button" data-action="close-modal">Cancel</button><button class="button button-primary" type="submit" form="modalForm">Save local update</button></div>';
    openModal(
      "Inspection · " + i.id,
      i.type + " · " + i.lga + " LGA",
      body,
      footer,
      { wide: true, kicker: "Field operations" },
    );
  }
  function projectEditor(id) {
    const p = state.projects.find(function (x) {
      return x.id === id;
    });
    if (!p) return;
    const body =
      '<div class="detail-banner">' +
      icon("info", 14) +
      '<span>Portfolio values are illustrative. Confirm milestone, budget, location and progress using the authorised monitoring source before publishing.</span></div><form id="modalForm" data-form="project-update" data-id="' +
      esc(p.id) +
      '"><div class="form-grid">' +
      field("Programme name", "title", p.title, "text", "", true) +
      field("Lead department / partner", "lead", p.lead, "text", "", true) +
      field("Theme", "theme", p.theme) +
      selectField(
        "Cover image",
        "imageMediaId",
        mediaSelectOptions(p.imageMediaId),
        p.imageMediaId,
      ) +
      field("Primary area", "lga", p.lga) +
      field(
        "Progress (%)",
        "progress",
        p.progress,
        "number",
        "Illustrative only; enter a validated value in a production system.",
      ) +
      selectField(
        "Status",
        "status",
        ["On track", "In progress", "Needs attention", "Paused", "Completed"],
        p.status,
      ) +
      field("Next milestone", "milestone", p.milestone, "text", "", true) +
      field(
        "Summary",
        "summary",
        p.summary,
        "textarea",
        "Keep public copy evidence-based and accessible.",
      ) +
      "</div></form>";
    const footer =
      '<div class="modal-footer-left"><span class="pill pill-outline">Local draft only</span></div><div class="modal-footer-right"><button class="button button-secondary" type="button" data-action="close-modal">Cancel</button><button class="button button-primary" type="submit" form="modalForm">Save local changes</button></div>';
    openModal("Manage programme", p.title, body, footer, {
      wide: true,
      kicker: "Projects & programmes",
    });
  }
  function pageEditor(id) {
    const p = state.pages.find(function (x) {
      return x.id === id;
    });
    if (!p) return;
    const body =
      '<div class="detail-banner warning">' +
      icon("info", 14) +
      '<span>Changes made here are stored only as a local prototype draft. They will not update the live GitHub Pages website.</span></div><form id="modalForm" data-form="page-update" data-id="' +
      esc(p.id) +
      '"><div class="form-grid">' +
      field("Page title", "title", p.title, "text", "", true) +
      field(
        "Page route",
        "route",
        p.route,
        "text",
        "Route is informational; this editor does not change site files.",
      ) +
      field("Content owner", "owner", p.owner) +
      selectField(
        "Draft workflow state",
        "status",
        ["Public snapshot", "Local draft", "Ready for review"],
        p.status,
      ) +
      field(
        "Page summary / intro",
        "summary",
        p.summary,
        "textarea",
        "Keep language plain, inclusive and accurate.",
      ) +
      field(
        "Search title",
        "seo",
        p.seo,
        "textarea",
        "For production, review title length and plain-language accessibility.",
      ) +
      "</div></form>";
    const footer =
      '<div class="modal-footer-left"><span class="pill pill-outline">No live publishing connection</span></div><div class="modal-footer-right"><button class="button button-secondary" type="button" data-action="close-modal">Cancel</button><button class="button button-primary" type="submit" form="modalForm">Save local draft</button></div>';
    openModal(
      "Edit page draft · " + p.title,
      p.route + " · public-site snapshot",
      body,
      footer,
      { wide: true, kicker: "Website content" },
    );
  }
  function portalEditor() {
    const p = state.portal;
    const body =
      '<div class="detail-banner warning">' +
      icon("info", 14) +
      '<span>These edits update only the local homepage preview. The live GitHub Pages site remains unchanged until an authorised deployment workflow publishes reviewed files.</span></div><form id="modalForm" data-form="portal-update"><div class="form-grid">' +
      field(
        "Hero badge",
        "heroBadge",
        p.heroBadge,
        "text",
        "Use a current, verified programme message.",
      ) +
      field(
        "Homepage headline",
        "heroHeadline",
        p.heroHeadline,
        "text",
        "",
        true,
      ) +
      field(
        "Intro / summary",
        "heroIntro",
        p.heroIntro,
        "textarea",
        "Keep the claim concise, accurate and accessible.",
        true,
      ) +
      selectField(
        "Hero photograph",
        "heroMediaId",
        mediaSelectOptions(),
        p.heroMediaId,
      ) +
      field(
        "Primary button label",
        "primaryCta",
        p.primaryCta,
        "text",
        "",
        true,
      ) +
      selectField(
        "Primary button destination",
        "primaryCtaUrl",
        ["/services.html", "/projects.html", "/contact.html", "/about.html"],
        p.primaryCtaUrl,
      ) +
      field(
        "Secondary button label",
        "secondaryCta",
        p.secondaryCta,
        "text",
        "",
        true,
      ) +
      selectField(
        "Secondary button destination",
        "secondaryCtaUrl",
        ["/projects.html", "/services.html", "/news.html", "/gallery.html"],
        p.secondaryCtaUrl,
      ) +
      "</div></form>";
    const footer =
      '<div class="modal-footer-left"><span class="pill pill-outline">Preview draft only</span></div><div class="modal-footer-right"><button class="button button-secondary" type="button" data-action="close-modal">Cancel</button><button class="button button-primary" type="submit" form="modalForm">Save local homepage draft</button></div>';
    openModal(
      "Edit homepage preview",
      "Review the local hero section and its media selection.",
      body,
      footer,
      { wide: true, kicker: "Portal manager" },
    );
  }
  function mediaEditor(id) {
    const m = state.media.find(function (x) {
      return x.id === id;
    });
    if (!m) return;
    const body =
      '<div class="detail-banner">' +
      icon("eye", 14) +
      '<span>Keep alt text specific and concise. If an image is decorative in the public page, its production alt attribute should be empty instead of repeating nearby text.</span></div><img class="upload-preview" src="' +
      esc(mediaSrc(m)) +
      '" alt="' +
      esc(m.alt || "") +
      '"><form id="modalForm" data-form="media-update" data-id="' +
      esc(m.id) +
      '"><div class="form-grid" style="margin-top:13px">' +
      field("Asset title", "title", m.title, "text", "", true) +
      field("Category", "category", m.category) +
      field("Usage / placement", "usage", m.usage) +
      field(
        "Alt text",
        "alt",
        m.alt,
        "textarea",
        "Describe meaningful visual content without editorial claims.",
      ) +
      field(
        "Caption",
        "caption",
        m.caption,
        "textarea",
        "Visible caption used on gallery or project cards.",
      ) +
      "</div></form>";
    const footer =
      '<div class="modal-footer-left"><span class="pill pill-outline">' +
      esc(m.source || "Local asset") +
      '</span></div><div class="modal-footer-right"><button class="button button-secondary" type="button" data-action="close-modal">Cancel</button><button class="button button-primary" type="submit" form="modalForm">Save image metadata</button></div>';
    openModal("Manage image metadata", m.title, body, footer, {
      wide: true,
      kicker: "Media library",
    });
  }
  function openUploadForm(dataUrl, fileName) {
    pendingImageData = dataUrl;
    pendingImageName = fileName || "new-portal-image";
    const cleanTitle = pendingImageName
      .replace(/[.][^.]*$/, "")
      .replace(/[-_]+/g, " ");
    const body =
      '<div class="detail-banner warning">' +
      icon("info", 14) +
      '<span>Optimised image preview. It will be stored in this browser only and will not upload to the public site.</span></div><img class="upload-preview" src="' +
      esc(dataUrl) +
      '" alt="Local upload preview"><form id="modalForm" data-form="create-media"><div class="form-grid" style="margin-top:13px">' +
      field("Image title", "title", cleanTitle, "text", "", true) +
      selectField(
        "Category",
        "category",
        [
          "Afforestation",
          "Erosion control",
          "Waste management",
          "Conservation",
          "Events",
          "Other",
        ],
        "Other",
      ) +
      field(
        "Alt text",
        "alt",
        "",
        "textarea",
        "Describe the meaningful visual details, not the file name.",
        true,
      ) +
      field(
        "Caption",
        "caption",
        "",
        "textarea",
        "Optional visible caption for the local draft.",
      ) +
      "</div></form>";
    const footer =
      '<div class="modal-footer-left"><span class="pill pill-outline">Browser-local image</span></div><div class="modal-footer-right"><button class="button button-secondary" type="button" data-action="close-modal">Cancel</button><button class="button button-primary" type="submit" form="modalForm">Add to local library</button></div>';
    openModal(
      "Add image to media library",
      "Add descriptive metadata before using this image in a draft.",
      body,
      footer,
      { wide: true, kicker: "Local upload" },
    );
  }
  function handleImageUpload(file) {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      showToast("Choose a JPG, PNG or WebP image.", true);
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      showToast("Image must be smaller than 12 MB before processing.", true);
      return;
    }
    const reader = new FileReader();
    reader.onerror = function () {
      showToast("Could not read this image file.", true);
    };
    reader.onload = function () {
      const img = new Image();
      img.onerror = function () {
        showToast("This image could not be decoded.", true);
      };
      img.onload = function () {
        const scale = Math.min(1, 1600 / img.width, 1200 / img.height);
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        let dataUrl = canvas.toDataURL("image/jpeg", 0.78);
        if (dataUrl.length > 1200000)
          dataUrl = canvas.toDataURL("image/jpeg", 0.58);
        if (dataUrl.length > 1800000) {
          showToast(
            "Optimised image is too large for browser-local storage.",
            true,
          );
          return;
        }
        openUploadForm(dataUrl, file.name);
      };
      img.src = String(reader.result || "");
    };
    reader.readAsDataURL(file);
  }
  function postEditor(id) {
    const p = state.posts.find(function (x) {
      return x.id === id;
    });
    if (!p) return;
    const body =
      '<div class="detail-banner">' +
      icon("info", 14) +
      '<span>Content edits are local drafts only. Verify facts, approvals, privacy and image rights before using an official publishing system.</span></div><form id="modalForm" data-form="post-update" data-id="' +
      esc(p.id) +
      '"><div class="form-grid">' +
      field("Headline", "title", p.title, "text", "", true) +
      field("Category", "category", p.category, "text", "", true) +
      field("Publish date", "date", p.date) +
      field("Content owner", "author", p.author) +
      selectField(
        "Workflow state",
        "status",
        ["Snapshot", "Draft", "Ready for review", "Archived"],
        p.status,
      ) +
      field(
        "Summary / excerpt",
        "excerpt",
        p.excerpt,
        "textarea",
        "Avoid unverified impact figures and personally identifiable information.",
      ) +
      "</div></form>";
    const footer =
      '<div class="modal-footer-left"><span class="pill pill-outline">Draft only · not published</span></div><div class="modal-footer-right"><button class="button button-secondary" type="button" data-action="close-modal">Cancel</button><button class="button button-primary" type="submit" form="modalForm">Save local draft</button></div>';
    openModal("Edit newsroom item", p.title, body, footer, {
      wide: true,
      kicker: "Newsroom",
    });
  }
  function departmentEditor(id) {
    const d = state.departments.find(function (x) {
      return x.id === id;
    });
    if (!d) return;
    const body =
      '<div class="detail-banner">' +
      icon("info", 14) +
      '<span>Confirm approved organisational structure and official job titles with Administration before publication.</span></div><form id="modalForm" data-form="department-update" data-id="' +
      esc(d.id) +
      '"><div class="form-grid">' +
      field("Department name", "name", d.name, "text", "", true) +
      field("Directorate / lead", "director", d.director) +
      field("Queue routing", "queue", d.queue) +
      field(
        "Focus / responsibilities",
        "focus",
        d.focus,
        "textarea",
        "Use the approved mandate and avoid implying legal authority that has not been confirmed.",
      ) +
      "</div></form>";
    const footer =
      '<div class="modal-footer-left"><span class="pill pill-outline">Local directory draft</span></div><div class="modal-footer-right"><button class="button button-secondary" type="button" data-action="close-modal">Cancel</button><button class="button button-primary" type="submit" form="modalForm">Save local changes</button></div>';
    openModal("Manage department", d.name, body, footer, {
      wide: true,
      kicker: "Organisation",
    });
  }
  function staffEditor(id) {
    const u = state.staff.find(function (x) {
      return x.id === id;
    });
    if (!u) return;
    const body =
      '<div class="detail-banner warning">' +
      icon("lock", 14) +
      '<span>Demo directory only. Do not use real email addresses, passwords, access tokens, or confidential staff information in this browser prototype.</span></div><form id="modalForm" data-form="staff-update" data-id="' +
      esc(u.id) +
      '"><div class="form-grid">' +
      field("Display name", "name", u.name, "text", "", true) +
      field("Placeholder email", "email", u.email, "email") +
      field("Department", "department", u.department) +
      selectField(
        "Role",
        "role",
        ["Administrator", "Case officer", "Publisher", "Read-only analyst"],
        u.role,
      ) +
      selectField(
        "Status",
        "status",
        ["Active", "Suspended", "Invited"],
        u.status,
      ) +
      "</div></form>";
    const footer =
      '<div class="modal-footer-left"><span class="pill pill-outline">No account access is granted</span></div><div class="modal-footer-right"><button class="button button-secondary" type="button" data-action="close-modal">Cancel</button><button class="button button-primary" type="submit" form="modalForm">Save demo user</button></div>';
    openModal("Edit demo user", u.name, body, footer, {
      wide: true,
      kicker: "Staff & access",
    });
  }
  function openCreateMenu() {
    const choices = [
      [
        "application",
        "Service request",
        "Add a front-desk application record",
        "requests",
      ],
      [
        "report",
        "Environmental report",
        "Log an illustrative incident for triage",
        "reports",
      ],
      [
        "inspection",
        "Inspection visit",
        "Schedule a sample field visit",
        "inspections",
      ],
      [
        "project",
        "Programme",
        "Add an illustrative portfolio entry",
        "projects",
      ],
      [
        "distribution",
        "Seedling distribution",
        "Record a demo stock movement",
        "forestry",
      ],
      ["post", "News story", "Create a local content draft", "newsroom"],
    ];
    const body =
      '<div class="info-callout">' +
      icon("info", 15) +
      '<span>Choose a record type. All new entries remain in this browser and are clearly marked as demo data.</span></div><div class="search-results">' +
      choices
        .map(function (c) {
          return (
            '<button class="search-result" type="button" data-action="open-create" data-type="' +
            esc(c[0]) +
            '"><span class="search-result-icon">' +
            icon(c[3], 16) +
            '</span><span class="search-result-copy"><strong>' +
            esc(c[1]) +
            "</strong><span>" +
            esc(c[2]) +
            "</span></span>" +
            icon("arrow", 14) +
            "</button>"
          );
        })
        .join("") +
      "</div>";
    openModal(
      "Create a demo record",
      "Select a module to open its local-only form.",
      body,
      '<div class="modal-footer-left"></div><div class="modal-footer-right"><button class="button button-secondary" type="button" data-action="close-modal">Cancel</button></div>',
      { kicker: "Quick action" },
    );
  }
  const LGA_OPTIONS = [
    "Akko",
    "Balanga",
    "Billiri",
    "Dukku",
    "Funakaye",
    "Gombe",
    "Kaltungo",
    "Kwami",
    "Nafada",
    "Shongom",
    "Yamaltu/Deba",
  ];
  function createForm(type) {
    const prefix = type || "application";
    let title = "Create a demo record",
      subtitle = "Local-only prototype entry.",
      form = "";
    if (prefix === "application") {
      title = "Add service request";
      subtitle =
        "Capture a minimal front-desk record. Do not enter real citizen personal data.";
      form =
        '<form id="modalForm" data-form="create-application"><div class="form-grid">' +
        selectField(
          "Service category",
          "type",
          [
            "EIA & environmental audit",
            "Tree-felling permit",
            "Fuelwood movement permit",
            "Private waste operator licence",
            "Tree seedling request",
            "Erosion site assessment",
            "Environmental data request",
            "Environmental education session",
            "Partnership / CSR proposal",
          ],
          "Tree seedling request",
        ) +
        field(
          "Applicant type (demo)",
          "applicant",
          "Community request (demo)",
          "text",
          "Use an organisation/person category, not a real name or contact.",
          true,
        ) +
        selectField("Local government area", "lga", LGA_OPTIONS, "Gombe") +
        selectField(
          "Priority",
          "priority",
          ["Low", "Normal", "High"],
          "Normal",
        ) +
        field(
          "Summary",
          "summary",
          "",
          "textarea",
          "Record only information needed to route and assess the request.",
          true,
        ) +
        "</div></form>";
    } else if (prefix === "report") {
      title = "Log environmental report";
      subtitle =
        "Create a synthetic incident entry for the prototype. For emergencies, use the official hotline.";
      form =
        '<form id="modalForm" data-form="create-report"><div class="form-grid">' +
        selectField(
          "Incident category",
          "category",
          [
            "Pollution / effluent",
            "Illegal logging",
            "Open dumping",
            "Bush burning",
            "Erosion / flooding",
            "Noise nuisance",
            "Unsafe waste handling",
            "Wildlife / habitat concern",
          ],
          "Open dumping",
        ) +
        selectField(
          "Severity",
          "severity",
          ["Low", "Medium", "High", "Urgent"],
          "Medium",
        ) +
        field(
          "Location (generalised)",
          "location",
          "Sample location (demo)",
          "text",
          "Avoid precise addresses or identifying details unless operationally necessary.",
          true,
        ) +
        selectField("Local government area", "lga", LGA_OPTIONS, "Gombe") +
        field("Response team", "team", "Unassigned") +
        field(
          "Report summary",
          "summary",
          "",
          "textarea",
          "Keep factual and avoid including reporter identity.",
          true,
        ) +
        "</div></form>";
    } else if (prefix === "inspection") {
      title = "Schedule inspection";
      subtitle =
        "Create a sample field visit. This form does not dispatch a team.";
      form =
        '<form id="modalForm" data-form="create-inspection"><div class="form-grid">' +
        field("Site / facility", "site", "", "text", "", true) +
        selectField(
          "Inspection type",
          "type",
          [
            "EIA compliance",
            "Pollution follow-up",
            "Waste operator audit",
            "Seedling stock verification",
            "Works progress check",
            "Forest patrol",
          ],
          "EIA compliance",
        ) +
        selectField("Local government area", "lga", LGA_OPTIONS, "Gombe") +
        field("Due date", "due", "20 Oct 2026") +
        field("Technical lead", "lead", "Unassigned") +
        selectField(
          "Priority",
          "priority",
          ["Low", "Normal", "High"],
          "Normal",
        ) +
        "</div></form>";
    } else if (prefix === "project") {
      title = "Add programme";
      subtitle =
        "Create a portfolio placeholder with clearly illustrative progress values.";
      form =
        '<form id="modalForm" data-form="create-project"><div class="form-grid">' +
        field("Programme name", "title", "", "text", "", true) +
        field("Theme", "theme", "Land restoration") +
        field("Lead department / partner", "lead", "Planning / M&E") +
        selectField(
          "Cover image",
          "imageMediaId",
          mediaSelectOptions(),
          "MED-05",
        ) +
        field("Primary area", "lga", "Gombe State") +
        field("Progress (%)", "progress", "0", "number") +
        selectField(
          "Status",
          "status",
          ["On track", "In progress", "Needs attention", "Paused"],
          "In progress",
        ) +
        field("Next milestone", "milestone", "Confirm first milestone") +
        field("Summary", "summary", "", "textarea") +
        "</div></form>";
    } else if (prefix === "distribution") {
      title = "Record seedling distribution";
      subtitle =
        "Demo stock movement only. Use verified counts and signed dispatch records in production.";
      form =
        '<form id="modalForm" data-form="create-distribution"><div class="form-grid">' +
        selectField(
          "Nursery",
          "nursery",
          state.nurseries.map(function (n) {
            return { value: n.name, label: n.name + " · " + n.lga };
          }),
          state.nurseries[0] && state.nurseries[0].name,
        ) +
        field("Seedlings distributed", "quantity", "100", "number", "", true) +
        field("Species / mix", "species", "Neem, fruit trees") +
        field(
          "Recipient type (demo)",
          "recipient",
          "School / community group",
        ) +
        selectField("Local government area", "lga", LGA_OPTIONS, "Gombe") +
        field(
          "Dispatch note",
          "summary",
          "",
          "textarea",
          "Do not include personal phone numbers or sensitive recipient details.",
        ) +
        "</div></form>";
    } else if (prefix === "post") {
      title = "Create newsroom story";
      subtitle =
        "Draft a public-facing story for local review. It will not be published to the live site.";
      form =
        '<form id="modalForm" data-form="create-post"><div class="form-grid">' +
        field("Headline", "title", "", "text", "", true) +
        field("Category", "category", "Announcement") +
        field("Owner", "author", "Communications desk") +
        field("Date", "date", "Draft") +
        selectField(
          "Workflow state",
          "status",
          ["Draft", "Ready for review"],
          "Draft",
        ) +
        field(
          "Summary / excerpt",
          "excerpt",
          "",
          "textarea",
          "Do not include unverified claims or identifying details.",
          true,
        ) +
        "</div></form>";
    } else if (prefix === "staff") {
      title = "Add demo user";
      subtitle =
        "Add a fictional directory entry only—no account or login will be created.";
      form =
        '<form id="modalForm" data-form="create-staff"><div class="form-grid">' +
        field(
          "Display name",
          "name",
          "New staff member (demo)",
          "text",
          "",
          true,
        ) +
        field("Placeholder email", "email", "staff@example.invalid", "email") +
        field("Department", "department", "Service desk") +
        selectField(
          "Role",
          "role",
          ["Case officer", "Publisher", "Read-only analyst", "Administrator"],
          "Case officer",
        ) +
        "</div></form>";
    } else if (prefix === "waste-dispatch") {
      title = "Log waste-service update";
      subtitle =
        "Record a sample collection or sanitation action; this does not notify operators.";
      form =
        '<form id="modalForm" data-form="create-waste"><div class="form-grid">' +
        field("Route / location", "coverage", "", "text", "", true) +
        selectField("Local government area", "lga", LGA_OPTIONS, "Gombe") +
        field("Operator (demo)", "name", "Sample municipal operator A") +
        selectField(
          "Update type",
          "status",
          ["Scheduled", "Completed", "Needs attention"],
          "Scheduled",
        ) +
        field(
          "Operational note",
          "note",
          "",
          "textarea",
          "Use generalised, work-related details only.",
        ) +
        "</div></form>";
    } else if (prefix === "operator") {
      title = "Add demo operator";
      subtitle =
        "Add a sample operator record. This does not create or validate a licence.";
      form =
        '<form id="modalForm" data-form="create-operator"><div class="form-grid">' +
        field(
          "Operator display name",
          "name",
          "",
          "text",
          "Use a non-real sample name.",
          true,
        ) +
        selectField("Local government area", "lga", LGA_OPTIONS, "Gombe") +
        field("Coverage", "coverage", "Collection route") +
        field("Next review date", "review", "30 Nov 2026") +
        "</div></form>";
    }
    const footer =
      '<div class="modal-footer-left"><span class="pill pill-outline">Saved locally · demo only</span></div><div class="modal-footer-right"><button class="button button-secondary" type="button" data-action="close-modal">Cancel</button><button class="button button-primary" type="submit" form="modalForm">Save demo record</button></div>';
    openModal(title, subtitle, form, footer, {
      wide: true,
      kicker: "Create record",
    });
  }
  function readForm(form) {
    const fd = new FormData(form);
    const out = {};
    fd.forEach(function (value, key) {
      out[key] = String(value).trim();
    });
    return out;
  }
  function newId(prefix) {
    return prefix + "-26" + String(Date.now()).slice(-4);
  }
  function handleSubmit(event) {
    const form = event.target.closest("form[data-form]");
    if (!form) return;
    event.preventDefault();
    const kind = form.dataset.form;
    const id = form.dataset.id;
    const data = readForm(form);
    if (kind === "app-update") {
      const a = state.applications.find(function (x) {
        return x.id === id;
      });
      if (!a) return;
      const changed = a.status !== data.status || a.assignee !== data.assignee;
      a.status = data.status;
      a.assignee = data.assignee || "Unassigned";
      if (data.note)
        a.notes = (a.notes || []).concat([{ text: data.note, time: "Today" }]);
      closeModal();
      commit(
        changed || data.note ? "Service request updated" : "No changes made",
        "Service request updated",
        a.id + " · " + a.type,
      );
    } else if (kind === "report-update") {
      const r = state.reports.find(function (x) {
        return x.id === id;
      });
      if (!r) return;
      r.status = data.status;
      r.team = data.team || "Unassigned";
      if (data.note)
        r.notes = (r.notes || []).concat([{ text: data.note, time: "Today" }]);
      closeModal();
      commit(
        "Environmental report updated",
        "Environmental report updated",
        r.id + " · " + r.category,
      );
    } else if (kind === "inspection-update") {
      const i = state.inspections.find(function (x) {
        return x.id === id;
      });
      if (!i) return;
      i.status = data.status;
      i.lead = data.lead || "Unassigned";
      if (data.note)
        i.notes = (i.notes || []).concat([{ text: data.note, time: "Today" }]);
      closeModal();
      commit(
        "Inspection schedule updated",
        "Inspection updated",
        i.id + " · " + i.type,
      );
    } else if (kind === "project-update") {
      const p = state.projects.find(function (x) {
        return x.id === id;
      });
      if (!p) return;
      Object.assign(p, {
        title: data.title,
        lead: data.lead,
        theme: data.theme,
        lga: data.lga,
        imageMediaId: data.imageMediaId || p.imageMediaId,
        progress: String(
          Math.max(0, Math.min(100, Number(data.progress || 0))),
        ),
        status: data.status,
        milestone: data.milestone,
        summary: data.summary,
      });
      closeModal();
      commit(
        "Programme draft updated",
        "Programme updated",
        p.id + " · " + p.title,
      );
    } else if (kind === "page-update") {
      const p = state.pages.find(function (x) {
        return x.id === id;
      });
      if (!p) return;
      Object.assign(p, {
        title: data.title,
        route: data.route,
        owner: data.owner,
        status: data.status === "Public snapshot" ? "Local draft" : data.status,
        summary: data.summary,
        seo: data.seo,
        updated: "Local draft · today",
      });
      closeModal();
      commit("Page draft saved locally", "Page draft saved", p.title);
    } else if (kind === "post-update") {
      const p = state.posts.find(function (x) {
        return x.id === id;
      });
      if (!p) return;
      Object.assign(p, data);
      closeModal();
      commit(
        "Newsroom draft saved locally",
        "Newsroom draft updated",
        p.id + " · " + p.title,
      );
    } else if (kind === "department-update") {
      const d = state.departments.find(function (x) {
        return x.id === id;
      });
      if (!d) return;
      Object.assign(d, data);
      closeModal();
      commit("Department draft updated", "Department draft updated", d.name);
    } else if (kind === "staff-update") {
      const u = state.staff.find(function (x) {
        return x.id === id;
      });
      if (!u) return;
      Object.assign(u, data);
      closeModal();
      commit(
        "Demo user role updated",
        "Demo user role updated",
        u.name + " · " + u.role,
      );
    } else if (kind === "portal-update") {
      state.portal = Object.assign({}, state.portal, data);
      closeModal();
      commit(
        "Homepage preview draft saved locally",
        "Portal homepage draft updated",
        state.portal.heroHeadline,
      );
    } else if (kind === "media-update") {
      const m = state.media.find(function (x) {
        return x.id === id;
      });
      if (!m) return;
      Object.assign(m, {
        title: data.title,
        category: data.category,
        usage: data.usage,
        alt: data.alt,
        caption: data.caption,
      });
      closeModal();
      commit(
        "Image metadata updated locally",
        "Media metadata updated",
        m.id + " · " + m.title,
      );
    } else if (kind === "create-media") {
      if (!pendingImageData) {
        showToast("Choose an image before saving.", true);
        return;
      }
      const record = {
        id: newId("MED"),
        title: data.title,
        dataUrl: pendingImageData,
        category: data.category,
        alt: data.alt,
        caption: data.caption,
        usage: "Local draft · unassigned",
        source: "Local upload",
      };
      state.media.unshift(record);
      pendingImageData = null;
      pendingImageName = "";
      closeModal();
      activeView = "media";
      commit(
        "Image added to local media library",
        "Local media asset added",
        record.id + " · " + record.title,
      );
    } else if (kind === "create-application") {
      const record = {
        id: newId("SR"),
        type: data.type,
        applicant: data.applicant,
        lga: data.lga,
        submitted: "15 Oct 2026 · demo",
        assignee: "Unassigned",
        status: "New",
        priority: data.priority,
        summary: data.summary,
        notes: [],
      };
      state.applications.unshift(record);
      closeModal();
      activeView = "requests";
      commit(
        "Demo service request created",
        "Service request created",
        record.id + " · " + record.type,
      );
    } else if (kind === "create-report") {
      const record = {
        id: newId("ENV"),
        category: data.category,
        location: data.location,
        lga: data.lga,
        received: "15 Oct 2026 · demo",
        severity: data.severity,
        status: "New",
        team: data.team || "Unassigned",
        summary: data.summary,
        notes: [],
      };
      state.reports.unshift(record);
      closeModal();
      activeView = "reports";
      commit(
        "Demo environmental report created",
        "Environmental report logged",
        record.id + " · " + record.category,
      );
    } else if (kind === "create-inspection") {
      const record = {
        id: newId("IN"),
        site: data.site,
        type: data.type,
        lga: data.lga,
        due: data.due,
        lead: data.lead || "Unassigned",
        status: "Planned",
        priority: data.priority,
        notes: [],
      };
      state.inspections.unshift(record);
      closeModal();
      activeView = "inspections";
      commit(
        "Demo inspection created",
        "Inspection scheduled",
        record.id + " · " + record.type,
      );
    } else if (kind === "create-project") {
      const record = {
        id: newId("PR"),
        title: data.title,
        theme: data.theme,
        lga: data.lga,
        lead: data.lead,
        progress: String(
          Math.max(0, Math.min(100, Number(data.progress || 0))),
        ),
        status: data.status,
        milestone: data.milestone,
        imageMediaId: data.imageMediaId || "MED-05",
        summary: data.summary,
      };
      state.projects.unshift(record);
      closeModal();
      activeView = "projects";
      commit(
        "Programme placeholder added",
        "Programme created",
        record.id + " · " + record.title,
      );
    } else if (kind === "create-distribution") {
      const nursery = state.nurseries.find(function (n) {
        return n.name === data.nursery;
      });
      const quantity = Math.max(0, Number(data.quantity || 0));
      if (nursery && quantity > Number(nursery.stock)) {
        showToast("Distribution exceeds the selected sample stock.", true);
        return;
      }
      if (nursery) nursery.stock = Number(nursery.stock) - quantity;
      closeModal();
      activeView = "forestry";
      commit(
        "Demo distribution recorded; sample stock reduced",
        "Seedling distribution recorded",
        (data.nursery || "Nursery") +
          " · " +
          numberFormat(quantity) +
          " seedlings",
      );
    } else if (kind === "create-post") {
      const record = {
        id: newId("NEWS-DRAFT"),
        title: data.title,
        category: data.category,
        author: data.author,
        date: data.date || "Draft",
        status: data.status,
        excerpt: data.excerpt,
      };
      state.posts.unshift(record);
      closeModal();
      activeView = "newsroom";
      commit(
        "Newsroom draft created locally",
        "News draft created",
        record.id + " · " + record.title,
      );
    } else if (kind === "create-staff") {
      const record = {
        id: newId("U"),
        name: data.name,
        email: data.email,
        department: data.department,
        role: data.role,
        status: "Invited",
      };
      state.staff.unshift(record);
      closeModal();
      activeView = "staff";
      commit(
        "Demo directory entry added (no account created)",
        "Demo directory entry added",
        record.name + " · " + record.role,
      );
    } else if (kind === "create-waste") {
      const record = {
        name: data.name || "Sample municipal operator",
        lga: data.lga,
        coverage: data.coverage,
        status: data.status,
        review: "To be confirmed",
      };
      state.operators.unshift(record);
      closeModal();
      activeView = "sanitation";
      commit(
        "Waste-service demo update recorded",
        "Waste-service update logged",
        record.lga + " · " + record.coverage,
      );
    } else if (kind === "create-operator") {
      const record = {
        name: data.name,
        lga: data.lga,
        coverage: data.coverage,
        status: "Review due",
        review: data.review,
      };
      state.operators.unshift(record);
      closeModal();
      activeView = "sanitation";
      commit(
        "Demo operator added for review",
        "Demo operator added",
        record.name + " · " + record.lga,
      );
    } else if (kind === "settings-save") {
      state.settings = Object.assign({}, state.settings, data, {
        maskReporter: form.elements.maskReporter.checked,
        requireMfa: form.elements.requireMfa.checked,
        auditAccess: form.elements.auditAccess.checked,
        publicExports: form.elements.publicExports.checked,
      });
      commit(
        "Settings saved locally",
        "Settings updated",
        "Privacy and contact configuration",
      );
    }
  }
  function openNotifications() {
    const latest = state.activities.slice(0, 4);
    const body =
      '<div class="info-callout">' +
      icon("info", 15) +
      '<span>Notifications are generated from sample records and local actions only. No email, SMS or field dispatch is sent.</span></div><div class="audit-list">' +
      latest
        .map(function (a) {
          return (
            '<div class="audit-event"><span class="audit-marker">' +
            icon("bell", 13) +
            '</span><div class="audit-copy"><strong>' +
            esc(a.action) +
            "</strong><span>" +
            esc(a.subject) +
            " · " +
            esc(a.time) +
            "</span></div></div>"
          );
        })
        .join("") +
      "</div>";
    openModal(
      "Notifications",
      "Recent events in this demo workspace.",
      body,
      '<div class="modal-footer-left"></div><div class="modal-footer-right"><button class="button button-secondary" type="button" data-action="close-modal">Close</button><button class="button button-primary" type="button" data-action="go-audit">Open audit log</button></div>',
      { kicker: "Workspace activity" },
    );
  }
  function profileMenu() {
    const body =
      '<div class="detail-grid">' +
      detailCell("Signed in as", "Environment Admin (demo)") +
      detailCell("Role", "Administrator · not enforced") +
      detailCell("Workspace", "Gombe Environment prototype") +
      detailCell("Authentication", "Not implemented") +
      '</div><div class="detail-banner warning">' +
      icon("lock", 14) +
      "<span>This mock interface does not sign you in, authenticate staff, or enforce access permissions. Treat all displayed data as illustrative and non-confidential.</span></div>";
    openModal(
      "Workspace profile",
      "Prototype environment only.",
      body,
      '<div class="modal-footer-left"><button class="button button-danger" type="button" data-action="sign-out">' +
        icon("logout", 14) +
        'Sign out</button></div><div class="modal-footer-right"><button class="button button-secondary" type="button" data-action="close-modal">Close</button><button class="button button-primary" type="button" data-action="go-staff">Review access design</button></div>',
      { kicker: "Account & access" },
    );
  }
  function resetConfirmation() {
    const body =
      '<div class="detail-banner warning">' +
      icon("warning", 14) +
      '<span>This clears changes saved by this prototype in the current browser and restores the original sample dataset. It does not affect the public Ministry website or any official record.</span></div><div class="detail-cell"><span>Data reset scope</span><strong>Requests, reports, projects, draft content, users, settings and activity log</strong></div>';
    openModal(
      "Reset demo workspace?",
      "This action cannot be undone in this browser.",
      body,
      '<div class="modal-footer-left"></div><div class="modal-footer-right"><button class="button button-secondary" type="button" data-action="close-modal">Cancel</button><button class="button button-danger" type="button" data-action="reset-demo">' +
        icon("refresh", 14) +
        "Reset sample data</button></div>",
      { kicker: "Confirm reset" },
    );
  }
  function createCsv(rows) {
    return rows
      .map(function (row) {
        return row
          .map(function (cell) {
            return (
              '"' + String(cell == null ? "" : cell).replace(/"/g, '""') + '"'
            );
          })
          .join(",");
      })
      .join("\r\n");
  }
  function downloadCsv(filename, rows) {
    try {
      const blob = new Blob(["\ufeff" + createCsv(rows)], {
        type: "text/csv;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      showToast("CSV downloaded · sample data only");
    } catch (e) {
      showToast("Export is not available in this preview.", true);
    }
  }
  function exportRequests() {
    downloadCsv("gombe-demo-service-requests.csv", [
      [
        "Reference",
        "Service",
        "Applicant type (demo)",
        "LGA",
        "Received",
        "Assigned desk",
        "Priority",
        "Status",
      ],
      ...state.applications.map(function (a) {
        return [
          a.id,
          a.type,
          a.applicant,
          a.lga,
          a.submitted,
          a.assignee,
          a.priority,
          a.status,
        ];
      }),
    ]);
  }
  function exportReports() {
    downloadCsv("gombe-demo-environmental-reports-anonymised.csv", [
      [
        "Reference",
        "Category",
        "Generalised location",
        "LGA",
        "Received",
        "Severity",
        "Response team",
        "Status",
      ],
      ...state.reports.map(function (r) {
        return [
          r.id,
          r.category,
          r.location,
          r.lga,
          r.received,
          r.severity,
          r.team,
          r.status,
        ];
      }),
    ]);
  }
  function exportOverview() {
    const stock = state.nurseries.reduce(function (n, x) {
      return n + Number(x.stock || 0);
    }, 0);
    downloadCsv("gombe-demo-overview.csv", [
      ["Metric", "Value", "Data note"],
      [
        "Open service requests",
        state.applications.filter(function (a) {
          return !["Approved", "Closed"].includes(a.status);
        }).length,
        "Illustrative sample",
      ],
      [
        "Open environmental reports",
        state.reports.filter(function (r) {
          return !["Resolved", "Closed"].includes(r.status);
        }).length,
        "Illustrative sample",
      ],
      ["Portfolio entries", state.projects.length, "Illustrative sample"],
      ["Nursery seedling stock", stock, "Illustrative sample"],
    ]);
  }
  function exportPortalPackage() {
    const bundle = {
      schemaVersion: "1.0",
      generatedAt: new Date().toISOString(),
      targetPublicUrl: "https://mnazeer001.github.io/gombe_environment/",
      deploymentNote:
        "Draft content package only; the public website is not updated by this download.",
      brand: {
        primaryGreen: "#0b6b3a",
        deepGreen: "#06391f",
        greenLight: "#e7f4ec",
        gold: "#d9a520",
        crest: "Gombe State coat of arms SVG is embedded in the admin preview.",
      },
      portal: state.portal,
      pages: state.pages,
      newsroom: state.posts,
      projects: state.projects,
      departments: state.departments,
      media: state.media.map(function (m) {
        return {
          id: m.id,
          title: m.title,
          src: m.src || null,
          inlineDataUrl: m.dataUrl || null,
          category: m.category,
          alt: m.alt,
          caption: m.caption,
          usage: m.usage,
        };
      }),
    };
    try {
      const blob = new Blob([JSON.stringify(bundle, null, 2)], {
        type: "application/json;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "gombe-public-portal-draft.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () {
        URL.revokeObjectURL(url);
      }, 1200);
      addActivity(
        "Public portal content package exported",
        "Pages, stories, projects and media draft only",
      );
      saveState();
      showToast("Content package downloaded · live site unchanged");
    } catch (e) {
      showToast(
        "Content package export is not available in this preview.",
        true,
      );
    }
  }
  function handleClick(event) {
    const viewEl = event.target.closest("[data-view]");
    if (viewEl) {
      event.preventDefault();
      setActiveView(viewEl.dataset.view);
      return;
    }
    const el = event.target.closest("[data-action]");
    if (!el) return;
    const action = el.dataset.action;
    if (action === "modal-backdrop") {
      if (event.target === el) closeModal();
      return;
    }
    if (action === "close-modal") {
      closeModal();
      return;
    }
    if (action === "notifications") {
      openNotifications();
      return;
    }
    if (action === "profile-menu") {
      profileMenu();
      return;
    }
    if (action === "sign-out") {
      signOutDemo();
      return;
    }
    if (action === "confirm-delete") {
      confirmDeleteDemo(el.dataset.recordType, el.dataset.id);
      return;
    }
    if (action === "delete-demo-record") {
      deleteDemoRecord(el.dataset.recordType, el.dataset.id);
      return;
    }
    if (action === "chart-mode") {
      chartMode = el.dataset.mode;
      renderContent();
      return;
    }
    if (action === "open-app") {
      appDetail(el.dataset.id);
      return;
    }
    if (action === "open-report") {
      reportDetail(el.dataset.id);
      return;
    }
    if (action === "open-inspection") {
      inspectionDetail(el.dataset.id);
      return;
    }
    if (action === "open-project") {
      projectEditor(el.dataset.id);
      return;
    }
    if (action === "edit-page") {
      pageEditor(el.dataset.id);
      return;
    }
    if (action === "edit-post") {
      postEditor(el.dataset.id);
      return;
    }
    if (action === "edit-department") {
      departmentEditor(el.dataset.id);
      return;
    }
    if (action === "edit-staff") {
      staffEditor(el.dataset.id);
      return;
    }
    if (action === "edit-portal") {
      portalEditor();
      return;
    }
    if (action === "edit-media") {
      mediaEditor(el.dataset.id);
      return;
    }
    if (action === "upload-media") {
      const input = document.getElementById("mediaUpload");
      if (input) input.click();
      return;
    }
    if (action === "export-portal") {
      exportPortalPackage();
      return;
    }
    if (action === "open-create") {
      const type = el.dataset.type;
      closeModal();
      if (!type) openCreateMenu();
      else createForm(type);
      return;
    }
    if (action === "assign-app") {
      const a = state.applications.find(function (x) {
        return x.id === el.dataset.id;
      });
      if (a) {
        a.assignee = "Environment Admin (demo)";
        a.status = a.status === "New" ? "Under review" : a.status;
        commit(
          "Request assigned locally",
          "Service request assigned",
          a.id + " · " + a.assignee,
        );
        appDetail(a.id);
      }
      return;
    }
    if (action === "confirm-reset") {
      resetConfirmation();
      return;
    }
    if (action === "reset-demo") {
      state = clone(DEFAULT_DATA);
      saveState();
      closeModal();
      setActiveView("overview");
      showToast("Demo workspace reset to sample data");
      return;
    }
    if (action === "go-audit") {
      closeModal();
      setActiveView("audit");
      return;
    }
    if (action === "go-staff") {
      closeModal();
      setActiveView("staff");
      return;
    }
    if (action === "export-overview" || action === "export-analytics") {
      exportOverview();
      return;
    }
    if (action === "export-requests") {
      exportRequests();
      return;
    }
    if (action === "export-reports") {
      exportReports();
      return;
    }
    if (action === "export-stock") {
      downloadCsv("gombe-demo-nursery-stock.csv", [
        ["Nursery", "LGA", "Seedling stock (demo)", "Species mix", "Status"],
        ...state.nurseries.map(function (n) {
          return [n.name, n.lga, n.stock, n.species, n.status];
        }),
      ]);
      return;
    }
    if (action === "export-news") {
      downloadCsv("gombe-demo-newsroom.csv", [
        [
          "Reference",
          "Headline",
          "Category",
          "Date",
          "Owner",
          "Workflow state",
        ],
        ...state.posts.map(function (p) {
          return [p.id, p.title, p.category, p.date, p.author, p.status];
        }),
      ]);
      return;
    }
    if (action === "export-departments") {
      downloadCsv("gombe-demo-department-directory.csv", [
        ["Department", "Directorate", "Focus", "Example queue"],
        ...state.departments.map(function (d) {
          return [d.name, d.director, d.focus, d.queue];
        }),
      ]);
      return;
    }
    if (action === "export-audit") {
      downloadCsv("gombe-demo-audit-log.csv", [
        ["Reference", "Action", "Subject", "Actor", "Time"],
        ...state.activities.map(function (a) {
          return [a.id, a.action, a.subject, a.actor, a.time];
        }),
      ]);
      return;
    }
    if (action === "edit-operator") {
      const o = state.operators[Number(el.dataset.index)];
      if (o)
        openModal(
          "Operator review",
          o.name,
          '<div class="detail-banner warning">' +
            icon("info", 14) +
            '<span>Demo operator record only. Validate licence, disposal route and safety requirements in the approved official register.</span></div><div class="detail-grid">' +
            detailCell("Coverage", o.coverage) +
            detailCell("LGA", o.lga) +
            detailCell("Review date", o.review) +
            detailCell("Status", o.status) +
            "</div>",
          '<div class="modal-footer-left"></div><div class="modal-footer-right"><button class="button button-secondary" type="button" data-action="close-modal">Close</button></div>',
          { kicker: "Waste & sanitation" },
        );
      return;
    }
  }
  function handleInput(event) {
    const input = event.target;
    if (input.matches("[data-filter-group]"))
      applyFilters(input.dataset.filterGroup);
  }
  document.addEventListener("click", handleClick);
  document.addEventListener("submit", handleSubmit);
  document.addEventListener("input", handleInput);
  document.addEventListener("change", function (event) {
    if (event.target.matches("[data-filter-group]"))
      applyFilters(event.target.dataset.filterGroup);
    if (
      event.target.id === "mediaUpload" &&
      event.target.files &&
      event.target.files[0]
    ) {
      handleImageUpload(event.target.files[0]);
      event.target.value = "";
    }
  });
  document.getElementById("mobileMenu").addEventListener("click", function () {
    document.body.classList.toggle("sidebar-open");
  });
  document
    .getElementById("sidebarScrim")
    .addEventListener("click", function () {
      document.body.classList.remove("sidebar-open");
    });
  document
    .getElementById("globalSearch")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        globalQuery = event.currentTarget.value.trim();
        setActiveView("search");
      }
    });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
      document.body.classList.remove("sidebar-open");
    }
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      document.getElementById("globalSearch").focus();
    }
  });
  renderNav();
  renderContent();
})();
