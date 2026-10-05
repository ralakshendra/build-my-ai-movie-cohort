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
  ['w3d1-playbook', 'sessions/week-3-day-1/playbook.html']
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
    return {
      viewport: vw,
      scrollWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
      pageOverflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - vw,
      offenders,
      mobileMenuVisible: menu ? getComputedStyle(menu).display !== 'none' : null
    };
  });
  if (audit.pageOverflow > 2) throw new Error(label + ': horizontal page overflow ' + audit.pageOverflow + 'px');
  if (viewportWidth <= 700 && audit.mobileMenuVisible !== null && !audit.mobileMenuVisible) throw new Error(label + ': mobile menu unavailable');
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
  test(label + ' desktop 1440px', async ({page}) => {
    await page.setViewportSize({width:1440,height:900});
    await page.goto(new URL(path, BASE).href, {waitUntil:'domcontentloaded'});
    await auditPage(page, label, 1440);
  });
}
