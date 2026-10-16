(function (global) {
  "use strict";
  global.GombePageModules = global.GombePageModules || {};
  global.GombePageModules.audit = function renderAudit(context) {
    const { esc, icon, localBadge, pageHeader, state } = context;
    const rows = state.activities
      .map(function (a) {
        const search = [a.id, a.action, a.subject, a.actor, a.time]
          .join(" ")
          .toLowerCase();
        return (
          '<div class="audit-event audit-row" data-search="' +
          esc(search) +
          '"><span class="audit-marker">' +
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
      .join("");
    return (
      pageHeader(
        "Governance & traceability",
        "Audit log",
        "See local prototype actions and provide a pattern for accountable, attributable administration.",
        localBadge() +
          '<button class="button button-secondary" type="button" data-action="export-audit">' +
          icon("download", 14) +
          "Export log</button>",
      ) +
      '<div class="info-callout">' +
      icon("shield", 15) +
      "<span><strong>Audit limitation:</strong> this log is stored in editable browser storage and is not tamper-proof. A production audit trail must be server-side, access-controlled, time-synchronised, retained under policy, and protected against alteration.</span></div>" +
      '<div class="audit-layout"><section class="card"><div class="table-top"><div class="table-title"><h2>Recent workspace events</h2><p>' +
      state.activities.length +
      ' local demo events</p></div></div><div class="toolbar"><div class="toolbar-left"><label class="filter-wrap">' +
      icon("search", 14) +
      '<input class="filter-input" type="search" id="auditSearch" data-filter-group="audit" placeholder="Search actions, reference, user…" aria-label="Search audit events"></label></div><span class="filter-result" id="auditResult"></span></div><div class="audit-list" id="auditList">' +
      (rows || '<div class="table-empty">No activity yet.</div>') +
      '</div></section><aside class="card card-pad"><div class="card-heading"><div><h2>What a production audit should capture</h2><p>Minimum control considerations</p></div></div>' +
      [
        [
          "Identity",
          "A verified user identity, role and authentication context.",
        ],
        [
          "Action",
          "Create, view, edit, export, assignment and status changes.",
        ],
        [
          "Scope",
          "Record or object reference; avoid copying sensitive free-text.",
        ],
        [
          "Time & integrity",
          "Trusted timestamp, retention rule and tamper protection.",
        ],
        [
          "Review",
          "Periodic access review and escalation for unusual activity.",
        ],
      ]
        .map(function (x) {
          return (
            '<div class="role-row"><span class="role-icon">' +
            icon("check", 14) +
            '</span><div class="role-copy"><strong>' +
            esc(x[0]) +
            "</strong><span>" +
            esc(x[1]) +
            "</span></div></div>"
          );
        })
        .join("") +
      "</aside></div>"
    );
  };
})(window);
