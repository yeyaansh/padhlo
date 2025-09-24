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
import inputURL from "../models/urlSchema.js"

const urlScrapper = async (req, res) => {
  try {
    
    // url will be a normal text of the problem
    const url = req.body.url;

    let problemToUpload = null;

    // function which removes all the text exept the domain url only
    const urlDomain = extractDomain(url);

    //  function which removes the unnecessary parts from the problem url
    const problemURL = cleanUrl(url);
// console.log("before switch")
    // this will give you the platform name maybe (gfg)
    const platform = checkPlatform(urlDomain);
    // console.log(platform)
    switch (platform) {
      case "codeforces":
        problemToUpload = await codeforces(problemURL);
        // problemToUpload.push(await codeforces(problemURL));
        break;
      case "interviewbit":
        problemToUpload = await interviewbit(problemURL);
        // problemToUpload.push(await interviewbit(problemURL));
        break;
      case "codingninjas":
        problemToUpload = await codingninjas(problemURL);
        // problemToUpload.push(await codingninjas(problemURL));
        break;
      case "hackerrank":
        problemToUpload = await hackerrank(problemURL);
        // problemToUpload.push(await hackerrank(problemURL));
        break;
      case "hackerearth":
        problemToUpload = await hackerearth(problemURL);
        // problemToUpload.push(await hackerearth(problemURL));
        break;
      case "spoj":
        problemToUpload = await spoj(problemURL);
        // problemToUpload.push(await spoj(problemURL));
        break;
      case "leetcode":
        problemToUpload = await leetcode(problemURL);
        // problemToUpload.push(await leetcode(problemURL));
        break;
      case "gfg":
        problemToUpload = await gfg(problemURL);
        // problemToUpload.push(await gfg(problemURL));
        break;
      default:
        throw new Error("The Given URL " + problemURL + " cannot be scrapped!");
    }

    // console.log("after switch statement")

    const popularSheets = req.body.collectionName;
    const createdBy = req.result._id;

    problemToUpload.popularSheets = popularSheets;
    problemToUpload.createdBy = createdBy;
    const data = problemToUpload;
    console.log(data)
    await inputURL.create(data);

    res.status(201).send(problemToUpload);
  } catch (err) {
    console.log("error during single url Scrapping " + err);
    res.status(401).send(err.message);
  }
};

export default urlScrapper;
