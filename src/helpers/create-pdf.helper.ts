import * as puppeteer from 'puppeteer';
import * as path from 'path';
import * as fs from 'fs';

export async function createPdfFile() {
  const title = '👋 Hello, Omar';
  /*
    1- Puppeteer launches Chromium in headless mode.  
          Note: 
            To launch a full version of Chromium, set the headless option when launching a browser
  */
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto(path.join(process.cwd(), 'public/index.html'));
  const override = Object.assign(page.viewport(), { width: 1366 });
  await page.setViewport(override);
  page.on('console', consoleObj => console.log(consoleObj.text()));

  await page.evaluate(
    async ({ title }) => {
      const titleTage = document.querySelector('#title') as HTMLElement | null;
      titleTage.innerText = title;
      titleTage.style.fontSize = '6vw';

      // 1- waiting until all images loaded
      const selectors = Array.from(document.querySelectorAll('img'));
      await Promise.all(
        selectors.map(img => {
          if (img.complete) return;
          return new Promise((resolve, reject) => {
            img.addEventListener('load', resolve);
            img.addEventListener('error', reject);
          });
        })
      );
    },
    { title }
  );
  const checkDir = path.join(process.cwd(), 'public/uploads');
  if (!fs.existsSync(checkDir)) fs.mkdirSync(checkDir, { recursive: true });

  const fileName = `file-${Math.floor(Math.random() * 100)}.pdf`;
  const filePathAsPdf = `${checkDir}/${fileName}`;

  await page.emulateMediaType('screen');
  await page.pdf({
    path: filePathAsPdf,
    width: 1700,
    height: 1277,
    printBackground: true,
    pageRanges: '1'
  });
  await browser.close();
  return path.join(process.cwd(), 'public/uploads/') + fileName;
}
