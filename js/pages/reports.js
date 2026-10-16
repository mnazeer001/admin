(function (global) {
  "use strict";
  global.GombePageModules = global.GombePageModules || {};
  global.GombePageModules.reports = function renderReports(context) {
    const {
      deleteButton,
      esc,
      filterToolbar,
      icon,
      localBadge,
      moduleStat,
      pageHeader,
      pill,
      priorityPill,
      safeRows,
      state,
    } = context;
    const open = state.reports.filter(function (r) {
      return !["Resolved", "Closed"].includes(r.status);
    }).length;
    const urgent = state.reports.filter(function (r) {
      return (
        r.severity === "Urgent" && !["Resolved", "Closed"].includes(r.status)
      );
    }).length;
    const dispatched = state.reports.filter(function (r) {
      return r.status === "Dispatched";
    }).length;
    const selects =
      '<select class="filter-select" id="reportsStatus" data-filter-group="reports" aria-label="Filter by status"><option value="">All statuses</option>' +
      ["New", "Under review", "Dispatched", "Resolved", "Closed"]
        .map(function (x) {
          return "<option>" + esc(x) + "</option>";
        })
        .join("") +
      '</select><select class="filter-select" id="reportsKind" data-filter-group="reports" aria-label="Filter by severity"><option value="">All severity</option><option>Urgent</option><option>High</option><option>Medium</option><option>Low</option></select>';
    return (
      pageHeader(
        "Incident response",
        "Environmental reports",
        "Review public reports of pollution, illegal logging, bush burning, erosion, flooding and unsafe dumping.",
        localBadge() +
          '<button class="button button-primary" type="button" data-action="open-create" data-type="report">' +
          icon("plus", 15) +
          "Log a report</button>",
      ) +
      '<div class="module-stats">' +
      moduleStat("Open reports", open, "Illustrative queue") +
      moduleStat("Urgent cases", urgent, "Review and route promptly") +
      moduleStat("Dispatched", dispatched, "Field response in progress") +
      moduleStat(
        "Reporter identities",
        "Masked",
        "Demo uses no real personal data",
      ) +
      "</div>" +
      '<div class="info-callout">' +
      icon("lock", 15) +
      "<span><strong>Confidentiality by design:</strong> reporter identity is masked in this prototype. In production, restrict identity access by role, log every access, capture only necessary details, and follow an approved retention schedule. For immediate danger, use the official hotline.</span></div>" +
      '<section class="card table-card"><div class="table-top"><div class="table-title"><h2>Environmental incident queue</h2><p>Prioritise by risk, validate location, assign a response team and record outcomes.</p></div><button class="button button-secondary" type="button" data-action="export-reports">' +
      icon("download", 14) +
      "Export anonymised CSV</button></div>" +
      filterToolbar(
        "reports",
        "Search reference, category, LGA…",
        selects,
        "reportsResult",
      ) +
      '<div class="table-scroll"><table><thead><tr><th>Reference</th><th>Incident / location</th><th>Received</th><th>Severity</th><th>Response team</th><th>Status</th><th></th></tr></thead><tbody>' +
      safeRows(
        state.reports
          .map(function (r) {
            const search = [r.id, r.category, r.location, r.lga, r.team]
              .join(" ")
              .toLowerCase();
            return (
              '<tr class="report-row" data-search="' +
              esc(search) +
              '" data-status="' +
              esc(r.status.toLowerCase()) +
              '" data-kind="' +
              esc(r.severity.toLowerCase()) +
              '"><td><button class="table-ref" type="button" data-action="open-report" data-id="' +
              esc(r.id) +
              '">' +
              esc(r.id) +
              '</button></td><td><span class="table-primary">' +
              esc(r.category) +
              '</span><span class="table-secondary">' +
              esc(r.location) +
              "</span></td><td>" +
              esc(r.received) +
              "</td><td>" +
              priorityPill(r.severity) +
              "</td><td>" +
              esc(r.team) +
              "</td><td>" +
              pill(r.status) +
              '</td><td><div class="table-actions">' +
              deleteButton("report", r.id, r.category) +
              '<button class="icon-button" type="button" data-action="open-report" data-id="' +
              esc(r.id) +
              '" aria-label="Open incident report">' +
              icon("external", 14) +
              "</button></div></td></tr>"
            );
          })
          .join(""),
        7,
      ) +
      "</tbody></table></div></section>"
    );
  };
})(window);
