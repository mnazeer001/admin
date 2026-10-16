(function (global) {
  "use strict";
  global.GombePageModules = global.GombePageModules || {};
  global.GombePageModules.pages = function renderPages(context) {
    const { esc, icon, localBadge, pageHeader, pill, state } = context;
    const icons = {
      home: "overview",
      about: "departments",
      services: "requests",
      departments: "departments",
      projects: "projects",
      news: "newsroom",
      gallery: "eye",
      contact: "phone",
    };
    return (
      pageHeader(
        "Website content management",
        "Website pages",
        "Review the public site’s core pages and prepare local content drafts. No changes are published to the live website from this prototype.",
        localBadge() +
          '<a class="button button-secondary" href="https://mnazeer001.github.io/gombe_environment/" target="_blank" rel="noopener noreferrer">' +
          icon("external", 14) +
          "Open public website</a>",
      ) +
      '<div class="info-callout">' +
      icon("info", 15) +
      "<span><strong>Static-site boundary:</strong> this admin is a separate frontend concept. Page edits are stored only in this browser as draft metadata; there is no CMS, GitHub publishing connection, or live-site write access.</span></div>" +
      '<div class="page-card-grid">' +
      state.pages
        .map(function (p) {
          return (
            '<article class="card page-card"><div class="page-card-top"><span class="page-card-icon">' +
            icon(icons[p.id] || "pages", 16) +
            "</span>" +
            pill(p.status) +
            "</div><h3>" +
            esc(p.title) +
            "</h3><p>" +
            esc(p.summary) +
            '</p><div class="page-card-foot"><span>Updated ' +
            esc(p.updated) +
            '</span><button class="button button-secondary" type="button" data-action="edit-page" data-id="' +
            esc(p.id) +
            '">' +
            icon("edit", 13) +
            "Edit draft</button></div></article>"
          );
        })
        .join("") +
      "</div>" +
      '<div class="section-title-row"><div><h2>Content governance</h2><p>Suggested publishing workflow for a public-sector website</p></div></div><section class="card card-pad"><div class="bar-list" style="grid-template-columns:repeat(3,minmax(0,1fr));display:grid;gap:16px"><div><div class="metric-icon green" style="margin-bottom:9px">' +
      icon("edit", 16) +
      '</div><strong style="font-size:10px;color:#345143">Draft</strong><div class="metric-foot">Editor writes concise, sourced copy and checks dates and contact details.</div></div><div><div class="metric-icon blue" style="margin-bottom:9px">' +
      icon("eye", 16) +
      '</div><strong style="font-size:10px;color:#345143">Review</strong><div class="metric-foot">A second authorised officer verifies facts, accessibility and privacy.</div></div><div><div class="metric-icon purple" style="margin-bottom:9px">' +
      icon("check", 16) +
      '</div><strong style="font-size:10px;color:#345143">Publish</strong><div class="metric-foot">Use the official publishing system and retain an audit trail.</div></div></div></section>'
    );
  };
})(window);
