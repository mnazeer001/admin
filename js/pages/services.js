(function (global) {
  "use strict";
  global.GombePageModules = global.GombePageModules || {};
  global.GombePageModules.requests = function renderRequests(context) {
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
    const newCount = state.applications.filter(function (a) {
      return a.status === "New";
    }).length;
    const reviewCount = state.applications.filter(function (a) {
      return a.status === "Under review";
    }).length;
    const atRisk = state.applications.filter(function (a) {
      return (
        a.priority === "High" && !["Approved", "Closed"].includes(a.status)
      );
    }).length;
    const types = Array.from(
      new Set(
        state.applications.map(function (a) {
          return a.type;
        }),
      ),
    );
    const selects =
      '<select class="filter-select" id="requestsStatus" data-filter-group="requests" aria-label="Filter by status"><option value="">All statuses</option>' +
      [
        "New",
        "Under review",
        "Awaiting documents",
        "Approved",
        "Scheduled",
        "Closed",
      ]
        .map(function (x) {
          return "<option>" + esc(x) + "</option>";
        })
        .join("") +
      '</select><select class="filter-select" id="requestsKind" data-filter-group="requests" aria-label="Filter by service">' +
      '<option value="">All services</option>' +
      types
        .map(function (x) {
          return "<option>" + esc(x) + "</option>";
        })
        .join("") +
      "</select>";
    return (
      pageHeader(
        "Service desk",
        "Service requests",
        "Triage public applications across EIA reviews, permits, seedling supply, waste services, site assessments and partnerships.",
        localBadge() +
          '<button class="button button-primary" type="button" data-action="open-create" data-type="application">' +
          icon("plus", 15) +
          "Add request</button>",
      ) +
      '<div class="module-stats">' +
      moduleStat("New submissions", newCount, "Illustrative sample records") +
      moduleStat("Under review", reviewCount, "Assigned for technical review") +
      moduleStat(
        "Priority follow-up",
        atRisk,
        "High-priority sample requests",
      ) +
      moduleStat(
        "Service categories",
        types.length,
        "Based on the public service directory",
      ) +
      "</div>" +
      '<div class="info-callout">' +
      icon("shield", 15) +
      "<span><strong>Responsible handling:</strong> demo applicant labels contain no real contact data. In a live system, collect only necessary information, enforce role-based access, and keep payment receipts in approved government channels.</span></div>" +
      '<section class="card table-card"><div class="table-top"><div class="table-title"><h2>All service requests</h2><p>Front-end workflow sample · changes stay in this browser</p></div><button class="button button-secondary" type="button" data-action="export-requests">' +
      icon("download", 14) +
      "Export redacted CSV</button></div>" +
      filterToolbar(
        "requests",
        "Search reference, service, LGA…",
        selects,
        "requestsResult",
      ) +
      '<div class="table-scroll"><table><thead><tr><th>Reference</th><th>Service / applicant</th><th>LGA</th><th>Received</th><th>Assignee</th><th>Priority</th><th>Status</th><th></th></tr></thead><tbody>' +
      safeRows(
        state.applications
          .map(function (a) {
            const search = [a.id, a.type, a.applicant, a.lga, a.assignee]
              .join(" ")
              .toLowerCase();
            return (
              '<tr class="request-row" data-search="' +
              esc(search) +
              '" data-status="' +
              esc(a.status.toLowerCase()) +
              '" data-kind="' +
              esc(a.type.toLowerCase()) +
              '"><td><button class="table-ref" type="button" data-action="open-app" data-id="' +
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
              esc(a.assignee) +
              "</td><td>" +
              priorityPill(a.priority) +
              "</td><td>" +
              pill(a.status) +
              '</td><td><div class="table-actions">' +
              deleteButton("application", a.id, a.type) +
              '<button class="icon-button" type="button" data-action="open-app" data-id="' +
              esc(a.id) +
              '" aria-label="View request">' +
              icon("external", 14) +
              "</button></div></td></tr>"
            );
          })
          .join(""),
        8,
      ) +
      "</tbody></table></div></section>"
    );
  };
})(window);
