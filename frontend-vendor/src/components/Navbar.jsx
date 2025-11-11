// Navbar.jsx

import { useState, useEffect } from "react";
import { Menu, X, BookOpen } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

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

  // Detect active section
  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = ["home", "about", "events", "registration", "contact"];
      const navbarHeight = 80;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= navbarHeight + 100 && rect.bottom >= navbarHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy);
    handleScrollSpy(); // Call once on mount
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      // Custom smooth scroll with easing
      const startPosition = window.pageYOffset;
      const distance = offsetPosition - startPosition;
      const duration = 800; // 800ms for smooth animation
      let start = null;

      const easeInOutCubic = (t) => {
        return t < 0.5
          ? 4 * t * t * t
          : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      };

      const animation = (currentTime) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
      setIsOpen(false);
    }
  };

  const getLinkClasses = (sectionId) => {
    const baseClasses =
      "cursor-pointer px-4 py-2 rounded-lg font-medium transition-all duration-300 relative";
    const activeClasses =
      "text-cyan-100 bg-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.4)]";
    const inactiveClasses =
      "text-cyan-300 hover:text-cyan-100 hover:bg-cyan-500/20";

    return `${baseClasses} ${
      activeSection === sectionId ? activeClasses : inactiveClasses
    }`;
  };

  const getMobileLinkClasses = (sectionId) => {
    const baseClasses =
      "block w-full text-left px-6 py-4 rounded-xl font-medium border transition-all duration-300 relative";
    const activeClasses =
      "bg-cyan-500/30 text-cyan-100 border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.4)]";
    const inactiveClasses =
      "bg-black/40 hover:bg-cyan-500/20 text-cyan-300 hover:text-cyan-100 border-cyan-500/20 hover:border-cyan-400/50";

    return `${baseClasses} ${
      activeSection === sectionId ? activeClasses : inactiveClasses
    }`;
  };

  return (
    <>
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
          <div className="flex justify-between items-center h-16 px-4 md:px-6">
            {/* Logo */}
            <div className="flex items-center space-x-2 flex-shrink min-w-0">
              <div
                className={`bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg transition-all duration-500 flex-shrink-0 ${
                  isScrolled
                    ? "shadow-[0_0_25px_rgba(6,182,212,0.6)]"
                    : "shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                }`}
              >
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span
                className={`hidden lg:inline-block text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent transition-all duration-300 whitespace-nowrap ${
                  isScrolled ? "scale-95" : "scale-100"
                }`}
              >
                Colombo International Book Fair 2025
              </span>
              <span
                className={`hidden sm:inline-block lg:hidden text-base md:text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent transition-all duration-300 whitespace-nowrap ${
                  isScrolled ? "scale-95" : "scale-100"
                }`}
              >
                CIBF 2025
              </span>
            </div>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center space-x-2">
              {["home", "about", "events", "registration", "contact"].map(
                (id) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={getLinkClasses(id)}
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                    {/* Active underline indicator - moved higher with bottom-1 */}
                    {activeSection === id && (
                      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                    )}
                  </button>
                )
              )}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg text-cyan-300 hover:bg-cyan-500/20 transition-all duration-300 flex-shrink-0"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Separate from navbar */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
            onClick={toggleMenu}
          ></div>

          {/* Mobile Menu Panel */}
          <nav className="fixed top-24 left-4 right-4 z-50 md:hidden bg-gradient-to-br from-black/95 via-cyan-950/40 to-black/95 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            <div className="p-6 space-y-3">
              {["home", "about", "events", "registration", "contact"].map(
                (id) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={getMobileLinkClasses(id)}
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                    {/* Active underline indicator for mobile - moved higher with bottom-3 */}
                    {activeSection === id && (
                      <span className="absolute bottom-3 left-6 right-6 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                    )}
                  </button>
                )
              )}
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>
          </nav>
        </>
      )}
    </>
  );
}
