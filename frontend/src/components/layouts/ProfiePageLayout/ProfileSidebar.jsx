import React from "react";

const NavItem = ({ label, tabKey, activeTab, setActiveTab }) => {
  const isActive = activeTab === tabKey;
  return (
    <button
      onClick={() => setActiveTab(tabKey)}
      className={`w-full text-left font-bold p-4 rounded-lg transition-colors text-lg ${
        isActive
          ? "bg-yellow-200 text-yellow-900 border-2 border-yellow-500"
          : "text-gray-700 hover:bg-slate-200"
      }`}
    >
      {label}
    </button>
  );
};

export default function ProfileSidebar({ activeTab, setActiveTab }) {
  return (
    <div className="bg-white p-4 rounded-xl sketch-border-1 space-y-2">
      <NavItem
        label="Account Settings"
        tabKey="account"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <NavItem
        label="Solved Problems"
        tabKey="solved"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <NavItem
        label="Attempted"
        tabKey="attempted"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <NavItem
        label="My Playlists"
        tabKey="playlists"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
