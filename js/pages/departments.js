(function (global) {
  "use strict";
  global.GombePageModules = global.GombePageModules || {};
  global.GombePageModules.departments = function renderDepartments(context) {
    const { esc, icon, localBadge, pageHeader, state } = context;
    return (
      pageHeader(
        "Organisation",
        "Departments & units",
        "Maintain department descriptions and clarify how operational work is routed across the Ministry.",
        localBadge() +
          '<button class="button button-secondary" type="button" data-action="export-departments">' +
          icon("download", 14) +
          "Export directory</button>",
      ) +
      '<div class="info-callout">' +
      icon("info", 15) +
      "<span><strong>Structure note:</strong> department names and scopes are based on the public site. Confirm current approved organograms, directors and reporting lines with Administration before making official changes.</span></div>" +
      '<div class="department-grid">' +
      state.departments
        .map(function (d) {
          return (
            '<article class="card department-card"><div class="department-card-top"><span class="department-initials">' +
            esc(d.initials) +
            '</span><span class="nav-count" style="color:#61816a;background:#eef6eb">8 units</span></div><h3>' +
            esc(d.name) +
            '</h3><span class="director">' +
            esc(d.director) +
            "</span><p>" +
            esc(d.focus) +
            '</p><button class="button button-secondary" type="button" data-action="edit-department" data-id="' +
            esc(d.id) +
            '">' +
            icon("edit", 13) +
            "Manage scope</button></article>"
          );
        })
        .join("") +
      "</div>" +
      '<div class="section-title-row"><div><h2>Routing guide</h2><p>Example queues that can be linked to a department in a live system</p></div></div><section class="card table-card"><div class="table-scroll"><table><thead><tr><th>Department</th><th>Example work queue</th><th>Scope</th><th>Service hours</th></tr></thead><tbody>' +
      state.departments
        .map(function (d) {
          return (
            '<tr><td><span class="table-primary">' +
            esc(d.name) +
            "</span></td><td>" +
            esc(d.queue) +
            "</td><td>" +
            esc(d.focus) +
            "</td><td>Mon–Fri · 8:00am–4:00pm</td></tr>"
          );
        })
        .join("") +
      "</tbody></table></div></section>"
    );
  };
})(window);
