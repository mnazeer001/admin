(function (global) {
  "use strict";
  global.GombePageModules = global.GombePageModules || {};
  global.GombePageModules.inspections = function renderInspections(context) {
    const {
      deleteButton,
      esc,
      icon,
      localBadge,
      moduleStat,
      pageHeader,
      pill,
      priorityPill,
      state,
    } = context;
    const scheduled = state.inspections.filter(function (i) {
      return i.status === "Scheduled";
    }).length;
    const dueSoon = state.inspections.filter(function (i) {
      return (
        ["High", "Urgent"].includes(i.priority) && i.status !== "Completed"
      );
    }).length;
    return (
      pageHeader(
        "Field operations",
        "Inspections & enforcement",
        "Plan site visits, assign technical leads, track EIA compliance and record follow-up actions.",
        localBadge() +
          '<button class="button button-primary" type="button" data-action="open-create" data-type="inspection">' +
          icon("plus", 15) +
          "Schedule inspection</button>",
      ) +
      '<div class="module-stats">' +
      moduleStat(
        "Planned visits",
        state.inspections.length,
        "Illustrative schedule",
      ) +
      moduleStat("Scheduled", scheduled, "Upcoming field work") +
      moduleStat("Priority follow-up", dueSoon, "High-risk sample visits") +
      moduleStat(
        "Enforcement actions",
        "Controlled",
        "No live case system connected",
      ) +
      "</div>" +
      '<div class="info-callout">' +
      icon("info", 15) +
      "<span><strong>Operational safeguards:</strong> use approved inspection checklists, keep findings factual, separate allegation from verified evidence, and record who reviewed or authorised any enforcement notice.</span></div>" +
      '<section class="card table-card"><div class="table-top"><div class="table-title"><h2>Inspection calendar</h2><p>Sample schedule · select an item to update its local workflow</p></div><span class="table-count">' +
      state.inspections.length +
      ' sample visits</span></div><div class="table-scroll"><table><thead><tr><th>Reference</th><th>Site / inspection type</th><th>LGA</th><th>Due date</th><th>Technical lead</th><th>Priority</th><th>Status</th><th></th></tr></thead><tbody>' +
      state.inspections
        .map(function (i) {
          return (
            '<tr><td><button class="table-ref" type="button" data-action="open-inspection" data-id="' +
            esc(i.id) +
            '">' +
            esc(i.id) +
            '</button></td><td><span class="table-primary">' +
            esc(i.site) +
            '</span><span class="table-secondary">' +
            esc(i.type) +
            "</span></td><td>" +
            esc(i.lga) +
            "</td><td>" +
            esc(i.due) +
            "</td><td>" +
            esc(i.lead) +
            "</td><td>" +
            priorityPill(i.priority) +
            "</td><td>" +
            pill(i.status) +
            '</td><td><div class="table-actions">' +
            deleteButton("inspection", i.id, i.type) +
            '<button class="icon-button" type="button" data-action="open-inspection" data-id="' +
            esc(i.id) +
            '" aria-label="Open inspection">' +
            icon("external", 14) +
            "</button></div></td></tr>"
          );
        })
        .join("") +
      "</tbody></table></div></section>"
    );
  };
})(window);
