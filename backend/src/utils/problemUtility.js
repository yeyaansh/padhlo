import axios from "axios"

const waiting = async (timer) => {
  setTimeout(() => {
    return 1;
  }, timer);
};

// 1.1 language list
const languageList = {
  "cpp": 54,
  "java": 91,
  "javascript": 102,
};
// 1.2 language by id
const languageById = (language) => {
  return languageList[language.toLowerCase().trim()];
};

// 2 batch submission
const batchSubmission = async (submissions) => {
  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
    params: {
      base64_encoded: "false",
    },
    headers: {
      "x-rapidapi-key": process.env.JUDGE_0_API_KEY,
      "x-rapidapi-host": process.env.JUDGE_0_HOST,
      "Content-Type": "application/json",
    },
    data: {
      submissions,
    },
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error("error during batch submission in fetchData "+error);
    }
  }

  return await fetchData();
};

// 3 get status id
const statusId_Submission = async (tokensInput) => {

  // convert the array values into string by joining them with a comma (,)
  const tokensString = tokensInput.join(",");
  // console.log("line:53 " + tokensString)
  const options = {
    method: "GET",
    url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
    params: {
      tokens: tokensString,
      base64_encoded: "false",
      fields: "*",
    },
    headers: {
      "x-rapidapi-key": process.env.JUDGE_0_API_KEY,
      "x-rapidapi-host": process.env.JUDGE_0_HOST,
    },
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error("error during fetching the data to know the status of the code during creating the problems "+error); 
    }
  }

  // keep checking for the status Id untill you get the statusId for all greater than 2
  while (true) {
    const result = await fetchData();
    // console.log("line 79: "+[...result.submissions]);
    const statusId = result.submissions.every((k) => k.status_id > 2);
    // console.log("line 81: "+statusId)
    if (statusId) return result;

    // created a timer to wait for 1second before hitting the next request to the Judge0 server.
    await waiting(1000);
  }
};

export {
  languageById,
  batchSubmission,
  statusId_Submission,
  waiting,
};
