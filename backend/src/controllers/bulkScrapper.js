import {
  leetcode,
  codingninjas,
  hackerearth,
  hackerrank,
  spoj,
  interviewbit,
  gfg,
} from "../utils/scrapperTools.js";
import { checkPlatform, cleanUrl, extractDomain } from "../utils/filterURL.js";
import problemCollection from "../models/popularSheetSchema.js";

const bulkScrapper = async (req, res) => {
  try {
    // url will be an array of all the problem ids url
    const urlArray = req.body.url;

    // store all data in an array and once the loop done push the data to db in just one call

    const problemToUpload = [];

    for (let i = 0; i < urlArray.length; i++) {
      // function which removes all the text exept the domain url only
      const urlDomain = extractDomain(urlArray[i]);

      //  function which removes the unnecessary parts from the problem url
      const problemURL = cleanUrl(urlArray[i]);

      // this will give you the platform name maybe (gfg)
      const platform = checkPlatform(urlDomain);
      switch (platform) {
        case "codeforces":
          // problemToUpload = await codeforces(problemURL);
          problemToUpload.push(await codeforces(problemURL));
          break;
        case "interviewbit":
          problemToUpload.push(await interviewbit(problemURL));
          break;
        case "codingninjas":
          problemToUpload.push(await codingninjas(problemURL));
          break;
        case "hackerrank":
          problemToUpload.push(await hackerrank(problemURL));
          break;
        case "hackerearth":
          problemToUpload.push(await hackerearth(problemURL));
          break;
        case "spoj":
          problemToUpload.push(await spoj(problemURL));
          break;
        case "leetcode":
          problemToUpload.push(await leetcode(problemURL));
          break;
        case "gfg":
          problemToUpload.push(await gfg(problemURL));
          break;
        default:
          throw new Error(
            "The Given URL " + problemURL + " cannot be scrapped!"
          );
      }
      console.log(problemToUpload.length);
    }

    const sheetTitle = req.body.sheetTitle;
    const sheetData = problemToUpload;
    const createdBy = req.result._id;

    const data = {sheetTitle,sheetData, createdBy};

    console.log(data)
    await problemCollection.create(data);

    res.status(201).send(problemToUpload);
  } catch (err) {
    console.log("error during bulk Scrapping " + err);
    res.status(401).send(err.message);
  }
};

export default bulkScrapper;
