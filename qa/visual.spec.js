const { test, devices } = require('@playwright/test');

const BASE = process.env.BMAI_BASE_URL || 'https://ralakshendra.github.io/build-my-ai-movie-cohort/';

const pages = [
  ['home', 'index.html'],
  ['playbook', 'playbook.html'],
  ['resource', 'resources/ai-faceless-youtube-masterclass.html'],
  ['w2d1', 'sessions/week-2-day-1/index.html'],
  ['w2d1-playbook', 'sessions/week-2-day-1/playbook.html'],
  ['w2d2', 'sessions/week-2-day-2/index.html'],
  ['w2d2-playbook', 'sessions/week-2-day-2/playbook.html'],
  ['w2d2-homework', 'sessions/week-2-day-2/homework.html'],
  ['w3d1', 'sessions/week-3-day-1/index.html'],
  ['w3d1-playbook', 'sessions/week-3-day-1/playbook.html'],
  ['w3d1-homework', 'sessions/week-3-day-1/homework.html']
];

async function auditPage(page, label, viewportWidth) {
  await page.waitForLoadState('networkidle');
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
    const emDash = document.body.innerText.includes('—');
    return {
      viewport: vw,
      scrollWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
      pageOverflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - vw,
      offenders,
      mobileMenuVisible: menu ? getComputedStyle(menu).display !== 'none' : null,
      hasMain: !!main,
      hasSkipLink: !!skip,
      emDash,
      localLinks
    };
  });
  if (audit.pageOverflow > 2) throw new Error(label + ': horizontal page overflow ' + audit.pageOverflow + 'px');
  if (!audit.hasMain) throw new Error(label + ': missing main landmark');
  if (!audit.hasSkipLink) throw new Error(label + ': missing skip link');
  if (audit.emDash) throw new Error(label + ': em dash found in rendered copy');
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
      const visibleLinks = await page.locator('.nav.mobile-nav-open a, .top .nav.mobile-nav-open a').count();
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
