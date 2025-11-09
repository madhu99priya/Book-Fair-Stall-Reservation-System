import { useState, useEffect } from "react";
import { Menu, X, BookOpen } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  const linkClasses =
    "cursor-pointer px-4 py-2 rounded-lg text-cyan-300 font-medium hover:text-cyan-100 hover:bg-cyan-500/20 transition-all duration-300";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 lg:px-8 transition-all duration-500"
      style={{ paddingTop: isScrolled ? "8px" : "16px" }}
    >
      <div
        className={`max-w-7xl mx-auto backdrop-blur-xl border rounded-full transition-all duration-500 ${
          isScrolled
            ? "bg-black/60 border-cyan-400/50 shadow-[0_0_40px_rgba(6,182,212,0.4)] scale-[0.98]"
            : "bg-black/40 border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.3)]"
        }`}
      >
        <div className="flex justify-between items-center h-16 px-6">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div
              className={`bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg transition-all duration-500 ${
                isScrolled
                  ? "shadow-[0_0_25px_rgba(6,182,212,0.6)]"
                  : "shadow-[0_0_20px_rgba(6,182,212,0.5)]"
              }`}
            >
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span
              className={`hidden sm:inline-block text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent transition-all duration-300 ${
                isScrolled ? "scale-95" : "scale-100"
              }`}
            >
              Colombo International Book Fair 2025
            </span>
          </div>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center space-x-2">
            {["home", "about", "events", "registration", "contact"].map(
              (id) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={linkClasses}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              )
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-cyan-300 hover:bg-cyan-500/20 transition-all duration-300"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <nav className="md:hidden px-6 pb-4 space-y-2">
            {["home", "about", "events", "registration", "contact"].map(
              (id) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="block w-full text-left cursor-pointer px-4 py-2 rounded-lg hover:bg-cyan-500/20 text-cyan-300 transition-all duration-300"
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              )
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
