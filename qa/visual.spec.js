const { test, devices } = require('playwright/test');

const BASE = process.env.BMAI_BASE_URL || 'https://ralakshendra.github.io/build-my-ai-movie-cohort/';

const pages = [
  ['not-found', '404.html'],
  ['home', 'index.html'],
  ['playbook', 'playbook.html'],
  ['resource', 'resources/ai-faceless-youtube-masterclass.html'],
  ['w2d1', 'sessions/week-2-day-1/index.html'],
  ['w2d1-playbook', 'sessions/week-2-day-1/playbook.html'],
  ['w2d2', 'sessions/week-2-day-2/index.html'],
  ['w2d2-playbook', 'sessions/week-2-day-2/playbook.html'],
  ['w3d1', 'sessions/week-3-day-1/index.html'],
  ['w3d1-playbook', 'sessions/week-3-day-1/playbook.html'],
  ['w3d2', 'sessions/week-3-day-2/index.html'],
  ['w3d2-playbook', 'sessions/week-3-day-2/playbook.html'],
  ['w4d1', 'sessions/week-4-day-1/index.html'],
  ['w4d1-playbook', 'sessions/week-4-day-1/playbook.html'],
  ['w4d2', 'sessions/week-4-day-2/index.html'],
  ['w4d2-playbook', 'sessions/week-4-day-2/playbook.html'],
  ['w5d1', 'sessions/week-5-day-1/index.html'],
  ['w5d1-playbook', 'sessions/week-5-day-1/playbook.html'],
];

async function auditPage(page, label, viewportWidth) {
  await page.waitForLoadState('networkidle');
  await page.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})))});
  await page.waitForTimeout(500);
  const audit = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const offenders = [...document.querySelectorAll('body *')].filter(el => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && (r.right > vw + 1 || r.left < -1);
    }).slice(0, 20).map(el => {
      const r = el.getBoundingClientRect();
      return {tag: el.tagName, cls: typeof el.className === 'string' ? el.className.slice(0,100) : '', left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width)};
    });
    const menu = document.querySelector('.bmai-mobile-menu');
    const main = document.querySelector('main');
    const skip = document.querySelector('.bmai-skip-link');
    const localLinks = [...document.querySelectorAll('a[href]')].map(a => a.href).filter(href => href.startsWith(location.origin) && !href.includes('#') && !href.endsWith('/build-my-ai-movie-cohort/')).slice(0, 60);
    const emDash = document.body.innerText.includes('-');
    const shell = document.querySelector('.bmai-global-header');
    const pageType = document.body.dataset.pageType || null;
    const pageId = document.body.dataset.pageId || null;
    const sessionId = document.body.dataset.sessionId || null;
    const pageIdentity = document.documentElement.dataset.bmaiPage || null;
    const home = shell?.querySelector('.bmai-header-home');
    const brand = shell?.querySelector('.bmai-session-brand');
    const media = [...document.querySelectorAll('img')].filter(img => /hero|avatar|alexx|homepage/i.test(img.getAttribute('src') || ''));
    const brokenMedia = media.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.getAttribute('src'));
    const externalLocked = [...document.querySelectorAll('a[href]')].filter(a => a.dataset.bmaiLockGuard === 'true').map(a => a.href);
    return {
      viewport: vw,
      scrollWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
      pageOverflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - vw,
      offenders,
      mobileMenuVisible: menu ? getComputedStyle(menu).display !== 'none' : null,
      hasMain: !!main,
      hasSkipLink: !!skip,
      pageType,
      pageId,
      sessionId,
      pageIdentity,
      hasSharedShell: !!shell,
      shellVisible: shell ? getComputedStyle(shell).display !== 'none' : false,
      hasHomeControl: !!home,
      homeHref: home ? home.href : null,
      hasBrand: !!brand,
      brokenMedia,
      externalLocked,
      emDash,
      localLinks
    };
  });
  if (audit.pageOverflow > 2) throw new Error(label + ': horizontal page overflow ' + audit.pageOverflow + 'px');
  if (!audit.pageType || !audit.pageId) throw new Error(label + ': missing static page metadata');
  if (audit.pageIdentity !== audit.pageId) throw new Error(label + ': page identity metadata is inconsistent');
  if (label !== 'home' && label !== 'not-found' && !audit.sessionId) throw new Error(label + ': session page has no static session id');
  if (!audit.hasMain) throw new Error(label + ': missing main landmark');
  if (!audit.hasSkipLink) throw new Error(label + ': missing skip link');
  if (label !== 'home') {
    if (!audit.hasSharedShell || !audit.shellVisible) throw new Error(label + ': missing visible shared site header');
    if (!audit.hasHomeControl) throw new Error(label + ': missing Back to Home control');
    if (!audit.homeHref || !audit.homeHref.endsWith('/index.html')) throw new Error(label + ': Back to Home does not point to hub');
    if (!audit.hasBrand) throw new Error(label + ': missing shared brand identity');
  }
  if (audit.brokenMedia.length) throw new Error(label + ': broken media ' + audit.brokenMedia.join(', '));

  for (const href of audit.localLinks) {
    const response = await page.request.get(href);
    if (!response.ok()) throw new Error(label + ': broken local link ' + href + ' (' + response.status() + ')');
  }
  if (viewportWidth <= 700 && audit.mobileMenuVisible !== null && !audit.mobileMenuVisible) throw new Error(label + ': mobile menu unavailable');
  if (viewportWidth <= 700) {
    const menu = page.locator('.bmai-mobile-menu').first();
    if (await menu.count()) {
      await menu.click();
      const expanded = await menu.getAttribute('aria-expanded');
      if (expanded !== 'true') throw new Error(label + ': mobile menu did not open');
      const visibleLinks = await page.locator('.studio-nav.mobile-nav-open a, .nav.mobile-nav-open a, .top .nav.mobile-nav-open a').count();
      if (!visibleLinks) throw new Error(label + ': mobile menu opened without navigation links');
      await menu.click();
    }
  }
  await page.screenshot({path: 'qa/artifacts/' + label + '-' + viewportWidth + '.png', fullPage: true});
  return audit;
}

