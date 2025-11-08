// Home.jsx

import Navbar from "../components/Navbar";
import BookScene from "../components/BookScene";

import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-black text-white relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(79,70,229,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <Navbar />

      <main className="relative z-10">
        {/* --- 1. ANIMATION WRAPPER --- */}
        <div className="h-[280vh] relative">
          {/* 3D SCENE (STICKY) */}
          <div className="sticky top-0 h-screen z-0">
            <BookScene />
          </div>

          {/* TEXT CONTENT (ABSOLUTE) */}
          <div className="absolute top-0 left-0 w-full z-10">
            {/* HOME SECTION (Left Side) */}
            <section
              id="home"
              className="h-[80vh] flex flex-col md:flex-row items-center justify-center md:justify-start text-center md:text-left px-8 gap-8"
            >
              <div className="md:w-1/2 bg-black/60 p-8 rounded-2xl shadow-2xl backdrop-blur-2xl border border-purple-500/50 relative overflow-hidden group hover:border-purple-400 transition-all duration-500">
                {/* Holographic Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-purple-500/10 rounded-full blur-3xl group-hover:animate-pulse"></div>

                <div className="relative z-10">
                  <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4 drop-shadow-2xl animate-[gradient_8s_ease_infinite] bg-[length:200%_auto]">
                    Colombo International Book Fair 2025
                  </h1>
                  <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 mb-6 rounded-full"></div>
                  <p className="text-lg text-gray-300 max-w-xl mb-6 leading-relaxed">
                    <span className="text-purple-400 font-semibold">
                      Experience the future of reading.
                    </span>{" "}
                    Scroll down to see the story unfold - the book opens as you
                    move through dimensions.
                  </p>
                  <div className="flex gap-2 text-xs text-purple-400 font-mono">
                    <span className="px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30">
                      IMMERSIVE
                    </span>
                    <span className="px-3 py-1 bg-blue-500/20 rounded-full border border-blue-500/30">
                      INTERACTIVE
                    </span>
                    <span className="px-3 py-1 bg-pink-500/20 rounded-full border border-pink-500/30">
                      INNOVATIVE
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* ABOUT SECTION (Right Side) */}
            <section
              id="about"
              className="h-screen flex flex-col md:flex-row items-center justify-center md:justify-end text-center md:text-left px-8 gap-8"
            >
              <div className="md:w-1/2 bg-black/60 p-8 rounded-2xl shadow-2xl backdrop-blur-2xl border border-blue-500/50 relative overflow-hidden group hover:border-blue-400 transition-all duration-500">
                {/* Holographic Effect */}
                <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-blue-500/10 rounded-full blur-3xl group-hover:animate-pulse"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
                      About the Fair
                    </h2>
                  </div>
                  <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-500 mb-6 rounded-full"></div>
                  <p className="text-lg text-gray-300 max-w-xl leading-relaxed mb-6">
                    The Colombo International Book Fair celebrates authors,
                    publishers, and readers - bringing the magic of words to
                    life through cutting-edge experiences and digital
                    innovation.
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/30">
                      <div className="text-2xl font-bold text-blue-400">
                        50+
                      </div>
                      <div className="text-xs text-gray-400">Publishers</div>
                    </div>
                    <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/30">
                      <div className="text-2xl font-bold text-purple-400">
                        100+
                      </div>
                      <div className="text-xs text-gray-400">Authors</div>
                    </div>
                    <div className="bg-cyan-500/10 p-3 rounded-lg border border-cyan-500/30">
                      <div className="text-2xl font-bold text-cyan-400">
                        5K+
                      </div>
                      <div className="text-xs text-gray-400">Visitors</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        {/* --- END ANIMATION WRAPPER --- */}

        {/* --- 2. REST OF PAGE CONTENT --- */}
        <section
          id="events"
          className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-purple-950/50 to-black text-center px-4 relative"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1)_0%,transparent_70%)]"></div>
          <div className="relative z-10 max-w-4xl">
            <h2 className="text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">
              Featured Events
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-black/40 backdrop-blur-xl p-6 rounded-xl border border-purple-500/30 hover:border-purple-400 transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-bold text-purple-400 mb-2">
                  Book Launches
                </h3>
                <p className="text-gray-400 text-sm">
                  Exclusive author readings and signings
                </p>
              </div>
              <div className="bg-black/40 backdrop-blur-xl p-6 rounded-xl border border-blue-500/30 hover:border-blue-400 transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-4">🎤</div>
                <h3 className="text-xl font-bold text-blue-400 mb-2">
                  Panel Discussions
                </h3>
                <p className="text-gray-400 text-sm">
                  Industry insights and conversations
                </p>
              </div>
              <div className="bg-black/40 backdrop-blur-xl p-6 rounded-xl border border-pink-500/30 hover:border-pink-400 transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-bold text-pink-400 mb-2">
                  Workshops
                </h3>
                <p className="text-gray-400 text-sm">
                  Interactive creative sessions
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="registration"
          className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-blue-950/50 to-black text-center px-4 relative"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]"></div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-5xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-8">
              Register Now
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Secure your spot at the future of literary experiences
            </p>
            <button 
            onClick={() => navigate("/reservation")}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-full font-bold text-white shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 border border-blue-400/50">
              Join the Experience →
            </button>
            <div className="mt-12 flex justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Early Bird Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Limited Slots</span>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-purple-950/50 to-black text-center px-4 relative"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1)_0%,transparent_70%)]"></div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">
              Get in Touch
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-black/40 backdrop-blur-xl p-6 rounded-xl border border-purple-500/30">
                <div className="text-3xl mb-3">📧</div>
                <h3 className="text-lg font-bold text-purple-400 mb-2">
                  Email
                </h3>
                <p className="text-gray-400 text-sm">info@colombobookfair.lk</p>
              </div>
              <div className="bg-black/40 backdrop-blur-xl p-6 rounded-xl border border-blue-500/30">
                <div className="text-3xl mb-3">📱</div>
                <h3 className="text-lg font-bold text-blue-400 mb-2">Phone</h3>
                <p className="text-gray-400 text-sm">+94 11 234 5678</p>
              </div>
            </div>
            <div className="text-gray-500 text-sm">
              <p>© 2025 Colombo International Book Fair</p>
              <p className="mt-2">Powered by Innovation & Imagination</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
