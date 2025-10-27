import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

const leetcode = async (link) => {
  try {
    console.time("timing: ");

    // check if the url already exists in the given sheet or not (if yes, then skip it or leave it else add it to the sheet)

    // first store all the data in an array and then push them all in your db by one call to db

    // 1. Run in headless mode
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    // 2. Set headers
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
    );
    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
    });

    await page.setViewport({ width: 1920, height: 1080 });

    // 3. Load the page
    await page.goto(link, { waitUntil: "domcontentloaded" });

    // 4. Wait for your selector
    const titleSelector = "div.flex.items-start.justify-between.gap-4";
    await page.waitForSelector(titleSelector, { timeout: 10000 });

    // 5. Get the text
    const titleFetch = await page.$eval(titleSelector, (el) =>
      el.textContent?.trim()
    );
    // first field
    const title = titleFetch.split(".")[1]?.trim();

    // second field
    const problemSourcedFrom = "leetcode";

    // third field
    let companyTags = [];

    // fourth field
    const topicTags = await page.$$eval(
      "div.mt-2.flex.flex-wrap.gap-1.pl-7>a",
      (data) => {
        return data.map((each) => each.textContent?.trim());
      }
    );

    // fifth field
    const difficultyLevel = await page.$eval(
      "div.relative.inline-flex.items-center.justify-center.text-caption.px-2.py-1.gap-1.rounded-full.bg-fill-secondary",
      (data) => data.textContent?.trim().toLowerCase()
    );

    // sixth field
    const problemUrl = link;

    // // seventh field -- before saving the field (push the data)
    // const popularSheets = null;

    // eighth field
    const videoSolution = [];

    // nineth field
    const explicitTag = [];

    // // tenth field -- before saving the field (push the data)
    // const createdBy = null;

    // console.log(title);
    // console.log(topicTags);
    // console.log(difficultyLevel);

    console.timeEnd("timing: ");

    await browser.close();

    return {
      title,
      problemSourcedFrom,
      companyTags,
      topicTags,
      difficultyLevel,
      problemUrl,
      // popularSheets,
      videoSolution,
      explicitTag,
      // createdBy,
    };
  } catch (err) {
    console.log("fetch data in controllers: ", err);
  }
};

const hackerrank = async (link) => {
  try {
    console.time("timing: ");

    // 1. Run in headless mode
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    // 2. Set headers
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
    );
    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
    });

    await page.setViewport({ width: 1920, height: 1080 });

    // 3. Load the page
    await page.goto(link, { waitUntil: "domcontentloaded" });

    // 4. Wait for your selector
    const titleSelector = "h1.ui-icon-label.page-label";
    await page.waitForSelector(titleSelector, { timeout: 10000 });

    // first field
    const title = await page.$eval(titleSelector, (el) =>
      el.textContent?.trim()
    );

    // second field
    const problemSourcedFrom = "hackerrank";

    // third field
    const companyTags = [];

    const topicTagsInput = await page.$$eval(
      "div#problem-tags>a>span",
      (data) => {
        return data.map((each) => each.textContent?.trim());
      }
    );

    // fourth field
    const topicTags = topicTagsInput;

    // fifth field
    const difficultyLevel = await page.$eval(
      "p.pull-right[class*='difficulty-']",
      (el) => el.textContent.trim().toLowerCase()
    );

    // sixth field
    const problemUrl = link;

    // // seventh field -- before saving the field (push the data)
    // const popularSheets = null;

    // eighth field
    const videoSolution = [];

    // nineth field
    const explicitTag = [];

    // // tenth field -- before saving the field (push the data)
    // const createdBy = null;

    // console.log( title);
    // console.log(difficultyLevel);

    console.timeEnd("timing: ");

    await browser.close();

    return {
      title,
      problemSourcedFrom,
      companyTags,
      topicTags,
      difficultyLevel,
      problemUrl,
      // popularSheets,
      videoSolution,
      explicitTag,
      // createdBy,
    };
  } catch (err) {
    console.log("fetch data in controllers : ", err);
  }
};

const hackerearth = async (link) => {
  try {
    console.time("timing: ");

    // 1. Run in headless mode
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    // 2. Set headers
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
    );
    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
    });

    await page.setViewport({ width: 1920, height: 1080 });

    // 3. Load the page
    await page.goto(link, { waitUntil: "domcontentloaded" });

    // 4. Wait for your selector
    const titleSelector = "div.title";
    await page.waitForSelector(titleSelector, { timeout: 10000 });

    // first field
    const title = await page.$eval(titleSelector, (el) =>
      el.textContent?.trim()
    );

    // second field
    const problemSourcedFrom = "hackerearth";

    // third field
    const companyTags = [];

    // fourth field
    const topicTags = await page.$$eval("div.breadcrumb>a", (data) => {
      return data.map((each) => each.textContent?.trim());
    });

    // fifth field
    const difficultyLevel = "medium";

    // sixth field
    const problemUrl = link;

    // // seventh field -- before saving the field (push the data)
    // const popularSheets = null;

    // eighth field
    const videoSolution = [];

    // nineth field
    const explicitTag = [];

    // // tenth field -- before saving the field (push the data)
    // const createdBy = null;

    // console.log( title);
    // console.log(topicTags);
    // console.log(difficultyLevel);

    console.timeEnd("timing: ");

    await browser.close();

    return {
      title,
      problemSourcedFrom,
      companyTags,
      topicTags,
      difficultyLevel,
      problemUrl,
      // popularSheets,
      videoSolution,
      explicitTag,
      // createdBy,
    };
  } catch (err) {
    console.log("fetch data in controllers ", err);
  }
};

