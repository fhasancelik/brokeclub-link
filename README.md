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

## SEO pages (`/en/`, `/tr/`)

Landing pages for Google, one per search query, in English and Turkish. Unlike `/`, they never
redirect: a visitor reads the page and taps a store button.

| English | Turkish |
|---|---|
| `/en/` | `/tr/` |
| `/en/no-spend-challenge-app/` | `/tr/para-biriktirme-uygulamasi/` |
| `/en/no-spend-calendar/` | `/tr/harcamasiz-gun-challenge/` |
| `/en/stop-impulse-buying/` | `/tr/durtusel-alisverisi-durdurma/` |
| `/en/savings-challenge-with-friends/` | `/tr/arkadaslarla-para-biriktirme/` |
| `/en/black-friday-no-spend-challenge/` | `/tr/black-friday-harcamasiz-challenge/` |
| `/en/no-buy-challenge/` (English only) | `/tr/butce-takibi/` (Turkish only) |
| `/en/no-spend-january/` (English only) | `/tr/kumbara-uygulamasi/` (Turkish only) |

Pages on the same row are linked with `hreflang` (x-default is the English one). Each page is
`<lang>/<slug>/index.html` and its canonical URL ends in a slash.

Store buttons carry the page as the campaign, so clicks show up per page:
- "Get the app" → `/?utm_source=seo&utm_campaign=<lang>-<slug>` (counted in `link_visits`)
- App Store → `?ct=seo-<lang>-<slug>`, Google Play → `referrer=utm_source=seo&utm_campaign=<lang>-<slug>`

### Editing and regenerating

All copy lives in `seo/pages.mjs`; the HTML, `sitemap.xml` and `robots.txt` are generated and
checked in. After editing:

```sh
node seo/build.mjs        # writes en/**, tr/**, sitemap.xml, robots.txt; prints word counts and checks
node seo/build.mjs --og   # same, and re-renders assets/og-en.png + og-tr.png with headless Chrome
```

The build fails if a page body leaves 280–420 words or the copy contains a banned claim
("free app", "free forever", "#1", ratings…). Pricing is always "try free for 7 days", then Pro.

Images and fonts in `assets/` come from the project folder next to this repo (3D Penny,
simulator screenshots, Poppins). To remake them:

```sh
~/.venvs/hyperframes/bin/python seo/assets.py   # needs Pillow and fontTools[woff]
```

`*.png` is served with a one-year immutable cache (see `vercel.json`), so give a changed OG image
a new file name rather than overwriting it.
