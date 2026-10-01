# Fhenix Africa — Training LMS (Frontend Prototype)

A responsive Learning Management System frontend for Fhenix Africa, built with HTML5, CSS3 and vanilla JavaScript. Data persists in the browser's `localStorage`, so it's ready to demo immediately and structured so a real backend (Node/Express, PHP/MySQL, Firebase, etc.) can be dropped in later.

## Running it

No build step needed — open `index.html` in a browser, or serve the folder with any static server (e.g. `npx serve .`). All pages read/write from `localStorage`, so use the same browser for the full flow.

## Demo accounts

**Trainee login** (`login.html`)
| Email | Password |
|---|---|
| amaka@example.com | password1 |
| chinedu@example.com | password1 |
| grace@example.com | password1 |

Or register a new trainee account from `register.html`.

**Admin login** (`admin-login.html`) — kept out of the public UI on purpose:
- Username: `admin@fhenixafrica.com`
- Password: `FhenixAdmin#2023`

(Defined in `assets/js/data.js` as `FX_ADMIN` — replace this with real authentication against a backend before going live.)

## Structure

```
index.html            Landing page
register.html         Trainee registration
login.html            Trainee login
admin-login.html      Admin login (separate from trainee auth)
trainee/               Trainee dashboard, training, videos, payments, receipts, certificate, profile
admin/                 Admin dashboard, trainees, tracks, lessons, progress, payments, receipts, certificates, reports
assets/css/style.css   Shared design system
assets/js/data.js      Data model + demo data seeding (localStorage)
assets/js/auth.js      Trainee/admin authentication
assets/js/app.js       Shared UI helpers (toasts, modals, sidebar, formatting)
```

## What's implemented

- Registration → personalized dashboard, lessons and progress based on selected track
- Trainee: dashboard, training/module progress, class videos with mark-as-completed, payments, receipt upload, certificate view, profile + password settings
- Admin: dashboard, trainee management (search/filter), individual trainee profile, track management (add/edit/delete), class content management, progress monitoring, payment overview, receipt verification (auto-updates trainee balance), certificate issuance, reports

## Known simplifications (frontend-only prototype)

- Files (profile pictures, receipts, certificates) are recorded by file name only — nothing is actually uploaded/stored.
- Notifications/announcements are shown on the dashboard but there's no admin composer UI for them yet.
- Password reset is a placeholder message rather than an email flow.
- Video playback uses a placeholder embed URL — swap `videoUrl` in the lesson records for real YouTube/Vimeo/MP4 links.

## Next steps for a production version

Replace `assets/js/data.js` and `assets/js/auth.js` with real API calls to a backend, move admin credentials to that backend entirely, and add real file storage (e.g. cloud storage) for receipts, profile pictures and certificates.
