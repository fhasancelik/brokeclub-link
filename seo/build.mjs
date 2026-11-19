#!/usr/bin/env node
// Builds the static SEO pages from seo/pages.mjs. No dependencies, Node 18+.
//
//   node seo/build.mjs          write en/**, tr/**, sitemap.xml, robots.txt and print a check report
//   node seo/build.mjs --og     also render assets/og-en.png and assets/og-tr.png with headless Chrome
//
// Layout: every page is <lang>/<slug>/index.html and its canonical URL ends with a slash
// (/en/, /en/no-spend-calendar/). Vercel serves that folder layout as-is with cleanUrls on,
// and `python3 -m http.server` serves it locally without any rewrites.
// The root index.html (the smart link that redirects phones to the stores) is not touched.

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { PAGES, SITE, UI } from './pages.mjs';

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const LANGS = ['en', 'tr'];
const PENNY = { src: '/assets/penny.webp', w: 400, h: 376 };
const FORBIDDEN = [
  /free forever/i,
  /free app/i,
  /free to join/i,
  /#1\b/,
  /ücretsiz uygulama/i,
  /tamamen ücretsiz/i,
  /(?<!ope)rating/i, // "operatingSystem" in the JSON-LD is fine
  /\bbedava\b/i,
];

// ───────────────────────────── helpers ─────────────────────────────

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;
/** Escaped text with [label](/path/) turned into links. */
const rich = (s) => esc(s).replace(LINK, (_, label, href) => `<a href="${href}">${label}</a>`);
/** Plain text with link syntax removed (for meta tags, JSON-LD and word counts). */
const plain = (s) => String(s).replace(LINK, '$1');
const words = (s) => plain(s).split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;

const path = (lang, slug) => `/${lang}/${slug ? `${slug}/` : ''}`;
const abs = (p) => SITE.origin + p;
const find = (lang, slug) => PAGES.find((p) => p.lang === lang && p.slug === slug);
const other = (lang) => (lang === 'en' ? 'tr' : 'en');
const pairOf = (page) => (page.pair === null ? null : find(other(page.lang), page.pair));
const campaign = (page) => `${page.lang}-${page.slug || 'home'}`;

function storeUrls(page) {
  const c = campaign(page);
  return {
    smart: `${SITE.origin}/?utm_source=seo&utm_campaign=${c}`,
    ios: `${SITE.appStore}?ct=seo-${c}`,
    play: `${SITE.play}&referrer=${encodeURIComponent(`utm_source=seo&utm_campaign=${c}`)}`,
  };
}

