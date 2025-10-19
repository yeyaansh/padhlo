import React from "react";
import { Link } from "react-router"; // CORRECTED: Import from react-router

// ## NEW ##: A dedicated component for when the list is empty.
const EmptyState = () => (
  <div className="text-center p-10 bg-slate-50 rounded-xl border-4 border-dashed">
    <p className="text-5xl mb-4">✏️</p>
    <h3 className="text-2xl font-bold text-gray-800">No Attempted Sketches!</h3>
    <p className="text-gray-600 mt-2">Looks like you haven't attempted anything. Ready for a new challenge?</p>
    <Link
      to="/problem/all"
      className="mt-6 inline-block px-6 py-3 bg-yellow-400 text-gray-900 text-lg font-bold rounded-lg sketch-button"
    >
      Explore Problems
    </Link>
  </div>
);

// ## NEW ##: Helper function to calculate relative time.
const formatRelativeTime = (dateString) => {
  if (!dateString) return "a while ago";
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.round((now - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) return `${seconds} seconds ago`;
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  return `${days} days ago`;
};


const AttemptedProblemCard = ({ attempt }) => {
  const { problemId: problem, updatedAt } = attempt; // Destructure the problem and timestamp
  
  const difficultyStyles = {
    easy: "bg-emerald-200 text-emerald-800",
    medium: "bg-amber-200 text-amber-800",
    hard: "bg-rose-200 text-rose-800",
  };

  return (
    <div className="bg-white p-5 rounded-xl border-4 border-dashed border-blue-300 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
          ✏️ Last attempt: {formatRelativeTime(updatedAt)}
        </p>
      </div>
      <Link
        to={`/problem/id/${problem?._id}`}
        className="px-5 py-2 bg-blue-500 text-white font-bold rounded-lg sketch-button flex-shrink-0 text-center"
      >
        Continue
      </Link>
    </div>
  );
};

// ## IMPROVED ##: Prop renamed from `user` to `problems` for clarity.
export default function AttemptedProblemsPanel({ problems }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Attempted Sketches</h2>
      <div className="space-y-4">
        {!problems || problems.length === 0 ? (
          <EmptyState />
        ) : (
          problems.map((attempt) => (
            // The card now receives the whole `attempt` object
            <AttemptedProblemCard key={attempt._id} attempt={attempt} />
          ))
        )}
      </div>
    </div>
  );
}