const interviewbit = async (link) => {
  try {
    console.time("timing: ");

    // 1. Run in headless mode
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    // 2. Set headers
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
    );
    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
    });

    await page.setViewport({ width: 1920, height: 1080 });

    // 3. Load the page
    await page.goto(link, { waitUntil: "domcontentloaded" });

    // 4. Wait for your selector
    const titleSelector = "h1.p-tile__title";
    await page.waitForSelector(titleSelector, { timeout: 10000 });

    // first field
    const title = await page.$eval(titleSelector, (el) =>
      el.textContent?.trim()
    );
    console.log(title);

    // second field
    const problemSourcedFrom = "interviewbit";

    const companyList = await page.$$eval("div.p-tile__company-list", (el) =>
      el.map((data) => data.innerHTML.trim())
    );

    const htmlString = companyList[0];

    // third field
    const companyTags = [];
    const regex = /href="\/search\/\?q=([^"]+)"/g;
    let match;

    while ((match = regex.exec(htmlString)) !== null) {
      companyTags.push(match[1]);
    }
    // console.log(companyTags);

    // fourth field
    const topicTags = [];

    // difficutly level of problem
    const difficultyLevelRaw = await page.$eval(
      "div.p-difficulty-level",
      (el) => el.textContent?.trim()
    );

    // fifth field
    const difficultyLevel = difficultyLevelRaw.toLowerCase();

    // difficultyLevelRaw.charAt(0)?.toUpperCase() +
    // difficultyLevelRaw.slice(1)?.toLowerCase();
    // console.log(difficultyLevel);

    // sixth field
    const problemUrl = link;

    // // seventh field -- before saving the field (push the data)
    // const popularSheets = null;

    // eighth field
    const videoSolution = [];

    // nineth field
    const explicitTag = [];

    // // tenth field -- before saving the field (push the data)
    // const createdBy = null;

    // console.log( title);
    // console.log(topicTags);
    // console.log(difficultyLevel);

    console.timeEnd("timing: ");

    await browser.close();

    return {
      title,
      problemSourcedFrom,
      companyTags,
      topicTags,
      difficultyLevel,
      problemUrl,
      // popularSheets,
      videoSolution,
      explicitTag,
      // createdBy,
    };
  } catch (err) {
    console.log("fetch data in controllers: ", err);
  }
};

const codingninjas = async (link) => {
  try {
    console.time("timing: ");

    // 1. Run in headless mode
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    // 2. Set headers
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
    );
    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
    });

    await page.setViewport({ width: 1920, height: 1080 });

    // 3. Load the page
    await page.goto(link, { waitUntil: "domcontentloaded" });

    // 4. Wait for your selector
    const titleSelector = "h1.problem-title";
    await page.waitForSelector(titleSelector, { timeout: 10000 });

    // first field
    const title = await page.$eval(titleSelector, (el) =>
      el.textContent?.trim()
    );
    // console.log(title)
    // second field
    const problemSourcedFrom = "codingninjas";

    await page.locator("div.company-preshow").click();

    // third field
    const companyTags = await page.$$eval(
      "div.companies-container>div>div",
      (el) => el.map((data) => data.innerText?.trim())
    );
    // console.log(companyTags);

    // fourth field
    const topicTags = [];

    // fifth field
    const difficultyLevel = await page.$eval("div.difficulty-level", (el) =>
      el.textContent?.trim().toLowerCase()
    );
    // console.log(difficultyLevel);

    // sixth field
    const problemUrl = link;

    // // seventh field -- before saving the field (push the data)
    // const popularSheets = null;

    // eighth field
    const videoSolution = [];

    // nineth field
    const explicitTag = [];

    // // tenth field -- before saving the field (push the data)
    // const createdBy = null;

    // console.log( title);
    // console.log(topicTags);
    // console.log(difficultyLevel);

    console.timeEnd("timing: ");

    await browser.close();
    return {
      title,
      problemSourcedFrom,
      companyTags,
      topicTags,
      difficultyLevel,
      problemUrl,
      // popularSheets,
      videoSolution,
      explicitTag,
      // createdBy,
    };
  } catch (err) {
    console.log("fetch data in controllers: ", err);
  }
};

