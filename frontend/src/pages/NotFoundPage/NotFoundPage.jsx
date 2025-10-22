import React from 'react';
import { Link, useNavigate } from 'react-router';

export default function NotFoundPage() {
    const navigate = useNavigate();
  return (
    <div className="max-h-screen py-5 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 p-4 font-['Comic_Neue'] text-center overflow-hidden relative">
      {/* Background Doodles - static elements that add to the "sketch" feel */}
      <div className="absolute top-10 left-10 text-6xl text-purple-200 opacity-50 rotate-[-15deg] hidden sm:block">📝</div>
      <div className="absolute bottom-10 right-10 text-7xl text-yellow-200 opacity-50 rotate-[20deg] hidden sm:block">🤔</div>
      <div className="absolute top-1/4 right-1/4 text-5xl text-blue-200 opacity-50 rotate-[30deg] hidden md:block">💡</div>
      <div className="absolute bottom-1/3 left-1/4 text-8xl text-red-200 opacity-50 rotate-[-45deg] hidden lg:block">❓</div>

      <div className="relative z-10 bg-white rounded-2xl p-8 md:p-12 sketch-border-1 max-w-lg mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
        
        {/* Main "404" numbers, styled to look handwritten/sketchy */}
        <p className="text-9xl sm:text-[10rem] font-bold text-yellow-500 animate-bounce-slow leading-none">
          4<span className="text-purple-500">0</span>4
        </p>
        
        {/* Creative Title */}
        <h1 className="mt-6 text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
          Oops! This Sketch Has Wandered Off...
        </h1>
        
        {/* Engaging Description */}
        <p className="mt-5 text-lg text-gray-700 max-w-md mx-auto">
          It seems the page you were looking for is an un-sketched idea in the vast canvas of the internet. It might be lost, or perhaps, it was never drawn here!
        </p>
        
        {/* Call to Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/" 
            className="inline-block px-8 py-3 bg-yellow-400 text-gray-900 text-lg font-bold rounded-lg sketch-button shadow-md hover:scale-105 transition-transform duration-200"
          >
            Back to Homepage
          </Link>
          <button
            onClick={() => navigate(-1)} // Go back to the previous page
            className="inline-block px-8 py-3 bg-indigo-500 text-white text-lg font-bold rounded-lg sketch-button shadow-md hover:scale-105 transition-transform duration-200"
          >
            Go Back
          </button>
        </div>

        {/* A little hint/tip */}
        <p className="mt-8 text-sm text-gray-500 italic">
          Need a clue? Check your URL for typos, or try navigating from the homepage.
        </p>

      </div>
    </div>
  );
}