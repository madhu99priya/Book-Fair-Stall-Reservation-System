import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, MousePointerClick } from "lucide-react";

const CinemaModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoEnding, setVideoEnding] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  const handleStartExperience = () => {
    setShowWelcome(false);
    // Start video immediately
    setTimeout(() => {
      playVideoWithSound();
    }, 500);
  };

  const playVideoWithSound = async () => {
    if (!videoRef.current) return;

    try {
      videoRef.current.muted = false;
      await videoRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.log("Play failed:", error);
      try {
        videoRef.current.muted = true;
        await videoRef.current.play();
        setIsPlaying(true);
      } catch (mutedError) {
        console.error("All play attempts failed:", mutedError);
      }
    }
  };

  const handleVideoEnd = () => {
    // Start fade out animation
    setVideoEnding(true);

    // Close modal after fade out
    setTimeout(() => {
      setIsOpen(false);
    }, 1000);
  };

  const handleVideoError = () => {
    console.error("Video failed to load");
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] bg-black overflow-hidden">
        {/* Welcome/Verification Screen */}
        <AnimatePresence>
          {showWelcome && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-[203] bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center overflow-hidden"
            >
              {/* Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div
                  className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
                  style={{ animationDelay: "2s" }}
                ></div>
              </div>

              <div className="relative z-10 text-center max-w-2xl px-6 md:px-8">
                {/* Combined Logo Animation */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    duration: 0.8,
                  }}
                  className="mb-10"
                >
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full blur-3xl opacity-60 animate-pulse"></div>
                    <div className="relative flex items-center justify-center gap-3">
                      <div className="text-7xl md:text-8xl">🎬</div>
                      <div className="text-7xl md:text-8xl">📚</div>
                    </div>
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-5 leading-tight px-4"
                >
                  Welcome to CIBF 2025
                </motion.h1>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="h-1 w-40 md:w-48 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full mx-auto mb-8 shadow-[0_0_20px_rgba(6,182,212,0.6)]"
                />

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-lg md:text-xl lg:text-2xl text-cyan-400 font-semibold mb-3"
                >
                  Colombo International Book Fair
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-base md:text-lg text-gray-400 mb-12"
                >
                  06th - 15th December 2025 • BMICH, Colombo
                </motion.p>

                {/* Start Button with Alternating Vertical Red Lines */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="mb-8"
                >
                  <motion.button
                    onClick={handleStartExperience}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="group relative overflow-hidden inline-block"
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Button Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>

                    {/* Base Button */}
                    <div className="relative flex items-center gap-3 md:gap-4 px-8 md:px-12 py-4 md:py-6 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_60px_rgba(6,182,212,0.6)] transition-all duration-300 border-2 border-cyan-400/30 group-hover:border-cyan-400/60 overflow-hidden">
                      {/* Alternating Vertical Red Lines */}
                      <div className="absolute inset-0 z-[1] flex">
                        {[...Array(50)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ y: i % 2 === 0 ? "-100%" : "100%" }}
                            animate={{
                              y: isHovered
                                ? "0%"
                                : i % 2 === 0
                                ? "-100%"
                                : "100%",
                            }}
                            transition={{
                              duration: 0.8,
                              ease: "easeOut",
                              delay: i * 0.008, // Staggered effect
                            }}
                            className="flex-1 bg-red-600"
                            style={{
                              marginRight: i < 49 ? "3px" : "0",
                            }}
                          />
                        ))}
                      </div>

                      {/* Solid Red Fill (appears after lines meet) */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{
                          duration: 0.2,
                          delay: isHovered ? 0.4 : 0,
                        }}
                        className="absolute inset-0 bg-red-600 z-[2]"
                      />

                      {/* Button Content (stays on top) */}
                      <div className="relative z-10 flex items-center gap-3 md:gap-4">
                        <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-white drop-shadow-lg" />
                        <div className="text-left">
                          <div className="text-white text-xl md:text-2xl lg:text-3xl font-black drop-shadow-lg">
                            Start Experience
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                </motion.div>

                {/* Interactive Hint */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="flex items-center justify-center gap-2 text-gray-500 mb-10"
                >
                  <MousePointerClick className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-xs md:text-sm">
                    Hover and click to continue
                  </span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Container with Fade In/Out */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: showWelcome ? 0 : videoEnding ? 0 : 1,
          }}
          transition={{
            duration: videoEnding ? 1 : 1.5,
            ease: "easeInOut",
          }}
          className="absolute inset-0 z-[201] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Video Element */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            preload="auto"
            onEnded={handleVideoEnd}
            onError={handleVideoError}
            poster="/videos/intro-thumbnail.jpg"
          >
            <source src="/videos/intro-video.mp4" type="video/mp4" />
            <source src="/videos/intro-video.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>

          {/* Branding Overlay */}
          {isPlaying && !videoEnding && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute top-6 left-6 md:top-8 md:left-8 z-10"
            >
              <div className="flex items-center gap-2 md:gap-3 bg-black/30 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10">
                <div className="text-xl md:text-2xl">📚</div>
                <span className="text-white font-semibold text-xs md:text-sm">
                  CIBF 2025
                </span>
              </div>
            </motion.div>
          )}

          {/* Now Playing Indicator */}
          {isPlaying && !videoEnding && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10"
            >
              <div className="flex items-center gap-2 md:gap-3 bg-cyan-500/20 backdrop-blur-md px-3 py-2 md:px-4 md:py-3 rounded-full border border-cyan-500/40">
                <div className="flex gap-1">
                  <motion.div
                    animate={{ scaleY: [1, 1.5, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="w-1 h-3 md:h-4 bg-cyan-400 rounded-full"
                  />
                  <motion.div
                    animate={{ scaleY: [1, 1.5, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                    className="w-1 h-3 md:h-4 bg-blue-400 rounded-full"
                  />
                  <motion.div
                    animate={{ scaleY: [1, 1.5, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                    className="w-1 h-3 md:h-4 bg-purple-400 rounded-full"
                  />
                </div>
                <span className="text-white text-xs md:text-sm font-semibold">
                  🔊 Now Playing
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CinemaModal;