// const spoj = async (link) => {
//   try {
//     console.time("timing: ");

//     // 1. Run in headless mode
//     const browser = await puppeteer.launch({
//   headless: "new",
//   args: [
//     '--no-sandbox',
//     '--disable-setuid-sandbox'
//   ]
// });
//     const page = await browser.newPage();

//     // 2. Set headers
//     await page.setUserAgent(
//       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
//     );
//     await page.setExtraHTTPHeaders({
//       "Accept-Language": "en-US,en;q=0.9",
//     });

//     await page.setViewport({ width: 1920, height: 1080 });

//     // 3. Load the page
//        await page.goto(link, { waitUntil: "domcontentloaded" });

//        await page.waitForSelector(`input[type="checkbox"]`, { timeout: 10000 });
//     await page.click('input[type="checkbox"]');

//     // input checkbox -->
//     // input[type="checkbox"]

//     // 4. Wait for your selector
//     const titleSelector = "#problem-name";
//     await page.waitForSelector(titleSelector, { timeout: 10000 });

//     // first field
//     const title = await page.$eval(titleSelector, (el) =>
//       el.textContent?.trim()
//     );

//         // second field
//     const problemSourcedFrom = "spoj";

//     // third field
//     const companyTags = [];

//     const topicTagsInput = await page.$$eval(
//       "div#problem-tags>a>span",
//       (data) => {
//         return data.map((each) => each.textContent?.trim());
//       }
//     );
//         // fourth field
//     const topicTags = topicTagsInput.map((element) =>
//       element?.split("#")[1]?.replace("-", " ")
//     );

//         // fifth field
//     const difficultyLevel = "medium";

//     // sixth field
//     const problemUrl = link;

//     // // seventh field -- before saving the field (push the data)
//     const popularSheets = null;

//     // eighth field
//     const videoSolution = [];

//     // nineth field
//     const explicitTag = [];

//     // // tenth field -- before saving the field (push the data)
//     // const createdBy = null;

//     // console.log( title);
//     // console.log(topicTags);
//     // console.log(difficultyLevel);

//     console.timeEnd("timing: ");

//     await browser.close();

//     return {
//       title,
//       problemSourcedFrom,
//       companyTags,
//       topicTags,
//       difficultyLevel,
//       problemUrl,
// //      popularSheets,
//       videoSolution,
//       explicitTag,
//       // createdBy,
//     };
//   } catch (err) {
//     console.log("fetch dat in controllers: ", err);
//   }
// };

const gfg = async (link) => {
  try {
    console.time("timing: ");

    // 1. Run in headless mode
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    // 2. Set headers
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
    );
    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
    });

    await page.setViewport({ width: 1920, height: 1080 });

    // 3. Load the page
    await page.goto(link, { waitUntil: "domcontentloaded" });

    // 4. Wait for your selector

    await page.waitForSelector(".g-m-0", { timeout: 10000 });

    // first field
    const title = await page.$eval(".g-m-0", (data) =>
      data.textContent?.trim()
    );

    // second field
    const problemSourcedFrom = "gfg";

    // 1. Get all "tag sections"
    const tagSections = await page.$$(".problems_accordion_tags__JJ2DX");
    let topicTags = [];
    let companyTags = [];

    // 2. Loop through each section and extract tags by section title
    for (const section of tagSections) {
      // Get the first inner div's text
      const label = await section.$eval("div:first-child", (el) =>
        el.textContent.trim()?.toLowerCase()
      );

      // 3. Depending on label, extract tags
      if (label.includes("topic tags")) {
        topicTags = await section.$$eval("div:nth-child(2) a", (anchors) =>
          anchors.map((a) => a.textContent?.trim())
        );
      }
      if (label.includes("company tags")) {
        companyTags = await section.$$eval("div:nth-child(2) a", (anchors) =>
          anchors.map((a) => a.textContent?.trim())
        );
      }
    }

    // fifth field
    const difficultyLevel = await page.$eval(
      ".problems_header_description__t_8PB>span:first-child>strong",
      (data) => data.textContent?.trim().toLowerCase()
    );

    // sixth field
    const problemUrl = link;

    // // seventh field -- before saving the field (push the data)
    // const popularSheets = null;

    // eighth field
    const videoSolution = [];

    // nineth field
    const explicitTag = [];

    // // tenth field -- before saving the field (push the data)
    // const createdBy = null;
    // console.log( title);
    // console.log(topicTags);
    // console.log(difficultyLevel);

    console.timeEnd("timing: ");

    await browser.close();

    return {
      title,
      problemSourcedFrom,
      companyTags,
      topicTags,
      difficultyLevel,
      problemUrl,
      // popularSheets,
      videoSolution,
      explicitTag,
      // createdBy,
    };
  } catch (err) {
    console.log("fetch data in controllers: ", err);
  }
};

export {
  leetcode,
  codingninjas,
  hackerearth,
  hackerrank,
  // spoj,
  interviewbit,
  gfg,
};
