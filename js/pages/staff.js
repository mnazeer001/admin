(function (global) {
  "use strict";
  global.GombePageModules = global.GombePageModules || {};
  global.GombePageModules.staff = function renderStaff(context) {
    const { esc, icon, localBadge, pageHeader, pill, state } = context;
    return (
      pageHeader(
        "Access governance",
        "Staff & access",
        "A prototype directory for managing role scopes. Real sign-in, identity verification and permissions require a secure backend.",
        localBadge() +
          '<button class="button button-primary" type="button" data-action="open-create" data-type="staff">' +
          icon("plus", 15) +
          "Add demo user</button>",
      ) +
      '<div class="info-callout">' +
      icon("lock", 15) +
      "<span><strong>Security boundary:</strong> this frontend has no authentication, session control or actual access enforcement. Do not add real staff accounts, credentials, or confidential case details. Apply least privilege and multi-factor authentication in a production system.</span></div>" +
      '<div class="staff-layout"><section class="card table-card"><div class="table-top"><div class="table-title"><h2>Workspace users</h2><p>Fictional demo identities · no credentials are stored</p></div><span class="table-count">' +
      state.staff.length +
      ' demo users</span></div><div class="table-scroll"><table><thead><tr><th>User</th><th>Department</th><th>Role</th><th>Status</th><th></th></tr></thead><tbody>' +
      state.staff
        .map(function (u) {
          return (
            '<tr><td><span class="table-primary">' +
            esc(u.name) +
            '</span><span class="table-secondary">' +
            esc(u.email) +
            "</span></td><td>" +
            esc(u.department) +
            "</td><td>" +
            esc(u.role) +
            "</td><td>" +
            pill(u.status) +
            '</td><td><button class="button button-ghost" type="button" data-action="edit-staff" data-id="' +
            esc(u.id) +
            '">' +
            icon("edit", 13) +
            "Edit</button></td></tr>"
          );
        })
        .join("") +
      '</tbody></table></div></section><section class="card role-list"><div class="card-heading"><div><h2>Role templates</h2><p>Suggested scopes · not enforced here</p></div></div>' +
      [
        {
          icon: "shield",
          title: "Administrator",
          detail:
            "Manage users, settings, records and audit review. Use sparingly; require a named approver.",
        },
        {
          icon: "requests",
          title: "Case officer",
          detail:
            "Access assigned service requests and reports; mask reporter identity unless necessary.",
        },
        {
          icon: "newsroom",
          title: "Publisher",
          detail:
            "Create and edit content drafts; cannot access confidential incident reports.",
        },
        {
          icon: "analytics",
          title: "Read-only analyst",
          detail:
            "Use aggregate or de-identified data; no editing or identity-level case access.",
        },
      ]
        .map(function (r) {
          return (
            '<div class="role-row"><span class="role-icon">' +
            icon(r.icon, 15) +
            '</span><div class="role-copy"><strong>' +
            esc(r.title) +
            "</strong><span>" +
            esc(r.detail) +
            "</span></div></div>"
          );
        })
        .join("") +
      "</section></div>"
    );
  };
})(window);
