(function (global) {
  "use strict";
  global.GombePageModules = global.GombePageModules || {};
  global.GombePageModules.newsroom = function renderNewsroom(context) {
    const {
      deleteButton,
      esc,
      filterToolbar,
      icon,
      localBadge,
      pageHeader,
      pill,
      state,
    } = context;
    const statuses = ["Snapshot", "Draft", "Ready for review", "Archived"];
    const select =
      '<select class="filter-select" id="newsroomStatus" data-filter-group="newsroom" aria-label="Filter newsroom status"><option value="">All states</option>' +
      statuses
        .map(function (s) {
          return "<option>" + esc(s) + "</option>";
        })
        .join("") +
      "</select>";
    return (
      pageHeader(
        "Public communications",
        "Newsroom",
        "Manage public notices, press releases, project updates and environmental education stories.",
        localBadge() +
          '<button class="button button-primary" type="button" data-action="open-create" data-type="post">' +
          icon("plus", 15) +
          "Create story</button>",
      ) +
      '<div class="info-callout">' +
      icon("shield", 15) +
      "<span><strong>Responsible publishing:</strong> verify claims with the relevant technical department, avoid exposing complainant or child identities, include accessible image descriptions, and send high-impact notices for approval.</span></div>" +
      '<section class="card table-card"><div class="table-top"><div class="table-title"><h2>Stories &amp; notices</h2><p>Public-site snapshot plus locally saved prototype drafts</p></div><button class="button button-secondary" type="button" data-action="export-news">' +
      icon("download", 14) +
      "Export list</button></div>" +
      filterToolbar(
        "newsroom",
        "Search title, category, author…",
        select,
        "newsroomResult",
      ) +
      '<div class="table-scroll"><table><thead><tr><th>Title</th><th>Category</th><th>Publish date</th><th>Owner</th><th>State</th><th></th></tr></thead><tbody>' +
      state.posts
        .map(function (p) {
          const search = [p.id, p.title, p.category, p.author]
            .join(" ")
            .toLowerCase();
          return (
            '<tr class="newsroom-row" data-search="' +
            esc(search) +
            '" data-status="' +
            esc(p.status.toLowerCase()) +
            '"><td><button class="table-ref" type="button" data-action="edit-post" data-id="' +
            esc(p.id) +
            '">' +
            esc(p.title) +
            '</button><span class="table-secondary">' +
            esc(p.excerpt) +
            "</span></td><td>" +
            esc(p.category) +
            "</td><td>" +
            esc(p.date) +
            "</td><td>" +
            esc(p.author) +
            "</td><td>" +
            pill(p.status) +
            '</td><td><div class="table-actions">' +
            (p.status === "Draft" || p.status === "Ready for review"
              ? deleteButton("post", p.id, p.title)
              : "") +
            '<button class="icon-button" type="button" data-action="edit-post" data-id="' +
            esc(p.id) +
            '" aria-label="Edit story">' +
            icon("edit", 14) +
            "</button></div></td></tr>"
          );
        })
        .join("") +
      "</tbody></table></div></section>" +
      '<div class="info-callout section-spacer">' +
      icon("info", 15) +
      "<span>Website content shown as a snapshot is not fetched or synced live. Use the public site’s official deployment process to publish verified updates.</span></div>"
    );
  };
})(window);
