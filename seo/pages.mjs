// All copy for the SEO pages lives here. build.mjs turns it into HTML.
//
// Rules for anyone editing this file:
// - Only describe features that exist in the app code (brokeclub/src, brokeclub/app).
// - Pricing: a Pro subscription (monthly or yearly) whose price is shown in the app. There is no free
//   trial (removed 22 Nov 2026). Never "free", "free trial", "try free", "ücretsiz dene" or "bedava".
// - No ratings, review counts, user numbers, "#1" or testimonials.
// - Paragraph text may use [label](/en/slug/) for an internal link. Nothing else is parsed.
// - Each page body (everything in <main> except the CTA, related links and closing block)
//   must stay between 280 and 420 words; build.mjs --check reports it.

export const SITE = {
  origin: 'https://brokeclub-link.vercel.app',
  appStoreId: '6797783738',
  appStore: 'https://apps.apple.com/app/id6797783738',
  play: 'https://play.google.com/store/apps/details?id=com.hasancelik.brokeclub',
  privacy: 'https://fhasancelik.github.io/brokeclub-legal/privacy.html',
  terms: 'https://fhasancelik.github.io/brokeclub-legal/terms.html',
  updated: '2026-11-25',
};

export const UI = {
  en: {
    locale: 'en_US',
    getApp: 'Get the app',
    appStore: 'Download on the App Store',
    play: 'Get it on Google Play',
    price: 'Pro subscription. Your price is shown in the app before you buy.',
    how: 'How it works',
    faq: 'Questions',
    related: 'Keep reading',
    explore: 'What you can do in Broke Club',
    more: 'More about Broke Club',
    home: 'Broke Club',
    endLine: 'Being broke is a team sport. Join the club.',
    pennyAlt: 'Penny, the Broke Club piggy-bank cat',
    footerAbout: 'Broke Club is a no-spend challenge app for iPhone and Android.',
    privacy: 'Privacy',
    terms: 'Terms',
    otherLang: 'Türkçe',
    ogLine: 'No-spend challenges with your friends.',
    ogAlt: 'Penny the piggy-bank cat next to the broke club wordmark',
    appDescription:
      'No-spend challenge app: check in daily, keep your streak, beat cravings with Craving SOS and save with friends.',
    priceQ: 'How much does Broke Club cost?',
    priceA:
      'Broke Club is a Pro subscription, monthly or yearly. The price for your country is shown in the app before you buy, and you can cancel anytime in your App Store or Google Play subscriptions.',
  },
  tr: {
    locale: 'tr_TR',
    getApp: 'Uygulamayı indir',
    appStore: "App Store'dan indir",
    play: "Google Play'den edinin",
    price: 'Pro abonelik. Fiyatın, satın almadan önce uygulamada görünür.',
    how: 'Nasıl çalışır?',
    faq: 'Sık sorulanlar',
    related: 'Bunlar da ilgini çekebilir',
    explore: "Broke Club'da neler yapabilirsin?",
    more: 'Broke Club hakkında',
    home: 'Broke Club',
    endLine: 'Yüksek sesle para biriktir.',
    pennyAlt: "Broke Club'ın kumbara kedisi Penny",
    footerAbout: 'Broke Club, iPhone ve Android için harcamasız meydan okuma uygulaması.',
    privacy: 'Gizlilik',
    terms: 'Koşullar',
    otherLang: 'English',
    ogLine: 'Arkadaşlarınla harcamasız meydan okumalar.',
    ogAlt: 'broke club yazısının yanında kumbara kedi Penny',
    appDescription:
      'Harcamasız meydan okuma uygulaması: her gün check-in yap, serini koru, İstek SOS ile alışveriş isteğini yen, arkadaşlarınla para biriktir.',
    priceQ: 'Broke Club ücretli mi?',
    priceA:
      "Evet. Broke Club aylık ya da yıllık Pro abonelikle çalışır; ülkene göre güncel fiyat, satın almadan önce uygulamada gösterilir. Aboneliğini App Store ya da Google Play üzerinden istediğin zaman iptal edebilirsin.",
  },
};

const PRICE_EN = { q: UI.en.priceQ, a: UI.en.priceA };
const PRICE_TR = { q: UI.tr.priceQ, a: UI.tr.priceA };

