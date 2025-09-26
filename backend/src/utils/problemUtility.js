import axios from "axios";

const waiting = async (timer) => {
  setTimeout(() => {
    return 1;
    // console.log("timer is waiting for "+timer+" ms using setTimeout function...");
    
  }, timer);
};

// 1.1 language list
const languageList = {
  cpp: 54, //"C++ (GCC 9.2.0)"
  java: 91, //"Java (JDK 17.0.6)"
  javascript: 102, //"JavaScript (Node.js 22.08.0)"
  python: 109, //"Python (3.13.2)"
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
      console.error("error during batch submission in fetchData " + error);
    }
  }

  return await fetchData();
};

// 3 get status id
const statusId_Submission = async (tokensInput) => {
  // convert the array values into string by joining them with a comma (,)
  const tokensString = tokensInput.join(",");
  // console.log("tokensString");
  // console.log(tokensString);
  
  
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
      // console.log("calling fetchData() function");
      
      const response = await axios.request(options);
      // console.log(response.data.submissions);
      return response.data;
    } catch (error) {
      console.log(
        "error during fetching the data to know the status of the code during creating the problems " +
          error +
          "this is normally coming as error " +
          error.message
      );
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
    await waiting(2000);
  }
};

export { languageById, batchSubmission, statusId_Submission, waiting };
