import React from "react";
import Markdown from 'react-markdown'
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
// 2. Import the CSS for the math formulas (CRITICAL for it to look right)
import "katex/dist/katex.min.css";
export default function ProblemDescription({ problem }) {
  console.log(problem);
  
  const getDifficultyStyles = (level = "") => {
    switch (level.toLowerCase()) {
      case "easy":
        return "bg-emerald-200 text-emerald-800";
      case "medium":
        return "bg-amber-200 text-amber-800";
      case "hard":
        return "bg-rose-200 text-rose-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">{problem.title}</h1>
      <div className="flex items-center gap-4">
        <span
          className={`px-4 py-1 text-sm font-bold rounded-full ${getDifficultyStyles(
            problem.difficultyLevel
          )}`}
        >
          {problem.difficultyLevel}
        </span>
        {/* Add other stats like acceptance rate here if available */}
        <span
          className={`px-4 py-1 text-sm font-bold rounded-full ${getDifficultyStyles(
            problem.acceptanceRate
          )}`}
        >
          {problem.acceptanceRate || "Acceptance Rate: 88%"}
        </span>
      </div>

      <div className="prose max-w-none text-gray-700">
        {/* 3. THE IMPROVED DESCRIPTION SECTION */}
      <div className="prose prose-slate max-w-none text-gray-800">
        <Markdown
          // Enable Math Support
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
          
          // Custom styling for the "Sketch" theme
          components={{
            // Paragraphs: Add relaxed line height and spacing
            p: ({ node, ...props }) => (
              <p className="mb-4 leading-7 text-base text-gray-700" {...props} />
            ),
            // Headings: Use the marker font
            h1: ({ node, ...props }) => (
              <h2 className="text-2xl font-['Permanent_Marker'] mt-6 mb-3 text-gray-900" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h3 className="text-xl font-['Permanent_Marker'] mt-5 mb-2 text-gray-800" {...props} />
            ),
            // Lists: Ensure bullets are visible and spaced
            ul: ({ node, ...props }) => (
              <ul className="list-disc pl-5 mb-4 space-y-1 text-gray-700" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal pl-5 mb-4 space-y-1 text-gray-700" {...props} />
            ),
            // Highlights: Yellow background for bold text
            strong: ({ node, ...props }) => (
              <span className="font-bold text-gray-900 bg-yellow-200 px-1 rounded-sm" {...props} />
            ),
            // Code Blocks: Dark mode style
            code: ({ node, inline, className, children, ...props }) => {
              if (inline) {
                return (
                  <code className="bg-slate-100 text-pink-600 px-1.5 py-0.5 rounded text-sm font-mono border border-gray-200" {...props}>
                    {children}
                  </code>
                );
              }
              return (
                <div className="bg-slate-900 text-gray-100 p-4 rounded-lg my-4 overflow-x-auto shadow-md border-l-4 border-yellow-400">
                  <code className="font-mono text-sm" {...props}>{children}</code>
                </div>
              );
            },
          }}
        >
          {/* This will now render math like $x^2$ correctly */}
          {problem.description || "No description available."}
        </Markdown>
      </div>



        {problem.visibleTestCases?.map((example, index) => {
          // pase test case
          const parseTestCase = (inputStr) => {
            if (!inputStr) return { target: null, input: null };

            // Check if the string contains a newline character
            if (inputStr.includes("\n")) {
              const [target, input] = inputStr.split("\n");
              return { target: target.trim(), input: input.trim() };
            } else {
              // If no newline, treat entire string as input (no target)
              return { target: null, input: inputStr.trim() };
            }
          };

          const { target: targetParsed, input: inputParsed } = parseTestCase(
            example.input
          );

          return (
            <div key={index} className="mt-4">
              <h3 className="font-bold">Example {index + 1}:</h3>
              <div className="bg-slate-100 p-3 rounded-lg border-2 border-dashed mt-1">
                <pre className="">
                  <code>
                    <strong>Input:</strong> {inputParsed} <br />
                    {targetParsed && (
                      <span>
                        <strong>Target:</strong> {targetParsed} <br />
                      </span>
                    )}
                    <strong>Output:</strong> {example.output} <br />
                  </code>
                </pre>
                <div>
                  {example.explaination && (
                    <>
                      <strong>Explanation:</strong> {example.explaination}
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {problem.constraints && (
          <div>
            <h3 className="font-bold mt-4">Constraints:</h3>
            <ul className="list-disc pl-5">
              {problem.constraints?.map((constraint, index) => (
                <li key={index}>
                  <code>{constraint}</code>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* --- Topics & Companies --- */}
      <div className="space-y-4">
        {problem.tags?.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-gray-600 mb-2">TOPICS</h3>
            <div className="flex flex-wrap gap-2">
              {problem.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-purple-200 text-purple-900 rounded-full text-xs font-semibold border-2 border-purple-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
        {problem.companies?.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-gray-600 mb-2">ASKED BY</h3>
            <div className="flex flex-wrap gap-2">
              {problem.companies.map((company, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-pink-200 text-pink-900 rounded-full text-xs font-semibold border-2 border-pink-400"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <hr className="border-dashed" />
    </div>
  );
}
