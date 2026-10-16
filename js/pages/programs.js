(function (global) {
  "use strict";
  global.GombePageModules = global.GombePageModules || {};
  global.GombePageModules.programs = function renderPrograms(context) {
    const {
      state,
      esc,
      icon,
      localBadge,
      moduleStat,
      numberFormat,
      pageHeader,
      pill,
    } = context;
    const total = state.projects.length;
    const averageProgress = total
      ? Math.round(
          state.projects.reduce(
            (sum, project) => sum + Number(project.progress || 0),
            0,
          ) / total,
        )
      : 0;
    const onTrack = state.projects.filter((project) =>
      /on track|complete|active/i.test(project.status),
    ).length;
    const attention = state.projects.filter((project) =>
      /attention|overdue|blocked/i.test(project.status),
    ).length;
    const themes = {};
    state.projects.forEach((project) => {
      const theme =
        String(project.theme || "Other")
          .split("·")[0]
          .trim() || "Other";
      if (!themes[theme]) themes[theme] = { count: 0, progress: 0 };
      themes[theme].count += 1;
      themes[theme].progress += Number(project.progress || 0);
    });
    const themeRows = Object.entries(themes)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([theme, stats]) => {
        const progress = Math.round(stats.progress / stats.count);
        return (
          '<article class="card card-pad"><div class="card-heading"><div><h2>' +
          esc(theme) +
          "</h2><p>" +
          stats.count +
          " portfolio item" +
          (stats.count === 1 ? "" : "s") +
          '</p></div><span class="pill pill-green">' +
          progress +
          '% avg.</span></div><div class="bar-track"><div class="bar-fill" style="width:' +
          progress +
          '%"></div></div></article>'
        );
      })
      .join("");
    const actionItems = state.projects
      .filter((project) => /attention|overdue|blocked/i.test(project.status))
      .map(
        (project) =>
          '<div class="queue-item"><span class="queue-icon red">' +
          icon("warning", 15) +
          '</span><div class="queue-copy"><strong>' +
          esc(project.title) +
          "</strong><span>" +
          esc(project.status) +
          " · " +
          esc(project.milestone || "Review next milestone") +
          "</span></div></div>",
      )
      .join("");
    return (
      pageHeader(
        "Portfolio coordination",
        "Programmes",
        "Review environmental programme themes and portfolio-level progress. Detailed initiative records remain in the Projects workspace.",
        localBadge() +
          '<a class="button button-secondary" href="projects.html" data-view="projects">Open project register ' +
          icon("arrow", 13) +
          "</a>",
      ) +
      '<div class="info-callout">' +
      icon("info", 15) +
      "<span><strong>Illustrative portfolio only.</strong> These sample figures are for this local prototype; confirm official programme status before reporting or publication.</span></div>" +
      '<section class="module-stats">' +
      moduleStat(
        "Portfolio items",
        numberFormat(total),
        "Synthetic programme records",
      ) +
      moduleStat(
        "Average progress",
        averageProgress + "%",
        "Illustrative completion",
      ) +
      moduleStat("On track", numberFormat(onTrack), "Sample status labels") +
      moduleStat(
        "Needs attention",
        numberFormat(attention),
        "Review in the project register",
      ) +
      "</section>" +
      '<div class="section-title-row"><div><h2>Programme themes</h2><p>Grouped from the sample initiative themes</p></div></div>' +
      '<div class="two-col"><section class="program-theme-grid">' +
      (themeRows ||
        '<div class="card card-pad">No sample programme entries are available.</div>') +
      "</section>" +
      '<aside class="card card-pad"><div class="card-heading"><div><h2>Portfolio attention</h2><p>Items flagged for a follow-up review</p></div><span class="queue-count">' +
      attention +
      "</span></div>" +
      (actionItems ||
        '<div class="table-empty">No sample programme is flagged for attention.</div>') +
      '<div class="info-callout" style="margin-top:14px">' +
      icon("shield", 15) +
      "<span>Use approved monitoring data and named programme owners for official reports.</span></div></aside></div>"
    );
  };
})(window);