/** Width and height of a WebP file (lossy, lossless or extended). */
function webpSize(file) {
  const b = readFileSync(file);
  const chunk = b.toString('ascii', 12, 16);
  if (chunk === 'VP8 ') return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
  if (chunk === 'VP8L') {
    const bits = b.readUInt32LE(21);
    return { w: (bits & 0x3fff) + 1, h: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (chunk === 'VP8X') return { w: b.readUIntLE(24, 3) + 1, h: b.readUIntLE(27, 3) + 1 };
  throw new Error(`Unknown WebP chunk in ${file}`);
}

// ───────────────────────────── markup pieces ─────────────────────────────

const APPLE_SVG =
  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.4 12.8c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.8.8-3.6 2.1-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.2 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7c1.2 0 1.9-1 2.6-2.1.8-1.2 1.2-2.4 1.2-2.5-.1 0-2.2-.9-2.2-3.2zM14.2 6.2c.6-.7 1-1.7.9-2.7-.9 0-2 .6-2.6 1.3-.6.6-1.1 1.7-1 2.6 1 .1 2-.5 2.7-1.2z"/></svg>';
const PLAY_SVG =
  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.6 2.2c-.3.3-.5.8-.5 1.4v16.8c0 .6.2 1.1.5 1.4l.1.1 9.4-9.4v-.2L3.6 2.2zM17 15.3l-3.1-3.1v-.2L17 8.9l.1.1 3.7 2.1c1.1.6 1.1 1.6 0 2.2L17.1 15.2l-.1.1zM16 16.3l-3.2-3.2-9.4 9.4c.4.4 1 .4 1.7.1l10.9-6.3zM16 7.9L5.1 1.6c-.7-.4-1.3-.3-1.7.1l9.4 9.4L16 7.9z"/></svg>';

function cta(page) {
  const t = UI[page.lang];
  const u = storeUrls(page);
  return `<div class="cta" data-wc="skip">
      <a class="pill" href="${esc(u.smart)}">${esc(t.getApp)}</a>
      <div class="stores">
        <a class="store" href="${esc(u.ios)}">${APPLE_SVG}<span>${esc(t.appStore)}</span></a>
        <a class="store" href="${esc(u.play)}">${PLAY_SVG}<span>${esc(t.play)}</span></a>
      </div>
      <p class="price">${esc(t.price)}</p>
    </div>`;
}

// Screenshots always sit below the hero, so they load lazily; the hero Penny gets the priority.
function figure(shot) {
  const file = join(REPO, 'assets/shots', `${shot.file}.webp`);
  const { w, h } = webpSize(file);
  return `<figure class="shot ${shot.kind}">
        <img src="/assets/shots/${shot.file}.webp" width="${w}" height="${h}" alt="${esc(shot.alt)}" loading="lazy" decoding="async">
        <figcaption>${esc(shot.caption)}</figcaption>
      </figure>`;
}

function sections(page) {
  let flip = false;
  return page.sections
    .map((s) => {
      const text = `<div class="feat-text">
        <h2>${esc(s.h2)}</h2>
        ${s.p.map((p) => `<p>${rich(p)}</p>`).join('\n        ')}
      </div>`;
      if (!s.shot) return `<section class="feat wrap">\n      ${text}\n    </section>`;
      const cls = ['feat', 'wrap', 'has-shot', s.shot.kind === 'crop' ? 'wide' : '', flip ? 'flip' : '']
        .filter(Boolean)
        .join(' ');
      flip = !flip;
      return `<section class="${cls}">\n      ${text}\n      ${figure(s.shot)}\n    </section>`;
    })
    .join('\n    ');
}

function relatedCards(page) {
  const t = UI[page.lang];
  const heading = page.slug ? t.related : t.explore;
  const items = page.related.map((slug) => {
    const r = find(page.lang, slug);
    if (!r) throw new Error(`${page.lang}/${page.slug}: related page "${slug}" does not exist`);
    return `<li><a href="${path(r.lang, r.slug)}"><span class="c-t">${esc(r.name)}</span><span class="c-d">${esc(r.card)}</span><span class="c-a" aria-hidden="true">→</span></a></li>`;
  });
  return `<nav class="related wrap" aria-labelledby="rel-h" data-wc="skip">
      <h2 id="rel-h">${esc(heading)}</h2>
      <ul class="cards">
        ${items.join('\n        ')}
      </ul>
    </nav>`;
}

function footer(page) {
  const t = UI[page.lang];
  const pair = pairOf(page);
  const switchTo = pair ? path(pair.lang, pair.slug) : path(other(page.lang), '');
  const links = PAGES.filter((p) => p.lang === page.lang && p.slug).map(
    (p) => `<li><a href="${path(p.lang, p.slug)}">${esc(p.name)}</a></li>`,
  );
  return `<footer class="foot">
    <div class="wrap">
      <p class="foot-h">${esc(t.more)}</p>
      <ul class="foot-links">
        <li><a href="${path(page.lang, '')}">${esc(t.home)}</a></li>
        ${links.join('\n        ')}
      </ul>
      <p>${esc(t.footerAbout)} ${esc(t.price)}</p>
      <p><a href="${switchTo}" hreflang="${other(page.lang)}" lang="${other(page.lang)}">${esc(t.otherLang)}</a> · <a href="${SITE.privacy}">${esc(t.privacy)}</a> · <a href="${SITE.terms}">${esc(t.terms)}</a></p>
    </div>
  </footer>`;
}

// ───────────────────────────── head and JSON-LD ─────────────────────────────

function jsonLd(page) {
  const t = UI[page.lang];
  const url = abs(path(page.lang, page.slug));
  const blocks = [
    {
      '@context': 'https://schema.org',
      '@type': 'MobileApplication',
      name: 'Broke Club',
      operatingSystem: 'iOS, Android',
      applicationCategory: 'FinanceApplication',
      inLanguage: page.lang,
      description: t.appDescription,
      url: abs(path(page.lang, '')),
      image: abs(`/assets/og-${page.lang}.png`),
      screenshot: page.sections.filter((s) => s.shot).map((s) => abs(`/assets/shots/${s.shot.file}.webp`)),
      installUrl: [SITE.appStore, SITE.play],
      sameAs: [SITE.appStore, SITE.play],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: page.lang,
      mainEntity: page.faq.map((f) => ({
        '@type': 'Question',
        name: plain(f.q),
        acceptedAnswer: { '@type': 'Answer', text: plain(f.a) },
      })),
    },
  ];
  if (page.slug) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Broke Club', item: abs(path(page.lang, '')) },
        { '@type': 'ListItem', position: 2, name: page.name, item: url },
      ],
    });
  }
  // "</" can't appear inside a script element; none of the copy has it, but escape anyway.
  return blocks
    .map((b) => `<script type="application/ld+json">${JSON.stringify(b).replace(/<\//g, '<\\/')}</script>`)
    .join('\n');
}

