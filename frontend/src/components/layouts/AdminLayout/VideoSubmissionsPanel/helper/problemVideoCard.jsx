import React from "react";
import { Link } from "react-router"; // Corrected import

// Helper function to format dates
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// Helper function to clamp long IDs for display
const clampId = (id) => {
  if (!id || id.length < 10) return id;
  return `${id.substring(0, 4)}...${id.substring(id.length - 4)}`;
};

export default function ProblemVideoCard({ problem, onUpload, onDelete }) {
  return (
    <div className="bg-slate-50 p-4 rounded-lg border-2 border-dashed flex flex-col sm:flex-row justify-between sm:items-center gap-4">
      {/* Problem Info */}
      <div className="flex-1 min-w-0">
        {/* <h3 className="font-bold text-lg text-gray-800 truncate"> */}
        <h3 className="font-bold text-lg text-gray-800">
          {problem.title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-gray-500 font-semibold mt-1 flex-wrap">
          <span>
            ID:{" "}
            <code className="bg-gray-200 px-1 rounded">
              {clampId(problem._id)}
            </code>
          </span>
          <span className="hidden sm:inline">•</span>
          <span>Created: {formatDate(problem.createdAt)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 flex-shrink-0 flex-wrap">
        <Link
          to={`/problem/id/${problem._id}`} // Use backticks for template literal
          className="px-4 py-2 bg-gray-600 text-white text-xs font-bold rounded sketch-button hover:bg-gray-700 w-full sm:w-auto text-center"
        >
          View Problem
        </Link>

        {/* Conditional Action Button */}
        {!problem.videoURL ? (
          <button
            onClick={onUpload}
            className="px-4 py-2 bg-blue-500 text-white text-xs font-bold rounded sketch-button hover:bg-blue-600 w-full sm:w-auto"
          >
            Add Video
          </button>
        ) : (
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 text-white text-xs font-bold rounded sketch-button hover:bg-red-600 w-full sm:w-auto"
          >
            Delete Video
          </button>
        )}
      </div>
    </div>
  );
}
