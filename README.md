# Mero Chef Privacy Policy Site

Static, multilingual privacy policy website for the **Mero Chef** mobile apps (Android and iOS), served at <https://merochef.com>. Built with Vite, React, TypeScript, and react-i18next, like AntySpendPrivacy.

## Quick start

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview production build
npm run lint
```

## Configuration

Edit `src/config/site.ts` to change global settings:

| Constant | Value | Purpose |
|----------|-------|---------|
| `CONTACT_EMAIL` | `privacy+merochef@techno-volution.com` | Contact address shown in the policy |
| `EFFECTIVE_DATE` | `2026-10-08` | Policy effective date (ISO format). Change it whenever the policy text changes |
| `APP_NAME` | `Mero Chef` | App name used in metadata |
| `SITE_URL` | `https://merochef.com` | The site's address |

The header name, page title and every section's text come from the locale files below (`header.appName`, `meta.pageTitle`, and the text itself), so a rename needs those edited too.

## Translations

Privacy content lives in JSON files under `src/i18n/locales/`:

- `en.json` — English (fallback)
- `es.json`, `de.json`, `fr.json`, `it.json`, `pt.json`

Each file has exactly the same structure and the same sections, written for what Mero Chef does on Android and iOS: the pantry that stays on the phone, the optional Google account and, on iOS, Sign in with Apple, the AI features (recipes, photos, kitchen video, voice, name suggestions) and how their requests are handled, subscriptions through Google Play and the App Store, what is stored on the server, device permissions (including iOS's camera, speech recognition and App Tracking Transparency prompts), advertising (Google AdMob, planned), account deletion, retention and your rights. The iOS wording follows AntySpendPrivacy's.

To add or edit a language:

1. Copy `en.json` to a new locale file (or edit an existing one). Keep every key, list and `{{email}}` placeholder: a list that is a series of steps has `"ordered": true`.
2. Register the locale in `src/i18n/index.ts` (`resources` and `SUPPORTED_LANGUAGES`).
3. Run `npm run build` to verify.

The language switcher persists the user's choice in `localStorage` under `merochef-privacy-lang`.

Each section has an anchor, so a link can point at one: `https://merochef.com/#accountDeletion` is the page for deleting an account.

## Keep it true

This text describes what the apps and the API do; when any of them changes, change the policy first (and the effective date). What it relies on, in `ChefAndroid` and `ChefApi`:

- The app asks for `INTERNET`, `POST_NOTIFICATIONS` and `RECORD_AUDIO` (plus Google Play Billing) and keeps backups off. If a permission or an SDK (analytics, crash reporting) is added, update **Device permissions**, **Log Data** and Google Play's Data safety form.
- The API stores, per account: Google id, email, name, creation date; hashed session tokens with an installation id; Play purchase tokens and plan state; monthly AI usage. Its logs hold IP, path, status, timing and request id, never request contents. If that changes, update **What we store about your account** and **Log Data**.
- The AI requests go through OpenRouter with zero-data-retention routing and no data collection for training (see `ChefApi/src/llm/openRouterClient.ts`).
- **Advertising** (Google AdMob banners; Google's User Messaging Platform for consent on Android, App Tracking Transparency on iOS) is described ahead of the version that adds it. When it ships, also declare the advertising ID in Play Console and the tracking answers in App Store Connect.
- **iOS** is described ahead of its release, like advertising: Sign in with Apple, App Store subscriptions, the Keychain, and the camera, microphone, speech-recognition, notification and tracking prompts. The iOS app and `ChefApi` must really do this (today the API accepts only Google sign-in and verifies only Google Play purchases), or the policy and the Play Console/App Store privacy answers must be adjusted. The iOS camera behaviour (asks for camera access; photo picker needs no permission) and the "person icon in the top bar" step of account deletion are assumptions to confirm when the iOS app exists.
- Cloud sync and household sharing are not built yet. When they are, add them to **Information Collection** and **Retention** before they go live.

## Deploy

The site builds to static files in `dist/`. It is meant for Azure Static Web Apps (like AntySpendPrivacy):

1. Create a Static Web App in Azure from this repository: build preset **Custom**, app location `/`, output location `dist`. Azure adds the GitHub workflow with its own deployment token; this repo does not carry one.
2. Add the custom domain `merochef.com` in the Static Web App.
3. `public/staticwebapp.config.json` makes any path (for example `/privacy` or `/privacy-policy`) open the policy, so any of them can be given to Google Play.

For a custom domain at the site root, keep `base: '/'` in `vite.config.ts` (default).

## Android and Google Play

- In Play Console, set **Privacy policy** to `https://merochef.com/` and the **account deletion** URL to `https://merochef.com/#accountDeletion`.
- Fill in the **Data safety** form from the same facts as the policy (see "Keep it true").

## iOS and the App Store

- In App Store Connect, set the **Privacy Policy URL** to `https://merochef.com/` and fill in the **App Privacy** answers from the same facts. The account deletion link above also serves App Review's requirement for in-app account deletion (the app itself must offer it).

## Legal note

This policy text is an informational template based on Mero Chef's actual data practices. It does not replace professional legal review.
