import React, { useState, useEffect, useRef } from "react";

export default function EventCarousel() {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const carouselRef = useRef(null);

  const events = [
    {
      title: "Colombo Book Fair",
      image: { src: "/event/book_fair.jpg" },
      gradient: "from-indigo-500 to-purple-500",
      description: "Explore thousands of books and meet fellow book lovers",
    },
    {
      title: "Book Launches",
      image: { src: "/event/Book-Launches.jpg" },
      gradient: "from-purple-500 to-pink-500",
      description: "Discover new releases from acclaimed authors",
    },
    {
      title: "Discussion Sessions",
      image: { src: "/event/Writers-Discussion.jpg" },
      gradient: "from-blue-500 to-cyan-500",
      description: "Engage with writers in thought-provoking sessions",
    },
    {
      title: "Musical Programs & Stage Dramas",
      image: { src: "/event/Music.jpg" },
      gradient: "from-pink-500 to-red-500",
      description: "Experience captivating performances and theatrical shows",
    },
    {
      title: "Katapath Pawura",
      image: { src: "/event/Ketapath-Paura.jpg" },
      gradient: "from-green-500 to-emerald-500",
      description: "Share your creative poems and verses with the community",
    },
    {
      title: "Kids Activities",
      image: { src: "/event/Kids.jpg" },
      gradient: "from-yellow-500 to-orange-500",
      description: "Painting, clay work, dramas, and puppet shows for children",
    },
  ];

  // Auto-rotation
  useEffect(() => {
    if (!autoRotate || isDragging) return;

    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.3);
    }, 30);

    return () => clearInterval(interval);
  }, [autoRotate, isDragging]);

  // Mouse/Touch handlers
  const handleStart = (clientX) => {
    setIsDragging(true);
    setAutoRotate(false);
    setStartX(clientX);
    setCurrentRotation(rotation);
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;
    const deltaX = clientX - startX;
    setRotation(currentRotation + deltaX * 0.5);
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  const handleMouseDown = (e) => handleStart(e.clientX);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    setRotation(currentRotation + deltaX * 0.5);
  };

  const handleMouseUp = () => handleEnd();

  const handleTouchStart = (e) => handleStart(e.touches[0].clientX);
  const handleTouchMove = (e) => handleMove(e.touches[0].clientX);
  const handleTouchEnd = () => handleEnd();

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, startX, currentRotation]);

  const navigateTo = (index) => {
    const anglePerCard = 360 / events.length;
    const targetRotation = -index * anglePerCard;
    setRotation(targetRotation);
    setAutoRotate(false);
  };

  // Calculate active index based on rotation
  const getActiveIndex = () => {
    const anglePerCard = 360 / events.length;
    const normalizedRotation = ((rotation % 360) + 360) % 360;
    const index = Math.round(normalizedRotation / anglePerCard) % events.length;
    return (events.length - index) % events.length;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Title */}
      <div className="relative z-10 text-center mb-8">
        <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
          Featured Events
        </h2>
      </div>

      {/* 3D Carousel Container */}
      <div className="relative z-10 w-full max-w-6xl">
        <div
          ref={carouselRef}
          className="relative mx-auto"
          style={{
            perspective: "1400px",
            height: "500px",
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Carousel Stage */}
          <div
            className="absolute top-1/2 left-1/2 w-full h-full"
            style={{
              transformStyle: "preserve-3d",
              transform: `translate(-50%, -50%) rotateY(${rotation}deg)`,
              transition: isDragging
                ? "none"
                : "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
              cursor: isDragging ? "grabbing" : "grab",
            }}
          >
            {events.map((event, i) => {
              const angle = (i / events.length) * 360;
              const radius = 450;

              return (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 group"
                  style={{
                    transform: `
                      translate(-50%, -50%)
                      rotateY(${angle}deg)
                      translateZ(${radius}px)
                    `,
                    transformStyle: "preserve-3d",
                  }}
                  onClick={() => navigateTo(i)}
                >
                  {/* Card */}
                  <div className="w-64 h-80 bg-gradient-to-br from-black/80 to-black/60 rounded-2xl border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.3)] backdrop-blur-xl overflow-hidden transition-all duration-500 hover:scale-110 hover:border-purple-400/60 hover:shadow-[0_0_80px_rgba(168,85,247,0.5)] cursor-pointer">
                    {/* Holographic overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Animated background glow */}
                    <div
                      className={`absolute -inset-1 bg-gradient-to-r ${event.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`}
                    ></div>

                    {/* Content */}
                    <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
                      {/* Image */}
                      <div className="w-24 h-24 mb-6 rounded-full overflow-hidden border-4 border-purple-500/30 group-hover:border-purple-400/60 transition-all duration-500 group-hover:scale-110">
                        <img
                          src={event.image.src}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Title */}
                      <h3
                        className={`text-2xl font-bold bg-gradient-to-r ${event.gradient} bg-clip-text text-transparent mb-4 group-hover:scale-105 transition-transform duration-300`}
                      >
                        {event.title}
                      </h3>

                      {/* Divider */}
                      <div
                        className={`h-1 w-16 bg-gradient-to-r ${event.gradient} rounded-full mb-4 group-hover:w-24 transition-all duration-500`}
                      ></div>

                      {/* Description */}
                      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                        {event.description}
                      </p>

                      {/* Animated corners */}
                      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-purple-500/50 group-hover:border-purple-400 transition-colors duration-300"></div>
                      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-purple-500/50 group-hover:border-purple-400 transition-colors duration-300"></div>
                      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-purple-500/50 group-hover:border-purple-400 transition-colors duration-300"></div>
                      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-purple-500/50 group-hover:border-purple-400 transition-colors duration-300"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {events.map((_, i) => {
            const activeIndex = getActiveIndex();
            return (
              <button
                key={i}
                onClick={() => navigateTo(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-purple-400 w-8 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                    : "bg-purple-500/30 hover:bg-purple-500/60"
                }`}
                aria-label={`Navigate to ${events[i].title}`}
              />
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              autoRotate
                ? "bg-purple-500/20 text-purple-400 border-2 border-purple-500/50 hover:bg-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                : "bg-gray-500/20 text-gray-400 border-2 border-gray-500/50 hover:bg-gray-500/30"
            }`}
          >
            {autoRotate ? "⏸" : "▶"}
          </button>
        </div>
      </div>
    </div>
  );
}
