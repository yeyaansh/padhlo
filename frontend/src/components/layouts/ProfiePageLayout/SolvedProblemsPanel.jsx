import React from "react";
import { Link } from "react-router"; // CORRECTED: Import from react-router

// ## NEW ##: A dedicated component for when the list is empty.
const EmptyState = () => (
  <div className="text-center p-10 bg-slate-50 rounded-xl border-4 border-dashed">
    <p className="text-5xl mb-4">🎨</p>
    <h3 className="text-2xl font-bold text-gray-800">Your Sketchbook is Clean!</h3>
    <p className="text-gray-600 mt-2">You haven't solved any problems yet. Time to make your mark!</p>
    <Link
      to="/problem/all"
      className="mt-6 inline-block px-6 py-3 bg-yellow-400 text-gray-900 text-lg font-bold rounded-lg sketch-button"
    >
      Find a Challenge
    </Link>
  </div>
);

const SolvedProblemCard = ({ problem }) => {
  const difficultyStyles = {
    easy: "bg-emerald-200 text-emerald-800",
    medium: "bg-amber-200 text-amber-800",
    hard: "bg-rose-200 text-rose-800",
  };

  // ## NEW ##: Function to format the date nicely.
  const formatDate = (dateString) => {
    if (!dateString) return "--:--:--";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white p-5 rounded-xl sketch-border-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h3 className="text-xl font-bold text-gray-800">{problem?.title}</h3>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span
            className={`px-3 py-1 text-xs font-bold rounded-full ${
              difficultyStyles[problem?.difficultyLevel?.toLowerCase()] || 'bg-gray-200'
            }`}
          >
            {problem?.difficultyLevel}
          </span>
          {/* ## IMPROVED ##: Added optional chaining for safety */}
          {problem?.tags?.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-purple-200 text-purple-800 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2 font-semibold">
          ✅ Solved on: {formatDate(problem.createdAt)}
        </p>
      </div>
      <Link
        to={`/problem/id/${problem._id}`}
        className="px-5 py-2 bg-yellow-400 text-gray-900 font-bold rounded-lg sketch-button flex-shrink-0 text-center"
      >
        Review
      </Link>
    </div>
  );
};

// ## IMPROVED ##: Changed prop from `user` to `problems` for clarity.
export default function SolvedProblemsPanel({ problems }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Solved Problems</h2>
      <div className="space-y-4">
        {/* ## IMPROVED ##: Check is clearer and uses the new EmptyState component. */}
        {!problems || problems.length === 0 ? (
          <EmptyState />
        ) : (
          problems.map((problem) => (
            <SolvedProblemCard key={problem._id} problem={problem} />
          ))
        )}
      </div>
    </div>
  );
}