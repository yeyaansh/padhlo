import React from "react";

const StatCard = ({ label, value, icon }) => (
  <div className="bg-white p-4 rounded-lg sketch-border-1 text-center">
    <span className="text-4xl">{icon}</span>
    <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
    <p className="text-sm text-gray-500 font-semibold">{label}</p>
  </div>
);

export default function ProfileHeader(user) {
  const joined = new Date(user?.user?.data.createdAt).toLocaleDateString();
  // console.log(user?.user?.data);
  return (
    <div className="bg-white rounded-xl sketch-border-1 p-6">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <img
          src={
            user?.user?.avatarUrl || "https://avatar.iran.liara.run/public/boy"
          }
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-4 border-yellow-400"
        />
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            {user?.user?.data.first_name} {user?.user?.data.last_name}
          </h1>
          <p className="text-gray-500">Joined {joined}</p>
          {/* <p className="text-gray-500">Just Sotime</p> */}
        </div>
      </div>
      <div className="mt-6 grid sm:grid-cols-3 gap-4">
        {/* <StatCard label="Problems Solved" value={user.problemSolved.length} icon="" /> */}
        <StatCard
          label="Total Attempts"
          value={user?.user?.data.totalAttempts}
          icon=""
        />
        <StatCard
          label="Playlists Created"
          // value={user.playlist.length}
          value={user?.user?.data.playlist.length}
          icon=""
        />
        <StatCard
          label="Acceptance Rate"
          // value={user.playlist.length}
          value={`${user?.user?.data.acceptanceRate}%` || "0%"}
          icon=""
        />
      </div>
    </div>
  );
}
