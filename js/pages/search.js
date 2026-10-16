(function (global) {
  "use strict";
  global.GombePageModules = global.GombePageModules || {};
  global.GombePageModules.search = function renderSearch(context) {
    const { esc, globalQuery, localBadge, pageHeader, searchResults } = context;
    return (
      pageHeader(
        "Workspace search",
        "Search results",
        "Search across the illustrative records and public-site content represented in this prototype.",
        localBadge(),
      ) +
      '<div class="section-title-row" style="margin-top:0"><div><h2>Results for “' +
      esc(globalQuery) +
      "”</h2><p>Only locally stored sample data is searched.</p></div></div>" +
      searchResults(globalQuery)
    );
  };
})(window);
