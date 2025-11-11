import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  MapPinned,
  BookOpen,
} from "lucide-react";

const Footer = () => {
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
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#0a1628] via-[#0f1f3a] to-[#050b15] text-white overflow-hidden">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl"></div>
      </div>

      {/* Animated Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      ></div>

      {/* Top Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>

      <div className="relative container mx-auto px-6 py-8">
        {/* Main Footer Content - 5 Columns in One Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-6">
          {/* Logo and Branding Section */}
          <div className="group">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-xl transition-all duration-500 flex-shrink-0 mb-4 w-fit shadow-[0_0_30px_rgba(6,182,212,0.5)] group-hover:shadow-[0_0_50px_rgba(6,182,212,0.8)] group-hover:scale-110">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
              Colombo International <br />
              Book Fair
            </h3>
            <div className="flex items-center gap-2 text-gray-400 mt-3 group-hover:text-cyan-300 transition-colors">
              <MapPin className="w-4 h-4 text-cyan-500 group-hover:text-red-500 transition-colors" />
              <span className="text-sm">Colombo - Sri Lanka</span>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="group">
            <h3 className="text-xl font-bold mb-4 relative inline-block">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Quick Links
              </span>
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></span>
            </h3>
            <ul className="space-y-2">
              {["home", "about", "events", "registration", "contact"].map(
                (item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item)}
                      className="group/link flex items-center gap-2 text-gray-400 hover:text-cyan-300 transition-all duration-300 text-left"
                    >
                      <span className="w-0 h-px bg-cyan-400 group-hover/link:w-4 transition-all duration-300"></span>
                      <span className="group-hover/link:translate-x-1 transition-transform duration-300">
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </span>
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Have a Questions Section */}
          <div className="group">
            <h3 className="text-xl font-bold mb-4 relative inline-block">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Have Questions?
              </span>
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></span>
            </h3>
            <div className="space-y-3">
              <div className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-cyan-500/10 transition-all duration-300 border border-transparent hover:border-cyan-500/30">
                <div className="p-2 rounded-lg bg-cyan-500/20 group-hover/item:bg-cyan-500/30 transition-colors">
                  <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                </div>
                <div>
                  <p className="font-semibold text-cyan-300 mb-1 text-sm">
                    SLBPA
                  </p>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    No: 83 New Parliament Rd,
                    <br />
                    Battaramulla, Sri Lanka.
                  </p>
                </div>
              </div>
              <div className="group/item flex items-center gap-3 p-2 rounded-lg hover:bg-cyan-500/10 transition-all duration-300 border border-transparent hover:border-cyan-500/30">
                <div className="p-2 rounded-lg bg-cyan-500/20 group-hover/item:bg-cyan-500/30 transition-colors">
                  <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                </div>
                <a
                  href="tel:+94112785480"
                  className="text-gray-400 hover:text-cyan-300 transition-colors text-xs"
                >
                  +94 112 785 480
                </a>
              </div>
              <div className="group/item flex items-center gap-3 p-2 rounded-lg hover:bg-cyan-500/10 transition-all duration-300 border border-transparent hover:border-cyan-500/30">
                <div className="p-2 rounded-lg bg-cyan-500/20 group-hover/item:bg-cyan-500/30 transition-colors">
                  <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                </div>
                <a
                  href="mailto:srilankabookpublishers@gmail.com"
                  className="text-gray-400 hover:text-cyan-300 transition-colors break-all text-xs"
                >
                  srilankabookpublishers@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Event Details Section */}
          <div className="group">
            <h3 className="text-xl font-bold mb-4 relative inline-block">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Event Details
              </span>
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></span>
            </h3>
            <div className="space-y-3">
              <div className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-cyan-500/10 transition-all duration-300 border border-transparent hover:border-cyan-500/30">
                <div className="p-2 rounded-lg bg-cyan-500/20 group-hover/item:bg-cyan-500/30 transition-colors">
                  <Calendar className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    27<sup>th</sup> September to
                    <br />
                    06<sup>th</sup> October 2025
                  </p>
                </div>
              </div>
              <div className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-cyan-500/10 transition-all duration-300 border border-transparent hover:border-cyan-500/30">
                <div className="p-2 rounded-lg bg-cyan-500/20 group-hover/item:bg-cyan-500/30 transition-colors">
                  <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                </div>
                <p className="text-gray-400 text-xs">9.00 AM to 9.00 PM</p>
              </div>
              <div className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-cyan-500/10 transition-all duration-300 border border-transparent hover:border-cyan-500/30">
                <div className="p-2 rounded-lg bg-cyan-500/20 group-hover/item:bg-cyan-500/30 transition-colors">
                  <MapPinned className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    BMICH,
                    <br />
                    Bauddhaloka Mawatha,
                    <br />
                    Colombo 07.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section - 5th Column */}
          <div className="group">
            <h3 className="text-xl font-bold mb-4 relative inline-block">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Location
              </span>
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></span>
            </h3>
            <div className="relative rounded-xl overflow-hidden border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15843.62976482633!2d79.872709!3d6.901672!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2597f9d09a467%3A0xee0b9455e960eba5!2sBMICH%20(Bandaranaike%20Memorial%20International%20Conference%20Hall)!5e0!3m2!1sen!2sus!4v1762882020638!5m2!1sen!2sus"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="relative z-10"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="relative mb-4">
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
        </div>

        {/* Copyright Section */}
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            Copyright ©2025 All rights reserved |{" "}
            <span className="text-cyan-400 font-semibold">
              This web is made by SLBPA
            </span>
          </p>
        </div>
      </div>

      {/* Bottom Glow Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
    </footer>
  );
};

export default Footer;