for (const [label, path] of pages) {
  test(label + ' mobile 390px', async ({browser}) => {
    const context = await browser.newContext({...devices['iPhone 13'], viewport:{width:390,height:844}});
    const page = await context.newPage();
    await page.goto(new URL(path, BASE).href, {waitUntil:'domcontentloaded'});
    await auditPage(page, label, 390);
    await context.close();
  });
  test(label + ' tablet 820px', async ({page}) => {
    await page.setViewportSize({width:820,height:1180});
    await page.goto(new URL(path, BASE).href, {waitUntil:'domcontentloaded'});
    await auditPage(page, label, 820);
  });
  test(label + ' desktop 1440px', async ({page}) => {
    await page.setViewportSize({width:1440,height:900});
    await page.goto(new URL(path, BASE).href, {waitUntil:'domcontentloaded'});
    await auditPage(page, label, 1440);
  });
}


test('future session materials stay locked before release', async ({browser}) => {
  const futurePaths = [
    'sessions/week-2-day-1/index.html',
    'sessions/week-2-day-1/playbook.html',
    'sessions/week-2-day-2/index.html',
    'sessions/week-2-day-2/playbook.html',
    'sessions/week-3-day-1/index.html',
    'sessions/week-3-day-1/playbook.html',
    'sessions/week-3-day-2/index.html',
    'sessions/week-3-day-2/playbook.html',
    'sessions/week-4-day-1/index.html',
    'sessions/week-4-day-1/playbook.html',
    'sessions/week-4-day-2/index.html',
    'sessions/week-4-day-2/playbook.html',
    'sessions/week-5-day-1/index.html',
    'sessions/week-5-day-1/playbook.html',
  ];
  const context = await browser.newContext();
  for (const path of futurePaths) {
    const page = await context.newPage();
    await page.addInitScript(() => {
      const fixed = new Date('2026-10-05T21:00:00+05:30').getTime();
      const RealDate = Date;
      class FrozenDate extends RealDate {
        constructor(...args) {
          if (!args.length) super(fixed);
          else super(...args);
        }
        static now() { return fixed; }
      }
      window.Date = FrozenDate;
    });
    await page.goto(new URL(path, BASE).href, {waitUntil:'domcontentloaded'});
    await page.waitForTimeout(150);
    const lock = await page.locator('.bmai-lock-screen').count();
    if (!lock) throw new Error(path + ': future page is not locked');
    const bodyText = await page.locator('body').innerText();
    if (!bodyText.includes('SESSION LOCKED')) throw new Error(path + ': lock state is missing');
    if (!(await page.locator('.bmai-global-header').count())) throw new Error(path + ': locked page lost shared header');
    if (!(await page.locator('.bmai-header-home').count())) throw new Error(path + ': locked page lost Back to Home');
    await page.close();
  }
  await context.close();
});


