(function (global) {
  "use strict";
  global.GombePageModules = global.GombePageModules || {};
  global.GombePageModules.analytics = function renderAnalytics(context) {
    const {
      esc,
      icon,
      localBadge,
      metricCard,
      moduleStat,
      pageHeader,
      state,
      trendChart,
    } = context;
    const sum = state.applications.length + state.reports.length;
    const vals = [16, 20, 18, 26, 22, 31, 36];
    const lgaData = [
      { name: "Gombe", n: 22 },
      { name: "Akko", n: 17 },
      { name: "Dukku", n: 14 },
      { name: "Billiri", n: 13 },
      { name: "Yamaltu/Deba", n: 11 },
      { name: "Other LGAs", n: 23 },
    ];
    return (
      pageHeader(
        "Planning & performance",
        "Analytics & reports",
        "Review illustrative service volumes, response workloads and programme indicators—without exposing case-level identities.",
        localBadge() +
          '<button class="button button-secondary" type="button" data-action="export-analytics">' +
          icon("download", 14) +
          "Export aggregate CSV</button>",
      ) +
      '<div class="info-callout">' +
      icon("shield", 15) +
      "<span><strong>Public-sector reporting:</strong> all figures in this prototype are synthetic examples. Live dashboards should use validated source systems, describe the reporting period, and suppress small groups that could identify a person or community.</span></div>" +
      '<div class="module-stats">' +
      moduleStat("Sample records", sum, "Requests + reports in this browser") +
      moduleStat("Response view", "72 hrs", "Example urgent case target") +
      moduleStat("Portfolio themes", "6", "Illustrative programme areas") +
      moduleStat("Data classification", "Demo", "No live citizen data") +
      "</div>" +
      '<div class="two-col"><section class="card chart-card"><div class="card-heading"><div><h2>Service demand</h2><p>Illustrative combined submissions · last 7 days</p></div><span class="pill pill-neutral">Demo trend</span></div><div class="chart-statline"><strong>' +
      state.applications.length +
      '</strong><span>sample service records</span></div><div class="chart-wrap">' +
      trendChart(vals, "#128048", "illustrative service demand trend") +
      '</div></section><section class="card card-pad"><div class="card-heading"><div><h2>Sample activity by LGA</h2><p>Illustrative distribution · not official statistics</p></div></div><div class="bar-list">' +
      lgaData
        .map(function (d) {
          return (
            '<div><div class="bar-item-head"><span>' +
            esc(d.name) +
            "</span><strong>" +
            d.n +
            '%</strong></div><div class="bar-track"><div class="bar-fill" style="width:' +
            d.n +
            '%"></div></div></div>'
          );
        })
        .join("") +
      "</div></section></div>" +
      '<div class="section-title-row"><div><h2>Portfolio indicators</h2><p>Use definitions, sources, owners and reporting periods before sharing numbers publicly.</p></div></div><div class="metric-grid">' +
      metricCard(
        "Land restoration",
        "—",
        "Connect verified GIS / M&E source",
        "leaf",
        "green",
        "No live source",
      ) +
      metricCard(
        "Tree survival",
        "—",
        "Use post-planting verification",
        "forestry",
        "blue",
        "No live source",
      ) +
      metricCard(
        "Inspection closure",
        "—",
        "Define denominator and period",
        "inspections",
        "amber",
        "No live source",
      ) +
      metricCard(
        "Waste diversion",
        "—",
        "Reconcile facility weighbridge data",
        "sanitation",
        "purple",
        "No live source",
      ) +
      "</div>"
    );
  };
})(window);
