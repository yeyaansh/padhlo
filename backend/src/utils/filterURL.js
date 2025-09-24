
// extract domain url
const extractDomain = (url) => {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.replace(/^www\./, "");

    // Preserve port if it's non-standard
    let host = hostname;
    if (parsedUrl.port && !["80", "443"].includes(parsedUrl.port)) {
      host += ":" + parsedUrl.port;
    }

    return `${parsedUrl.protocol}//${host}/`;
  } catch (error) {
    // Enhanced regex to handle www. and ports
    const match = url.match(/^(https?:\/\/)(?:www\.)?([^\/\?#]+)/);
    if (match) {
      return match[1] + match[2] + "/";
    }
    return null;
  }
};

// get the path url to the problem id
const cleanUrl = (url) => {
  try {
    const parsedUrl = new URL(url);
    // This only removes 'www.' if it exists, otherwise keeps hostname as is
    const hostname = parsedUrl.hostname.replace(/^www\./, "");
    return `${parsedUrl.protocol}//${hostname}${parsedUrl.pathname}`;
  } catch (error) {
    return url;
  }
};


// check the platform name from the link (input)
const checkPlatform = (link) => {
  try {
    const platformDomain = [
      "https://codeforces.com/",
      "https://interviewbit.com/",
      "https://naukri.com/",
      "https://hackerrank.com/",
      "https://spoj.com/",
      "https://hackerearth.com/",
      "https://leetcode.com/",
      "https://geeksforgeeks.org/",
    ];

    const domainObject = {
      "https://codeforces.com/": "codeforces",
      "https://interviewbit.com/": "interviewbit",
      "https://naukri.com/": "codingninjas",
      "https://hackerrank.com/": "hackerrank",
      "https://spoj.com/": "spoj",
      "https://hackerearth.com/": "hackerearth",
      "https://leetcode.com/": "leetcode",
      "https://geeksforgeeks.org/": "gfg",
    };

    for (const domain of platformDomain) {
      if (link.includes(domain)) {
        return domainObject[domain];
      }
    }
  } catch (err) {
    console.log("error while checking for the url " + err);
  }
};

export {checkPlatform, cleanUrl, extractDomain};