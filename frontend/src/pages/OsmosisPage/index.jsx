import { useState, useEffect } from "react";
import axiosClient from "../../axiosClient";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Helper components (FetchingState, ErrorState) remain the same...
const FetchingState = () => (
  <div className="text-center">
    <div className="animate-spin text-5xl mb-4">⚙️</div>
    <h3 className="text-2xl font-bold text-gray-700">
      Sketching the Details...
    </h3>
    <p className="text-gray-500">Please wait while we analyze the link.</p>
  </div>
);
const ErrorState = ({ message }) => (
  <div className="text-center text-red-600 animate-fade-in">
    <p className="text-5xl mb-2">❌</p>
    <h3 className="text-2xl font-bold">Sketch Failed</h3>
    <p className="font-['Comic_Neue'] font-semibold">{message}</p>
  </div>
);

// UPDATED: ProblemDetailsCard now accepts a playlistName for a dynamic success message
const ProblemDetailsCard = ({ problem, playlistName }) => {
  const getDifficultyStyles = (level = "") => {
    // ... (difficulty styles logic is unchanged)
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
      {/* ... (rest of the card is unchanged) ... */}
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
      <div className="flex flex-col gap-3">
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

        {problem.difficultyLevel && (
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold ${difficulty.style}`}
          >
            {difficulty.icon} {problem.difficultyLevel}
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
      {/* ... (tags and companies display are unchanged) ... */}
      <div className="mt-6 text-center bg-green-100 p-3 rounded-lg border border-green-400">
        <p className="font-bold text-green-800">
          ✅ Success! Added to your "{playlistName}" playlist.
        </p>
      </div>
    </div>
  );
};

export default function OsmosisPage() {
  // ## NEW ##: State for playlists and their loading status
  const [playlists, setPlaylists] = useState([]);
  const [playlistsLoading, setPlaylistsLoading] = useState(true);
  const [selectedPlaylistName, setSelectedPlaylistName] = useState("");

  // ## UPDATED ##: Zod schema now includes playlistId
  const osmosisSchema = z.object({
    url: z.url("Please enter a valid URL, including https://"),
    playlistId: z.string().min(1, { message: "You must select a playlist." }),
  });

  const [fetchedUrl, setFetchedUrl] = useState(null);
  const [fetchingData, setFetchingData] = useState(false);
  const [apiError, setApiError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(osmosisSchema),
  });

  // ## NEW ##: Fetch user's playlists on component mount
  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const response = await axiosClient.get("/playlist/all"); // Assuming this is your endpoint
        // console.log(response.data.playlistInfo);
        setPlaylists(response.data.playlistInfo || []);
      } catch (error) {
        console.error("Failed to fetch playlists:", error);
        setApiError("Could not load your playlists. Please refresh the page.");
      } finally {
        setPlaylistsLoading(false);
      }
    }
    fetchPlaylists();
  }, []);

  const submitUrl = async (data) => {
    setFetchingData(true);
    setFetchedUrl(null);
    setApiError(null);

    // Find the name of the selected playlist to show in the success message
    const playlist = playlists.find((p) => p._id === data.playlistId);
    setSelectedPlaylistName(playlist?.playlistName || "");

    try {
      // The backend endpoint now receives both url and playlistId
      const response = await axiosClient.post("/osmosis/url", data);
      if (response.data.success === false) {
        setApiError(
          response.data.message ||
            "This platform is not supported or the URL is invalid."
        );
      } else {
        setFetchedUrl(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch from URL:", error);
      setApiError(error.response?.data?.message || "A network error occurred.");
    } finally {
      setFetchingData(false);
    }
  };

  const isSubmitting = fetchingData || playlistsLoading;

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-10 font-['Comic_Neue']">
      <div className="bg-white rounded-xl p-8 sketch-border-1">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800">Problem Osmosis</h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Import a problem from another platform directly into your favorite
            playlist.
          </p>
        </div>

        <form onSubmit={handleSubmit(submitUrl)} className="space-y-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {/* Playlist Selector */}
            <div>
              <label
                htmlFor="playlistId"
                className="text-sm font-bold text-gray-700 mb-1 block"
              >
                1. Choose a Playlist
              </label>
              <select
                {...register("playlistId")}
                id="playlistId"
                disabled={playlistsLoading}
                className={`w-full px-4 py-3 text-lg bg-gray-100 border-2 rounded-lg focus:outline-none focus:ring-4 transition ${
                  errors.playlistId ? "border-red-500" : "border-gray-800"
                }`}
              >
                <option value="">
                  {playlistsLoading ? "Loading..." : "Select a playlist..."}
                </option>
                {playlists.map((playlist) => (
                  <option key={playlist._id} value={playlist._id}>
                    {playlist.playlistName}
                  </option>
                ))}
              </select>
              {errors.playlistId && (
                <p className="text-red-600 text-sm font-bold mt-1 ml-1">
                  {errors.playlistId.message}
                </p>
              )}
            </div>

            {/* URL Input */}
            <div>
              <label
                htmlFor="url"
                className="text-sm font-bold text-gray-700 mb-1 block"
              >
                2. Paste Problem URL
              </label>
              <input
                {...register("url")}
                id="url"
                type="text"
                placeholder="https://platform.com/problem/..."
                disabled={isSubmitting}
                className={`w-full px-4 py-3 text-lg bg-gray-100 border-2 rounded-lg focus:outline-none focus:ring-4 transition ${
                  errors.url || apiError ? "border-red-500" : "border-gray-800"
                }`}
              />
              {errors.url && (
                <p className="text-red-600 text-sm font-bold mt-1 ml-1">
                  {errors.url.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-4 bg-yellow-400 text-gray-900 text-xl font-bold rounded-lg sketch-button flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            Fetch & Add to Playlist
          </button>
        </form>

        <div className="min-h-[20rem] p-6 bg-slate-50 border-4 border-dashed rounded-xl flex items-center justify-center">
          {fetchingData && <FetchingState />}
          {!fetchingData && apiError && <ErrorState message={apiError} />}
          {!fetchingData && !apiError && fetchedUrl?.success && (
            <ProblemDetailsCard
              problem={fetchedUrl}
              playlistName={selectedPlaylistName}
            />
          )}
          {!fetchingData && !apiError && !fetchedUrl && (
            <div className="text-center text-gray-500">
              <p className="text-5xl mb-2">👇</p>
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
