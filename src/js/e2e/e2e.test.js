import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('Popup tests', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 250,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  it('should be titled "ListEditor"', async () => {
    await page.goto(baseUrl);
    await expect(page.title()).resolves.toMatch('ListEditor');
  });
});
