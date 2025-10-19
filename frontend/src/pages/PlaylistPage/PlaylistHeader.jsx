export default function PlaylistHeader({ playlist }) {
  console.log("playlist");
  console.log(playlist);

  const isPublic = playlist?.isPlaylistPublic; // Assuming this boolean comes from your data

  return (
    <div className="bg-white rounded-xl sketch-border-1 overflow-hidden">
      {/* Cover Image (16:9) */}
      <div className="w-full h-50 bg-slate-200 relative">
        <img
          src={
            playlist?.playlistCoverImage ||
            "https://placehold.co/1600x900/E2E8F0/334155?text=Cover"
          }
          alt={`${playlist?.playlistName} cover`}
          className="w-full h-full object-cover"
        />
        <div className="w-full h-25 absolute z-0 left-0 bottom-0 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      <div className="p-6">
        {/* Profile Image & Title Area */}
        <div className="flex flex-col sm:flex-row items-start gap-5 -mt-24">
          <div className="flex-shrink-0 w-32 h-32 bg-slate-300 rounded-xl border-4 border-white shadow-lg z-10">
            <img
              src={
                playlist?.playlistProfileImage ||
                "https://placehold.co/400x400/CBD5E1/475569?text=Logo"
              }
              alt={`${playlist?.playlistName} profile`}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="sm:pt-6 w-full ">
            <div className="flex flex-wrap items-center justify-between gap-10">
              {/* <h1 className="text-4xl font-bold text-gray-800 z-5"> */}
              <h1 className="text-3xl font-bold text-text-gray-800 sm:text-white z-5">
                {playlist?.playlistName}
              </h1>
              <span
                className={`px-3 z-10 py-1 text-xs font-bold rounded-full flex items-center gap-1.5 ${
                  isPublic
                    ? "bg-emerald-200 text-emerald-800"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {isPublic ? "🌍 Public" : "🔒 Private"}
              </span>
            </div>
            <p className="text-gray-600 sm:mt-5 mt-1.5">
              {playlist?.playlistDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
