# Gombe Environment Admin — modular frontend prototype

A static, multi-page frontend prototype for the Gombe State Ministry of Environment & Forest Resources website. Each admin area has its own HTML entry point and page-renderer JavaScript file; shared navigation, actions, state and reusable styles stay in common files.

## Project structure

- `index.html` — demo sign-in screen
- `dashboard.html`, `services.html`, `reports.html`, `inspections.html`, `projects.html`, `programs.html`, `forestry.html`, `sanitation.html`, `portal.html`, `pages.html`, `newsroom.html`, `media.html`, `departments.html`, `staff.html`, `analytics.html`, `audit.html`, `settings.html` — individual admin page entry points
- `partials/admin-shell.html` — shared sidebar, top bar, main content area, modal and toast containers
- `css/admin.css`, `css/login.css` — admin and sign-in styles
- `js/pages/` — one readable page renderer per module, including `dashboard.js`, `services.js`, `projects.js`, `programs.js`, and the other admin sections
- `js/admin.js` — shared navigation, local state, actions, forms, confirmation safeguards and exports
- `js/auth.js`, `js/bootstrap.js`, `js/data.js` — demo sign-in, shared-shell/page loader and illustrative sample data
- `assets/img/` — bundled illustrative photography and Gombe crest SVG

## Run locally

The shared shell and page renderers are loaded through JavaScript, so serve this folder over HTTP rather than opening HTML files directly. From this directory, run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## Demo access and limitations

The sign-in page is a **demo gate, not authentication**. It accepts a valid-format email and any non-empty password, clears both fields, and stores only a tab-local demo-session flag. Do not enter a real password. No credentials are verified or transmitted.

All records and metrics are synthetic. Edits are stored in this browser's `localStorage`. Portal pages, stories and media are local drafts/previews; an export downloads a content package but does not publish or change the live website. The app has no backend, permission enforcement, live citizen submissions, CMS integration or live publishing connection. It cannot modify `https://mnazeer001.github.io/gombe_environment/`.

## Demo deletion safeguards

Deletion is limited to eligible synthetic records in this browser: service requests, environmental reports, inspections, projects, newsroom items still in `Draft` or `Ready for review`, and locally uploaded media that is not assigned to the portal hero or a project. Each deletion requires confirmation and is recorded in the local activity log. Public-site snapshots, bundled images, assigned media, pages, staff, departments and other core records are retained. For a real Ministry system, follow approved records-retention rules and prefer archive/close workflows over hard deletion.

For production, use approved backend authentication and authorisation, retention controls, audit logging and deployment tooling.