function head(page) {
  const t = UI[page.lang];
  const url = abs(path(page.lang, page.slug));
  const pair = pairOf(page);
  const og = abs(`/assets/og-${page.lang}.png`);
  const alternates = [];
  if (pair) {
    const en = page.lang === 'en' ? page : pair;
    const tr = page.lang === 'tr' ? page : pair;
    alternates.push(
      `<link rel="alternate" hreflang="en" href="${abs(path('en', en.slug))}">`,
      `<link rel="alternate" hreflang="tr" href="${abs(path('tr', tr.slug))}">`,
      `<link rel="alternate" hreflang="x-default" href="${abs(path('en', en.slug))}">`,
    );
  }
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="${url}">
${alternates.join('\n')}${alternates.length ? '\n' : ''}<meta name="apple-itunes-app" content="app-id=${SITE.appStoreId}">
<meta name="theme-color" content="#0D0D11">
<link rel="icon" type="image/png" sizes="48x48" href="/assets/favicon-48.png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/poppins-900.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/poppins-400.woff2" as="font" type="font/woff2" crossorigin>
<meta property="og:type" content="website">
<meta property="og:site_name" content="Broke Club">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(t.ogAlt)}">
<meta property="og:locale" content="${t.locale}">
${pair ? `<meta property="og:locale:alternate" content="${UI[pair.lang].locale}">\n` : ''}<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(page.title)}">
<meta name="twitter:description" content="${esc(page.description)}">
<meta name="twitter:image" content="${og}">
<style>${CSS}</style>
${jsonLd(page)}`;
}

// Colours and type come from brand.md / MOTION.md: flat #0D0D11, Poppins, one lime accent,
// fully rounded lime pills with #0D0D11 text, phone frame with a #2A2A35 border.
// The only motion is Penny's entrance, with MOTION.md's pop: 0.5 s, back-out (1.7). It only scales
// from her base and never touches opacity, so a renderer that freezes animations still shows
// everything; the text is static on purpose.
const CSS = `
@font-face{font-family:Poppins;font-style:normal;font-weight:400;font-display:swap;src:url(/assets/fonts/poppins-400.woff2) format("woff2")}
@font-face{font-family:Poppins;font-style:normal;font-weight:800;font-display:swap;src:url(/assets/fonts/poppins-800.woff2) format("woff2")}
@font-face{font-family:Poppins;font-style:normal;font-weight:900;font-display:swap;src:url(/assets/fonts/poppins-900.woff2) format("woff2")}
:root{--bg:#0D0D11;--card:#17171E;--border:#2A2A35;--text:#F4F4F6;--dim:#9B9BA8;--lime:#C8FF4D;--ink:#0D0D11;color-scheme:dark}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--text);font:400 17px/1.65 Poppins,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{color:var(--lime);text-underline-offset:3px}
a:focus-visible{outline:2px solid var(--lime);outline-offset:3px;border-radius:6px}
img{max-width:100%;height:auto;display:block}
.wrap{width:100%;max-width:1040px;margin:0 auto;padding-left:20px;padding-right:20px}
.top{position:sticky;top:0;z-index:5;background:var(--bg);border-bottom:1px solid var(--border)}
.top-in{display:flex;align-items:center;justify-content:space-between;height:60px;gap:12px}
.wordmark{font-weight:900;color:var(--text);text-decoration:none;font-size:22px;letter-spacing:-.03em;line-height:1}
.top-nav{display:flex;align-items:center;gap:16px}
.lang{color:var(--dim);font-weight:800;font-size:14px;text-decoration:none}
.pill{display:inline-flex;align-items:center;justify-content:center;background:var(--lime);color:var(--ink);font-weight:900;text-decoration:none;border-radius:999px;padding:15px 34px;font-size:18px;line-height:1.2}
.pill-sm{padding:9px 18px;font-size:14px}
.hero{text-align:center;padding-top:22px;padding-bottom:44px}
.crumbs{font-size:13px;color:var(--dim);margin:0 0 6px}
.crumbs a{color:var(--dim)}
.penny{width:150px;margin:0 auto 4px}
.kicker{color:var(--lime);font-weight:800;font-size:15px;line-height:1.4;margin:0 0 10px}
h1{font-weight:900;font-size:clamp(32px,8.4vw,58px);line-height:1.08;letter-spacing:-.025em;margin:0 auto 18px;max-width:17ch}
h1 span{display:block}
h1 .l2{color:var(--lime)}
.lede{font-size:18px;max-width:38em;margin:0 auto 26px}
.cta{display:flex;flex-direction:column;align-items:center;gap:14px}
.stores{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;width:100%}
.store{display:inline-flex;align-items:center;gap:10px;padding:12px 20px;min-height:48px;border-radius:999px;background:var(--card);border:1px solid var(--border);color:var(--text);font-weight:800;font-size:15px;line-height:1.2;text-decoration:none}
.store:hover,.store:focus-visible{border-color:var(--lime)}
.store svg{width:20px;height:20px;flex:none}
.price{color:var(--dim);font-size:14px;margin:0}
.feat{display:grid;gap:24px;padding-top:32px;padding-bottom:32px;border-top:1px solid var(--border)}
h2{font-weight:900;font-size:clamp(24px,5.6vw,34px);line-height:1.15;letter-spacing:-.02em;margin:0 0 12px}
.feat p{margin:0 0 14px}
.feat p:last-child{margin-bottom:0}
.shot{margin:0;display:flex;flex-direction:column;align-items:center;gap:12px}
.shot img{border:3px solid var(--border);background:var(--bg)}
.shot.phone img{width:min(270px,74vw);border-radius:30px}
.shot.crop img{width:100%;max-width:520px;border-radius:22px}
figcaption{color:var(--dim);font-size:14px;line-height:1.5;text-align:center;max-width:30em}
.steps,.faq,.related{padding-top:36px;padding-bottom:36px;border-top:1px solid var(--border)}
.steps ol{list-style:none;padding:0;margin:0;display:grid;gap:12px;counter-reset:s}
.steps li{counter-increment:s;display:flex;gap:14px;align-items:flex-start;background:var(--card);border:1px solid var(--border);border-radius:20px;padding:16px 18px}
.steps li::before{content:counter(s);flex:none;width:34px;height:34px;border-radius:999px;background:var(--lime);color:var(--ink);font-weight:900;font-size:16px;line-height:34px;text-align:center}
.qa-list{display:grid;gap:12px}
.qa{background:var(--card);border:1px solid var(--border);border-radius:20px;padding:18px 20px}
.qa h3{font-size:18px;font-weight:800;line-height:1.35;margin:0 0 6px}
.qa p{margin:0}
.cards{list-style:none;padding:0;margin:0;display:grid;gap:12px}
.cards a{display:block;height:100%;position:relative;background:var(--card);border:1px solid var(--border);border-radius:20px;padding:16px 48px 16px 20px;text-decoration:none;color:var(--text)}
.cards a:hover,.cards a:focus-visible{border-color:var(--lime)}
.c-t{display:block;font-weight:800;font-size:17px;line-height:1.35}
.c-d{display:block;color:var(--dim);font-size:14px;line-height:1.45;margin-top:4px}
.c-a{position:absolute;right:20px;top:50%;transform:translateY(-50%);color:var(--lime);font-weight:900;font-size:20px}
.end{text-align:center;padding-top:44px;padding-bottom:56px;border-top:1px solid var(--border)}
.end .penny{width:112px}
.end-mark{font-weight:900;font-size:clamp(44px,12vw,72px);line-height:1;letter-spacing:-.035em;margin:6px 0 10px}
.end-line{color:var(--dim);font-weight:800;margin:0 0 24px}
.foot{border-top:1px solid var(--border);padding:30px 0 44px;color:var(--dim);font-size:14px}
.foot a{color:var(--dim)}
.foot-h{color:var(--text);font-weight:800;margin:0 0 10px}
.foot-links{list-style:none;padding:0;margin:0 0 20px;display:grid;gap:6px}
.foot p{margin:0 0 8px}
@media (min-width:860px){
  .hero{padding-top:36px}
  .penny{width:170px}
  .feat.has-shot{grid-template-columns:minmax(0,1fr) 300px;align-items:center;column-gap:64px}
  .feat.has-shot.wide{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}
  .feat.has-shot.flip .feat-text{order:2}
  .feat:not(.has-shot) .feat-text{max-width:44em}
  .steps ol,.qa-list{grid-template-columns:1fr 1fr}
  .cards{grid-template-columns:repeat(3,minmax(0,1fr))}
  .foot-links{grid-template-columns:repeat(3,minmax(0,1fr))}
}
@keyframes pop{from{transform:scale(.55)}to{transform:none}}
.hero .penny{transform-origin:50% 100%;animation:pop .5s cubic-bezier(.175,.885,.32,1.275) .1s both}
@media (prefers-reduced-motion:reduce){.hero .penny{animation:none}}
`
  .trim()
  .replace(/\n\s*/g, '');

// ───────────────────────────── page ─────────────────────────────

function render(page) {
  const t = UI[page.lang];
  const pair = pairOf(page);
  const switchTo = pair ? path(pair.lang, pair.slug) : path(other(page.lang), '');
  const u = storeUrls(page);
  const crumbs = page.slug
    ? `<nav class="crumbs" aria-label="${page.lang === 'tr' ? 'Sayfa yolu' : 'Breadcrumb'}"><a href="${path(page.lang, '')}">Broke Club</a> / <span>${esc(page.name)}</span></nav>\n      `
    : '';
  return `<!doctype html>
<html lang="${page.lang}">
<head>
${head(page)}
</head>
<body>
  <header class="top">
    <div class="wrap top-in">
      <a class="wordmark" href="${path(page.lang, '')}">broke club</a>
      <nav class="top-nav" aria-label="${esc(t.home)}">
        <a class="lang" href="${switchTo}" hreflang="${other(page.lang)}" lang="${other(page.lang)}" aria-label="${esc(t.otherLang)}">${other(page.lang).toUpperCase()}</a>
        <a class="pill pill-sm" href="${esc(u.smart)}">${esc(t.getApp)}</a>
      </nav>
    </div>
  </header>
  <main>
    <section class="hero wrap">
      ${crumbs}<img class="penny" src="${PENNY.src}" width="${PENNY.w}" height="${PENNY.h}" alt="${esc(t.pennyAlt)}" fetchpriority="high">
      <p class="kicker">${esc(page.kicker)}</p>
      <h1><span class="l1">${esc(page.h1[0])}</span> <span class="l2">${esc(page.h1[1])}</span></h1>
      ${page.intro.map((p) => `<p class="lede">${rich(p)}</p>`).join('\n      ')}
      ${cta(page)}
    </section>
    ${sections(page)}
    <section class="steps wrap">
      <h2>${esc(t.how)}</h2>
      <ol>
        ${page.steps.map((s) => `<li>${rich(s)}</li>`).join('\n        ')}
      </ol>
    </section>
    <section class="faq wrap">
      <h2>${esc(t.faq)}</h2>
      <div class="qa-list">
        ${page.faq.map((f) => `<div class="qa"><h3>${esc(f.q)}</h3><p>${rich(f.a)}</p></div>`).join('\n        ')}
      </div>
    </section>
    ${relatedCards(page)}
    <section class="end wrap" data-wc="skip">
      <img class="penny" src="${PENNY.src}" width="${PENNY.w}" height="${PENNY.h}" alt="" loading="lazy" decoding="async">
      <p class="end-mark">broke club</p>
      <p class="end-line">${esc(t.endLine)}</p>
      ${cta(page)}
    </section>
  </main>
  ${footer(page)}
</body>
</html>
`;
}

/** Words a reader gets from the page body: hero, sections, steps and FAQ (not CTAs or link lists). */
function bodyWords(page) {
  const t = UI[page.lang];
  const parts = [
    page.slug ? `Broke Club / ${page.name}` : '',
    page.kicker,
    ...page.h1,
    ...page.intro,
    ...page.sections.flatMap((s) => [s.h2, ...s.p, s.shot ? s.shot.caption : '']),
    t.how,
    ...page.steps,
    t.faq,
    ...page.faq.flatMap((f) => [f.q, f.a]),
  ];
  return parts.reduce((n, s) => n + words(s), 0);
}

// ───────────────────────────── sitemap, robots ─────────────────────────────

function sitemap() {
  const urls = PAGES.map((page) => {
    const pair = pairOf(page);
    const lines = [`    <loc>${abs(path(page.lang, page.slug))}</loc>`, `    <lastmod>${SITE.updated}</lastmod>`];
    if (pair) {
      const en = page.lang === 'en' ? page : pair;
      const tr = page.lang === 'tr' ? page : pair;
      lines.push(
        `    <xhtml:link rel="alternate" hreflang="en" href="${abs(path('en', en.slug))}"/>`,
        `    <xhtml:link rel="alternate" hreflang="tr" href="${abs(path('tr', tr.slug))}"/>`,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(path('en', en.slug))}"/>`,
      );
    }
    for (const s of page.sections.filter((x) => x.shot)) {
      lines.push(`    <image:image><image:loc>${abs(`/assets/shots/${s.shot.file}.webp`)}</image:loc></image:image>`);
    }
    return `  <url>\n${lines.join('\n')}\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>
`;
}

