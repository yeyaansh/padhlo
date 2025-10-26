import React from "react";

// SidebarItem component remains the same and is well-structured.
const SidebarItem = ({
  label,
  panelKey,
  icon,
  activePanel,
  setActivePanel,
  closeSidebar,
}) => {
  const isActive = activePanel === panelKey;
  return (
    <button
      onClick={() => {
        setActivePanel(panelKey);
        closeSidebar();
      }}
      className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors text-left ${
        isActive
          ? "bg-yellow-200 text-yellow-900 font-bold border-2 border-yellow-500 shadow-sm"
          : "text-gray-700 hover:bg-slate-200"
      }`}
    >
      <span className="mr-3 text-xl">{icon}</span>
      {label}
    </button>
  );
};

export default function AdminSidebar({
  activePanel,
  setActivePanel,
  isOpen,
  setIsOpen,
}) {
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Backdrop for mobile (no changes needed) */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Main Sidebar Element */}
      <aside
        className={`
          /* --- Base & Mobile Styles --- */
          fixed top-16 -left-40 bottom-0 z-10 w-64 bg-white p-4 sketch-border-1 flex-shrink-0
          transition-transform duration-300 ease-in-out

          /* --- Desktop Styles (The key changes are here) --- */
          md:sticky md:top-37 md:translate-x-0 md:border-r md:border-dashed
          md:h-[calc(100vh-4rem)] /* Full screen height minus top offset */

          /* --- Mobile Toggle Logic --- */
          ${isOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"}
        `}
      >
        <div className="flex justify-between items-center mb-6 px-2">
          <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
          <button
            onClick={closeSidebar}
            className="md:hidden p-1 text-gray-500 hover:text-gray-800"
            aria-label="Close menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <nav className="space-y-2">
          <SidebarItem
            label="Create Problem"
            panelKey="createProblem"
            icon="➕"
            activePanel={activePanel}
            setActivePanel={setActivePanel}
            closeSidebar={closeSidebar}
          />
          <SidebarItem
            label="Manage Problems"
            panelKey="manageProblems"
            icon="✏️"
            activePanel={activePanel}
            setActivePanel={setActivePanel}
            closeSidebar={closeSidebar}
          />
          <SidebarItem
            label="Video Submissions"
            panelKey="videoSubmissions"
            icon="▶️"
            activePanel={activePanel}
            setActivePanel={setActivePanel}
            closeSidebar={closeSidebar}
          />
        </nav>
      </aside>
    </>
  );
}
