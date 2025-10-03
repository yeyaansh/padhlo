import { useState } from "react";
import axiosClient from "../../axiosClient";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Helper component for the Loading State
const FetchingState = () => (
  <div className="text-center">
    <div className="animate-spin text-5xl mb-4">⚙️</div>
    <h3 className="text-2xl font-bold text-gray-700">
      Sketching the Details...
    </h3>
    <p className="text-gray-500">Please wait while we analyze the link.</p>
  </div>
);

// ## NEW ## Helper component for the Error State
const ErrorState = ({ message }) => (
  <div className="text-center text-red-600 animate-fade-in">
    <p className="text-5xl mb-2">❌</p>
    <h3 className="text-2xl font-bold">URL Fetching Failed</h3>
    <p className="font-['Comic_Neue'] font-semibold">{message}</p>
  </div>
);

// Helper component for Displaying Fetched Details
const ProblemDetailsCard = ({ problem }) => {
  const getDifficultyStyles = (level = "") => {
    switch (level.toLowerCase()) {
      case "easy":
        return { style: "bg-emerald-200 text-emerald-800", icon: "🌱" };
      case "medium":
        return { style: "bg-amber-200 text-amber-800", icon: "⚡" };
      case "hard":
        return { style: "bg-rose-200 text-rose-800", icon: "🔥" };
      default:
        return { style: "bg-gray-200 text-gray-800", icon: "❓" };
    }
  };
  const difficulty = getDifficultyStyles(problem.difficultyLevel);

  return (
    <div className="w-full text-left animate-fade-in">
      {/* ... (rest of the card component is unchanged) ... */}
      <div className="pb-3 border-b-2 border-dashed mb-4">
        <h3 className="text-2xl font-bold text-gray-800">{problem.title}</h3>
        <a
          href={problem.problemUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline"
        >
          Source: {problem.problemSourcedFrom}
        </a>
      </div>
      <div className="space-y-4">
        {problem.difficultyLevel && (
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold ${difficulty.style}`}
          >
            {difficulty.icon} {problem.difficultyLevel}
          </div>
        )}
        {problem.topicTags?.length > 0 && (
          <div>
            <h4 className="text-sm font-bold text-gray-600 mb-1">Topics:</h4>
            <div className="flex flex-wrap gap-2">
              {problem.topicTags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-purple-300 text-purple-900 rounded-full text-xs font-semibold border-2 border-purple-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
        {problem.companyTags?.length > 0 && (
          <div>
            <h4 className="text-sm font-bold text-gray-600 mb-1">Asked By:</h4>
            <div className="flex flex-wrap gap-2">
              {problem.companyTags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-pink-300 text-pink-900 rounded-full text-xs font-semibold border-2 border-pink-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="mt-6 text-center bg-green-100 p-3 rounded-lg border border-green-400">
        <p className="font-bold text-green-800">
          ✅ Success! Problem details added to your playlist!
        </p>
      </div>
    </div>
  );
};

export default function OsmosisPage() {
  const osmosisSchema = z.object({
    url: z.url("Please enter a valid URL, including https://"),
  });

  const [fetchedUrl, setFetchedUrl] = useState(null);
  const [fetchingData, setFetchingData] = useState(false);
  // ## NEW ## State to handle backend or network errors
  const [apiError, setApiError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(osmosisSchema) });

  const submitUrl = async (data) => {
    // Clear previous state before a new submission
    setFetchingData(true);
    setFetchedUrl(null);
    setApiError(null);

    try {
      const response = await axiosClient.post("/osmosis/url", data);

      // ## UPDATED LOGIC ## Check the success flag from the backend
      if (response.data.success === false) {
        // Handle backend error (e.g., unsupported platform)
        setApiError(
          response.data.message ||
            "This platform is not supported or the URL is invalid."
        );
      } else {
        // Handle  success
        setFetchedUrl(response.data);
      }
    } catch (error) {
      // Handle network errors (e.g., server down, 404)
      console.error("Failed to fetch from URL:", error);
      // setApiError("A network error occurred. Please try again later.");
      setApiError("This platform is not supported or the URL is invalid.");
    } finally {
      setFetchingData(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-10 font-['Comic_Neue']">
      <div className="bg-white rounded-xl p-8 sketch-border-1">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800">Problem Osmosis</h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Paste a problem link to import it into your playlist!
          </p>
        </div>

        <form
          onSubmit={handleSubmit(submitUrl)}
          className="flex flex-col sm:flex-row items-start gap-3 mb-8"
        >
          {/* ... (Form JSX is unchanged) ... */}
          <div className="w-full">
            <input
              {...register("url")}
              type="text"
              placeholder="https://platform.com/problem/your-problem-url..."
              className={`w-full px-4 py-3 text-lg bg-gray-100 border-2 rounded-lg focus:outline-none focus:ring-4 transition ${
                errors.url || apiError
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-800 focus:ring-yellow-300"
              }`}
              disabled={fetchingData}
            />
            {errors.url?.message && (
              <p className="text-red-600 text-sm font-bold mt-1 ml-1">
                {errors.url?.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-yellow-400 text-gray-900 text-lg font-['Permanent_Marker'] rounded-lg sketch-button flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={fetchingData}
          >
            Fetch
          </button>
        </form>

        <div className="min-h-[20rem] p-6 bg-slate-50 border-4 border-dashed rounded-xl flex items-center justify-center">
          {/* ## UPDATED RENDER LOGIC ## */}
          {fetchingData && <FetchingState />}

          {!fetchingData && apiError && <ErrorState message={apiError} />}

          {!fetchingData && !apiError && fetchedUrl?.success && (
            <ProblemDetailsCard problem={fetchedUrl} />
          )}

          {!fetchingData && !apiError && !fetchedUrl && (
            <div className="text-center text-gray-500">
              <p className="text-5xl mb-2">🡻</p>
              <p className="font-bold">
                Your fetched problem details will appear here!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
