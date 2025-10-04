import React, { useState } from "react";

// You would import these components from their own files
import ProfileHeader from "../../components/layouts/ProfiePageLayout/ProfileHeader";
import ProfileSidebar from "../../components/layouts/ProfiePageLayout/ProfileSidebar";

import AccountPanel from "../../components/layouts/ProfiePageLayout/AccountPanel";
import SolvedProblemsPanel from "../../components/layouts/ProfiePageLayout/SolvedProblemsPanel";
import AttemptedProblemsPanel from "../../components/layouts/ProfiePageLayout/AttemptedProblemsPanel";
import PlaylistsPanel from "../../components/layouts/ProfiePageLayout/PlaylistsPanel";
// import AttemptedProblemsPanel from "../../components";
// import PlaylistPanel from "../../components";

// Mock user data - in a real app, this would come from your Redux store or context
const mockUser = {
  username: "SketchMaster",
  email: "sketch@example.com",
  joinDate: "Joined Oct 2025",
  avatarUrl: "https://avatar.iran.liara.run/public/boy", // A placeholder avatar service
  stats: {
    solved: 42,
    attempted: 68,
    playlists: 5,
  },
};

export default function ProfilePage() {
  // account, solved, attempted, playlists
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-8 font-['Comic_Neue']">
      <div className="max-w-7xl mx-auto">
        {/* ## 1. Profile Header ## */}
        <ProfileHeader user={mockUser} />

        <div className="mt-8 md:grid md:grid-cols-12 md:gap-8">
          {/* ## 2. Left Panel: Navigation ## */}
          <div className="md:col-span-3 mb-8 md:mb-0">
            <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* ## 3. Right Panel: Dynamic Content ## */}
          <div className="md:col-span-9">
            {activeTab === "account" && <AccountPanel user={mockUser} />}
            {activeTab === "solved" && <SolvedProblemsPanel />}
            {/* Add other panels here similarly */}
            {activeTab === 'attempted' && <AttemptedProblemsPanel />}
            {activeTab === 'playlists' && <PlaylistsPanel />}
          </div>
        </div>
      </div>
    </div>
  );
}
