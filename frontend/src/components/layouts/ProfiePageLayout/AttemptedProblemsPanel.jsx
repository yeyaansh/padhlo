import React from "react";
import { Link } from "react-router";

// Mock data for attempted problems
// const attemptedProblems = [
//   {
//     id: "4",
//     title: "Container With Most Water",
//     difficulty: "Medium",
//     tags: ["Arrays", "Two Pointers"],
//     lastAttempt: "2 days ago",
//   },
//   {
//     id: "5",
//     title: "Find Median from Data Stream",
//     difficulty: "Hard",
//     tags: ["Heaps", "Data Streams"],
//     lastAttempt: "5 days ago",
//   },
// ];

const AttemptedProblemCard = ({ problem, updatedAt }) => {
  const convertedTime = new Date(updatedAt).toLocaleDateString();
  const difficultyStyles = {
    easy: "bg-emerald-200 text-emerald-800",
    medium: "bg-amber-200 text-amber-800",
    hard: "bg-rose-200 text-rose-800",
  };

  return (
    // Note the different border color to distinguish from solved cards
    <div className="bg-white p-5 rounded-xl border-4 border-dashed border-blue-300 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h3 className="text-xl font-bold text-gray-800">{problem.title}</h3>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span
            className={`px-3 py-1 text-xs font-bold rounded-full ${
              difficultyStyles[problem.difficultyLevel]
            }`}
          >
            {problem.difficultyLevel}
          </span>
          {problem.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-purple-200 text-purple-800 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        {/* <p className="text-sm text-gray-500 mt-2 font-semibold">✏️ Last attempt: {problem.updatedAt}</p> */}
        {/* <p className="text-sm text-gray-500 mt-2 font-semibold">✏️ Last attempt: {updatedAt}</p> */}
        <p className="text-sm text-gray-500 mt-2 font-semibold">
          ✏️ Last attempt: {convertedTime}
        </p>
      </div>
      <Link
        to={`/problem/id/${problem._id}`}
        className="px-5 py-2 bg-blue-500 text-white font-bold rounded-lg sketch-button flex-shrink-0 text-center"
      >
        Continue
      </Link>
    </div>
  );
};

export default function AttemptedProblemsPanel({user}) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">In-Progress Sketches</h2>
      <div className="space-y-4">
        {/* {attemptedProblems.map(problem => ( */}
        {user.length==0 && <div>You haven't attempted any problem. Wanna jump right into it!</div>}
        {user?.map((problem) => (
          <AttemptedProblemCard
            key={problem?._id}
            problem={problem.problemId}
            updatedAt={problem.updatedAt}
          />
        ))}
      </div>
    </div>
  );
}
