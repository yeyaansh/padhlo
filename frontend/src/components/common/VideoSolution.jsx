import { useState } from "react";

export default function VideoSolution({ problem }) {
  // Safely access the video URL
  const videoUrl = problem?.videoURL?.secureURL;

  // ICONS
  // A proper "Thumbs Up" icon
  const LikeIcon = ({ liked }) => (
    <svg
      className={`w-5 h-5 transition-colors ${
        // liked ? "text-yellow-500" : "text-gray-500"
        liked ? "text-yellow-600" : "text-black"
      }`}
      viewBox="0 0 20 20"
      fill={liked ? "currentColor" : "none"}
      stroke="currentColor"
    >
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2 10.5a1.5 1.5 0 013 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333V17a1 1 0 001 1h8.194a1 1 0 00.986-.832l1.667-5a1 1 0 00-.986-1.168h-3.333V9a1 1 0 00-1-1v-1a1 1 0 10-2 0v1a1 1 0 00-1 1v1.333H6z"
      />
    </svg>
  );

  // A standard "Eye" icon for views
  const ViewIcon = () => (
    <svg
      // className="w-5 h-5 text-gray-500"
      className="w-5 h-5 text-black"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );
  // --- End Icons ---

  const [hasLiked, setHasLiked] = useState(problem?.userHasLiked || false);
  const [likeCount, setLikeCount] = useState(problem?.videoLikes || 7);

  // Handle click on the like button
  const handleLikeToggle = () => {
    // This is an "optimistic update" for a fast UI.
    if (hasLiked) {
      setLikeCount((prev) => prev - 1);
      // TODO: Call your backend API to unlike the video
      // axiosClient.post(`/video/${problem.videoURL._id}/unlike`);
    } else {
      setLikeCount((prev) => prev + 1);
      // TODO: Call your backend API to like the video
      // axiosClient.post(`/video/${problem.videoURL._id}/like`);
    }
    setHasLiked((prev) => !prev);
  };

  // Case 1: No video URL is available
  if (!videoUrl) {
    return (
      <div className="text-center p-10 font-['Comic_Neue'] bg-slate-50 rounded-lg border-2 border-dashed">
        <p className="text-5xl mb-4">🖼️</p>
        <h3 className="text-2xl font-bold text-gray-800">
          No Video Sketch Yet
        </h3>
        <p className="text-gray-600 mt-2">
          A video solution for this problem hasn't been added. Check back soon!
        </p>
      </div>
    );
  }
  const urlLink = new URL(videoUrl);
  const newURLARRAY = urlLink.pathname.split("/");
  const mp4 = newURLARRAY[7].split(".");
  const cloudName = newURLARRAY[1];
  const publicId = newURLARRAY[5];
  const uId = newURLARRAY[6];
  const uuIDMp4 = mp4[0];

  const likes = problem?.videoLikes ?? 7;
  const views = problem?.videoViews ?? 53;

  // Case 2: A valid video URL exists, render the player
  return (
    <div className="font-['Comic_Neue']">
      <h2 className="text-2xl font-bold text-gray-800">
        Sketch Video Solution
      </h2>
      {/* <div className="flex flex-col bg-yellow-200 rounded-2xl pb-2 gap-2"> */}
      <div className="flex flex-col pb-2 gap-2">
        {/* --- RESPONSIVE IFRAME CONTAINER --- */}
        <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-lg">
          <iframe
            // --- IMPROVED ---: The iframe now fills the container
            className="absolute top-0 left-0 w-full h-full"
            src={`https://player.cloudinary.com/embed/?cloud_name=${cloudName}&public_id=${publicId}%2F${uId}%2F${uuIDMp4}&title=false&description=false&chapters=true&show_jump_controls=true&logo_onclick_url=https%3A%2F%2Fsolveimpact.com%2F&logo_image_url=https%3A%2F%2Fsolveimpact.com%2Fvite.svg&ai_highlights_graph=true&colors[accent]=%230DA9FF&source_types[0]=dash&text_tracks[subtitles][0][default]=true&text_tracks[subtitles][0][label]=Original`}
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        {/* --- ## IMPROVED STATS SECTION ## --- */}
        <div className="flex items-center  bg-yellow-200 rounded-2xl justify-between gap-4 p-1">
          {/* Like Button */}
          <button
            onClick={handleLikeToggle}
            className={`flex items-center gap-2 p-2 rounded-lg transition-colors duration-200 ${
              hasLiked
                ? "bg-yellow-100 text-black" // Liked state
                // : "text-gray-600 hover:bg-slate-100" // Default state
                : "text-black hover:bg-slate-100" // Default state
            }`}
          >
            <LikeIcon liked={hasLiked} />
            <span className="font-semibold text-sm">{likeCount} Likes</span>
          </button>

          {/* Views Count (Now styled consistently) */}
          {/* <div className="flex items-center gap-2 text-gray-600 p-2"> */}
          <div className="flex items-center gap-2 text-black p-2">
            <ViewIcon />
            <span className="font-semibold text-sm">
              {problem?.videoViews || 53} Views
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
