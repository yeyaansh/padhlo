import { useEffect } from "react";
import axiosClient from "../../axiosClient";
import { useState } from "react";
import { Link } from "react-router";
import SkeletonCard from "../../components/skeleton/problemSkeleton";
import { useSelector } from "react-redux";

export default function ProblemPageAll() {

  const [allFetchedProblem, setAllFetchedProblem] = useState(null);
  const [loading, setIsLoading] = useState(true);

  const {isAuthenticated, isLoading} = useSelector(state=>state.auth); 

console.log("inside problem for all ", "isAuthe: ", isAuthenticated, " isLoading", isLoading);


  useEffect(() => {
    const fetchAll = async () => {
      const response = await axiosClient.get("/problem/all");
      console.log(response.data);
      setIsLoading(false);
      setAllFetchedProblem(response.data);
    };
    fetchAll();
  }, []);

  if (loading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 p-6">
        <SkeletonCard></SkeletonCard>
        <SkeletonCard></SkeletonCard>
        <SkeletonCard></SkeletonCard>
        <SkeletonCard></SkeletonCard>
        <SkeletonCard></SkeletonCard>
        <SkeletonCard></SkeletonCard>
      </div>
    );

  const getDifficultyStyles = (level) => {
    switch (level.toLowerCase()) {
      case "easy":
        return {
          bgColor: "bg-emerald-200",
          textColor: "text-emerald-800",
          borderColor: "border-emerald-600",
          icon: "🌱", // Playful icon for Easy
        };
      case "medium":
        return {
          bgColor: "bg-amber-200",
          textColor: "text-amber-800",
          borderColor: "border-amber-600",
          icon: "⚡", // Playful icon for Medium
        };
      case "hard":
        return {
          bgColor: "bg-rose-200",
          textColor: "text-rose-800",
          borderColor: "border-rose-600",
          icon: "🔥", // Playful icon for Hard
        };
      default:
        return {
          bgColor: "bg-gray-200",
          textColor: "text-gray-800",
          borderColor: "border-gray-600",
          icon: "❓",
        };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 p-6 font-['Comic_Neue']">
      {allFetchedProblem?.map((problem, index) => {
        const difficulty = getDifficultyStyles(problem.difficultyLevel);

        return (
          <div
            draggable={true}
            key={problem._id || index}
            className="group relative bg-white rounded-xl shadow-md p-6 flex flex-col justify-between sketch-border-1 transform hover:-translate-y-2 transition-transform duration-200 ease-out"
          >
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-3">
                <h3
                  className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors leading-tight line-clamp-2 sketchy-underline"
                  style={{ "--underline-color": difficulty.borderColor }}
                >
                  {problem.title}
                </h3>

                {/* Difficulty badge */}
                <span
                  className={`px-3 py-1 ml-2 rounded-full text-xs font-bold flex items-center gap-1 ${difficulty.bgColor} ${difficulty.textColor} border-2 ${difficulty.borderColor} shadow-sm`}
                >
                  <span className="text-sm">{difficulty.icon}</span>
                  {problem.difficultyLevel}
                </span>
              </div>

              {/* Acceptance Rate */}
              <p className="text-sm text-gray-600 font-semibold mb-4">
                Acceptance:{" "}
                <span className="text-gray-800">
                  {problem.acceptanceRate || "69"}%
                </span>
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {problem.tags.slice(0, 3).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-3 py-1 bg-gradient-to-br from-purple-300 to-purple-400 text-purple-900 rounded-full text-xs font-semibold border-2 border-purple-600 shadow-sm transform hover:scale-105 transition-transform"
                >
                  {tag}
                </span>
              ))}
              {problem.tags.length > 3 && (
                <span className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full text-xs font-semibold border-2 border-gray-500 shadow-sm">
                  +{problem.tags.length - 3} More
                </span>
              )}
            </div>

            {/* Companies */}
            {problem.companies?.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-700 font-semibold mb-2">
                  Asked in:
                </p>
                <div className="flex flex-wrap gap-2">
                  {problem.companies
                    .slice(0, 2)
                    .map((company, companyIndex) => (
                      <span
                        key={companyIndex}
                        className="px-3 py-1 bg-gradient-to-br from-pink-300 to-pink-400 text-pink-900 rounded-full text-xs font-semibold border-2 border-pink-600 shadow-sm transform hover:rotate-3 transition-transform"
                      >
                        {company}
                      </span>
                    ))}
                  {problem.companies.length > 2 && (
                    <span className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full text-xs font-semibold border-2 border-gray-500 shadow-sm">
                      +{problem.companies.length - 2} Others
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Footer CTA */}
            <div className="flex items-center justify-center pt-4 border-t-2 border-dashed border-gray-300 mt-auto">
              <Link
                to={`/problem/id/${problem?._id}`}
                className="inline-flex items-center justify-center px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-lg font-['Permanent_Marker'] rounded-lg transition-all duration-200 ease-out transform active:scale-95 sketch-button"
              >
                Let's Code!
                <span className="ml-2 text-xl">🚀</span>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
