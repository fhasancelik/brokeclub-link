# Broke Club — one link for both stores

A single page that sends iPhone users to the App Store and Android users to Google Play,
and shows both buttons to everyone else.

- iPhone / iPad → App Store
- Android → Google Play
- Desktop and anything else → both buttons, Apple first

## Query parameters

| Param | Effect |
|---|---|
| `?stay=1` | Skips the automatic redirect and shows the chooser. Useful for testing. |
| `?ppid=<uuid>` | Opens the iOS custom product page instead of the default listing. |
| `?utm_source=…` etc. | Carried through: `referrer` on Play, `ct` on the App Store. |

Example for a paid social campaign:
`/?utm_source=tiktok&utm_campaign=urge_game&ppid=3f0ddfc4-29c6-4b8e-a107-ef41abf9a3a5`

Static files only — no build step.
