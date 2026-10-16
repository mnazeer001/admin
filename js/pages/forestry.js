(function (global) {
  "use strict";
  global.GombePageModules = global.GombePageModules || {};
  global.GombePageModules.forestry = function renderForestry(context) {
    const {
      esc,
      icon,
      localBadge,
      moduleStat,
      numberFormat,
      pageHeader,
      pill,
      safeRows,
      state,
    } = context;
    const stock = state.nurseries.reduce(function (sum, n) {
      return sum + Number(n.stock || 0);
    }, 0);
    const seedReqs = state.applications.filter(function (a) {
      return a.type.toLowerCase().includes("seedling");
    });
    return (
      pageHeader(
        "Forest estate & nurseries",
        "Forestry & nurseries",
        "Track seedling availability, distribution requests and nursery operations across the state.",
        localBadge() +
          '<button class="button button-primary" type="button" data-action="open-create" data-type="distribution">' +
          icon("plus", 15) +
          "Record distribution</button>",
      ) +
      '<div class="info-callout">' +
      icon("seedling", 15) +
      "<span><strong>Demo inventory only:</strong> seedling quantities and nursery names below are illustrative. A live deployment should reconcile stock against signed dispatch notes and verified nursery counts.</span></div>" +
      '<div class="two-col"><section class="card stock-card"><div class="card-heading"><div><h2>Nursery stock overview</h2><p>Available seedlings by sample location and species mix</p></div><button class="button button-secondary" type="button" data-action="export-stock">' +
      icon("download", 14) +
      'Export</button></div><div class="stock-total"><span class="stock-icon">' +
      icon("seedling", 21) +
      "</span><div><strong>" +
      numberFormat(stock) +
      "</strong><span>illustrative seedlings across " +
      state.nurseries.length +
      ' sample nursery sites</span></div></div><div class="table-scroll"><table class="nursery-table"><thead><tr><th>Nursery</th><th>Local government</th><th>Stock</th><th>Species mix</th><th>Status</th></tr></thead><tbody>' +
      state.nurseries
        .map(function (n) {
          return (
            '<tr><td><span class="table-primary">' +
            esc(n.name) +
            "</span></td><td>" +
            esc(n.lga) +
            "</td><td><strong>" +
            numberFormat(n.stock) +
            "</strong></td><td>" +
            esc(n.species) +
            "</td><td>" +
            pill(n.status) +
            "</td></tr>"
          );
        })
        .join("") +
      '</tbody></table></div></section><section><div class="card card-pad"><div class="card-heading"><div><h2>Seedling demand</h2><p>Requests managed through the service desk</p></div><button class="button button-ghost" type="button" data-view="requests">Open queue ' +
      icon("arrow", 13) +
      "</button></div>" +
      moduleStat(
        "Sample requests",
        seedReqs.length,
        "Tree seedling applications",
      ) +
      '<div class="bar-list" style="margin-top:13px">' +
      [
        { name: "Tree seedlings", value: 72 },
        { name: "Tree-felling permits", value: 48 },
        { name: "Nursery site checks", value: 31 },
      ]
        .map(function (x) {
          return (
            '<div><div class="bar-item-head"><span>' +
            esc(x.name) +
            "</span><strong>" +
            x.value +
            '%</strong></div><div class="bar-track"><div class="bar-fill" style="width:' +
            x.value +
            '%"></div></div></div>'
          );
        })
        .join("") +
      '</div></div><div class="info-callout" style="margin-top:13px">' +
      icon("info", 15) +
      "<span>For requests, record the planting site, species, quantity and maintenance plan—avoid storing unnecessary household or child information.</span></div></section></div>" +
      '<div class="section-title-row"><div><h2>Recent seedling requests</h2><p>Demo applications from the service desk</p></div><button class="button button-ghost" type="button" data-view="requests">View service requests ' +
      icon("arrow", 13) +
      '</button></div><section class="card table-card"><div class="table-scroll"><table><thead><tr><th>Reference</th><th>Applicant type</th><th>LGA</th><th>Received</th><th>Assigned desk</th><th>Status</th><th></th></tr></thead><tbody>' +
      safeRows(
        seedReqs
          .map(function (a) {
            return (
              '<tr><td><button class="table-ref" type="button" data-action="open-app" data-id="' +
              esc(a.id) +
              '">' +
              esc(a.id) +
              "</button></td><td>" +
              esc(a.applicant) +
              "</td><td>" +
              esc(a.lga) +
              "</td><td>" +
              esc(a.submitted) +
              "</td><td>" +
              esc(a.assignee) +
              "</td><td>" +
              pill(a.status) +
              '</td><td><button class="icon-button" type="button" data-action="open-app" data-id="' +
              esc(a.id) +
              '" aria-label="Open request">' +
              icon("external", 14) +
              "</button></td></tr>"
            );
          })
          .join(""),
        7,
      ) +
      "</tbody></table></div></section>"
    );
  };
})(window);
