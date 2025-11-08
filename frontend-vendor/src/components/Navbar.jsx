// Navbar.jsx

import { useState } from "react";
import { Link as ScrollLink } from "react-scroll"; // 👈 import from react-scroll
import { Menu, X, BookOpen } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const linkClasses =
    "cursor-pointer px-4 py-2 rounded-lg text-gray-800 font-medium hover:text-blue-600 transition";

  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white/30 backdrop-blur-lg border border-gray-200 rounded-full shadow-md">
        <div className="flex justify-between items-center h-16 px-6">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="hidden sm:inline-block text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Colombo International Book Fair 2025
            </span>
          </div>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center space-x-2">
            {["home", "about", "events", "registration", "contact"].map(
              (id) => (
                <ScrollLink
                  key={id}
                  to={id}
                  spy={true}
                  smooth={true}
                  duration={600}
                  offset={-80} // adjust for navbar height
                  className={linkClasses}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </ScrollLink>
              )
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <nav className="md:hidden px-6 pb-4 space-y-2">
            {["home", "about", "events", "registration", "contact"].map(
              (id) => (
                <ScrollLink
                  key={id}
                  to={id}
                  spy={true}
                  smooth={true}
                  duration={600}
                  offset={-80}
                  onClick={toggleMenu}
                  className="block cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </ScrollLink>
              )
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
