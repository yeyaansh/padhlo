import problem from "../models/problemSchema.js"
import submission from "../models/userSubmissionSchema.js"
import {
  languageById,
  batchSubmission,
  statusId_Submission,
} from "../utils/problemUtility.js"
const submitCodeFunction = async (req, res) => {
  try {

    // console.log(req.body);
    

    const problemId = (req.params.id);
    const userId = req.result._id;
    const { code, language } = req.body;
    // validator
    if (!userId || !problemId || !code || !language)
      res.status(401).send("Fields Missing");

    // fetch the problem from database to check whether the problem exist or not
    const foundProblem = await problem.findById(problemId);
    if (!foundProblem) res.status(401).send("Problem Doesn't Exist");

    const { visibleTestCases, hiddenTestCases } = foundProblem;
    const allTestCases = [...visibleTestCases, ...hiddenTestCases];
    // store the raw code before sending to judge0

    const submitAnswer = await submission.create({
      userId,
      problemId,
      code,
      language,
      //   we need to explicitly define there two parameter cuz initially we are creating the
      //  well from my POV, this doen't necessarily need to define cuz this is same as default values in Schema but don't worry nothing effect that much
      testCasesPassed: 0,
      status: "pending",
      // need to include this one
      totalTestCases: allTestCases.length,
    });

    // now send the code to judge0 for processing and getting the details

    const languageID = languageById(language);

    const submissions = allTestCases.map((value) => {
      return {
        language_id: languageID,
        source_code: code,
        stdin: value.input,
        expected_output: value.output,
      };
    });

    const batchTokens = await batchSubmission(submissions);

    const resultToken = batchTokens.map((k) => k.token);

    const batchSubmissionStatus = await statusId_Submission(resultToken);
    // console.log(batchSubmissionStatus)
    let runTime = 0;
    let memory = 0;
    let status = "accepted";
    let errorMessage = null;
    let testCasesPassed = 0;
    for (const test of batchSubmissionStatus.submissions) {
      if (test.status_id == 3) {
        testCasesPassed++;
        runTime = runTime + parseFloat(test.time);
        memory = Math.max(memory, test.memory);
      } else {
        if (test.status_id == 4) {
          status = "wrong";
          errorMessage = "Wrong Answer";
        } else if (test.status_id == 5) {
          status = "time limit exceeded";
          errorMessage = "Time Limit Exceeded";
        } else if (test.status_id == 6) {
          status = "compilation error";
          errorMessage = "Compilation Error";
        } else {
          status = "runtime error";
          errorMessage = "Runtime Error";
        }
      }
    }

    // update the submission data with all fields
    submitAnswer.status = status;
    submitAnswer.runtime = runTime;
    submitAnswer.memory = memory;
    submitAnswer.errorMessage = errorMessage;
    submitAnswer.testCasesPassed = testCasesPassed;

    await submitAnswer.save();
    
    if(!req.result.problemSolved.includes(problemId))
    {
      req.result.problemSolved.push(problemId)
      await req.result.save();
    }


    res.status(201).send(submitAnswer);
  } catch (err) {
    console.log("error while submitting the code "+err);
    res.status(400).send(err.message);
  }
};

const runCodeFunction = async (req, res) => {
  try {

        console.log(req.body);

    const problemId = (req.params.id);
    const userId = req.result._id;
    const { code, language } = req.body;
    // validator
    if (!userId || !problemId || !code || !language)
      res.status(400).send("Fields Missing");

    // fetch the problem from database to check whether the problem exist or not
    const foundProblem = await problem.findById(problemId);
    if (!foundProblem) res.status(400).send("Problem Doesn't Exist");

    const { visibleTestCases } = foundProblem;

    // now send the code to judge0 for processing and getting the details

    const languageID = languageById(language);

    const submissions = visibleTestCases.map((value) => {
      return {
        language_id: languageID,
        source_code: code,
        stdin: value.input,
        expected_output: value.output,
      };
    });

    const batchTokens = await batchSubmission(submissions);

    const resultToken = batchTokens.map((k) => k.token);

    const batchSubmissionStatus = await statusId_Submission(resultToken);
    console.log(batchSubmissionStatus)
    let runTime = 0;
    let memory = 0;
    let status = "accepted";
    let errorMessage = null;
    let testCasesPassed = 0;
    for (const test of batchSubmissionStatus.submissions) {
      if (test.status_id == 3) {
        testCasesPassed++;
        runTime = runTime + parseFloat(test.time);
        memory = Math.max(memory, test.memory);
      } else {
        if (test.status_id == 4) {
          status = "wrong";
          errorMessage = "Wrong Answer";
        } else if (test.status_id == 5) {
          status = "time limit exceeded";
          errorMessage = "Time Limit Exceeded";
        } else if (test.status_id == 6) {
          status = "compilation error";
          errorMessage = "Compilation Error";
        } else {
          status = "runtime error";
          errorMessage = "Runtime Error";
        }
      }
    }

    const runResult = {
      status,
      runTime,
      memory,
      errorMessage,
      testCasesPassed,
    };

    res.status(201).send(runResult);
  } catch (err) {
    console.log("error while running the code "+err);
    res.status(401).send(err.message);
  }
};
export {submitCodeFunction,runCodeFunction};
