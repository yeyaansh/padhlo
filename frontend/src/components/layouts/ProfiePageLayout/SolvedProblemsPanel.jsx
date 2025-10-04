import React from "react";
import { Link } from "react-router";

// Mock data for solved problems
const solvedProblems = [
  {
    id: "1",
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Arrays", "Hash Table"],
    solvedDate: "Oct 02, 2025",
  },
  {
    id: "2",
    title: "Reverse a Linked List",
    difficulty: "Easy",
    tags: ["Linked List", "Pointers"],
    solvedDate: "Sep 28, 2025",
  },
  {
    id: "3",
    title: "Validate Binary Search Tree",
    difficulty: "Medium",
    tags: ["Trees", "DFS", "Recursion"],
    solvedDate: "Sep 25, 2025",
  },
];

const SolvedProblemCard = ({ problem }) => {
  const difficultyStyles = {
    Easy: "bg-emerald-200 text-emerald-800",
    Medium: "bg-amber-200 text-amber-800",
    Hard: "bg-rose-200 text-rose-800",
  };

  return (
    <div className="bg-white p-5 rounded-xl sketch-border-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h3 className="text-xl font-bold text-gray-800">{problem.title}</h3>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span
            className={`px-3 py-1 text-xs font-bold rounded-full ${
              difficultyStyles[problem.difficulty]
            }`}
          >
            {problem.difficulty}
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
        <p className="text-sm text-gray-500 mt-2 font-semibold">
          ✅ Solved on: {problem.solvedDate}
        </p>
      </div>
      <Link
        to={`/problem/id/${problem.id}`}
        className="px-5 py-2 bg-yellow-400 text-gray-900 font-bold rounded-lg sketch-button flex-shrink-0 text-center"
      >
        Review
      </Link>
    </div>
  );
};

export default function SolvedProblemsPanel() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Solved Problems</h2>
      <div className="space-y-4">
        {solvedProblems.map((problem) => (
          <SolvedProblemCard key={problem.id} problem={problem} />
        ))}
      </div>
    </div>
  );
}
