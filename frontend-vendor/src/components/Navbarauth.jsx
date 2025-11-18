// Navbarauth.jsx

import { useState } from "react";
import { Menu, X, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const toggleMenu = () => setIsOpen(!isOpen);

  const linkClasses =
    "cursor-pointer px-4 py-2 rounded-lg text-cyan-300 font-medium hover:text-cyan-100 hover:bg-cyan-500/20 transition-all duration-300";

  const handleNavigation = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 lg:px-8"
        style={{ paddingTop : "8px" }}
      >
        <div className="max-w-7xl mx-auto backdrop-blur-xl border rounded-full bg-black/40 border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
          <div className="flex justify-between items-center h-16 px-4 md:px-6">
            {/* Logo */}
            <div className="flex items-center space-x-2 flex-shrink min-w-0">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.5)] flex-shrink-0">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="hidden lg:inline-block text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent whitespace-nowrap">
                Colombo International Book Fair 2025
              </span>
              <span className="hidden sm:inline-block lg:hidden text-base md:text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent whitespace-nowrap">
                CIBF 2025
              </span>
            </div>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center space-x-2">
              <button className={linkClasses} onClick={() => handleNavigation("/")}>
                Home
              </button>
              {user && (
                <button className={linkClasses} onClick={() => handleNavigation("/profile")}>
                  Profile
                </button>
              )}
              {user && (
                <button className={linkClasses} onClick={() => handleNavigation("/genre")}>
                  Genres
                </button>
              )}
              {user ? (
                <button className={linkClasses} onClick={logout}>
                  Logout
                </button>
              ) : (
                <button className={linkClasses} onClick={() => handleNavigation("/login")}>
                  Login
                </button>
              )}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg text-cyan-300 hover:bg-cyan-500/20 transition-all duration-300 flex-shrink-0"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
            onClick={toggleMenu}
          ></div>

          <nav className="fixed top-24 left-4 right-4 z-50 md:hidden bg-gradient-to-br from-black/95 via-cyan-950/40 to-black/95 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.4)] overflow-hidden">
            <div className="p-6 space-y-3">
              <button
                className="block w-full text-left px-6 py-4 rounded-xl bg-black/40 hover:bg-cyan-500/20 text-cyan-300 font-medium hover:text-cyan-100 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:translate-x-1"
                onClick={() => handleNavigation("/")}
              >
                Home
              </button>
              {user && (
                <button
                  className="block w-full text-left px-6 py-4 rounded-xl bg-black/40 hover:bg-cyan-500/20 text-cyan-300 font-medium hover:text-cyan-100 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:translate-x-1"
                  onClick={() => handleNavigation("/profile")}
                >
                  Profile
                </button>
              )}
              {user ? (
                <button
                  className="block w-full text-left px-6 py-4 rounded-xl bg-black/40 hover:bg-cyan-500/20 text-cyan-300 font-medium hover:text-cyan-100 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:translate-x-1"
                  onClick={logout}
                >
                  Logout
                </button>
              ) : (
                <button
                  className="block w-full text-left px-6 py-4 rounded-xl bg-black/40 hover:bg-cyan-500/20 text-cyan-300 font-medium hover:text-cyan-100 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:translate-x-1"
                  onClick={() => handleNavigation("/login")}
                >
                  Login
                </button>
              )}
            </div>
          </nav>
        </>
      )}
    </>
  );
}
