import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosClient from "../../axiosClient";

// Import helper components (which we'll define below)
import { LoadingState } from "../../components/common/LoadingState";
import { ErrorState } from "../../components/common/ErrorState";
import ProblemDescription from "../../components/common/ProblemDescription";
import CodeEditor from "../../components/common/CodeEditor";

export default function ProblemPageById() {
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the left and right panel tabs
  const [leftTab, setLeftTab] = useState("description");

  const { id } = useParams();

  useEffect(() => {
    async function fetchProblemById() {
      // Reset state for new ID
      setLoading(true);
      setError(null);

      try {
        const response = await axiosClient.get(`/problem/id/${id}`);

        if (response.data?.success === false) {
          throw new Error(response.data.message || "Problem not found.");
        }

        // The actual problem data might be nested, adjust as needed
        setProblem(response.data._doc || response.data);
        console.log(response.data._doc);
      } catch (err) {
        console.error("Failed to fetch problem:", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }

    fetchProblemById();
  }, [id]);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!problem) {
    return <ErrorState message="Could not load the problem details." />;
  }

  return (
    <div className="flex flex-col md:flex-row h-fit md:h-[calc(100vh-8rem)] font-['Comic_Neue'] md:gap-2 bg-slate-100 gap-8 p-2 mx-2">
      {/* ## Left Panel: Problem Details ## */}
      <div className="flex flex-col h-150 md:h-full md:w-2/5 bg-white rounded-xl sketch-border-1 overflow-hidden">
        <div className="flex items-center border-b-2 border-dashed p-2 gap-2">
          <TabButton
            active={leftTab === "description"}
            onClick={() => setLeftTab("description")}
          >
            Description
          </TabButton>
          <TabButton
            active={leftTab === "discuss"}
            onClick={() => setLeftTab("discuss")}
          >
            Discuss
          </TabButton>
        </div>
        <div className="p-5 overflow-y-auto">
          {leftTab === "description" && (
            <ProblemDescription problem={problem} />
          )}
          {leftTab === "discuss" && (
            <div className="text-center p-10">
              Discussion forum coming soon! 💬
            </div>
          )}
        </div>
      </div>

      {/* ## Center Handle (Visual only) ## */}
      <div className="hidden md:flex items-center justify-center cursor-col-resize">
        <div className="w-1.5 h-16 bg-gray-300 rounded-full"></div>
      </div>

      {/* ## Right Panel: Code Editor ## */}
      <div className="flex flex-col h-150 md:h-full md:flex-1 bg-white rounded-xl sketch-border-1 overflow-hidden">
        <CodeEditor problem={problem} />
      </div>
    </div>
  );
}

// Reusable tab button
const TabButton = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm rounded-lg font-bold transition-colors ${
      active
        ? "bg-yellow-200 text-yellow-900"
        : "text-gray-600 hover:bg-slate-200"
    }`}
  >
    {children}
  </button>
);
