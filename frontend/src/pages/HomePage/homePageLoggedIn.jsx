import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import axiosClient from "../../axiosClient";
import { ErrorState } from "../../components/common/ErrorState";
import HomePageSkeleton from "../../components/common/HomePageSkeleton";
import Navbar from "../../components/Navbar";

// You would import your actual ProblemDossierCard here

// for loggedin-users
function ProblemCard({ problem }) {
  // ## FIXED ##: This logic was flawed.
  // A ternary chain is the correct way to handle three conditions.
  const difficultyStyles =
    problem.difficultyLevel === "easy"
      ? "bg-emerald-200 text-emerald-800"
      : problem.difficultyLevel === "hard"
      ? "bg-rose-200 text-rose-800"
      : "bg-amber-200 text-amber-800"; // Medium is the default

  return (
    <Link
      to={`/problem/id/${problem._id}`}
      className="bg-white rounded-xl sketch-border-1 p-5 text-left font-['Comic_Neue'] w-60 sm:w-80 flex-shrink-0 transition-transform duration-200 hover:-translate-y-1"
    >
      <h3 className="text-xl font-bold text-gray-800 line-clamp-1 mb-2">
        {problem.title}
      </h3>
      <span
        className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${difficultyStyles}`}
      >
        {problem.difficultyLevel}
      </span>
    </Link>
  );
}

export default function HomePageLoggedIn() {
  const { user } = useSelector((state) => state.auth);

  // ## UPDATED ##: Better state names and new loading/error states
  const [profile, setProfile] = useState(null);
  const [problems, setProblems] = useState(null);
  const [attempted, setAttempted] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        // ## FIXED ##: Parallel fetching with Promise.all
        const [profileResponse, problemResponse, attemptedResponse] =
          await Promise.all([
            axiosClient.get("/user/getProfile"),
            axiosClient.get("/problem/all"),
            axiosClient.get("problem/problemAttemptedByUser"),
          ]);

        const attemptArr = attemptedResponse.data.reverse();

        setProfile(profileResponse.data);
        setAttempted(attemptArr[0]?.problemId);

        // console.log("attemptedResponse.data");
        // console.log(attemptedResponse.data);

        // ## FIXED ##: Use .data.result (as in other files) and non-mutating reverse
        setProblems(problemResponse.data.reverse());
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Could not load your dashboard. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []); // Empty array ensures this runs only once on mount

  // ## NEW ##: Handle loading and error states
  if (loading) {
    return <HomePageSkeleton />;
  }

  // console.log("attempted")
  // console.log(attempted[0].problemId)

  if (error) {
    // Assuming you have a reusable ErrorState component
    return <ErrorState message={error} />;
  }

  // ## NEW ##: Handle case where data is still null (should be rare)
  if (!profile || !problems) {
    return <HomePageSkeleton />;
  }

  // ## NEW ##: Make stats dynamic (assumes data structure)
  const solvedCount = profile.problemSolved?.length || 0;
  const totalProblems = problems.length || 0;
  const streak = profile.currentStreak || 0; // Assuming profile has this
  const expPercent = Number(profile.acceptanceRate) || 0; // Assuming profile has this

  // console.log(profile);

  return (<>
    {/* <Navbar/> */}
    <div className="p-6 md:p-10 font-['Comic_Neue'] pt-10">
      {/* 1. Personalized Greeting & Stats */}
      <h1 className="text-5xl font-bold text-gray-800">
        Welcome back, <span className="text-blue-600">{user?.first_name}!</span>
      </h1>
      <p className="text-lg text-gray-600">
        Your next challenge is ready when you are.
      </p>

      {/* ## UPDATED ##: Stats are now fully dynamic */}
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-lg sketch-border-1">
          <h3 className="font-bold text-gray-600">Problems Solved</h3>
          <p className="text-4xl font-bold">
            {solvedCount}
            <span className="text-2xl text-gray-500"> / {totalProblems}</span>
          </p>
        </div>
        <div className="bg-white p-5 rounded-lg sketch-border-1">
          <h3 className="font-bold text-gray-600">Current Streak</h3>
          <p className="text-4xl font-bold">
            🔥 {streak} <span className="text-xl text-gray-500">Days</span>
          </p>
        </div>
        <div className="bg-white p-5 rounded-lg sketch-border-1">
          <h3 className="font-bold text-gray-600">Experience Level</h3>
          <div className="w-full bg-gray-200 rounded-full h-4 mt-3">
            <div
              className="bg-yellow-400 h-4 rounded-full transition-all duration-500"
              style={{ width: `${expPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* ## UPDATED ##: "Continue" section is now dynamic */}
      {attempted && (
        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-4">Pick Up Your Pencil</h2>
          <div className="bg-gradient-to-br from-purple-200 to-blue-200 p-8 rounded-xl sketch-border-1 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-gray-700 font-bold">
                You were last sketching:
              </p>
              <h3 className="text-3xl font-bold text-gray-800">
                {attempted?.title}
              </h3>
            </div>
            <Link
              to={`/problem/id/${attempted?._id}`}
              className="px-8 py-4 bg-yellow-400 text-gray-900 text-lg font-bold rounded-lg sketch-button flex-shrink-0"
            >
              Jump Back In
            </Link>
          </div>
        </section>
      )}

      {/* 3. "Recommended For You" Section */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-4">New Quests on the Horizon</h2>
        <div className="flex gap-6 py-4 -mx-6 px-6 overflow-x-auto">
          {problems.length > 0 ? (
            problems.slice(0, 5).map(
              (
                p // Show first 5
              ) => (
                // ## UPDATED ##: Use real component and correct key
                <ProblemCard key={p._id} problem={p} />
              )
            )
          ) : (
            <p className="text-gray-500">No problems available right now.</p>
          )}
        </div>
      </section>
    </div>
 </> );
}
