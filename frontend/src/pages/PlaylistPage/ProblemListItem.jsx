import { Link } from "react-router";

export default function ProblemListItem({ problem }) {
  const difficultyStyles = {
    easy: "bg-emerald-200 text-emerald-800",
    medium: "bg-amber-200 text-amber-800",
    hard: "bg-rose-200 text-rose-800",
  };

  return (
    <div className="bg-white p-4   rounded-xl border-2 flex items-center justify-between gap-4">
      <div>
        <h3 className="text-xl font-bold text-gray-800">{problem.title}</h3>
        <span
          className={`mt-2 inline-block px-3 py-1 text-xs font-bold rounded-full ${
            difficultyStyles[problem.difficultyLevel?.toLowerCase()] ||
            "bg-gray-200"
          }`}
        >
          {problem.difficultyLevel}
        </span>
      </div>
      <Link
        to={`/problem/id/${problem._id}`}
        className="px-6 py-2 bg-yellow-400 text-gray-900 font-bold rounded-lg sketch-button flex-shrink-0 text-center"
      >
        Solve
      </Link>
    </div>
  );
}