export const PAGES = [
  // ───────────────────────────── English ─────────────────────────────
  {
    lang: 'en',
    slug: '',
    pair: '',
    name: 'Broke Club',
    card: 'No-spend challenges with your friends.',
    query: 'broke club / no-spend challenges with friends',
    title: 'Broke Club: No-Spend Challenge App With Friends',
    description:
      "Start no-spend challenges alone or with friends, check in daily, keep your streak and see every dollar you didn't spend. On iPhone and Android.",
    kicker: 'No-spend challenges, played with friends',
    h1: ['Saving money,', 'loudly.'],
    intro: [
      "Broke Club turns not buying stuff into a game you play with your friends. Pick a challenge, check in once a day and watch the money you didn't spend pile up.",
    ],
    sections: [
      {
        h2: 'One tap a day keeps the streak alive',
        p: [
          'Every challenge has a daily amount: the coffee, delivery or late-night cart you would normally pay for. Each evening you answer Held the line or I slipped. Held days grow your streak and the total you kept. Slipped days are marked on the [calendar](/en/no-spend-calendar/), no lecture attached.',
        ],
        shot: {
          file: 'en-home',
          kind: 'phone',
          alt: "Broke Club Club tab showing money still in your pocket, a 14-day streak and today's check-in buttons",
          caption: "The Club tab: money still in your pocket, best streak and today's check-ins.",
        },
      },
      {
        h2: 'Built for the moment you want to buy',
        p: [
          "Craving SOS is one tap away. Tell it what you want and what it costs, and the coach shows what that habit adds up to over a year, suggests three things to do instead and starts a five-minute urge timer. Still unsure? Park it for 48 hours. More in [how to stop impulse buying](/en/stop-impulse-buying/).",
        ],
      },
      {
        h2: 'Friends, a budget and Penny',
        p: [
          'Share a BRK code and [friends join the same challenge](/en/savings-challenge-with-friends/), with a live leaderboard and optional stakes. The Budget tab shows income, bills, spending and what is left until payday. Pro members can also chat with Penny, the AI coach.',
        ],
        shot: {
          file: 'en-penny-chat',
          kind: 'phone',
          alt: 'Chat with Penny, the AI coach in Broke Club, talking a user out of an impulse buy',
          caption: 'Penny, the AI coach (Pro), steps in when you want to buy something.',
        },
      },
    ],
    steps: [
      'Pick a challenge: no takeout coffee, a No Buy Month, no Amazon or your own rules.',
      'Set the daily amount and the length: 7, 14 or 30 days.',
      'Check in every day with Held the line or I slipped.',
      'Invite friends with your BRK code and race on the leaderboard.',
    ],
    faq: [
      PRICE_EN,
      {
        q: 'Does Broke Club connect to my bank?',
        a: 'No. Broke Club never touches your money or asks for bank logins. You tell it what you skipped and what it would have cost, and it keeps the score.',
      },
      {
        q: 'Is it on iPhone and Android?',
        a: 'Yes, on the App Store and Google Play. The app comes in English, Turkish, German, Spanish, French and Arabic.',
      },
    ],
    related: [
      'no-spend-challenge-app',
      'no-buy-challenge',
      'no-spend-calendar',
      'stop-impulse-buying',
      'savings-challenge-with-friends',
      'black-friday-no-spend-challenge',
      'no-spend-january',
    ],
  },
  {
    lang: 'en',
    slug: 'no-spend-challenge-app',
    pair: 'para-biriktirme-uygulamasi',
    name: 'No-spend challenge app',
    card: 'Streaks, a calendar and a running total of what you kept.',
    query: 'no spend challenge app',
    title: 'No-Spend Challenge App With Streaks and Friends | Broke Club',
    description:
      'A no-spend challenge app that counts every day you held the line and every dollar you kept. Solo or with friends. On iPhone and Android.',
    kicker: 'No-spend challenge app',
    h1: ['A no-spend challenge app', 'that keeps score for you.'],
    intro: [
      'A no-spend challenge is simple on paper: for a set number of days, you stop paying for one thing, like coffee out, delivery or online shopping. The hard part is day nine. Broke Club is built for day nine.',
    ],
    sections: [
      {
        h2: 'What the app tracks',
        p: [
          'Each challenge has a length of 7, 14 or 30 days and a daily amount: the money you would normally spend. Every day you check in with Held the line or I slipped. The challenge screen shows your streak, how much you kept and the days left, above a [calendar](/en/no-spend-calendar/) of every held and slipped day.',
        ],
        shot: {
          file: 'en-challenge',
          kind: 'phone',
          alt: 'A No takeout coffee challenge in Broke Club with a 14-day streak, money kept, days left and the calendar',
          caption: 'Streak, money kept, days left and the calendar.',
        },
      },
      {
        h2: 'Start from a template or build your own',
        p: [
          'The classics include No takeout coffee, No delivery, No impulse shopping, No bars and a [No Buy Month](/en/no-buy-challenge/). Brand challenges include No Amazon, No DoorDash and No TikTok Shop. Custom challenges add exceptions and optional stakes.',
        ],
      },
      {
        h2: 'Why it sticks',
        p: [
          'Streaks reward the boring middle days, and badges mark runs of 3, 7, 14, 30 days and more. Stats keeps a running total of what stayed in your pocket, and a monthly Wrapped recap sums it up.',
        ],
      },
    ],
    steps: [
      'Install Broke Club and tell it where your money leaks.',
      'Pick a challenge, its daily amount and its length.',
      'Check in once a day: Held the line or I slipped.',
      'Watch your streak and savings grow in Stats.',
    ],
    faq: [
      {
        q: 'What is a no-spend challenge?',
        a: 'A set period, often 7 to 30 days, where you stop spending on one category or on everything but essentials. It breaks a habit and shows what it was really costing you.',
      },
      {
        q: 'How does Broke Club count the money I kept?',
        a: 'Each challenge has a daily amount, added to your kept total every day you hold the line. Cravings you beat with Craving SOS count too.',
      },
      {
        q: 'What happens if I slip?',
        a: 'Tap I slipped and the day is marked on the calendar. Your streak starts again, but the challenge goes on and earlier savings stay counted.',
      },
      PRICE_EN,
    ],
    related: ['no-spend-calendar', 'savings-challenge-with-friends', 'stop-impulse-buying'],
  },
  {
    lang: 'en',
    slug: 'no-buy-challenge',
    pair: null,
    name: 'No buy challenge tracker',
    card: 'Run a No Buy Month with your own list of essentials.',
    query: 'no buy challenge / no buy month tracker',
    title: 'No Buy Challenge Tracker for a No Buy Month | Broke Club',
    description:
      'Run a no buy challenge or a full No Buy Month with a daily check-in, your own list of allowed essentials and a running total of what you kept. On iPhone and Android.',
    kicker: 'No buy challenge tracker',
    h1: ['Your No Buy Month,', 'tracked one day at a time.'],
    intro: [
      "A no buy challenge means buying nothing that isn't essential for a set time, usually a month. Rent, groceries and bills still get paid. The new hoodie and the 2 a.m. cart do not.",
    ],
    sections: [
      {
        h2: 'Set the rules before day one',
        p: [
          'Broke Club has a ready-made No Buy Month template: 30 days, one daily amount, one check-in a day. Want your own rules? Build a custom challenge with up to eight exceptions, such as groceries or medicine, so what is allowed is written down.',
        ],
      },
      {
        h2: 'Narrow it down if a month feels big',
        p: [
          'Not every no buy has to be total. Try No impulse shopping, No Amazon, No TikTok Shop, or Shop your closet, where you wear what you already own. Runs of 7 or 14 days make a good warm-up, and [Craving SOS](/en/stop-impulse-buying/) helps when an urge gets loud.',
        ],
      },
      {
        h2: 'See what the month was worth',
        p: [
          'Every held day adds its daily amount to your kept total. Stats shows that total, a seven-day chart and progress towards a goal like a trip. A weekly Bank it card reminds you to move the money into savings.',
        ],
        shot: {
          file: 'en-stats',
          kind: 'phone',
          alt: 'Broke Club Stats screen with total kept, the weekly Bank it card, a trip goal and a seven-day chart',
          caption: 'Stats: total kept, Bank it, your goal and this week.',
        },
      },
    ],
    steps: [
      'Pick the No Buy Month template or start a custom challenge.',
      'List the essentials you will still buy.',
      'Check in every evening with Held the line or I slipped.',
      'Move what you kept into savings when Bank it asks each week.',
    ],
    faq: [
      {
        q: 'What can I buy during a no buy challenge?',
        a: 'Essentials: housing, bills, groceries, medicine and getting to work. Everything else waits. A custom challenge lets you list your own exceptions.',
      },
      {
        q: 'How long should a no buy challenge last?',
        a: 'A month is the classic length; the No Buy Month template runs 30 days. If that feels like a lot, start with 7 or 14.',
      },
      {
        q: 'Can I do a No Buy Month with friends?',
        a: 'Yes. Share the challenge code and friends join with a live leaderboard. Add stakes if you like: loser buys Friday coffee.',
      },
      PRICE_EN,
    ],
    related: ['no-spend-challenge-app', 'stop-impulse-buying', 'no-spend-january'],
  },
  {
    lang: 'en',
    slug: 'no-spend-calendar',
    pair: 'harcamasiz-gun-challenge',
    name: 'No-spend calendar',
    card: 'Every held and slipped day, marked for you.',
    query: 'no spend calendar',
    title: 'No-Spend Calendar App to Track Your Streak | Broke Club',
    description:
      'A no-spend calendar that fills itself in: one check-in a day marks it held or slipped, keeps your streak and adds up the money you kept. On iPhone and Android.',
    kicker: 'No-spend calendar',
    h1: ['A no-spend calendar', 'that fills itself in.'],
    intro: [
      'Printable no-spend calendars work until the pen goes missing. Broke Club keeps the calendar inside the challenge, so the only thing you do each day is answer one question: did you hold the line?',
    ],
    sections: [
      {
        h2: 'How the calendar reads',
        p: [
          'Each day of the challenge is a square. A check mark means you held the line and a cross means you slipped. An ice cube means the day was frozen, so the streak survived. Today has an outline, and the days ahead wait as plain numbers. One look tells you how the month is going.',
        ],
        shot: {
          file: 'en-calendar',
          kind: 'crop',
          alt: 'Broke Club challenge calendar with held days ticked, one slipped day crossed and today outlined',
          caption: 'Held days get a tick, slipped days a cross, and today is outlined.',
        },
      },
      {
        h2: 'More than boxes',
        p: [
          'Above the calendar sit three numbers: your current streak, the money you kept and the days left. Below it, if [friends joined](/en/savings-challenge-with-friends/), you see the club with a live leaderboard. Hit 3, 7, 14 or 30 days in a row and a badge lands in Stats.',
        ],
        shot: {
          file: 'en-challenge',
          kind: 'phone',
          alt: 'Full Broke Club challenge screen with streak, money kept, stakes and the calendar',
          caption: 'The full challenge screen, with stakes and the club underneath.',
        },
      },
      {
        h2: "A reminder so you don't forget",
        p: [
          'The app can send an 8 pm check-in reminder so the calendar has no gaps. Pro members also get an automatic streak freeze for days when life happens.',
        ],
      },
    ],
    steps: [
      'Start a challenge and choose 7, 14 or 30 days.',
      'Each evening, tap Held the line or I slipped.',
      'The calendar marks the day and updates your streak.',
      'Share a Flex card when you hit a milestone.',
    ],
    faq: [
      {
        q: 'What is a no-spend calendar?',
        a: 'A calendar where you mark every day you spent nothing outside your plan. A run of marked days keeps you going, just like a streak.',
      },
      {
        q: 'Can I see the days I slipped?',
        a: 'Yes. Slipped days get a cross, so the record stays honest. Your streak starts again, but the money you kept on earlier days stays in your total.',
      },
      {
        q: 'Does the calendar work for a whole month?',
        a: 'Yes. Pick a 30-day challenge, or join a seasonal event like [No-Spend January](/en/no-spend-january/), and the calendar covers every day of it.',
      },
      PRICE_EN,
    ],
    related: ['no-spend-challenge-app', 'no-spend-january', 'savings-challenge-with-friends'],
  },
  {
    lang: 'en',
    slug: 'stop-impulse-buying',
    pair: 'durtusel-alisverisi-durdurma',
    name: 'Stop impulse buying',
    card: 'Craving SOS, a five-minute urge timer and Park it.',
    query: 'how to stop impulse buying',
    title: 'How to Stop Impulse Buying in the Moment | Broke Club',
    description:
      'Impulse buying peaks fast and fades fast. Craving SOS gives you a reality check, a five-minute urge timer and a 48-hour Park it rule. On iPhone and Android.',
    kicker: 'How to stop impulse buying',
    h1: ['The urge to buy fades.', 'Let it.'],
    intro: [
      'Most impulse buys happen in a short window: you see it, you want it, you tap buy. Stretch that window and the urge usually fades first. That is the idea behind Craving SOS.',
    ],
    sections: [
      {
        h2: 'Hit SOS before checkout',
        p: [
          'Open the Coach tab and tap I want to buy something. Pick a category, name the item and type the price. Talk me out of it shows what that habit costs over a week and a year, then suggests three things to do instead.',
        ],
        shot: {
          file: 'en-sos',
          kind: 'phone',
          alt: 'Broke Club Coach reality check with weekly and yearly cost, three things to do instead and a five-minute urge timer',
          caption: 'The reality check, three ideas and the five-minute timer.',
        },
      },
      {
        h2: 'Outlast it',
        p: [
          "Start the five-minute urge timer, or play Penny's Pocket, a catch-the-coins game, until the feeling passes. Held off? Tap I resisted and the money joins your kept total. Caved? The app notes it and moves on. No shame.",
        ],
      },
      {
        h2: 'Park it for 48 hours',
        p: [
          "Can't decide? Park it for 48 hours, 3 days or 7 days. When time is up, a notification asks if you still want it. Let it go and the price counts as kept. Buy it and that's fine too: you waited and decided. Tell the club asks friends to stop you.",
        ],
      },
    ],
    steps: [
      'Open Coach and tap I want to buy something.',
      'Enter the category, the item and the price.',
      'Read the reality check, then start the timer.',
      'Resist, cave, or Park it and decide later.',
    ],
    faq: [
      {
        q: 'Why do I keep impulse buying?',
        a: 'Sales, one-tap checkout and boredom push you to buy fast. The feeling is strong but short, so a pause between wanting and paying breaks the loop.',
      },
      {
        q: 'What is the 48-hour rule?',
        a: 'Wait 48 hours before buying anything unplanned. Still want it after two days? Buy it with a clear head. Park it does the waiting and reminds you.',
      },
      {
        q: 'Can Broke Club help with a shopping addiction?',
        a: "It helps you build pauses and see what you didn't spend, but it isn't treatment. If shopping feels out of control or causes debt or distress, please talk to a doctor or a mental health professional.",
      },
      PRICE_EN,
    ],
    related: ['no-spend-challenge-app', 'black-friday-no-spend-challenge', 'savings-challenge-with-friends'],
  },
  {
    lang: 'en',
    slug: 'savings-challenge-with-friends',
    pair: 'arkadaslarla-para-biriktirme',
    name: 'Savings challenge with friends',
    card: 'One code, a live leaderboard and optional stakes.',
    query: 'savings challenge with friends',
    title: 'Savings Challenge With Friends: Join With a Code | Broke Club',
    description:
      'Start a no-spend savings challenge with friends: share a BRK code, check in daily, climb the live leaderboard and add stakes if you dare. On iPhone and Android.',
    kicker: 'Savings challenge with friends',
    h1: ['Saving is easier', 'when friends are watching.'],
    intro: [
      'Saving alone is quiet, and quiet is easy to quit. Broke Club makes a savings challenge social: same challenge, same rules, and everyone can see who held the line today.',
    ],
    sections: [
      {
        h2: 'Join with one code',
        p: [
          'Every shared challenge gets a join code like BRK-V0QHI. Tap Drag a friend in to send it with a message, or let a friend type it into Got a code? on their Club tab. They see who invited them and join in a tap.',
        ],
        shot: {
          file: 'en-club',
          kind: 'crop',
          alt: 'The club section of a Broke Club challenge with the join code BRK-V0QHI and a Drag a friend in button',
          caption: 'The join code and the Drag a friend in button on a challenge.',
        },
      },
      {
        h2: 'A live leaderboard and a little pressure',
        p: [
          'The challenge screen lists everyone in the club with their streak and the amount they kept, and the leader gets a crown. You can poke a friend who has gone quiet. When someone is about to buy something, Tell the club sends everyone a stop-me alert, and friends answer with Don\'t or Do it.',
        ],
      },
      {
        h2: 'Add stakes if you dare',
        p: [
          'Stakes are optional and agreed between friends, for example loser buys Friday coffee. When the challenge ends, the app shows who owes what. No money moves inside the app; the stakes stay between you. Want a big group moment? Try the [Black Friday Blackout](/en/black-friday-no-spend-challenge/).',
        ],
      },
    ],
    steps: [
      'Start a challenge, or pick one of the classics.',
      'Tap Drag a friend in and share the BRK code.',
      'Everyone checks in daily: Held the line or I slipped.',
      'Watch the leaderboard and settle the stakes at the end.',
    ],
    faq: [
      {
        q: 'How do my friends join?',
        a: 'They install Broke Club, tap Got a code? and enter the BRK code you shared, or open your invite link. They join the same challenge and show up on the leaderboard.',
      },
      {
        q: 'Do my friends need their own account?',
        a: 'Yes, each person installs Broke Club and uses it on their own phone.',
      },
      {
        q: 'Do we have to bet money?',
        a: 'No. Stakes are optional and can be anything, like coffee or doing the dishes. Broke Club never holds or moves money.',
      },
      {
        q: "Can friends see each other's spending?",
        a: 'No. Friends see check-ins, streaks and the amount kept on the shared challenge, not your bank or your budget. The Budget tab stays on your phone.',
      },
    ],
    related: ['no-spend-challenge-app', 'no-spend-calendar', 'black-friday-no-spend-challenge'],
  },
  {
    lang: 'en',
    slug: 'black-friday-no-spend-challenge',
    pair: 'indirim-haftasi-harcamasiz-challenge',
    name: 'Black Friday no-spend challenge',
    card: 'Black Friday Blackout: seven days, November 24 to 30.',
    query: 'black friday no spend challenge',
    title: 'Black Friday No-Spend Challenge, Nov 24–30 | Broke Club',
    description:
      'Black Friday Blackout is a 7-day no-spend challenge in Broke Club, November 24 to 30. Join from the Club tab, skip the deals and count what you kept.',
    kicker: 'Black Friday no-spend challenge',
    h1: ['Every deal is 100% off', "if you don't buy it."],
    intro: [
      "Black Friday week is built to make you spend: countdown timers, limited stock and deals in every inbox. Black Friday Blackout is Broke Club's answer, a seven-day no-spend challenge that runs from November 24 to November 30 every year.",
    ],
    sections: [
      {
        h2: 'How Blackout works',
        p: [
          'About three weeks before, a Black Friday Blackout card shows up on the Club tab with a countdown. On November 24 a Join the event button appears. Tap it and the app creates the challenge for the days that are left, so joining late still works. From there it is a normal challenge with one check-in a day.',
        ],
        shot: {
          file: 'en-event',
          kind: 'crop',
          alt: 'Black Friday Blackout event card in Broke Club: One week. Every deal is 100% off if you do not buy it.',
          caption: 'The Black Friday Blackout card on the Club tab, counting down.',
        },
      },
      {
        h2: 'When a deal gets to you',
        p: [
          'Deals are designed to rush you. Before you buy, open [Craving SOS](/en/stop-impulse-buying/): name the item, enter the price and start the five-minute timer. Or Park it for 7 days, so the decision lands after the sales are over. If you still want it then, you can decide calmly.',
        ],
      },
      {
        h2: 'Do it with your friends',
        p: [
          'Share your challenge code so the whole group skips the sales together, with a [live leaderboard](/en/savings-challenge-with-friends/) and optional stakes. When the week is over, Stats shows what you kept.',
        ],
        shot: {
          file: 'en-home',
          kind: 'phone',
          alt: 'Broke Club Club tab with the Black Friday Blackout card and today’s check-ins',
          caption: 'The event sits on the Club tab, right above your check-ins.',
        },
      },
    ],
    steps: [
      'Install Broke Club before November 24.',
      'Tap Join the event on the Black Friday Blackout card.',
      'Check in every day until November 30.',
      'Use Craving SOS or Park it whenever a deal tempts you.',
    ],
    faq: [
      {
        q: 'When is Black Friday Blackout?',
        a: 'Every year from November 24 to November 30, the week Black Friday usually falls in.',
      },
      {
        q: 'Can I join after November 24?',
        a: 'Yes. You can join while the event is live. Your challenge starts that day and ends on November 30.',
      },
      {
        q: 'Can I buy anything at all?',
        a: 'Essentials like groceries and bills are fine. The point is to skip the deals you never planned for. If you truly need something, you buy it with your eyes open.',
      },
      PRICE_EN,
    ],
    related: ['stop-impulse-buying', 'savings-challenge-with-friends', 'no-spend-january'],
  },
  {
    lang: 'en',
    slug: 'no-spend-january',
    pair: null,
    name: 'No-Spend January',
    card: 'A month-long event from January 1 to 31.',
    query: 'no spend january',
    title: 'No-Spend January Challenge: 31 Days, Tracked | Broke Club',
    description:
      'No-Spend January runs January 1 to 31 in Broke Club: one check-in a day, a calendar, a streak and friends on the leaderboard. On iPhone and Android.',
    kicker: 'No-Spend January',
    h1: ['No-Spend January:', '31 days, one check-in each.'],
    intro: [
      "After December, plenty of people decide to stop spending for a while. No-Spend January is the big one in Broke Club: a seasonal event from January 1 to 31 where the whole club buys nothing it doesn't need.",
    ],
    sections: [
      {
        h2: 'How to join',
        p: [
          'In December a No-Spend January card appears on the Club tab with a countdown. From January 1 you can tap Join the event, and the app builds a challenge for the rest of the month with its own [calendar](/en/no-spend-calendar/), streak and kept total. Join on the 10th and it simply runs from the 10th.',
        ],
        shot: {
          file: 'en-challenge',
          kind: 'phone',
          alt: 'Broke Club challenge screen with a streak, money kept, days left and a calendar of held days',
          caption: 'Every challenge, events included, gets a streak, a kept total and a calendar.',
        },
      },
      {
        h2: 'Making 31 days doable',
        p: [
          'A month is long, so set yourself up. Write down your essentials first: rent, groceries, medicine. Use Craving SOS when an urge hits and Park it for anything you are unsure about. Set a goal in Stats, like a trip or an emergency fund, so the streak has a reason.',
        ],
      },
      {
        h2: 'Prefer September?',
        p: [
          "There's a second round every year. No-Spend September runs September 1 to 30, for when summer has spent your money. Both events work the same way, and you can start your own 30-day challenge, or a [No Buy Month](/en/no-buy-challenge/), in any month.",
        ],
      },
    ],
    steps: [
      'Install Broke Club before New Year.',
      'On January 1, tap Join the event on the Club tab.',
      'Check in each day with Held the line or I slipped.',
      'Open Stats at the end of the month to see what January kept.',
    ],
    faq: [
      {
        q: 'What is No-Spend January?',
        a: 'A challenge to spend only on essentials for the whole of January. In Broke Club it is a seasonal event that runs January 1 to 31.',
      },
      {
        q: 'Can I start No-Spend January late?',
        a: 'Yes. While the event is live you can join on any day, and your challenge runs from that day to January 31.',
      },
      {
        q: 'What counts as essential?',
        a: 'Housing, bills, groceries, medicine and getting to work are the usual list. Coffee runs, delivery and new clothes are what most people cut.',
      },
      PRICE_EN,
    ],
    related: ['no-spend-calendar', 'no-buy-challenge', 'savings-challenge-with-friends'],
  },

  // ───────────────────────────── Türkçe ─────────────────────────────
  {
    lang: 'tr',
    slug: '',
    pair: '',
    name: 'Broke Club',
    card: 'Arkadaşlarınla harcamasız meydan okumalar.',
    query: 'broke club / arkadaşlarla harcamasız meydan okuma',
    title: 'Broke Club: Arkadaşlarla Harcamasız Meydan Okuma',
    description:
      'Tek başına ya da arkadaşlarınla harcamasız meydan okuma başlat, her gün check-in yap, serini koru ve cebinde kalan parayı gör. iPhone ve Android\'de.',
    kicker: 'Arkadaşlarla oynanan para biriktirme oyunu',
    h1: ['Para biriktir,', 'yüksek sesle.'],
    intro: [
      "Broke Club, bir şey almamayı arkadaşlarınla oynadığın bir oyuna çeviriyor. Bir meydan okuma seç, günde bir kez check-in yap ve harcamadığın paranın biriktiğini izle. Alışveriş isteği geldiğinde koç, ödeme tuşuna basmadan önce seni durduruyor.",
    ],
    sections: [
      {
        h2: 'Günde bir dokunuş, seri devam',
        p: [
          'Her meydan okumanın bir günlük tutarı var: normalde dışarıdan aldığın kahve, paket servis ya da gece yarısı doldurduğun sepet. Her akşam dürüstçe cevap veriyorsun: Direndim ya da Kaydım. Direndiğin her gün serine ve cebinde kalan toplama ekleniyor. Kaydığın gün [takvimde](/tr/harcamasiz-gun-challenge/) işaretleniyor, nutuk yok.',
        ],
        shot: {
          file: 'tr-home',
          kind: 'phone',
          alt: "Broke Club Kulüp sekmesi: hâlâ cebinde kalan tutar, 14 günlük seri ve bugünün check-in düğmeleri",
          caption: 'Kulüp sekmesi: hâlâ cebinde kalan para, en iyi serin ve bugünün check-in’leri.',
        },
      },
      {
        h2: 'Satın alma anı için tasarlandı',
        p: [
          "İstek SOS bir dokunuş uzağında. Ne almak istediğini ve fiyatını yaz; koç bu alışkanlığın haftada ve yılda neye mal olduğunu gösteriyor, yerine yapabileceğin üç şey öneriyor ve 5 dakikalık dürtü sayacını başlatıyor. Hâlâ emin değil misin? 48 saat park et, heves geçince karar ver. Ayrıntılar [dürtüsel alışverişi durdurma](/tr/durtusel-alisverisi-durdurma/) sayfasında.",
        ],
      },
      {
        h2: 'Arkadaşlar, bütçe ve Penny',
        p: [
          "BRK koduyla [arkadaşların aynı meydan okumaya katılıyor](/tr/arkadaslarla-para-biriktirme/); canlı sıralama ve istersen iddia da var. [Bütçe](/tr/butce-takibi/) sekmesi gelirini, sabit giderlerini, harcamalarını ve maaş gününe kadar kalanı gösteriyor. Pro üyeler yapay zekâ koçu Penny ile de sohbet edebiliyor.",
        ],
        shot: {
          file: 'tr-penny-chat',
          kind: 'phone',
          alt: "Broke Club'da yapay zekâ koçu Penny ile sohbet: anlık bir alışveriş isteğinden vazgeçirme",
          caption: 'Yapay zekâ koçu Penny (Pro), bir şey almak istediğin anda devreye giriyor.',
        },
      },
    ],
    steps: [
      'Bir meydan okuma seç: dışarıdan kahve yok, Hiçbir Şey Alma Ayı, Amazon yok ya da kendi kuralın.',
      'Günlük tutarı ve süreyi belirle: 7, 14 ya da 30 gün.',
      'Her gün Direndim ya da Kaydım diye check-in yap.',
      'Arkadaşlarını BRK kodunla davet et, sıralamada yarışın.',
    ],
    faq: [
      PRICE_TR,
      {
        q: 'Banka hesabıma bağlanıyor mu?',
        a: "Hayır. Broke Club paranı tutmaz, banka şifresi istemez. Neyi almadığını ve kaça mal olacağını sen söylersin, uygulama skoru tutar. Parayı birikime kendin aktardığında Bankaya at kartında işaretlersin.",
      },
      {
        q: "iPhone ve Android'de var mı?",
        a: "Evet. Broke Club App Store'da ve Google Play'de. Uygulama Türkçe, İngilizce, Almanca, İspanyolca, Fransızca ve Arapça kullanılabiliyor; Türkçede tutarlar ₺ ile görünüyor.",
      },
      {
        q: 'Arkadaşsız da kullanabilir miyim?',
        a: 'Evet. Her meydan okuma tek başına da çalışır. Arkadaşlar isteğe bağlı ama uygulama onlar için kurulmuş: ortak kod, canlı sıralama ve sessiz kalan arkadaşı dürtme.',
      },
    ],
    related: [
      'para-biriktirme-uygulamasi',
      'harcamasiz-gun-challenge',
      'arkadaslarla-para-biriktirme',
      'durtusel-alisverisi-durdurma',
      'butce-takibi',
      'kumbara-uygulamasi',
      'indirim-haftasi-harcamasiz-challenge',
    ],
  },
  {
    lang: 'tr',
    slug: 'para-biriktirme-uygulamasi',
    pair: 'no-spend-challenge-app',
    name: 'Para biriktirme uygulaması',
    card: 'Harcamadığın her günü ve her lirayı sayar.',
    query: 'para biriktirme uygulaması',
    title: 'Para Biriktirme Uygulaması: Harcamasız Seriler | Broke Club',
    description:
      'Broke Club, harcamadığın her günü ve cebinde kalan her lirayı sayan bir para biriktirme uygulaması. Tek başına ya da arkadaşlarla. iPhone ve Android\'de.',
    kicker: 'Para biriktirme uygulaması',
    h1: ['Para biriktirmenin en kolay yolu:', 'harcamamak.'],
    intro: [
      'Para biriktirmek genelde bir kenara para koymak diye anlatılır. Ama çoğumuz için asıl mesele, o paranın kahveye, paket servise ve sepete gitmeden cepte kalması. Broke Club tam bu noktada devreye giriyor: harcamadığın parayı görünür hâle getiriyor.',
    ],
    sections: [
      {
        h2: 'Uygulama neyi takip ediyor?',
        p: [
          'Her meydan okumanın bir adı, 7, 14 ya da 30 günlük bir süresi ve bir günlük tutarı var; yani normalde o şeye harcadığın para. Her gün Direndim ya da Kaydım diye check-in yapıyorsun. Meydan okuma ekranı serini, cebinde kalan tutarı ve kalan günleri gösteriyor; altında da direndiğin ve kaydığın günlerin [takvimi](/tr/harcamasiz-gun-challenge/) duruyor.',
        ],
        shot: {
          file: 'tr-challenge',
          kind: 'phone',
          alt: 'Broke Club’da Dışarıdan kahve yok meydan okuması: 14 günlük seri, cepte kalan tutar, kalan gün ve takvim',
          caption: 'Meydan okuma ekranı: seri, cepte kalan para, kalan gün ve takvim.',
        },
      },
      {
        h2: 'Hazır şablonla başla ya da kendininkini kur',
        p: [
          'Klasikler arasında Dışarıdan kahve yok, Paket servis yok, Anlık alışveriş yok, Bar / dışarıda içki yok ve Hiçbir Şey Alma Ayı var. Kendi meydan okumanı kurarsan tutarı, süreyi, en fazla sekiz istisnayı ve istersen bir iddiayı sen belirliyorsun.',
        ],
      },
      {
        h2: 'Birikim nereye gidiyor?',
        p: [
          'İstatistik sekmesi toplamda cebinde kalan parayı, bu haftanın grafiğini ve bir hedefe ne kadar yaklaştığını gösteriyor: bir tatil, acil durum fonu ya da yeni bir laptop. Her hafta Bankaya at kartı, biriken tutarı gerçekten birikime aktarmanı hatırlatıyor. Hedef odaklı birikim için [kumbara uygulaması](/tr/kumbara-uygulamasi/) sayfasına bak.',
        ],
      },
    ],
    steps: [
      'Uygulamayı indir ve paranın nereden sızdığını seç.',
      'Bir meydan okuma, günlük tutar ve süre belirle.',
      'Her gün Direndim ya da Kaydım diye check-in yap.',
      'Biriken tutarı haftada bir birikim hesabına aktar.',
    ],
    faq: [
      {
        q: 'Bu para biriktirme uygulaması nasıl çalışıyor?',
        a: 'Broke Club davranışa odaklanıyor: belirli bir harcamayı belirli bir süre bırakıyorsun, uygulama bunu her gün sana soruyor ve harcamadığın tutarı topluyor.',
      },
      {
        q: 'Kaydığımda ne oluyor?',
        a: "Kaydım'a basınca gün takvimde işaretlenir. Serin baştan başlar ama meydan okuma devam eder ve önceki günlerde cebinde kalan para toplamda kalır.",
      },
      {
        q: 'Banka bilgisi gerekiyor mu?',
        a: 'Hayır. Broke Club banka hesabına bağlanmaz ve paranı tutmaz. Rakamları sen girersin.',
      },
      PRICE_TR,
    ],
    related: ['harcamasiz-gun-challenge', 'kumbara-uygulamasi', 'butce-takibi'],
  },
  {
    lang: 'tr',
    slug: 'harcamasiz-gun-challenge',
    pair: 'no-spend-calendar',
    name: "Harcamasız gün challenge'ı",
    card: 'Direndiğin ve kaydığın her gün takvimde.',
    query: "harcamasız gün challenge'ı",
    title: "Harcamasız Gün Challenge'ı: Takvimli Takip | Broke Club",
    description:
      "Harcamasız gün challenge'ını takvimle takip et: her gün tek check-in, direndiğin günler işaretlenir, serin büyür, cebinde kalan para toplanır. iPhone ve Android'de.",
    kicker: "Harcamasız gün challenge'ı",
    h1: ['Harcamasız günler,', 'takvimde tek tek.'],
    intro: [
      "Harcamasız gün challenge'ı basit bir kurala dayanıyor: belirlediğin günlerde zorunlu olmayan hiçbir şeye para vermiyorsun. Kâğıda çizilen takvimler bir süre işe yarıyor, sonra kalem kayboluyor. Broke Club takvimi meydan okumanın içine koyuyor.",
    ],
    sections: [
      {
        h2: 'Takvim nasıl okunur?',
        p: [
          'Meydan okumanın her günü bir kare. Tik, o gün direndiğin; çarpı, kaydığın anlamına geliyor. Buz küpü olan gün dondurulmuş, yani serin bozulmadan korunmuş. Bugün çerçeveli görünüyor, önündeki günler sadece rakam olarak bekliyor. Tek bakışta ayın nasıl gittiğini görüyorsun.',
        ],
        shot: {
          file: 'tr-calendar',
          kind: 'crop',
          alt: 'Broke Club meydan okuma takvimi: direnilen günler tikli, kayılan gün çarpılı, bugün çerçeveli',
          caption: 'Direndiğin günler tikli, kaydığın gün çarpılı, bugün çerçeveli.',
        },
      },
      {
        h2: 'Kutucuklardan fazlası',
        p: [
          "Takvimin üstünde üç sayı var: güncel serin, cebinde kalan tutar ve kalan gün. [Arkadaşların katıldıysa](/tr/arkadaslarla-para-biriktirme/) altında canlı sıralamayla kulübü görüyorsun. Üst üste 3, 7, 14 ya da 30 güne ulaştığında İstatistik'e bir rozet düşüyor.",
        ],
        shot: {
          file: 'tr-challenge',
          kind: 'phone',
          alt: 'Broke Club meydan okuma ekranının tamamı: seri, cepte kalan tutar, iddia ve takvim',
          caption: 'Meydan okuma ekranının tamamı: iddia, takvim ve altında kulüp.',
        },
      },
      {
        h2: 'Unutmaman için hatırlatma',
        p: [
          'Uygulama akşam 8’de check-in hatırlatması gönderebiliyor, böylece takvimde boşluk kalmıyor. Pro üyelerde, hayatın araya girdiği günler için otomatik seri dondurma da var.',
        ],
      },
    ],
    steps: [
      'Bir meydan okuma başlat ve 7, 14 ya da 30 gün seç.',
      "Her akşam Direndim ya da Kaydım'a dokun.",
      'Takvim günü işaretler, serini günceller.',
      'Bir eşiği geçince hava atma kartını paylaş.',
    ],
    faq: [
      {
        q: 'Harcamasız gün ne demek?',
        a: 'Kira, fatura ve market gibi zorunlu giderler dışında hiçbir şeye para harcamadığın gün. Harcamasız günleri art arda dizmek, alışkanlıkları kırmanın ve ne kadar paranın kaçtığını görmenin kolay bir yolu.',
      },
      {
        q: 'Kaydığım günler görünüyor mu?',
        a: 'Evet. Kaydığın gün çarpıyla işaretlenir, kayıt dürüst kalır. Serin baştan başlar ama önceki günlerde cebinde kalan para toplamda durur.',
      },
      {
        q: 'Bir ay boyunca yapabilir miyim?',
        a: 'Evet. 30 günlük bir meydan okuma seçebilir ya da Harcamasız Ocak gibi dönemsel bir etkinliğe katılabilirsin; takvim her günü kapsar.',
      },
      PRICE_TR,
    ],
    related: ['para-biriktirme-uygulamasi', 'arkadaslarla-para-biriktirme', 'indirim-haftasi-harcamasiz-challenge'],
  },
  {
    lang: 'tr',
    slug: 'arkadaslarla-para-biriktirme',
    pair: 'savings-challenge-with-friends',
    name: 'Arkadaşlarla para biriktirme',
    card: 'Tek kod, canlı sıralama ve isteğe bağlı iddia.',
    query: 'arkadaşlarla para biriktirme',
    title: 'Arkadaşlarla Para Biriktirme: Kodla Katıl, Yarış | Broke Club',
    description:
      "Arkadaşlarınla para biriktirme challenge'ı başlat: BRK kodunu paylaş, her gün check-in yapın, canlı sıralamada yarışın, istersen iddiaya girin. iPhone ve Android'de.",
    kicker: 'Arkadaşlarla para biriktirme',
    h1: ['Birikim, arkadaşların', 'izlerken daha kolay.'],
    intro: [
      'Tek başına para biriktirmek sessiz bir iş ve sessiz işleri bırakmak kolay. Broke Club meydan okumayı ortak yapıyor: aynı kural, aynı süre ve bugün kimin direndiğini herkes görüyor.',
    ],
    sections: [
      {
        h2: 'Tek kodla katılım',
        p: [
          "Ortak her meydan okumanın BRK-GI5TF gibi bir katılım kodu var. Bir arkadaşını sürükle'ye dokunup kodu mesajla gönderebilirsin. Arkadaşın Kulüp sekmesindeki Kodun mu var? alanına kodu yazıyor, seni kimin davet ettiğini görüyor ve tek dokunuşla katılıyor.",
        ],
        shot: {
          file: 'tr-club',
          kind: 'crop',
          alt: 'Broke Club meydan okumasında kulüp bölümü: BRK-GI5TF katılım kodu ve Bir arkadaşını sürükle düğmesi',
          caption: 'Katılım kodu ve Bir arkadaşını sürükle düğmesi.',
        },
      },
      {
        h2: 'Canlı sıralama ve biraz baskı',
        p: [
          "Meydan okuma ekranında kulüpteki herkes serisi ve cebinde kalan tutarla listeleniyor, lider taç takıyor. Sessiz kalan arkadaşını dürtebilirsin. Biri bir şey almak üzereyse Kulübe söyle'ye basıyor, herkese bildirim gidiyor ve arkadaşlar Alma ya da Al gitsin diye cevap veriyor.",
        ],
      },
      {
        h2: 'Cesaretin varsa iddia',
        p: [
          'İddia isteğe bağlı ve tamamen aranızda; uygulamadaki örnek: kaybeden cuma kahvesini ısmarlar. Meydan okuma bitince uygulama kimin neyi borçlu olduğunu gösteriyor. Uygulamada para el değiştirmiyor. Büyük bir grup hedefi mi arıyorsun? [İndirim Haftası Karartması](/tr/indirim-haftasi-harcamasiz-challenge/) tam bunun için.',
        ],
      },
    ],
    steps: [
      'Bir meydan okuma başlat ya da klasiklerden birini seç.',
      "Bir arkadaşını sürükle'ye dokun ve BRK kodunu paylaş.",
      'Herkes her gün Direndim ya da Kaydım diye check-in yapsın.',
      'Sıralamayı izleyin, sonunda iddiayı sonuçlandırın.',
    ],
    faq: [
      {
        q: 'Arkadaşlarım nasıl katılır?',
        a: "Broke Club'ı indirip Kodun mu var?'a dokunur ve paylaştığın BRK kodunu girerler ya da davet bağlantısını açarlar. Aynı meydan okumaya katılır, sıralamada görünürler.",
      },
      {
        q: 'Arkadaşlarımın da hesap açması gerekiyor mu?',
        a: "Evet, herkes Broke Club'ı kendi telefonuna indirip kullanır.",
      },
      {
        q: 'Para üzerine iddiaya girmek zorunda mıyız?',
        a: 'Hayır. İddia isteğe bağlı; kahve ısmarlamak ya da bulaşık yıkamak gibi her şey olabilir. Broke Club para tutmaz, para aktarmaz.',
      },
      {
        q: 'Birbirimizin harcamalarını görüyor muyuz?',
        a: 'Hayır. Arkadaşların yalnızca ortak meydan okumadaki check-in’leri, serileri ve cepte kalan tutarı görür. Bütçe sekmesi senin telefonunda kalır.',
      },
    ],
    related: ['harcamasiz-gun-challenge', 'para-biriktirme-uygulamasi', 'indirim-haftasi-harcamasiz-challenge'],
  },
  {
    lang: 'tr',
    slug: 'durtusel-alisverisi-durdurma',
    pair: 'stop-impulse-buying',
    name: 'Dürtüsel alışverişi durdurma',
    card: 'İstek SOS, 5 dakikalık sayaç ve Park et.',
    query: 'dürtüsel alışverişi durdurma / alışveriş bağımlılığı',
    title: 'Dürtüsel Alışveriş Nasıl Durdurulur? | Broke Club',
    description:
      'Alışveriş isteği hızlı yükselir, hızlı söner. İstek SOS ile gerçeklik kontrolü, 5 dakikalık dürtü sayacı ve 48 saat park et kuralı. iPhone ve Android\'de.',
    kicker: 'Dürtüsel alışverişi durdurma',
    h1: ['Alma isteği geçer.', 'Bırak geçsin.'],
    intro: [
      "Dürtüsel alışverişin çoğu kısa bir pencerede oluyor: görüyorsun, istiyorsun, Satın al'a basıyorsun. O pencereyi biraz uzatırsan istek çoğu zaman sen ödeme yapmadan söner. Broke Club'daki İstek SOS bu fikir üzerine kurulu.",
    ],
    sections: [
      {
        h2: "Ödemeden önce SOS'a bas",
        p: [
          "Koç sekmesini aç ve Bir şey almak istiyorum'a dokun. Kategori seç, ürünün adını ve fiyatını yaz. Beni vazgeçir, bu alışkanlığın haftada ve yılda kaça patladığını gösteriyor, sonra günün saatine göre yerine yapabileceğin üç şey öneriyor.",
        ],
        shot: {
          file: 'tr-coach',
          kind: 'phone',
          alt: 'Broke Club Koç sekmesi: Bir şey almak istiyorum düğmesi, park edilmiş beyaz spor ayakkabı ve yenilen istekler',
          caption: 'Koç sekmesi: SOS düğmesi, park edilenler ve yenilen istekler.',
        },
      },
      {
        h2: 'İsteği atlat',
        p: [
          "5 dakikalık dürtü sayacını başlat ve bekle ya da istek geçene kadar küçük bir para toplama oyunu olan Penny'nin Cebi'ni oyna. Dayandıysan Direndim'e bas, tutar cebinde kalan toplama eklensin. Dayanamadıysan uygulama bunu sakince kaydedip devam ediyor. Utanç yok.",
        ],
        shot: {
          file: 'tr-sos',
          kind: 'phone',
          alt: 'Broke Club gerçeklik kontrolü: haftalık ve yıllık maliyet, yerine yapılacak üç şey ve 5 dakikalık dürtü sayacı',
          caption: 'Gerçeklik kontrolü, yerine yapılacak üç şey ve 5 dakikalık sayaç.',
        },
      },
      {
        h2: '48 saat park et',
        p: [
          'Karar veremiyor musun? Park et: 48 saat, 3 gün ya da 7 gün. Süre dolunca bir bildirim hâlâ isteyip istemediğini soruyor. Bırakırsan fiyatı cebinde kalan paraya eklenir; alırsan da sorun yok, çünkü bekledin ve karar verdin. Kulübe söyle ile arkadaşlarına beni durdurun uyarısı da gönderebilirsin.',
        ],
      },
    ],
    steps: [
      "Koç sekmesini aç, Bir şey almak istiyorum'a dokun.",
      'Kategoriyi, ürünü ve fiyatı gir.',
      'Hesabı oku ve 5 dakikalık sayacı başlat.',
      'Direndim, Dayanamadım ya da Park et: kararı sen ver.',
    ],
    faq: [
      {
        q: 'Neden sürekli dürtüsel alışveriş yapıyorum?',
        a: 'İndirimler, tek tıkla ödeme ve can sıkıntısı insanı hızlı karar vermeye itiyor. His güçlü ama kısa sürüyor. İstek ile ödeme arasına küçük bir mola koymak, bu döngüyü kırmanın en basit yollarından biri.',
      },
      {
        q: '48 saat kuralı nedir?',
        a: 'Planlamadığın bir şeyi almadan önce 48 saat beklemek. İki gün sonra hâlâ istiyorsan rahat kafayla alırsın. Park et bekleme süresini tutuyor ve süre dolunca sana hatırlatıyor.',
      },
      {
        q: 'Alışveriş bağımlılığı için Broke Club yeterli mi?',
        a: 'Broke Club mola vermeyi ve harcamadığın parayı görmeyi kolaylaştırır, ama bir tedavi değildir. Alışveriş kontrolden çıkmış gibi hissettiriyorsa ya da borca veya sıkıntıya yol açıyorsa lütfen bir doktorla ya da ruh sağlığı uzmanıyla konuş.',
      },
      PRICE_TR,
    ],
    related: ['para-biriktirme-uygulamasi', 'indirim-haftasi-harcamasiz-challenge', 'butce-takibi'],
  },
  {
    lang: 'tr',
    slug: 'butce-takibi',
    pair: null,
    name: 'Bütçe ve harcama takibi',
    card: 'Bu dönem ne kaldı, günde ne harcayabilirsin?',
    query: 'bütçe ve harcama takibi',
    title: 'Bütçe ve Harcama Takibi Uygulaması | Broke Club',
    description:
      'Gelirini, sabit giderlerini ve harcamalarını gir; Broke Club bu dönem ne kaldığını ve maaş gününe kadar günde ne harcayabileceğini göstersin. iPhone ve Android\'de.',
    kicker: 'Bütçe ve harcama takibi',
    h1: ['Maaş gününe kadar', 'ne kaldığını bil.'],
    intro: [
      'Bütçe tablosu tutmak iyi bir fikir, ama çoğu tablo ikinci haftada unutuluyor. Broke Club’daki Bütçe sekmesi tek bir soruya odaklanıyor: bu dönem ne kaldı ve maaş gününe kadar günde ne kadar harcayabilirim?',
    ],
    sections: [
      {
        h2: 'Bütçe sekmesinde neler var?',
        p: [
          'Aylık net gelirini, kira ve abonelik gibi sabit giderlerini ve gün içindeki harcamalarını giriyorsun. En üstte bu dönem kalan tutar ve dönem sonuna kadar günde ne harcayabileceğin duruyor. Altında gelirin yüzde kaçının kullanıldığı ve Nereye gitti başlığıyla kategori dağılımı var: market, ulaşım, eğlence, yemek ve sipariş gibi.',
        ],
        shot: {
          file: 'tr-budget',
          kind: 'phone',
          alt: 'Broke Club Bütçe sekmesi: bu dönem kalan tutar, günlük harcama limiti, gelir, sabit gider ve kategori dağılımı',
          caption: 'Bütçe sekmesi: bu dönem kalan, günlük limit ve paranın nereye gittiği.',
        },
      },
      {
        h2: 'Ay değil, maaş dönemi',
        p: [
          'Maaşının hangi gün yattığını seçersen bütçe maaş gününden maaş gününe işliyor; seçmezsen takvim ayını izliyor. Her harcamadan sonra günlük tutar kendini güncelliyor, böylece ayın sonunu tahmin etmek zorunda kalmıyorsun.',
        ],
      },
      {
        h2: 'Meydan okumalarla bağlantılı',
        p: [
          "Bir meydan okumada Kaydım deyip fiyatı yazarsan o harcama bütçene de işleniyor. Harcamalar geliri aşarsa uygulama bunu açıkça söylüyor ve [harcamasız günler](/tr/harcamasiz-gun-challenge/) öneriyor. Bütçe verilerin yalnızca telefonunda saklanıyor, hiçbir yere gönderilmiyor.",
        ],
      },
    ],
    steps: [
      'Bütçe sekmesini aç ve aylık net gelirini gir.',
      'Maaş gününü seç, sabit giderlerini ekle.',
      'Her harcamayı Harcama ekle ile kaydet.',
      'Bu dönem kalan tutara ve günlük limitine bak.',
    ],
    faq: [
      {
        q: 'Bütçe takibi için banka bağlantısı gerekiyor mu?',
        a: 'Hayır. Rakamları sen giriyorsun. Bütçe verilerin telefonunda kalıyor ve uygulamanın sunucularına gönderilmiyor.',
      },
      {
        q: 'Günlük harcama limiti nasıl hesaplanıyor?',
        a: 'Gelirinden sabit giderleri ve bu dönemki harcamaları düşüyor, kalan tutarı maaş gününe kadar kalan gün sayısına bölüyor.',
      },
      {
        q: 'Harcamaları kategorilere ayırabilir miyim?',
        a: 'Evet. Market, yemek ve sipariş, kahve, ulaşım, alışveriş, eğlence, ev, sağlık ve bakım gibi kategoriler var; Nereye gitti bölümü her birine ne kadar gittiğini gösteriyor.',
      },
      PRICE_TR,
    ],
    related: ['para-biriktirme-uygulamasi', 'kumbara-uygulamasi', 'durtusel-alisverisi-durdurma'],
  },
  {
    lang: 'tr',
    slug: 'kumbara-uygulamasi',
    pair: null,
    name: 'Kumbara uygulaması',
    card: 'Harcamadıklarınla dolan bir dijital kumbara.',
    query: 'kumbara uygulaması',
    title: 'Kumbara Uygulaması: Hedefe Göre Birikim | Broke Club',
    description:
      'Broke Club dijital bir kumbara gibi çalışır: harcamadığın her tutar cebinde kalan toplama eklenir, hedefe ne kadar yaklaştığını görürsün. iPhone ve Android\'de.',
    kicker: 'Kumbara uygulaması',
    h1: ['Dijital kumbaran,', 'harcamadıklarınla dolar.'],
    intro: [
      'Çocukken kumbaraya atılan her bozuk para seni bir şeye biraz daha yaklaştırırdı. Broke Club aynı hissi geri getiriyor; bu kez kumbarayı dolduran şey, almaktan vazgeçtiğin kahveler, siparişler ve sepetler.',
    ],
    sections: [
      {
        h2: 'Kumbara nasıl doluyor?',
        p: [
          "Her meydan okumanın bir günlük tutarı var. Direndiğin her gün o tutar toplamına ekleniyor. [İstek SOS](/tr/durtusel-alisverisi-durdurma/) ile vazgeçtiğin alışverişler ve park edip bıraktığın şeyler de ekleniyor. İstatistik sekmesinin en üstünde bu toplam duruyor: Toplam cepte.",
        ],
        shot: {
          file: 'tr-stats',
          kind: 'phone',
          alt: 'Broke Club İstatistik sekmesi: toplam cepte, Bankaya at kartı, Kapadokya tatili hedefi ve haftalık grafik',
          caption: 'İstatistik: toplam cepte, Bankaya at, hedefin ve bu hafta.',
        },
      },
      {
        h2: 'Bir hedef koy',
        p: [
          'Ne için biriktirdiğini yaz: Kapadokya tatili, acil durum fonu ya da yeni bir laptop. Hedef tutarı girince ilerleme çubuğu toplamın hedefe oranını gösteriyor; hedefe ulaştığında yanında HEDEF EZİLDİ yazıyor. Kulüp sekmesindeki kedi de birikimin büyüdükçe tombullaşıyor.',
        ],
      },
      {
        h2: 'Gerçek kumbaraya aktar',
        p: [
          "Broke Club paranı tutmaz ve bankana bağlanmaz. Bu yüzden her hafta Bankaya at kartı, o hafta cebinde kalan tutarı birikim hesabına ya da gerçek kumbarana aktarmanı hatırlatıyor. Aktardım'a bastığında tutar bankadaki birikim olarak sayılıyor; ne kadarının hâlâ havada olduğunu da görüyorsun.",
        ],
      },
    ],
    steps: [
      'Bir meydan okuma başlat, günlük tutarı belirle.',
      "İstatistik'te birikim hedefini ve tutarını yaz.",
      'Her gün direnerek kumbarayı doldur.',
      'Haftada bir Bankaya at ile parayı gerçekten aktar.',
    ],
    faq: [
      {
        q: 'Broke Club gerçek para tutuyor mu?',
        a: 'Hayır. Broke Club bir takip uygulaması; banka hesabına bağlanmaz, para tutmaz ya da aktarmaz. Parayı birikime sen aktarırsın, uygulama kaydını tutar.',
      },
      {
        q: 'Birikim hedefimi değiştirebilir miyim?',
        a: 'Evet. İstatistik sekmesinde Hedefi düzenle ile hedefin adını ve tutarını istediğin zaman güncelleyebilirsin.',
      },
      {
        q: 'Birikimimi paylaşabilir miyim?',
        a: 'Evet. Aylık özet kartlarını ve meydan okumalarının hava atma kartını görsel olarak paylaşabilirsin; paylaşım menüsünden istediğin uygulamaya gönderirsin.',
      },
      PRICE_TR,
    ],
    related: ['para-biriktirme-uygulamasi', 'butce-takibi', 'harcamasiz-gun-challenge'],
  },
  {
    lang: 'tr',
    slug: 'indirim-haftasi-harcamasiz-challenge',
    pair: 'black-friday-no-spend-challenge',
    name: 'İndirim haftası harcamasız challenge',
    card: 'İndirim Haftası Karartması: 24–30 Kasım, yedi gün.',
    query: 'kasım indirimleri / indirim haftası harcamasız challenge',
    title: 'İndirim Haftası Harcamasız Challenge: 24–30 Kasım | Broke Club',
    description:
      "İndirim Haftası Karartması, Broke Club'da 24–30 Kasım arasında süren 7 günlük harcamasız challenge. Kulüp sekmesinden katıl, indirimleri atla. iPhone ve Android'de.",
    kicker: 'İndirim haftası harcamasız challenge',
    h1: ['Almadığın her fırsat', '%100 indirimli.'],
    intro: [
      "Kasım indirimlerinin en yoğun haftası seni harcatmak için tasarlanıyor: geri sayımlar, son birkaç ürün uyarıları, her bildirimde yeni bir indirim. Broke Club'ın cevabı İndirim Haftası Karartması: her yıl 24–30 Kasım arasında süren yedi günlük bir harcamasız meydan okuma.",
    ],
    sections: [
      {
        h2: 'Karartma nasıl işliyor?',
        p: [
          "Etkinlikten yaklaşık üç hafta önce Kulüp sekmesinde geri sayımlı bir İndirim Haftası Karartması kartı beliriyor. 24 Kasım'da Etkinliğe katıl düğmesi açılıyor. Dokunduğunda uygulama kalan günler için meydan okumayı kuruyor; yani geç katılsan da olur. Sonrası normal bir meydan okuma: günde bir check-in.",
        ],
        shot: {
          file: 'tr-event',
          kind: 'crop',
          alt: 'Broke Club İndirim Haftası Karartması kartı: İndirimli aylardayız. Bir hafta boyunca almadığın her fırsat %100 indirimli.',
          caption: 'Kulüp sekmesinde geri sayan İndirim Haftası Karartması kartı.',
        },
      },
      {
        h2: 'Bir indirim seni yakalarsa',
        p: [
          "İndirimler acele ettirmek için var. Almadan önce [İstek SOS](/tr/durtusel-alisverisi-durdurma/)'u aç: ürünü yaz, fiyatı gir, 5 dakikalık sayacı başlat. Ya da 7 gün park et; karar anı indirim haftası bittikten sonraya kalsın. Süre dolduğunda hâlâ istiyorsan sakin kafayla karar verirsin.",
        ],
      },
      {
        h2: 'Arkadaşlarınla karart',
        p: [
          'Meydan okuma kodunu paylaş, bütün grup indirimleri birlikte atlasın; [canlı sıralama](/tr/arkadaslarla-para-biriktirme/) ve istersen iddia da var. Hafta bitince İstatistik, cebinde kalan parayı gösteriyor.',
        ],
        shot: {
          file: 'tr-home',
          kind: 'phone',
          alt: 'Broke Club Kulüp sekmesi: İndirim Haftası Karartması kartı ve bugünün check-in düğmeleri',
          caption: 'Etkinlik, Kulüp sekmesinde check-in’lerinin hemen üstünde.',
        },
      },
    ],
    steps: [
      "Broke Club'ı 24 Kasım'dan önce indir.",
      "İndirim Haftası Karartması kartında Etkinliğe katıl'a dokun.",
      "30 Kasım'a kadar her gün check-in yap.",
      "Bir fırsat gözünü boyarsa İstek SOS'a ya da Park et'e başvur.",
    ],
    faq: [
      {
        q: 'İndirim Haftası Karartması ne zaman?',
        a: 'Her yıl 24–30 Kasım arasında; kasım indirimlerinin en yoğun olduğu hafta.',
      },
      {
        q: "24 Kasım'dan sonra katılabilir miyim?",
        a: "Evet. Etkinlik sürdüğü sürece katılabilirsin. Meydan okuman katıldığın gün başlar ve 30 Kasım'da biter.",
      },
      {
        q: 'Hiçbir şey alamayacak mıyım?',
        a: 'Market ve faturalar gibi zorunlu giderler serbest. Amaç, planlamadığın indirimleri atlamak. Gerçekten ihtiyacın olan bir şey varsa onu bilinçli bir kararla alırsın.',
      },
      PRICE_TR,
    ],
    related: ['durtusel-alisverisi-durdurma', 'arkadaslarla-para-biriktirme', 'harcamasiz-gun-challenge'],
  },
];
