import Navbar from "../components/Navbar";
import EventCarousel from "../components/EventCarousel";
import AboutCarousel from "../components/AboutCarousel";

import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-black text-white relative overflow-hidden">
      {/* Background matching EventCarousel */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/50 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0%,transparent_70%)]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <Navbar />

      <main className="relative z-10">
        {/* HOME SECTION */}
        <section
          id="home"
          className="min-h-screen flex flex-col md:flex-row items-center justify-center text-center md:text-left px-8 gap-8 pt-20"
        >
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-black/80 via-cyan-950/40 to-black/80 p-10 rounded-3xl shadow-[0_0_60px_rgba(6,182,212,0.4)] backdrop-blur-2xl border border-cyan-500/30 relative overflow-hidden group hover:border-cyan-400/60 transition-all duration-500">
            {/* Holographic Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-cyan-500/10 rounded-full blur-3xl group-hover:animate-pulse"></div>

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-400/50"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-cyan-400/50"></div>

            <div className="relative z-10">
              {/* Animated Dots */}
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-75"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-150"></div>
              </div>

              <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6 drop-shadow-2xl animate-[gradient_8s_ease_infinite] bg-[length:200%_auto]">
                Colombo International Book Fair 2025
              </h1>

              <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 mb-8 rounded-full mx-auto md:mx-0 shadow-[0_0_15px_rgba(6,182,212,0.6)]"></div>

              <p className="text-xl text-gray-300 max-w-3xl mb-8 leading-relaxed">
                <span className="text-cyan-400 font-semibold">
                  Step into the future of reading.
                </span>{" "}
                Where technology meets literature in an immersive digital
                experience that transcends boundaries.
              </p>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start text-sm">
                <span className="px-4 py-2 bg-cyan-500/20 rounded-full border border-cyan-500/40 text-cyan-300 font-mono shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-300">
                  06th December to 15th December 2025
                </span>
                <span className="px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/40 text-blue-300 font-mono shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all duration-300">
                  Bandaranaike Memorial International Conference Hall – BMICH.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section
          id="about"
          className="min-h-screen flex flex-col items-center justify-center text-center px-8 gap-8"
        >
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-black/80 via-blue-950/40 to-black/80 p-10 md:p-16 rounded-3xl shadow-[0_0_60px_rgba(59,130,246,0.4)] backdrop-blur-2xl border border-blue-500/30 relative overflow-visible group hover:border-blue-400/60 transition-all duration-500">
            {/* Holographic Effect */}
            <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
        <section id="events" className="mt-20">
          <EventCarousel />
        </section>

        {/* REGISTRATION SECTION */}
        <section
          id="registration"
          className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative"
        >
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-8">
              Register Now
            </h2>
            <p className="text-gray-300 text-xl mb-10">
              Secure your spot at the future of literary experiences
            </p>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-full font-bold text-white shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 border border-blue-400/50"
            >
              Join the Experience →
            </button>
            <div className="mt-12 flex justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.6)]"></div>
                <span>Early Bird Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.6)]"></div>
                <span>Limited Slots</span>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section
          id="contact"
          className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative"
        >
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-8">
              Get in Touch
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="bg-black/60 backdrop-blur-xl p-8 rounded-xl border border-cyan-500/30 hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-300">
                <div className="text-4xl mb-4">📧</div>
                <h3 className="text-lg font-bold text-cyan-400 mb-3">Email</h3>
                <p className="text-gray-400 text-sm">info@colombobookfair.lk</p>
              </div>
              <div className="bg-black/60 backdrop-blur-xl p-8 rounded-xl border border-blue-500/30 hover:border-blue-400/60 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-lg font-bold text-blue-400 mb-3">Phone</h3>
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
  );
}