test('future materials are guarded from the student hub', async ({browser}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.addInitScript(() => {
    const fixed = new Date('2026-10-05T21:00:00+05:30').getTime();
    const RealDate = Date;
    class FrozenDate extends RealDate {
      constructor(...args) { if (!args.length) super(fixed); else super(...args); }
      static now() { return fixed; }
    }
    window.Date = FrozenDate;
  });
  await page.goto(new URL('index.html', BASE).href, {waitUntil:'domcontentloaded'});
  await page.waitForTimeout(200);
  const guarded = await page.evaluate(() => [...document.querySelectorAll('a[data-bmai-lock-guard="true"]')].map(a => ({href:a.href, disabled:a.getAttribute('aria-disabled')})));
  if (!guarded.some(x => x.disabled === 'true')) throw new Error('student hub has no guarded future material links');
  await page.close();
  await context.close();
});


for (const [label, path, frozenIso] of [
  ['w2d1-unlocked', 'sessions/week-2-day-1/index.html', '2026-10-10T20:30:00+05:30'],
  ['w3d1-unlocked', 'sessions/week-3-day-1/index.html', '2026-10-17T20:30:00+05:30'],
  ['w5d1-unlocked', 'sessions/week-5-day-1/index.html', '2026-10-31T20:30:00+05:30']
]) {
  for (const [width, height] of [[390,844],[1440,900]]) {
    test(label + ' ' + width + 'px unlocked visual', async ({browser}) => {
      const context = await browser.newContext({viewport:{width,height}});
      const page = await context.newPage();
      await page.addInitScript((iso) => {
        const fixed = new Date(iso).getTime();
        const RealDate = Date;
        class FrozenDate extends RealDate {
          constructor(...args) { if (!args.length) super(fixed); else super(...args); }
          static now() { return fixed; }
        }
        window.Date = FrozenDate;
      }, frozenIso);
      await page.goto(new URL(path, BASE).href, {waitUntil:'domcontentloaded'});
      await page.waitForTimeout(500);
      if (await page.locator('.bmai-lock-screen').count()) throw new Error(label + ': session remained locked at its scheduled start');
      if (!(await page.locator('.bmai-global-header').count())) throw new Error(label + ': missing shared header');
      if (!(await page.locator('.studio-mentor').count())) throw new Error(label + ': missing instructor identity');
      const broken = await page.evaluate(() => [...document.querySelectorAll('img')].filter(img => !img.complete || img.naturalWidth === 0).map(img => img.getAttribute('src')));
      if (broken.length) throw new Error(label + ': broken images ' + broken.join(', '));
      await page.screenshot({path:'qa/artifacts/' + label + '-' + width + '.png', fullPage:true});
      await context.close();
    });
  }
}
