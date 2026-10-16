(function (global) {
  "use strict";
  global.GombePageModules = global.GombePageModules || {};
  global.GombePageModules.sanitation = function renderSanitation(context) {
    const { esc, icon, localBadge, pageHeader, pill, state } = context;
    return (
      pageHeader(
        "Waste services",
        "Waste & sanitation",
        "Coordinate public sanitation notices, licensed operators, collection coverage and safe materials recovery.",
        localBadge() +
          '<button class="button button-primary" type="button" data-action="open-create" data-type="waste-dispatch">' +
          icon("plus", 15) +
          "Log service update</button>",
      ) +
      '<div class="two-col"><section class="schedule-panel"><div class="eyebrow"><span class="eyebrow-dot"></span>Public sanitation schedule</div><h2>Last Saturday of each month</h2><p>Example notice configuration from the public site. Confirm dates and exemptions with the authorised office before issuing an operational notice.</p><div class="schedule-detail">' +
      icon("clock", 14) +
      '<span>7:00am – 10:00am</span></div><div class="schedule-detail">' +
      icon("pin", 14) +
      '<span>Gombe metropolis &amp; designated towns</span></div><div class="schedule-detail">' +
      icon("info", 14) +
      '<span>Essential services are exempt</span></div><div class="schedule-note">Local prototype · no notices are published or sent</div></section><section class="card card-pad"><div class="card-heading"><div><h2>Waste operations</h2><p>Sample service coverage</p></div><span class="metric-icon green">' +
      icon("recycle", 16) +
      '</span></div><div class="module-stat"><span class="label">Sample listed operators</span><strong>' +
      state.operators.length +
      '</strong><span>Verify licence status in the official register</span></div><div class="bar-list" style="margin-top:14px"><div><div class="bar-item-head"><span>Collection route records</span><strong>Demo only</strong></div><div class="bar-track"><div class="bar-fill" style="width:66%"></div></div></div><div><div class="bar-item-head"><span>Recovery facility readiness</span><strong>Illustrative</strong></div><div class="bar-track"><div class="bar-fill" style="width:55%"></div></div></div></div></section></div>' +
      '<div class="section-title-row"><div><h2>Operator register</h2><p>Example entries only · confirm licences and coverage before operational use</p></div><button class="button button-secondary" type="button" data-action="open-create" data-type="operator">' +
      icon("plus", 14) +
      'Add operator</button></div><section class="card table-card"><div class="table-scroll"><table><thead><tr><th>Operator</th><th>Local government</th><th>Coverage</th><th>Licence review</th><th>Status</th><th></th></tr></thead><tbody>' +
      state.operators
        .map(function (o, index) {
          return (
            '<tr><td><span class="table-primary">' +
            esc(o.name) +
            '</span><span class="table-secondary">Demo operator record</span></td><td>' +
            esc(o.lga) +
            "</td><td>" +
            esc(o.coverage) +
            "</td><td>" +
            esc(o.review) +
            "</td><td>" +
            pill(o.status) +
            '</td><td><button class="button button-ghost" type="button" data-action="edit-operator" data-index="' +
            index +
            '">' +
            icon("edit", 13) +
            "Review</button></td></tr>"
          );
        })
        .join("") +
      "</tbody></table></div></section>" +
      '<div class="info-callout section-spacer">' +
      icon("shield", 15) +
      "<span><strong>Safe procurement &amp; licensing:</strong> verify corporate registration, disposal plans, staff safety measures and fee receipts through approved official channels. Do not collect cash through this prototype.</span></div>"
    );
  };
})(window);
