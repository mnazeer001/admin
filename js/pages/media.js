(function (global) {
  "use strict";
  global.GombePageModules = global.GombePageModules || {};
  global.GombePageModules.media = function renderMedia(context) {
    const {
      deleteButton,
      esc,
      icon,
      localBadge,
      mediaSrc,
      moduleStat,
      pageHeader,
      pill,
      state,
    } = context;
    return (
      pageHeader(
        "Public website",
        "Media library",
        "Review the site’s photo assets, edit captions and accessible descriptions, and add a local image draft.",
        localBadge() +
          '<button class="button button-primary" type="button" data-action="upload-media">' +
          icon("plus", 14) +
          'Upload image</button><input class="hidden" id="mediaUpload" type="file" accept="image/jpeg,image/png,image/webp" aria-label="Choose an image to upload">',
      ) +
      '<div class="info-callout">' +
      icon("info", 15) +
      "<span><strong>Asset handling:</strong> bundled photos and Gombe crest are copied from the public-site assets for this prototype. New uploads are resized and stored only in this browser. Confirm image rights, consent and caption accuracy before official publication; alt text should describe the image’s purpose.</span></div>" +
      '<div class="module-stats">' +
      moduleStat(
        "Library images",
        state.media.length,
        "Includes bundled portal images and uploads",
      ) +
      moduleStat(
        "Accessibility",
        state.media.filter(function (m) {
          return !!m.alt;
        }).length + " described",
        "Alt text is editable per image",
      ) +
      moduleStat(
        "Image categories",
        new Set(
          state.media.map(function (m) {
            return m.category;
          }),
        ).size,
        "Afforestation, erosion, waste, conservation",
      ) +
      moduleStat("Live sync", "Off", "No upload reaches the public site") +
      "</div>" +
      '<section class="media-grid">' +
      state.media
        .map(function (m) {
          const mediaAssigned =
            state.portal.heroMediaId === m.id ||
            state.projects.some(function (project) {
              return project.imageMediaId === m.id;
            });
          return (
            '<article class="card media-card"><img class="media-card-image" src="' +
            esc(mediaSrc(m)) +
            '" alt="' +
            esc(m.alt || "") +
            '" loading="lazy"><div class="media-card-body"><div class="media-card-title"><div><h3>' +
            esc(m.title) +
            "</h3></div>" +
            pill(m.category) +
            "</div><p>" +
            esc(m.caption || "No caption added yet.") +
            '</p><div class="media-meta"><span>' +
            esc(m.usage || "Unassigned") +
            "</span>" +
            (m.source === "Local upload" && !mediaAssigned
              ? deleteButton("media", m.id, m.title)
              : "") +
            '<button class="button button-secondary" type="button" data-action="edit-media" data-id="' +
            esc(m.id) +
            '">' +
            icon("edit", 12) +
            "Edit text</button></div></div></article>"
          );
        })
        .join("") +
      "</section>"
    );
  };
})(window);
