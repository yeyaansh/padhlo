import { useSelector } from "react-redux";
import { Link } from "react-router";

// You would import your actual ProblemDossierCard here

// for loggedin-users
const MockProblemCardLoggedIn = ({ problem }) => (
  <div className="bg-white rounded-xl sketch-border-1 p-5 text-left font-['Comic_Neue'] w-80 flex-shrink-0">
    <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
      {problem.title}
    </h3>
    <span
      className={`inline-block mt-2 px-3 py-1 text-xs font-bold rounded-full ${
        problem.difficulty === "Easy"
          ? "bg-emerald-200 text-emerald-800"
          : "bg-amber-200 text-amber-800"
      }`}
    >
      {problem.difficulty}
    </span>
  </div>
);
export default function HomePageLoggedIn() {
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const recommendedProblems = [
    { title: "Validate Binary Search Tree", difficulty: "Medium" },
    { title: "Merge K Sorted Lists", difficulty: "Hard" },
    { title: "Container With Most Water", difficulty: "Medium" },
    { title: "Implement Trie (Prefix Tree)", difficulty: "Medium" },
  ];

  return (
    <div className="p-6 md:p-10 font-['Comic_Neue'] pt-8">
      {/* 1. Personalized Greeting & Stats */}
      <h1 className="text-5xl font-bold text-gray-800">
        Welcome back, <span className="text-blue-600">{user?.first_name}!</span>
      </h1>
      <p className="text-lg text-gray-600">
        Your next challenge is ready when you are.
      </p>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-lg sketch-border-1">
          <h3 className="font-bold text-gray-600">Problems Solved</h3>
          <p className="text-4xl font-bold">
            24 <span className="text-xl text-gray-500">/ 250</span>
          </p>
        </div>
        <div className="bg-white p-5 rounded-lg sketch-border-1">
          <h3 className="font-bold text-gray-600">Current Streak</h3>
          <p className="text-4xl font-bold">
            🔥 8 <span className="text-xl text-gray-500">Days</span>
          </p>
        </div>
        <div className="bg-white p-5 rounded-lg sketch-border-1">
          <h3 className="font-bold text-gray-600">Experience Level</h3>
          <div className="w-full bg-gray-200 rounded-full h-4 mt-3">
            <div
              className="bg-yellow-400 h-4 rounded-full"
              style={{ width: "75%" }}
            ></div>
          </div>
        </div>
      </div>

      {/* 2. "Continue Where You Left Off" Section */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Pick Up Your Pencil</h2>
        <div className="bg-gradient-to-br from-purple-200 to-blue-200 p-8 rounded-xl sketch-border-1 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-gray-700 font-bold">You were last sketching:</p>
            <h3 className="text-3xl font-bold text-gray-800">
              Longest Substring Without Repeating Characters
            </h3>
          </div>
          <Link
            to="/problem/some-id"
            className="px-8 py-4 bg-yellow-400 text-gray-900 text-lg font-bold rounded-lg sketch-button flex-shrink-0"
          >
            Jump Back In
          </Link>
        </div>
      </section>

      {/* 3. "Recommended For You" Section */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-4">New Quests on the Horizon</h2>
        <div className="flex gap-6 pb-4 -mx-6 px-6 overflow-x-auto">
          {recommendedProblems.map((p, i) => (
            <MockProblemCardLoggedIn key={i} problem={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
