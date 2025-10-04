import { useState, useEffect } from "react"; // NEW: Import useEffect
import { useSelector } from "react-redux";
import { NavLink } from "react-router"; // Corrected import from 'react-router' to 'react-router-dom'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // ## NEW ##: State to track scroll position
  const [isScrolled, setIsScrolled] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.auth);

  // ## NEW ##: Effect to handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      // Set isScrolled to true if user scrolls down more than 10px, otherwise false
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // The empty array ensures this effect runs only once

  const linkClassName = ({ isActive }) =>
    `px-3 py-2 rounded-md text-lg font-bold transition-all duration-200 font-['Comic_Neue'] ${
      isActive
        ? "text-blue-600 sketchy-underline"
        : "text-gray-700 hover:text-blue-600 hover:bg-blue-100/50"
    }`;

  return (
    // ## UPDATED ##: The className is now dynamic based on isScrolled state
    <nav
      className={`
        sticky z-50 transition-all duration-300 ease-in-out
        ${isScrolled
            ? 'top-0 rounded-b-lg shadow-lg' // Styles when scrolled
            : 'top-4 mx-4 rounded-xl'      // Initial floating styles
        }
        bg-white/80 backdrop-blur-sm sketch-border-1
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <NavLink
              to={isAuthenticated ? "/dashboard" : "/"}
              className="text-3xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
            >
              AlgoSketch
            </NavLink>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/dashboard" className={linkClassName}>Dashboard</NavLink>
            <NavLink to="/problem/all" className={linkClassName}>Problems</NavLink>
            <NavLink to="/osmosis" className={linkClassName}>Osmosis</NavLink>
            <NavLink to="/profile" className="px-5 py-2 bg-purple-300 text-purple-900 text-lg font-bold rounded-lg sketch-button">
              Profile
            </NavLink>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:bg-gray-200 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 flex flex-wrap sm:px-3 border-t-2 border-dashed border-gray-300">
          <NavLink to="/dashboard" className={linkClassName} onClick={() => setIsMenuOpen(false)}>Dashboard</NavLink>
          <NavLink to="/problem/all" className={linkClassName} onClick={() => setIsMenuOpen(false)}>Problems</NavLink>
          <NavLink to="/osmosis" className={linkClassName} onClick={() => setIsMenuOpen(false)}>Osmosis</NavLink>
          <NavLink to="/profile" className={linkClassName} onClick={() => setIsMenuOpen(false)}>Profile</NavLink>
        </div>
      </div>
    </nav>
  );
}