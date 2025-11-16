import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { Link, useNavigate } from "react-router";
import SkeletonCard from "../../components/skeleton/problemSkeleton";
import { useSelector } from "react-redux";

export default function ProblemPageAll() {
  const [problems, setProblems] = useState(null);
  const [loading, setLoading] = useState(true);

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchAll = async () => {
      const response = await axiosClient.get("/problem/all");
      setProblems(response.data);
      setLoading(false);
    };
    fetchAll();
  }, []);

  const navigate = useNavigate();
  const getDifficultyStyles = (level) => {
    switch (level?.toLowerCase()) {
      case "easy":
        return {
          bg: "bg-emerald-100",
          text: "text-emerald-700",
          border: "border-emerald-500",
          sketch: "difficulty-easy-icon",
        };
      case "medium":
        return {
          bg: "bg-amber-100",
          text: "text-amber-700",
          border: "border-amber-500",
          sketch: "difficulty-medium-icon",
        };
      case "hard":
        return {
          bg: "bg-rose-100",
          text: "text-rose-700",
          border: "border-rose-500",
          sketch: "difficulty-hard-icon",
        };
      default:
        return {
          bg: "bg-gray-200",
          text: "text-gray-700",
          border: "border-gray-500",
        };
    }
  };

  if (loading) {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </>
    );
  }

  return (
    <>
      {/* <ProblemsNavbar /> */}

      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-6 flex gap-10">
        {/* LEFT: Problems Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {problems?.map((problem, index) => {
            const diff = getDifficultyStyles(problem.difficultyLevel);

            return (
              <div
                key={problem._id || index}
                className="
                  bg-white rounded-2xl sketch-border-1 p-6
                  shadow-md polaroid-shadow
                  hover:-translate-y-1 hover:shadow-lg
                  transition-all duration-200 flex flex-col
                "
              >
                {/* Title + Difficulty */}
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <h3
                      className="
                        text-2xl font-bold text-gray-900
                        leading-tight line-clamp-2
                        sketchy-underline
                      "
                      style={{ "--underline-color": diff.border }}
                    >
                      {problem.title}
                    </h3>

                    <span
                      className={`
                        px-3 py-1 rounded-full text-sm font-bold
                        border-2 shadow-sm
                        ${diff.bg} ${diff.text} ${diff.border} ${diff.sketch}
                      `}
                    >
                      {problem.difficultyLevel}
                    </span>
                  </div>

                  {/* Acceptance */}
                  <p className="text-sm text-gray-700 mb-4 font-bold">
                    Acceptance:
                    <span className="ml-1 text-gray-900">
                      {problem.acceptanceRate || 69}%
                    </span>
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {problem.tags?.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="
                        px-3 py-1 bg-purple-200 text-purple-900
                        rounded-full text-xs font-bold
                        border-2 border-purple-600
                        shadow-sm
                      "
                    >
                      {tag}
                    </span>
                  ))}

                  {problem.tags?.length > 3 && (
                    <span
                      className="
                      px-3 py-1 bg-gray-300 text-gray-800 rounded-full
                      text-xs font-bold border-2 border-gray-500 shadow-sm
                    "
                    >
                      +{problem.tags.length - 3} More
                    </span>
                  )}
                </div>

                {/* Companies */}
                {problem.companies?.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-800 font-bold mb-1">
                      Asked in:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {problem.companies.slice(0, 2).map((c, i) => (
                        <span
                          key={i}
                          className="
                            px-3 py-1 bg-pink-200 text-pink-900
                            rounded-full text-xs font-bold
                            border-2 border-pink-600
                            shadow-sm
                          "
                        >
                          {c}
                        </span>
                      ))}

                      {problem.companies.length > 2 && (
                        <span
                          className="
                          px-3 py-1 bg-gray-300 text-gray-900 rounded-full
                          text-xs font-bold border-2 border-gray-500 shadow-sm
                        "
                        >
                          +{problem.companies.length - 2} Others
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <Link
                  to={`/problem/id/${problem._id}`}
                  className="
                    w-full mt-auto text-center py-3
                    bg-yellow-300 hover:bg-yellow-400
                    text-gray-900 text-xl font-bold rounded-lg
                    sketch-button
                  "
                >
                  Let's Code!
                </Link>
              </div>
            );
          })}
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="hidden lg:block w-80 space-y-6">
          <div className="bg-white p-6 rounded-2xl sketch-border-1 shadow-md polaroid-shadow">
            <h3 className="text-xl font-bold mb-3">Your Progress</h3>
            <p className="text-gray-800 font-bold">Daily Streak: 3</p>
            <p className="text-gray-800 font-bold mt-2">Solved: 7 / 170</p>
          </div>

          <div className="bg-white p-6 rounded-2xl sketch-border-1 shadow-md polaroid-shadow">
            <h3 className="text-xl font-bold mb-3">Suggested</h3>
            <Link className="text-blue-600 font-bold underline">
              Best Time to Buy and Sell Stock
            </Link>

            <button
              className="
              w-full mt-4 py-3 bg-gray-200 hover:bg-gray-300
              text-gray-900 font-bold rounded-lg sketch-button
            "
              onClick={() => navigate("/problem/id/68fe3f9bbc48416ea93b9412")}
            >
              Random Problem
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl sketch-border-1 shadow-md polaroid-shadow">
            <h3 className="text-xl font-bold mb-2">Rate Problems</h3>
            <p className="text-gray-800 font-bold text-sm">
              Help improve quality
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
