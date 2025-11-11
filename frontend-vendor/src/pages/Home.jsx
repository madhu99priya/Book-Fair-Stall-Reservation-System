import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import EventCarousel from "../components/EventCarousel";
import AboutCarousel from "../components/AboutCarousel";
import { useNavigate } from "react-router-dom";
import CinemaModal from "../components/CinemaModal";

export default function Home() {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    // Ensure video plays on component mount
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Auto-play prevented:", error);
      });
    }
  }, []);

  return (
    <>
      {/* Cinema Modal - Shows EVERY time on this page */}
      <CinemaModal />

      {/* Main Content */}
      <div className="min-h-screen flex flex-col bg-black text-white relative overflow-hidden">
        {/* Background for all sections */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/50 to-black"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0%,transparent_70%)]"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        {/* Navbar - Fixed with high z-index */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>

        <main className="relative">
          {/* HOME SECTION - WITH HERO VIDEO */}
          <section
            id="home"
            className="min-h-screen relative flex items-center justify-center overflow-hidden pb-32 md:pb-48"
          >
            {/* Video Background - Lower z-index */}
            <div className="absolute inset-0 z-0">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster="/videos/hero-thumbnail.jpg"
              >
                <source src="/videos/hero-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Very Light Dark Overlay - Video more visible */}
            <div className="absolute inset-0 bg-black/60 z-[1]"></div>

            {/* Gradient Overlay that fades to transparent at bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent z-[2]"></div>

            {/* Content over video - Higher z-index */}
            <div className="relative z-10 max-w-4xl mx-auto px-8 mt-8 text-center pt-24 pb-16">
              <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6 drop-shadow-[0_0_30px_rgba(6,182,212,0.9)] leading-tight">
                Colombo International Book Fair 2025
              </h1>

              <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 mb-8 rounded-full mx-auto shadow-[0_0_20px_rgba(6,182,212,0.8)]"></div>

              <p className="text-xl md:text-2xl text-white max-w-3xl mb-8 leading-relaxed mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                <span className="text-cyan-300 font-semibold drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]">
                  Step into the future of reading.
                </span>{" "}
                Where technology meets literature in an immersive digital
                experience that transcends boundaries.
              </p>

              <div className="flex flex-wrap gap-3 justify-center text-sm mb-10">
                <span className="px-6 py-3 bg-cyan-500/40 backdrop-blur-md rounded-full border border-cyan-400/60 text-white font-mono shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] transition-all duration-300">
                  06th December to 15th December 2025
                </span>
                <span className="px-6 py-3 bg-blue-500/40 backdrop-blur-md rounded-full border border-blue-400/60 text-white font-mono shadow-[0_0_25px_rgba(59,130,246,0.5)] hover:shadow-[0_0_35px_rgba(59,130,246,0.7)] transition-all duration-300">
                  Bandaranaike Memorial International Conference Hall – BMICH.
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  onClick={() =>
                    document
                      .getElementById("registration")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 px-8 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105 shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:shadow-[0_0_45px_rgba(6,182,212,0.8)]"
                >
                  Reserve Your Stall
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("about")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-white/10 border-2 border-white/80 hover:bg-white/20 hover:border-white backdrop-blur-md px-8 py-4 rounded-lg text-lg font-bold transition-all hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]"
                >
                  Learn More
                </button>
              </div>
            </div>
          </section>

          {/* ABOUT SECTION */}
          <section
            id="about"
            className="min-h-screen flex flex-col items-center justify-center text-center px-8 gap-8 relative z-10 pt-32 md:pt-48"
          >
            <div className="max-w-5xl mx-auto bg-gradient-to-br from-black/80 via-blue-950/40 to-black/80 p-10 md:p-16 rounded-3xl shadow-[0_0_60px_rgba(59,130,246,0.4)] backdrop-blur-2xl border border-blue-500/30 group">
              {/* Holographic Effect */}
              <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-blue-500/10 rounded-full blur-3xl group-hover:animate-pulse"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
                    About the Fair
                  </h2>
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                </div>

                <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-cyan-500 mb-8 rounded-full mx-auto shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>
                <div>
                  <AboutCarousel />
                </div>
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 gap-y-8 mt-12">
                  <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 p-6 rounded-xl border border-blue-500/30 backdrop-blur-sm hover:border-blue-400/60 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300">
                    <div className="text-4xl font-black text-blue-400 mb-2">
                      50+
                    </div>
                    <div className="text-sm text-gray-400 uppercase tracking-wider">
                      Publishers
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 p-6 rounded-xl border border-cyan-500/30 backdrop-blur-sm hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-300">
                    <div className="text-4xl font-black text-cyan-400 mb-2">
                      100+
                    </div>
                    <div className="text-sm text-gray-400 uppercase tracking-wider">
                      Authors
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 p-6 rounded-xl border border-purple-500/30 backdrop-blur-sm hover:border-purple-400/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-300">
                    <div className="text-4xl font-black text-purple-400 mb-2">
                      5K+
                    </div>
                    <div className="text-sm text-gray-400 uppercase tracking-wider">
                      Visitors
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* EVENTS SECTION */}
          <section id="events" className="mt-20 relative z-10">
            <EventCarousel />
          </section>

          {/* STALL RESERVATION SECTION */}
          <section
            id="registration"
            className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 relative z-10"
          >
            <div className="relative z-10 max-w-6xl w-full">
              {/* Main Heading */}
              <div className="mb-12">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                  <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">
                    Reserve Your Stall
                  </h2>
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
                </div>

                <div className="h-1 w-40 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 mb-6 rounded-full mx-auto shadow-[0_0_20px_rgba(6,182,212,0.6)]"></div>

                <p className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-4">
                  <span className="text-cyan-400 font-semibold">
                    Showcase your publications
                  </span>{" "}
                  to thousands of book enthusiasts.
                  <br />
                  Secure your premium exhibition space today!
                </p>
                <p className="text-gray-400 text-base max-w-2xl mx-auto">
                  Online reservations are now open for exhibitors, publishers,
                  and bookstores
                </p>
              </div>

              {/* Main Stall Reservation Card */}
              <div className="max-w-4xl mx-auto mb-12">
                <div className="bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-purple-500/20 backdrop-blur-xl p-10 md:p-12 rounded-3xl border-2 border-cyan-500/50 hover:border-cyan-400/70 shadow-[0_0_60px_rgba(6,182,212,0.4)] hover:shadow-[0_0_80px_rgba(6,182,212,0.6)] transition-all duration-500 group relative overflow-hidden">
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-cyan-500/10 rounded-full blur-3xl group-hover:animate-pulse"></div>

                  {/* Featured Badge */}
                  <div className="absolute top-6 right-6 flex gap-2">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-bold px-4 py-2 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.6)] animate-pulse">
                      ⭐ ONLINE BOOKING OPEN
                    </div>
                  </div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="text-7xl mb-6 transform group-hover:scale-110 transition-transform duration-500">
                      🏪
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">
                      Exhibition Stall Reservation
                    </h3>

                    {/* Divider */}
                    <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto mb-8 group-hover:w-32 transition-all duration-500 shadow-[0_0_15px_rgba(6,182,212,0.6)]"></div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 gap-4 mb-8 text-left">
                      <div className="bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">📍</span>
                          <div>
                            <h4 className="text-cyan-400 font-semibold mb-1">
                              Premium Location
                            </h4>
                            <p className="text-gray-400 text-sm">
                              Strategic placement in high-traffic exhibition
                              halls
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-blue-500/30 hover:border-blue-400/60 transition-all duration-300">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">🛠️</span>
                          <div>
                            <h4 className="text-blue-400 font-semibold mb-1">
                              Complete Setup
                            </h4>
                            <p className="text-gray-400 text-sm">
                              Furniture, lighting & technical support included
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">📢</span>
                          <div>
                            <h4 className="text-purple-400 font-semibold mb-1">
                              Marketing Support
                            </h4>
                            <p className="text-gray-400 text-sm">
                              Featured in event directory & promotional
                              materials
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">🎯</span>
                          <div>
                            <h4 className="text-cyan-400 font-semibold mb-1">
                              Target Audience
                            </h4>
                            <p className="text-gray-400 text-sm">
                              Direct access to 5,000+ book enthusiasts
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Benefits */}
                    <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm p-6 rounded-2xl border border-cyan-500/20 mb-8">
                      <h4 className="text-lg font-bold text-cyan-400 mb-4 flex items-center justify-center gap-2">
                        <span>✨</span> What's Included <span>✨</span>
                      </h4>
                      <div
                        className=" grid md:grid-cols-2 gap-3 text-gray-300 text-sm"
                        style={{ paddingLeft: "7rem" }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-cyan-400">✓</span>
                          <span>Electrical power supply</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-cyan-400">✓</span>
                          <span>WiFi connectivity</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-cyan-400">✓</span>
                          <span>Company name board</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-cyan-400">✓</span>
                          <span>2 exhibitor passes</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-cyan-400">✓</span>
                          <span>Security coverage</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-cyan-400">✓</span>
                          <span>Cleaning services</span>
                        </div>
                      </div>
                    </div>

                    {/* Stall Types/Sizes */}
                    <div className="max-w-4xl mx-auto mb-12">
                      <h3 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-8">
                        Available Stall Options
                      </h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-black/60 via-blue-950/30 to-black/60 backdrop-blur-xl p-6 rounded-2xl border border-blue-500/30 hover:border-blue-400/60 hover:shadow-[0_0_35px_rgba(59,130,246,0.3)] transition-all duration-300">
                          <div className="text-4xl mb-3">📦</div>
                          <h4 className="text-xl font-bold text-blue-400 mb-2">
                            Standard
                          </h4>
                          <p className="text-gray-400 text-sm mb-4">
                            3m × 3m space
                          </p>
                          <ul className="text-gray-400 text-xs space-y-1 text-left">
                            <li>• Basic booth setup</li>
                            <li>• Power outlet</li>
                          </ul>
                        </div>

                        <div className="bg-gradient-to-br from-black/60 via-cyan-950/30 to-black/60 backdrop-blur-xl p-6 rounded-2xl border-2 border-cyan-500/50 hover:border-cyan-400/70 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-300 relative">
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                            POPULAR
                          </div>
                          <div className="text-4xl mb-3">🏢</div>
                          <h4 className="text-xl font-bold text-cyan-400 mb-2">
                            Premium
                          </h4>
                          <p className="text-gray-400 text-sm mb-4">
                            6m × 3m space
                          </p>
                          <ul className="text-gray-400 text-xs space-y-1 text-left">
                            <li>• Corner location</li>
                            <li>• Enhanced lighting</li>
                            <li>• Storage cabinet</li>
                          </ul>
                        </div>

                        <div className="bg-gradient-to-br from-black/60 via-purple-950/30 to-black/60 backdrop-blur-xl p-6 rounded-2xl border border-purple-500/30 hover:border-purple-400/60 hover:shadow-[0_0_35px_rgba(168,85,247,0.3)] transition-all duration-300">
                          <div className="text-4xl mb-3">🏛️</div>
                          <h4 className="text-xl font-bold text-purple-400 mb-2">
                            Executive
                          </h4>
                          <p className="text-gray-400 text-sm mb-4">
                            9m × 3m space
                          </p>
                          <ul className="text-gray-400 text-xs space-y-1 text-left">
                            <li>• Prime entrance location</li>
                            <li>• Custom booth design</li>
                            <li>• Meeting area</li>
                            <li>• Audio/visual equipment</li>
                            <li>• Dedicated staff support</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => navigate("/reservation")}
                      className="px-12 py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 rounded-full font-bold text-xl text-white shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:shadow-[0_0_60px_rgba(6,182,212,0.8)] transform hover:scale-105 transition-all duration-300 relative group/btn overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        Reserve Your Stall Now
                        <svg
                          className="w-6 h-6 transform group-hover/btn:translate-x-2 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CONTACT SECTION */}
          <section
            id="contact"
            className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative z-10"
          >
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-8">
                Get in Touch
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="bg-black/60 backdrop-blur-xl p-8 rounded-xl border border-cyan-500/30 hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-300">
                  <div className="text-4xl mb-4">📧</div>
                  <h3 className="text-lg font-bold text-cyan-400 mb-3">
                    Email
                  </h3>
                  <p className="text-gray-400 text-sm">
                    info@colombobookfair.lk
                  </p>
                </div>
                <div className="bg-black/60 backdrop-blur-xl p-8 rounded-xl border border-blue-500/30 hover:border-blue-400/60 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300">
                  <div className="text-4xl mb-4">📱</div>
                  <h3 className="text-lg font-bold text-blue-400 mb-3">
                    Phone
                  </h3>
                  <p className="text-gray-400 text-sm">+94 11 234 5678</p>
                </div>
              </div>
              <div className="text-gray-500 text-sm space-y-2">
                <p>© 2025 Colombo International Book Fair</p>
                <p className="text-cyan-400/60">
                  Powered by Innovation & Imagination
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
