import React, { useEffect, useState, useMemo } from "react";
import axiosClient from "../../axiosClient";
import Markdown from "react-markdown";

// 1. CACHING: Persist data across tab switches
const hintCache = new Map();

// --- Typing Effect Component ---
const TypingEffect = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    // Reset text if prop changes (e.g., clicking a different problem)
    setDisplayedText("");

    let index = 0;
    const intervalId = setInterval(() => {
      // Add one character at a time
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) clearInterval(intervalId);
    }, 4); // Fast, smooth typing speed

    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <div className="animate-fade-in">
      <Markdown
        components={{
          // Responsive Typography
          p: ({ node, ...props }) => (
            <p
              className="mb-4 leading-relaxed text-gray-700 text-sm md:text-base"
              {...props}
            />
          ),
          strong: ({ node, ...props }) => (
            <span
              className="font-bold text-gray-900 bg-yellow-100 px-1 rounded"
              {...props}
            />
          ),
          ul: ({ node, ...props }) => (
            <ul
              className="list-disc pl-5 mb-4 space-y-1 text-gray-700 text-sm md:text-base"
              {...props}
            />
          ),
          ol: ({ node, ...props }) => (
            <ol
              className="list-decimal pl-5 mb-4 space-y-1 text-gray-700 text-sm md:text-base"
              {...props}
            />
          ),

          // Code Block Styling (Crucial for Mobile)
          code: ({ node, inline, className, children, ...props }) => {
            return inline ? (
              <code
                className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded text-xs md:text-sm font-mono border border-gray-200"
                {...props}
              >
                {children}
              </code>
            ) : (
              // Overflow-x-auto allows code to scroll sideways on mobile without breaking layout
              <div className="w-full overflow-x-auto my-4 rounded-lg border border-gray-200 bg-slate-900 shadow-sm">
                <div className="px-4 py-2 border-b border-gray-700 bg-slate-800 flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                </div>
                <pre className="p-4 text-gray-100 font-mono text-xs md:text-sm leading-6">
                  <code {...props}>{children}</code>
                </pre>
              </div>
            );
          },
        }}
      >
        {displayedText}
      </Markdown>
    </div>
  );
};

// --- Main Component ---
const AiHints = ({ problem }) => {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiInput = useMemo(() => {
    return `Generate a concise, structured hint for this algorithm problem. Use bold text for key concepts. Keep code snippets abstract. 
            Title: ${problem.title}, 
            Description: ${problem.description}`;
  }, [problem._id, problem.title, problem.description]);

  useEffect(() => {
    async function fetchAIHints() {
      if (hintCache.has(problem._id)) {
        setOutput(hintCache.get(problem._id));
        return;
      }

      setLoading(true);
      setError(null);
      setOutput("");

      try {
        const response = await axiosClient.post("/ai/hints", {
          input: apiInput,
        });

        if (response.data?.success === false) {
          throw new Error(response.data.message || "Failed to generate hint.");
        }

        const resultText = response.data?.result || response.data;
        setOutput(resultText);
        hintCache.set(problem._id, resultText);
      } catch (err) {
        console.error("AI Hint Error:", err);
        setError("Unable to generate hints at the moment.");
      } finally {
        setLoading(false);
      }
    }

    if (problem?._id) {
      fetchAIHints();
    }
  }, [problem._id, apiInput]);

  return (
    <div className="mt-6 font-['Comic_Neue'] w-full">
      {/* Container: Simple, Clean, Responsive */}
      <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 overflow-hidden">
        {/* Header: Clean Strip */}
        <div className="bg-slate-50 px-4 py-3 md:px-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">💡</span>
            <h2 className="text-lg md:text-xl text-gray-800 font-semibold">
              Sketch Assistant
            </h2>
          </div>
          {/* Subtle Badge */}
          <span className="text-[10px] md:text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-full border border-blue-100">
            AI GENERATED
          </span>
        </div>

        {/* Content Area */}
        <div className="p-4 md:p-6 min-h-[120px]">
          {/* Loading Skeleton - Simple and Smooth */}
          {loading && (
            <div className="space-y-4 animate-pulse max-w-2xl">
              <div className="h-4 bg-gray-100 rounded w-3/4"></div>
              <div className="h-4 bg-gray-100 rounded w-full"></div>
              <div className="h-4 bg-gray-100 rounded w-5/6"></div>
              <div className="h-20 bg-gray-50 rounded-lg border border-dashed border-gray-200 mt-4"></div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="flex flex-col items-center justify-center text-center py-6 text-red-500">
              <p className="text-sm md:text-base font-bold mb-2">
                Network Error
              </p>
              <p className="text-xs md:text-sm text-gray-500">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 text-xs font-bold bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Success Content with Typing Effect */}
          {!loading && !error && output && (
            <div className="prose prose-slate max-w-none">
              <TypingEffect text={output} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiHints;
