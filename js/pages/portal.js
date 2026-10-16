(function (global) {
  "use strict";
  global.GombePageModules = global.GombePageModules || {};
  global.GombePageModules.portal = function renderPortal(context) {
    const {
      crestSvg,
      esc,
      icon,
      localBadge,
      mediaById,
      mediaSrc,
      moduleStat,
      pageHeader,
      state,
    } = context;
    const p = state.portal;
    const hero = mediaById(p.heroMediaId);
    return (
      pageHeader(
        "Public website",
        "Manage the public portal",
        "Preview the public site’s visual identity and coordinate local drafts for the homepage, pages, newsroom and gallery.",
        localBadge() +
          '<a class="button button-secondary" href="https://mnazeer001.github.io/gombe_environment/" target="_blank" rel="noopener noreferrer">' +
          icon("external", 14) +
          'Open live portal</a><button class="button button-primary" type="button" data-action="export-portal">' +
          icon("download", 14) +
          "Export content package</button>",
      ) +
      '<div class="info-callout">' +
      icon("shield", 15) +
      "<span><strong>Connection status: frontend only.</strong> This prototype cannot write to or publish changes at the GitHub Pages URL. Edit local drafts here, review the visual preview, then export a content package for an authorised publishing workflow.</span></div>" +
      '<div class="portal-layout"><section class="portal-preview"><div class="portal-preview-top"><strong>Public-site homepage · local preview</strong><span class="pill pill-outline">Not live</span></div><div class="portal-preview-sitehead">' +
      crestSvg("portal-crest") +
      '<div class="portal-sitebrand">Ministry of Environment<br>&amp; Forest Resources<span>Gombe State, Nigeria</span></div><nav class="portal-site-nav" aria-label="Homepage preview navigation"><span>Home</span><span>About</span><span>Departments</span><span>Services</span><span>Projects</span><span>News</span><span>Gallery</span><span>Contact</span></nav></div><div class="portal-hero"><img class="portal-hero-image" src="' +
      esc(mediaSrc(hero)) +
      '" alt="' +
      esc(hero ? hero.alt : "Gombe landscape") +
      '"><div class="portal-hero-copy"><span class="portal-badge">' +
      esc(p.heroBadge) +
      "</span><h2>" +
      esc(p.heroHeadline) +
      "</h2><p>" +
      esc(p.heroIntro) +
      '</p><div class="portal-cta-row"><span class="portal-cta">' +
      esc(p.primaryCta) +
      '</span><span class="portal-cta secondary">' +
      esc(p.secondaryCta) +
      '</span></div></div></div><div class="portal-preview-footer">Preview assembled from local draft content and bundled site imagery · no publication action</div></section><aside><section class="card portal-control-card"><h2>Live portal connection</h2><p>The public site is a static GitHub Pages website. This frontend has no repository credentials or deployment integration.</p><div class="portal-url">' +
      icon("globe", 14) +
      '<span>mnazeer001.github.io/gombe_environment/</span></div><div class="portal-status"><span class="portal-status-dot"></span>Read-only link · not connected to CMS</div><a class="button button-secondary" style="margin-top:12px" href="https://mnazeer001.github.io/gombe_environment/" target="_blank" rel="noopener noreferrer">Open public site ' +
      icon("external", 13) +
      '</a></section><section class="card portal-control-card"><h2>Homepage settings</h2><p>Update the local hero headline, intro, call-to-action labels and image selection.</p><button class="button button-primary" type="button" data-action="edit-portal">' +
      icon("edit", 14) +
      "Edit homepage draft</button></section></aside></div>" +
      '<div class="module-stats section-spacer">' +
      moduleStat(
        "Managed pages",
        state.pages.length,
        "Includes the public photo gallery",
      ) +
      moduleStat(
        "Newsroom items",
        state.posts.length,
        "Snapshot stories and local drafts",
      ) +
      moduleStat(
        "Media assets",
        state.media.length,
        "Public-site images plus local uploads",
      ) +
      moduleStat("Brand palette", "Matched", "Gombe green · gold · white") +
      "</div>" +
      '<div class="portal-manage-grid"><article class="card portal-manage-card"><span class="metric-icon green">' +
      icon("pages", 16) +
      '</span><strong>Website pages</strong><p>Home, About, Services, Projects, Departments, News, Gallery and Contact.</p><button class="button button-secondary" type="button" data-view="pages">Manage pages ' +
      icon("arrow", 12) +
      '</button></article><article class="card portal-manage-card"><span class="metric-icon amber">' +
      icon("newsroom", 16) +
      '</span><strong>Newsroom</strong><p>Prepare public notices, announcements and project updates for review.</p><button class="button button-secondary" type="button" data-view="newsroom">Manage stories ' +
      icon("arrow", 12) +
      '</button></article><article class="card portal-manage-card"><span class="metric-icon blue">' +
      icon("eye", 16) +
      '</span><strong>Media library</strong><p>Choose hero and project images; maintain captions and descriptive alt text.</p><button class="button button-secondary" type="button" data-view="media">Manage media ' +
      icon("arrow", 12) +
      "</button></article></div>"
    );
  };
})(window);
