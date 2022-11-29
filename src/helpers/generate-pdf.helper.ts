import * as puppeteer from 'puppeteer';
import * as path from 'path';
import * as fs from 'fs';

export async function ConvertHtmlToPdfWithPuppeteer() {
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
  // 2- create new page
  const page = await browser.newPage();
  // 3- load html page file
  await page.goto(path.join(process.cwd(), 'public/index.html'));
  const override = Object.assign(page.viewport(), { width: 1366 });
  await page.setViewport(override);
  await page.waitFor('*');
  page.on('console', consoleObj => console.log(consoleObj.text()));
  // 4- edite on html file element by js dom
  await page.evaluate(
    async ({ title }) => {
      const titleTage = document.querySelector('#title') as HTMLElement | null;

      // remove google tag manager
      const gtm = document.querySelector('#hubspot-messages-iframe-container' ) as HTMLElement | null;
      if (gtm) gtm.style.width = '0px';

      // inject information
      titleTage.innerText = title;
      titleTage.style.fontSize = '6vw';

      //waiting until all images loaded
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
  // 5- find or create new path of pdf file
  const checkDir = path.join(process.cwd(), 'public/uploads/pdf');
  if (!fs.existsSync(checkDir)) {
    fs.mkdirSync(checkDir, {
      recursive: true
    });
  }
  // 6- create pdf file name
  const fileName = `file-${Math.floor(Math.random() * 100)}.pdf`;
  const fileAsPdf = `${checkDir}/${fileName}`;
  await page.emulateMediaType('print');
  await page.pdf({
    path: fileAsPdf,
    format: 'A4',
    printBackground: true,
    pageRanges: '1',
    preferCSSPageSize: false
  });
  await browser.close();
  return path.join(process.cwd(), 'public/uploads/files/') + fileName;
}
