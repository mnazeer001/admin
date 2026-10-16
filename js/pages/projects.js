(function (global) {
  "use strict";
  global.GombePageModules = global.GombePageModules || {};
  global.GombePageModules.projects = function renderProjects(context) {
    const {
      deleteButton,
      esc,
      icon,
      localBadge,
      mediaById,
      mediaSrc,
      moduleStat,
      pageHeader,
      pill,
      state,
    } = context;
    return (
      pageHeader(
        "Programme management",
        "Projects & programmes",
        "Coordinate the Ministry’s afforestation, land-restoration, erosion-control, waste and climate-resilience portfolio.",
        localBadge() +
          '<button class="button button-primary" type="button" data-action="open-create" data-type="project">' +
          icon("plus", 15) +
          "Add programme</button>",
      ) +
      '<div class="info-callout">' +
      icon("chart", 15) +
      "<span><strong>Evidence note:</strong> progress values below are illustrative prototype values, not validated ministry performance figures. Confirm official milestones and data sources before publication.</span></div>" +
      '<div class="module-stats">' +
      moduleStat(
        "Portfolio entries",
        state.projects.length,
        "Afforestation, land, waste, climate",
      ) +
      moduleStat(
        "Needs attention",
        state.projects.filter(function (p) {
          return p.status === "Needs attention";
        }).length,
        "Sample project flags",
      ) +
      moduleStat(
        "Partner delivery",
        "Multi-agency",
        "Department and partner teams",
      ) +
      moduleStat("Reporting cadence", "Quarterly", "Example configuration") +
      "</div>" +
      '<section class="project-grid">' +
      state.projects
        .map(function (p) {
          const photo = mediaById(p.imageMediaId);
          return (
            '<article class="card project-card"><img class="project-image" src="' +
            esc(mediaSrc(photo)) +
            '" alt="' +
            esc(photo ? photo.alt : p.title) +
            '" loading="lazy"><div class="project-top"><span class="project-mark">' +
            icon(
              p.title.toLowerCase().includes("waste") ||
                p.title.toLowerCase().includes("recycl")
                ? "recycle"
                : "leaf",
              17,
            ) +
            "</span>" +
            pill(p.status) +
            "</div><h3>" +
            esc(p.title) +
            '</h3><div class="project-theme">' +
            esc(p.theme) +
            " · " +
            esc(p.lga) +
            "</div><p>" +
            esc(p.summary) +
            '</p><div class="project-progress-label"><span>Illustrative progress</span><strong>' +
            esc(p.progress) +
            '%</strong></div><div class="progress-track" role="progressbar" aria-valuenow="' +
            esc(p.progress) +
            '" aria-valuemin="0" aria-valuemax="100" aria-label="' +
            esc(p.title) +
            ' progress"><div class="progress-fill" style="width:' +
            Math.max(0, Math.min(100, Number(p.progress))) +
            '%"></div></div><div class="project-card-foot"><span>Next: ' +
            esc(p.milestone) +
            '</span><button class="button button-secondary" type="button" data-action="open-project" data-id="' +
            esc(p.id) +
            '">' +
            icon("edit", 13) +
            "Manage</button>" +
            deleteButton("project", p.id, p.title) +
            "</div></article>"
          );
        })
        .join("") +
      "</section>"
    );
  };
})(window);
