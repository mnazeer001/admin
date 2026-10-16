(function (global) {
  "use strict";
  global.GombePageModules = global.GombePageModules || {};
  global.GombePageModules.overview = function renderOverview(context) {
    const {
      chartMode,
      esc,
      icon,
      localBadge,
      metricCard,
      numberFormat,
      pageHeader,
      pill,
      renderVisualHighlights,
      state,
      trendChart,
    } = context;
    const openApps = state.applications.filter(function (a) {
      return !["Approved", "Closed"].includes(a.status);
    }).length;
    const openReports = state.reports.filter(function (r) {
      return !["Resolved", "Closed"].includes(r.status);
    }).length;
    const highPriority = state.reports.filter(function (r) {
      return (
        ["High", "Urgent"].includes(r.severity) &&
        !["Resolved", "Closed"].includes(r.status)
      );
    }).length;
    const seedlings = state.nurseries.reduce(function (sum, n) {
      return sum + Number(n.stock || 0);
    }, 0);
    const vals =
      chartMode === "applications"
        ? [11, 15, 12, 19, 16, 23, 27]
        : [6, 9, 8, 14, 11, 13, 18];
    const stroke = chartMode === "applications" ? "#128048" : "#d9a520";
    const mainQueue = state.applications.find(function (a) {
      return a.status === "New" || a.status === "Awaiting documents";
    });
    const reportQueue = state.reports.find(function (r) {
      return r.severity === "Urgent" || r.severity === "High";
    });
    const quickRows = [];
    if (mainQueue)
      quickRows.push(
        '<div class="queue-item"><span class="queue-icon">' +
          icon("requests", 15) +
          '</span><div class="queue-copy"><strong>' +
          esc(mainQueue.type) +
          "</strong><span>" +
          esc(
            mainQueue.id + " · " + mainQueue.lga + " LGA · " + mainQueue.status,
          ) +
          '</span></div><button class="mini-open" type="button" data-action="open-app" data-id="' +
          esc(mainQueue.id) +
          '" aria-label="Open service request">' +
          icon("arrow", 14) +
          "</button></div>",
      );
    if (reportQueue)
      quickRows.push(
        '<div class="queue-item"><span class="queue-icon red">' +
          icon("reports", 15) +
          '</span><div class="queue-copy"><strong>' +
          esc(reportQueue.category) +
          "</strong><span>" +
          esc(
            reportQueue.id +
              " · " +
              reportQueue.lga +
              " LGA · " +
              reportQueue.severity,
          ) +
          '</span></div><button class="mini-open" type="button" data-action="open-report" data-id="' +
          esc(reportQueue.id) +
          '" aria-label="Open environmental report">' +
          icon("arrow", 14) +
          "</button></div>",
      );
    return (
      pageHeader(
        "Thursday, 15 October 2026",
        "Good morning, Environment Admin",
        "A clear view of public services, field operations and the content that powers the Ministry website.",
        localBadge() +
          '<button class="button button-secondary" type="button" data-action="export-overview">' +
          icon("download", 15) +
          "Export overview</button>",
      ) +
      '<div class="prototype-banner">' +
      icon("info", 16) +
      "<div><strong>Frontend prototype · sample data only</strong><span>Changes are saved in this browser only. This workspace is not connected to the Ministry website, citizen forms, email, or any government system. Do not enter real personal or confidential information.</span></div></div>" +
      renderVisualHighlights() +
      '<section class="metric-grid" aria-label="Overview metrics">' +
      metricCard(
        "Open service requests",
        openApps,
        "Illustrative queue across public services",
        "requests",
        "green",
        "Local demo",
      ) +
      metricCard(
        "Reports needing action",
        openReports,
        highPriority + " high-priority in sample queue",
        "reports",
        "amber",
        "Triage view",
        true,
      ) +
      metricCard(
        "Active programmes",
        state.projects.length,
        "Portfolio entries in this prototype",
        "projects",
        "blue",
        "6 workstreams",
      ) +
      metricCard(
        "Nursery stock",
        numberFormat(seedlings),
        "Illustrative seedlings across " +
          state.nurseries.length +
          " nurseries",
        "forestry",
        "purple",
        "Sample stock",
      ) +
      "</section>" +
      '<div class="dashboard-grid">' +
      '<section class="card chart-card"><div class="card-heading"><div><h2>Incoming work</h2><p>Illustrative submissions · last seven days</p></div><div class="chart-tabs" role="tablist" aria-label="Chart data"><button class="' +
      (chartMode === "applications" ? "active" : "") +
      '" type="button" data-action="chart-mode" data-mode="applications" role="tab" aria-selected="' +
      (chartMode === "applications") +
      '">Requests</button><button class="' +
      (chartMode === "reports" ? "active" : "") +
      '" type="button" data-action="chart-mode" data-mode="reports" role="tab" aria-selected="' +
      (chartMode === "reports") +
      '">Reports</button></div></div><div class="chart-statline"><strong>' +
      (chartMode === "applications" ? openApps : openReports) +
      "</strong><span>" +
      (chartMode === "applications"
        ? "open service requests"
        : "open environmental reports") +
      '</span></div><div class="chart-wrap">' +
      trendChart(vals, stroke, chartMode + " received over seven days") +
      "</div></section>" +
      '<section class="card queue-card"><div class="card-heading"><div><h2>Needs your attention</h2><p>Sample items awaiting a next step</p></div><span class="queue-count">' +
      quickRows.length +
      '</span></div><div class="queue-list">' +
      (quickRows.join("") ||
        '<div class="table-empty">The demo queue is clear.</div>') +
      '</div><button class="button button-ghost" type="button" data-view="requests">Open service desk ' +
      icon("arrow", 13) +
      "</button></section>" +
      "</div>" +
      '<div class="dashboard-lower">' +
      '<section class="card table-card"><div class="table-top"><div class="table-title"><h2>Latest submissions</h2><p>Example records · applicant details intentionally minimized</p></div><button class="button button-ghost" type="button" data-view="requests">View all ' +
      icon("arrow", 13) +
      '</button></div><div class="table-scroll"><table><thead><tr><th>Reference</th><th>Service</th><th>Local government</th><th>Received</th><th>Status</th><th></th></tr></thead><tbody>' +
      state.applications
        .slice(0, 5)
        .map(function (a) {
          return (
            '<tr><td><button class="table-ref" type="button" data-action="open-app" data-id="' +
            esc(a.id) +
            '">' +
            esc(a.id) +
            '</button></td><td><span class="table-primary">' +
            esc(a.type) +
            '</span><span class="table-secondary">' +
            esc(a.applicant) +
            "</span></td><td>" +
            esc(a.lga) +
            "</td><td>" +
            esc(a.submitted) +
            "</td><td>" +
            pill(a.status) +
            '</td><td><div class="table-actions"><button class="icon-button" type="button" data-action="open-app" data-id="' +
            esc(a.id) +
            '" aria-label="Open ' +
            esc(a.id) +
            '">' +
            icon("external", 14) +
            "</button></div></td></tr>"
          );
        })
        .join("") +
      "</tbody></table></div></section>" +
      '<section class="card card-pad"><div class="card-heading"><div><h2>Programme pulse</h2><p>Illustrative portfolio progress</p></div><button class="button button-ghost" type="button" data-view="projects">Portfolio ' +
      icon("arrow", 13) +
      '</button></div><div class="bar-list">' +
      state.projects
        .slice(0, 4)
        .map(function (p) {
          return (
            '<div><div class="bar-item-head"><span>' +
            esc(p.title) +
            "</span><strong>" +
            esc(p.progress) +
            '%</strong></div><div class="bar-track"><div class="bar-fill" style="width:' +
            Math.max(0, Math.min(100, Number(p.progress))) +
            '%"></div></div></div>'
          );
        })
        .join("") +
      '</div><div class="info-callout" style="margin:16px 0 0">' +
      icon("shield", 15) +
      "<span><strong>Use verified reporting.</strong> Figures shown here are demonstration values; confirm official results before external publication.</span></div></section>" +
      "</div>" +
      '<div class="section-title-row"><div><h2>Recent activity</h2><p>Locally recorded demo actions for traceability</p></div><button class="button button-ghost" type="button" data-view="audit">View audit log ' +
      icon("arrow", 13) +
      "</button></div>" +
      '<section class="card audit-list">' +
      state.activities
        .slice(0, 3)
        .map(function (a) {
          return (
            '<div class="audit-event"><span class="audit-marker">' +
            icon("check", 13) +
            '</span><div class="audit-copy"><strong>' +
            esc(a.action) +
            "</strong><span>" +
            esc(a.subject) +
            " · " +
            esc(a.actor) +
            '</span></div><span class="audit-time">' +
            esc(a.time) +
            "</span></div>"
          );
        })
        .join("") +
      "</section>"
    );
  };
})(window);
