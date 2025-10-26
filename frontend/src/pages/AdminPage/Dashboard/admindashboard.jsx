import { useState } from "react";
import CreateProblemPanel from "../../../components/layouts/AdminLayout/CreateProblemPanel/createProblemPanel";
import ManageProblemsPanel from "../../../components/layouts/AdminLayout/ManageProblemsPanel/manageProblemsPanel";
import VideoSubmissionsPanel from "../../../components/layouts/AdminLayout/VideoSubmissionsPanel/videoSubmissionPanel";
import AdminSidebar from "../../../components/layouts/AdminLayout/AdminSidebar/adminSidebar";


// ## NEW ##: Reusable tab button for mobile content switching
const MobileContentTab = ({ label, panelKey, icon, activePanel, setActivePanel }) => {
  const isActive = activePanel === panelKey;
  return (
    <button
      onClick={() => setActivePanel(panelKey)}
      className={`flex flex-col items-center justify-center p-2 rounded-lg flex-1 transition-colors ${
        isActive
          ? 'bg-yellow-100 text-yellow-900 font-bold'
          : 'text-gray-600 hover:bg-slate-100'
      }`}
    >
      <span className="text-xl mb-0.5">{icon}</span>
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );
};

export default function AdminDashboardPage() {
  const [activePanel, setActivePanel] = useState('manageProblems');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen bg-slate-100 font-['Comic_Neue']">
      {/* Sidebar Navigation (remains the same) */}
      <AdminSidebar
        activePanel={activePanel}
        setActivePanel={setActivePanel}
        isOpen={isMobileSidebarOpen}
        setIsOpen={setIsMobileSidebarOpen}
      />

      {/* Main Content Area */}
      {/* Increased pt-16 to make space for the new mobile tabs below the header */}
      <main className="flex-1 p-6 sm:p-10 pt-16 md:pt-10">
        {/* Mobile Header with Hamburger Button (remains the same) */}


        {/* ## NEW ##: Mobile-Only Content Tabs */}
        <div className="md:hidden sticky top-16 z-1 bg-white shadow-sm mb-6 p-2 rounded-b-lg flex items-center justify-around gap-2 border-b-2 border-dashed">
          <MobileContentTab label="Create" panelKey="createProblem" icon="➕" activePanel={activePanel} setActivePanel={setActivePanel} />
          <MobileContentTab label="Manage" panelKey="manageProblems" icon="✏️" activePanel={activePanel} setActivePanel={setActivePanel} />
          <MobileContentTab label="Videos" panelKey="videoSubmissions" icon="▶️" activePanel={activePanel} setActivePanel={setActivePanel} />
          {/* Add more tabs here if needed */}
        </div>

        {/* Content Panels (remain the same) */}
        {activePanel === 'createProblem' && <CreateProblemPanel />}
        {activePanel === 'manageProblems' && <ManageProblemsPanel />}
        {activePanel === 'videoSubmissions' && <VideoSubmissionsPanel />}
      </main>
    </div>
  );
}