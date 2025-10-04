import React from "react";

const StatCard = ({ label, value, icon }) => (
  <div className="bg-white p-4 rounded-lg sketch-border-1 text-center">
    <span className="text-4xl">{icon}</span>
    <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
    <p className="text-sm text-gray-500 font-semibold">{label}</p>
  </div>
);

export default function ProfileHeader({ user }) {
  return (
    <div className="bg-white rounded-xl sketch-border-1 p-6">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <img
          src={user.avatarUrl}
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-4 border-yellow-400"
        />
        <div>
          <h1 className="text-4xl font-bold text-gray-800">{user.username}</h1>
          <p className="text-gray-500">{user.joinDate}</p>
        </div>
      </div>
      <div className="mt-6 grid sm:grid-cols-3 gap-4">
        <StatCard label="Problems Solved" value={user.stats.solved} icon="" />
        <StatCard label="Total Attempts" value={user.stats.attempted} icon="" />
        <StatCard
          label="Playlists Created"
          value={user.stats.playlists}
          icon=""
        />
      </div>
    </div>
  );
}
