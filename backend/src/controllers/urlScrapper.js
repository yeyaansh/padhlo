import {
  leetcode,
  codingninjas,
  hackerearth,
  hackerrank,
  // spoj,
  interviewbit,
  gfg,
} from "../utils/scrapperTools.js";
import { checkPlatform, cleanUrl, extractDomain } from "../utils/filterURL.js";
import playlistContainer from "../models/playlistContainerSchema.js";
import osmosisURL from "../models/urlSchema.js";

function getSpojProblemCode(url) {
  try {
    const parsed = new URL(url);
    const pathSegments = parsed.pathname.split("/").filter(Boolean); // removes empty strings
    const problemsIndex = pathSegments.indexOf("problems");

    if (problemsIndex !== -1 && pathSegments.length > problemsIndex + 1) {
      return pathSegments[problemsIndex + 1];
    }

    return null; // "problems" not found or no code after it
  } catch (err) {
    return null; // invalid URL
  }
}

const urlScrapper = async (req, res) => {
  try {
    // url will be a normal text of the problem
    const url = req.body.url;

    if (!req.body.playlistId) throw new Error("Please select the playlist...");

    const playlist = await playlistContainer.findById(req.body.playlistId).populate("problemStore");
    if (!playlist.playlistCreator.equals(req.result._id)) {
      throw new Error("You are not the owner of this playlist!");
    }

    let problemToUpload = null;

    // function which removes all the text exept the domain url only
    const urlDomain = extractDomain(url);

    //  function which removes the unnecessary parts from the problem url
    const problemURL = cleanUrl(url);

    if(playlist.problemStore.find((data)=> data.problemURL == problemURL))
      res.send({
    success:false,
    message:"Problem already exist in your playlist.."
    })

    // console.log("before switch")

    // this will give you the platform name maybe (gfg)
    const platform = checkPlatform(urlDomain);
    // console.log(platform)
    switch (platform) {
      //not working
      // case "codeforces":
      //   problemToUpload = await codeforces(problemURL);
      //   // problemToUpload.push(await codeforces(problemURL));
      //   break;

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

      //not working but managed manually (by extracting the title from url)
      case "spoj":
        problemToUpload = {
          title: getSpojProblemCode(problemURL),
          problemSourcedFrom: "spoj",
          companyTags: [],
          topicTags: [],
          difficultyLevel: "medium",
          problemUrl: problemURL,
          videoSolution: [],
          explicitTag: [],
        };
        // problemToUpload = await spoj(problemURL);
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

    problemToUpload.playlistId = req.body.playlistId;
    problemToUpload.createdBy = req.result._id;
    const data = problemToUpload;
    console.log(data);

    const osmosisURLData = await osmosisURL.create(data);

    playlist.problemStore.push(osmosisURLData._id);

    await playlist.save();

    res.status(201).send({
      ...problemToUpload,
      success: true,
      message: "problems successfully imported to your playlist",
    });
  } catch (err) {
    console.log("error in urlScrapper during single url Scrapping " + err);
    res.send({
      message: `${err.message}` || "Invalid url or unsupported platform!",
      success: false,
    });
  }
};

export default urlScrapper;
