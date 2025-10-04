import React from "react";
import { Link } from "react-router";

export const ErrorState = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-5rem)] font-['Comic_Neue'] bg-slate-50 p-4">
      <div className="text-center p-10 bg-white rounded-2xl sketch-border-1 max-w-lg">
        <p className="text-7xl mb-4">❌</p>
        <h2 className="text-4xl font-bold text-red-600">
          Oops! Sketch Not Found
        </h2>
        <p className="text-gray-600 mt-2 font-semibold">
          {message || "We couldn't find the page you were looking for."}
        </p>
        <Link
          to="/problem/all"
          className="mt-8 inline-block px-8 py-3 bg-yellow-400 text-gray-900 text-lg font-bold rounded-lg sketch-button"
        >
          Back to All Problems
        </Link>
      </div>
    </div>
  );
};
