import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";

export default function Navbar() {
  // State to manage the mobile menu's visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.auth);

  // Common styles for NavLink to avoid repetition
  const linkClassName = ({ isActive }) =>
    `px-3 py-2 rounded-md text-lg font-bold transition-all duration-200 font-['Comic_Neue'] ${
      isActive
        ? "text-blue-600 sketchy-underline" // Style for the active link
        : "text-gray-700 hover:text-blue-600 hover:bg-blue-100/50" // Style for inactive links
    }`;

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-md sketch-border-1 sticky top-4 z-50 mx-4 rounded-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* ## Logo / Brand Name ## */}
          <div className="flex-shrink-0">
            <NavLink
              to="/"
              className="text-3xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
            >
              AlgoSketch
            </NavLink>
          </div>

          {/* ## Desktop Navigation Links ## */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/" className={linkClassName}>
              Home
            </NavLink>
            <NavLink to="/problem/all" className={linkClassName}>
              Problems
            </NavLink>
            <NavLink to="/osmosis" className={linkClassName}>
              Osmosis
            </NavLink>
            <NavLink
              to="/profile"
              className="px-5 py-2 bg-purple-300 text-purple-900 text-lg font-bold  rounded-lg sketch-button"
            >
              Profile
            </NavLink>
            {/* <NavLink
              to={isAuthenticated ? "/auth/logout" : "/auth/login"}
              className={linkClassName}
            >
              {isAuthenticated ? "Logout" : "Login"}
            </NavLink> */}
          </div>

          {/* ## Mobile Menu Button (Hamburger) ## */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:bg-gray-200 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                // Close Icon (X)
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
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
                // Hamburger Icon
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
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

      {/* ## Mobile Menu (Dropdown) ## */}
      {/* This section is shown or hidden based on the isMenuOpen state */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 flex flex-wrap sm:px-3 border-t-2 border-dashed border-gray-300">
          <NavLink
            to="/"
            className={linkClassName}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
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
          {/* <NavLink
            to={isAuthenticated ? "/auth/logout" : "/auth/login"}
            className={linkClassName}
          >
            {isAuthenticated ? "Logout" : "Login"}
          </NavLink> */}
        </div>
      </div>
    </nav>
  );
}