const ROBOTS = `User-agent: *
Allow: /

Sitemap: ${SITE.origin}/sitemap.xml
`;

// ───────────────────────────── OG images ─────────────────────────────

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

function renderOg() {
  const penny = resolve(REPO, '../brand/penny-3d/penny-3d-cutout.png');
  if (!existsSync(penny)) throw new Error(`Penny not found at ${penny}`);
  const tmp = mkdtempSync(join(tmpdir(), 'bc-og-'));
  for (const lang of LANGS) {
    const font = (w) => pathToFileURL(join(REPO, `assets/fonts/poppins-${w}.woff2`)).href;
    const html = `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><style>
@font-face{font-family:P;font-weight:800;src:url(${font(800)}) format("woff2")}
@font-face{font-family:P;font-weight:900;src:url(${font(900)}) format("woff2")}
html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#0D0D11}
.c{width:1200px;height:630px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:P}
img{height:292px;margin-bottom:22px}
.w{font-weight:900;font-size:128px;line-height:1;letter-spacing:-4px;color:#F4F4F6}
.l{font-weight:800;font-size:42px;line-height:1.2;color:#C8FF4D;margin-top:20px}
</style></head><body><div class="c"><img src="${pathToFileURL(penny).href}" alt=""><div class="w">broke club</div><div class="l">${esc(UI[lang].ogLine)}</div></div></body></html>`;
    const file = join(tmp, `og-${lang}.html`);
    writeFileSync(file, html);
    const out = join(REPO, `assets/og-${lang}.png`);
    execFileSync(CHROME, [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--allow-file-access-from-files',
      '--virtual-time-budget=3000',
      '--window-size=1200,630',
      `--screenshot=${out}`,
      pathToFileURL(file).href,
    ], { stdio: 'pipe' });
    console.log(`wrote assets/og-${lang}.png`);
  }
  rmSync(tmp, { recursive: true, force: true });
}

