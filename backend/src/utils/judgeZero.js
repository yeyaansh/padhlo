import axios from "axios"



// 54 for C++
// 91 for Java
// 110 for C
// 102 for Javascript


const options = {
  method: "POST",
  url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
  params: {
    base64_encoded: "true",
  },
  headers: {
    "x-rapidapi-key": process.env.JUDGE_0_API_KEY,
    "x-rapidapi-host": process.env.JUDGE_0_HOST,
    "Content-Type": "application/json",
  },
  data: {
    submissions: [
      {
        language_id: 46,
        source_code: "ZWNobyBoZWxsbyBmcm9tIEJhc2gK",
      },
      {
        language_id: 71,
        source_code: "cHJpbnQoImhlbGxvIGZyb20gUHl0aG9uIikK",
      },
      {
        language_id: 72,
        source_code: "cHV0cygiaGVsbG8gZnJvbSBSdWJ5IikK",
      },
    ],
  },
};

async function fetchData() {
  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

fetchData();
