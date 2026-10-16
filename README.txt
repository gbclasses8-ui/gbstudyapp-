GB STUDY — Front-end prototype (database-ready handoff)
======================================================

Open / test:
- Extract this ZIP.
- Open index.html in a browser, or upload the whole GB_STUDY_App folder to static hosting (Vercel/GitHub Pages).
- Keep assets/gb-study-logo.png beside index.html.

Included:
- GB STUDY splash screen with supplied black/gold logo
- Home platform list, favorites, free/VIP grouping and external/same-tab opening
- Up to 100 platform cards, editable in Admin Panel
- VIP hub and clickable VIP plans that open Telegram support
- Telegram support popup on app open (dismissible for the current tab session)
- Demo VIP key generator with 30/90/180/365-day or no-expiry options
- Demo key expiry check and one-browser/device binding
- Chat UI with local-only demo messages and admin-message form
- Account, profile, daily streak, rewards and study analytics demo UI
- Admin Panel password (demo): GBADMIN2026
- Platform icon by URL or upload, edit/delete platform, free/VIP type, open mode
- VIP display price manager, generated key list/delete, JSON export/import backup

IMPORTANT LIMITATIONS BEFORE PUBLIC LAUNCH:
This is a front-end prototype. Admin password, platform settings, and generated VIP keys are stored in browser localStorage and are not secure or shared across users. The one-device lock only demonstrates the intended behavior in this browser; it is NOT a secure device lock. Do not use this as real paid VIP access until server-side authentication, database-backed keys, expiry enforcement, and device binding are added. The chat is local-only, payments are not processed, and user accounts are not real. A database alone is not enough; frontend code must be connected to a secure backend/API.

Some default sample platform URLs are placeholders. Use Admin Panel to replace them with your real URLs.


ICON / SPLASH FIX:
- Local GB STUDY logo is bundled under assets/gb-study-logo.png.
- Added favicon.ico, 96px favicon, Apple touch icon, PWA manifest and 192px/512px app icons.
- Splash screen uses the bundled local logo; no external image URL required.
- For Android home-screen icon, deploy the site over HTTPS and use browser menu > Add to Home screen / Install app. A WebView/APK builder may require setting its launcher icon separately.

LOGO DISPLAY FIX: The main logo image is embedded directly in index.html, so splash/header/logo should still display if you copy only index.html into a simple HTML wrapper. For installed APK launcher icon, set assets/icon-512.png as the app icon in the APK builder separately. For web hosting, upload the whole folder to preserve manifest and standalone icon files.


Feature update: Added client-side platform search and an Upcoming Platforms section. Upcoming list is a local editable-in-code starter list, not synced to a server. Search filters platforms already configured in this app.


ULTIMATE FEATURES UPDATE
- Added Study Tools panel with daily goal tracker, recent platforms, quick maths quiz, local XP rewards, and notice board.
- Platform opens are recorded in local recent history.
- These features save in this browser/device only. No cloud database was created because a database account/project and its public configuration/credentials were not supplied. Do not put private service-role keys in frontend HTML. For cross-device sync, connect a backend (for example Firebase or Supabase) with appropriate project settings and security rules.
- Admin password in this prototype remains client-side and is not secure for a production site.

FIREBASE BACKEND STARTER ADDED
==============================
Files added: firebase-config.js, firebase-config.example.js, firebase-bridge.js,
firestore.rules, firebase.json, .firebaserc.example.

Important: this ZIP cannot be connected to a real cloud project until the owner
creates/selects a Firebase project and fills the project's PUBLIC Web App config
in firebase-config.js. No Firebase project credentials were supplied, so cloud
storage is not active yet. The Firebase bridge provides email/password auth,
profile helpers, realtime chat helpers and admin-checked platform data helpers;
the existing prototype's old demo UI is not automatically converted to secure
cloud auth just by adding these files. Do not advertise the app as fully cloud
connected until integration and testing are completed.

SETUP (one-time, owner must do this in their own account)
1. Open https://console.firebase.google.com/ and create/select a project.
2. Add a Web App in Project settings, then copy its Web config into firebase-config.js.
   The web config is not a service-account key. Never put service-account JSON or
   private server keys in this folder or browser code.
3. In Authentication > Sign-in method, enable Email/Password.
4. Create Firestore Database. Publish the included firestore.rules (Firebase CLI:
   firebase deploy --only firestore:rules after installing/configuring Firebase CLI).
5. For hosting with Firebase CLI, copy .firebaserc.example to .firebaserc and replace
   YOUR_FIREBASE_PROJECT_ID with your real project ID, then run firebase deploy.
6. Admin access requires a trusted server/admin process to assign the Firebase
   custom claim {"admin": true}; never grant admin by a client-side password alone.

The existing admin panel, local prototype settings, VIP keys and old email-only chat
are still demo/local features until wired to these Firebase helpers and tested.
Firestore rules intentionally deny public writes. This protects data but means an
admin claim must be configured before admin platform publishing will work.


PLATFORM UPDATE (2026-10-16)
- Added PW platform card linking to https://pw.deltaverse.site/study/batches
- Added supplied PW icon using its direct ImgBB image URL.
- Existing local installs receive the platform through a small localStorage migration.


Platform cleanup update (2026-10-16): Only the PW platform is included. Existing browser-local app data is also migrated to show only PW on startup. This changes the website package; redeploy it for the live website to update.