// ───────────────────────────── main ─────────────────────────────

function validate() {
  const seen = new Set();
  for (const page of PAGES) {
    const key = `${page.lang}/${page.slug}`;
    if (seen.has(key)) throw new Error(`Duplicate page ${key}`);
    seen.add(key);
    if (!/^[a-z0-9-]*$/.test(page.slug)) throw new Error(`${key}: slug must be ASCII`);
    const pair = pairOf(page);
    if (page.pair !== null && (!pair || pair.pair !== page.slug)) throw new Error(`${key}: pair is not mutual`);
    for (const s of page.sections) {
      if (s.shot && !existsSync(join(REPO, 'assets/shots', `${s.shot.file}.webp`))) {
        throw new Error(`${key}: missing screenshot ${s.shot.file}.webp`);
      }
    }
  }
  const titles = PAGES.map((p) => p.title);
  const descs = PAGES.map((p) => p.description);
  if (new Set(titles).size !== titles.length) throw new Error('Titles are not unique');
  if (new Set(descs).size !== descs.length) throw new Error('Descriptions are not unique');
}

validate();
if (process.argv.includes('--og')) renderOg();

const report = [];
let problems = 0;
for (const page of PAGES) {
  const dir = join(REPO, page.lang, page.slug);
  mkdirSync(dir, { recursive: true });
  const html = render(page);
  writeFileSync(join(dir, 'index.html'), html);
  const n = bodyWords(page);
  const hits = FORBIDDEN.filter((re) => re.test(html)).map(String);
  const notes = [];
  if (n < 280 || n > 420) notes.push('WORDS OUT OF RANGE');
  if (page.title.length > 65) notes.push(`title ${page.title.length} chars`);
  if (page.description.length > 165) notes.push(`description ${page.description.length} chars`);
  if (hits.length) notes.push(`forbidden: ${hits.join(', ')}`);
  problems += notes.length;
  report.push(`${path(page.lang, page.slug).padEnd(42)} ${String(n).padStart(4)} words  ${notes.join('; ')}`);
}
writeFileSync(join(REPO, 'sitemap.xml'), sitemap());
writeFileSync(join(REPO, 'robots.txt'), ROBOTS);

console.log(report.join('\n'));
console.log(`\n${PAGES.length} pages, sitemap.xml, robots.txt written. ${problems ? `${problems} problem(s).` : 'No problems.'}`);
if (problems) process.exitCode = 1;
