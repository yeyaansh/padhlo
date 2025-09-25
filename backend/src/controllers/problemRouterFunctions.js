import problem from "../models/problemSchema.js"
import User from "../models/userSchema.js"
import submission from "../models/userSubmissionSchema.js"
import {
  languageById,
  batchSubmission,
  statusId_Submission,
} from "../utils/problemUtility.js";

const createProblem = async (req, res) => {
  const {
    title,
    description,
    difficultyLevel,
    tags,
    companies,
    visibleTestCases,
    hiddenTestCases,
    starterCode,
    referenceSolution,
  } = req.body;

  try {

    // this will iterate over each array of referenceSolution containing language and completeCode, because we are in the phase of create Problem, so we need to verify the code before submitting it to the db
    for (const { language, completeCode } of referenceSolution) {

      // get the number with respect to the language of the compiler
      const languageID = languageById(language);


      // store languageId, souceId, input, expectedOutput for all visible test cases in array
      const submissions = visibleTestCases.map((value) => {
        return {
          language_id: languageID,
          source_code: completeCode,
          stdin: value.input,
          expected_output: value.output,
        };
      });
      // submissions.map((value)=> console.log(value))
      const batchTokens = await batchSubmission(submissions);
      // console.log(batchTokens)

      // store token data in an array, this helps in future to get the information about the status of the submitted codes
      const resultToken = batchTokens.map((k) => k.token);

      const batchSubmissionStatus = await statusId_Submission(resultToken);
      // console.log("starting")
      // console.log(batchSubmissionStatus)
      // console.log("ending")
      for (const {
        language_id,
        status_id,
      } of batchSubmissionStatus.submissions) {
        if (status_id != 3) {
          return res.status(401).send("Error in your Submitted Code while creating the problem");
        }
        console.log(`language: ${language_id}, statusId: ${status_id}`);
      }
    }

    //  store data in database
    const createProblem = await problem.create({
      ...req.body,
      problemCreator: req.result._id,
    });
    res.status(201).send("Problem Created Succesfully");
  } catch (err) {
    console.log("error during creating the problem "+ err)
    res.status(401).send(err.message);
  }
};

const updateProblem = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    difficultyLevel,
    tags,
    companies,
    visibleTestCases,
    hiddenTestCases,
    starterCode,
    referenceSolution,
  } = req.body;

  try {
    if (!id) {
      throw new Error("Problem-Id shouldn't be empty");
    }

    // check if the problem exists in your db
    const exist = await problem.findById(id);
    if (!exist) {
      throw new Error("This Problem Id doesn't exist");
    }
    // repeat the process same as we performed while creating the problem
    // verify the problem on judge0 before saving in database
    for (const { language, completeCode } of referenceSolution) {
      const languageID = languageById(language);

      const submissions = visibleTestCases.map((value) => {
        return {
          language_id: languageID,
          source_code: completeCode,
          stdin: value.input,
          expected_output: value.output,
        };
      });
      // submissions.map((value)=> console.log(value))
      const batchTokens = await batchSubmission(submissions);
      // console.log(batchTokens)

      const resultToken = batchTokens.map((k) => k.token);

      const batchSubmissionStatus = await statusId_Submission(resultToken);

      for (const {
        language_id,
        status_id,
      } of batchSubmissionStatus.submissions) {
        if (status_id != 3) {
          return res.status(401).send("Error in your Submitted Code");
        }
        console.log(`language: ${language_id}, statusId: ${status_id}`)
      }
    }


    // run validators to verify the new data (as it follows the rules) before saving it to the db
    const updatedProblem = await problem.findByIdAndUpdate(
      id,
      { ...req.body, problemCreator: req.result._id },
      { runValidators: true, new: true }
    );
    res.status(201).send(`Updated Data: ${updatedProblem}`);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};
const deleteProblemById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      throw new Error("Problem Id is empty");
    }
    const exist = await problem.findById(id);
    if (!exist) {
      throw new Error("The Problem Id you are trying to delete doesn't exist");
    }

    const deleted = await problem.findByIdAndDelete(id);
    res.status(200).send("Problem-Id has been deleted succesfully\n",deleted);
  } catch (err) {
    console.log("error while deleting the problem from the db of problems"+err);
    res.status(401).send(err.message);
  }
};

const fetchProblemById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      throw new Error("Problem Id is not valid");
    }

    const problemById = await problem
      .findById(id)
      .select(
        "title description difficultyLevel tags companies visibleTestCases starterCode"
      );
    if (!problemById) {
      throw new Error("This Problem Id doen't exist");
    }

    res.status(200).send(problemById);
  } catch (err) {
    console.log("error while fetching the data from db "+err);
    res.status(401).send(err.message);
  }
};

const fetchAllProblem = async (req, res) => {
  try {
    // query parameter can be used here // parameters that can be passed to fetch all problems (it may be consist of some filters)
    const { difficultyLevel, tags, companies } = req.query;

    // if invalid or undefined or null value is send it throws NaN but due to logical OR it throws 1

    // page number
    const page = parseInt(req.query.page) || 1;

    const filters = {};
    if (difficultyLevel) {
      filters.difficultyLevel = difficultyLevel;
    }
    if (tags) {
      filters.tags = tags;
    }

    if(companies){
      filters.companies = companies;
    }

    // const allProblems = await problem.find({});
    const allProblems = await problem
      .find(filters)
      .select("title difficultyLevel tags companies")
      .skip((page - 1) * process.env.ALL_PROBLEMS_FETCH_LIMIT)
      .limit(process.env.ALL_PROBLEMS_FETCH_LIMIT);

    res.status(200).send(allProblems);
  } catch (err) {
    console.log("error while fetching all the problems "+err);
    res.status(500).send(err.message);
  }
};


// this tells the unique problems attempted by the user
const  solvedProblems = async (req, res) => {
  try {

    // only bring the solved questions by the user
    const userSolvedProblem = await User.findById(req.result._id)
      .populate({
        path: "problemSolved",
        select: "_id title difficultyLevel tags companies",
      })
      .select("problemSolved");
    const count = userSolvedProblem.problemSolved.length;
    // console.log(count);
    const data = {
      count,
      userSolvedProblem,
    };

    res.status(200).send(data);
  } catch (err) {
    console.log("error while fetching the data from user's all solvedProblems "+err);
    res.status(500).send(err.message);
  }
};

// this tells the user how many times, (more meta-data about the problem) the problem attempted and it's answers.
// more data about that specific problem id
const submittedProblem = async (req, res) => {
  try {
    const userId = req.result._id;
    const problemId = req.params.id;
    const answer = await submission.find({ userId, problemId });
    console.log(answer);
    res.status(200).send(answer);
  } catch (err) {
    console.log("error while fetching the data about the solved problem id "+err);
    res.status(401).send(err.message);
  }
};

export {
  createProblem,
  updateProblem,
  deleteProblemById,
  fetchProblemById,
  fetchAllProblem,
  solvedProblems,
  submittedProblem,
};
