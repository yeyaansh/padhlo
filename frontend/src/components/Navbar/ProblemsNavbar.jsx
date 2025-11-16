import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";

export default function ProblemsNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { role, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClassName = ({ isActive }) =>
    `px-3 py-2 rounded-md text-lg font-bold transition-all duration-200 font-['Comic_Neue']
     ${
       isActive
         ? "text-blue-600 sketchy-underline"
         : "text-gray-700 hover:text-blue-600 hover:bg-blue-100/50"
     }`;

  return (
    <nav
      className={`
        sticky z-50 transition-all duration-300 ease-in-out bg-white/80 backdrop-blur-sm sketch-border-1 
        ${
          isScrolled
            ? "top-0 rounded-b-lg shadow-lg"
            : "top-0 mx-4 rounded-xl"
        }
      `}
    >
      {/* -------- TOP NAV SECTION (logo + links) -------- */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <NavLink
            to={isAuthenticated ? "/dashboard" : "/"}
            className="text-3xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
          >
            <div className="flex items-center gap-1">
              <img
                src="/assets/sketcheditor_logo_v1_transparent.png"
                alt="logo"
                width={33}
                height={33}
              />
              <div>Sketch Editor</div>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {role === "admin" && (
              <NavLink to="/admin" className={linkClassName}>
                Admin
              </NavLink>
            )}

            {role === "user" && (
              <NavLink to="/dashboard" className={linkClassName}>
                Dashboard
              </NavLink>
            )}

            <NavLink to="/problem/all" className={linkClassName}>
              Problems
            </NavLink>
            <NavLink to="/osmosis" className={linkClassName}>
              Osmosis
            </NavLink>
            <NavLink to="/profile" className={linkClassName}>
              Profile
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:bg-gray-200 focus:outline-none"
            >
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* -------- MOBILE NAV LINKS -------- */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 flex flex-wrap sm:px-3 border-t-2 border-dashed border-gray-300">
          {role === "admin" && (
            <NavLink
              to="/admin"
              className={linkClassName}
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </NavLink>
          )}
          {role === "user" && (
            <NavLink
              to="/dashboard"
              className={linkClassName}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </NavLink>
          )}
          <NavLink
            to="/problem/all"
            className={linkClassName}
            onClick={() => setIsMenuOpen(false)}
          >
            Problems
          </NavLink>
          <NavLink
            to="/osmosis"
            className={linkClassName}
            onClick={() => setIsMenuOpen(false)}
          >
            Osmosis
          </NavLink>
          <NavLink
            to="/profile"
            className={linkClassName}
            onClick={() => setIsMenuOpen(false)}
          >
            Profile
          </NavLink>
        </div>
      </div>

      {/* -------- PROBLEMS PAGE FILTER BAR -------- */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-4 mt-4">

        <div className="flex flex-col xl:flex-row gap-4">

          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search problems..."
              className="
                w-full px-4 py-3 rounded-xl bg-white border-2 border-gray-700
                text-gray-900 font-bold
                placeholder-gray-500 shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-400
              "
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 overflow-x-auto pb-1">

            <button
              className="
                px-4 py-2 rounded-lg bg-yellow-200 text-gray-900 font-bold
                border-2 border-gray-800
                hover:bg-yellow-300 transition
              "
            >
              Difficulty ▾
            </button>

            <button
              className="
                px-4 py-2 rounded-lg bg-purple-200 text-purple-900 font-bold
                border-2 border-purple-800
                hover:bg-purple-300 transition
              "
            >
              Tags ▾
            </button>

            <button
              className="
                px-4 py-2 rounded-lg bg-pink-200 text-pink-900 font-bold
                border-2 border-pink-800
                hover:bg-pink-300 transition
              "
            >
              Companies ▾
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
}
