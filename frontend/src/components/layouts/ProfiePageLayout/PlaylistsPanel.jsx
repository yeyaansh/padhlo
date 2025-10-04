import React from "react";
import { Link } from "react-router";

// Mock data for playlists
const playlists = [
  {
    id: "pl1",
    title: "FAANG Interview Prep",
    problemCount: 25,
    description: "A collection of top questions asked at major tech companies.",
  },
  {
    id: "pl2",
    title: "Dynamic Programming Grind",
    problemCount: 15,
    description: "Focused practice on all major DP patterns.",
  },
  {
    id: "pl3",
    title: "Weekend Warm-ups",
    problemCount: 8,
    description: "Easy and Medium problems to get the brain working.",
  },
];

const PlaylistCard = ({ playlist }) => (
  <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-6 rounded-xl sketch-border-1 flex flex-col justify-between h-full">
    <div>
      <h3 className="text-2xl font-bold text-gray-800">
        {playlist.title}
      </h3>
      <p className="text-gray-600 mt-2 text-sm h-10">{playlist.description}</p>
    </div>
    <div className="mt-6 flex items-center justify-between">
      <p className="font-bold text-gray-700">
        {playlist.problemCount} Problems
      </p>
      <Link
        to={`/playlist/${playlist.id}`}
        className="px-5 py-2 bg-purple-500 text-white font-bold rounded-lg sketch-button"
      >
        View
      </Link>
    </div>
  </div>
);

export default function PlaylistsPanel() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-bold text-gray-800">
          My Playlists
        </h2>
        <button className="px-6 py-2 bg-yellow-400 text-gray-900 font-bold rounded-lg sketch-button">
          + Create New Playlist
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </div>
  );
}
