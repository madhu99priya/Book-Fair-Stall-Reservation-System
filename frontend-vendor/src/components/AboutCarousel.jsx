import { useState, useEffect } from "react";

export default function AboutCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      text: "The Colombo International Book Fair (CIBF), the most popular annual book exhibition, is set to celebrate its 25th anniversary in September 2024. This milestone event will feature an array of literary and cultural activities, catering to children and readers from all walks of life. This year's fair will host over 500 exhibitors, including international participants, and will introduce thousands of new titles.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      text: "Originating in 1999 as a modest initiative by the Sri Lanka Book Publishers Association, the CIBF has grown into a prestigious international event, marking significant achievements for readers, authors, illustrators, editors, and translators alike. It's a moment of immense pride and reflection on the progress achieved through this vital cultural platform.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      text: "Parallel to the book fair, the event will host esteemed award ceremonies such as the Swarnapusthaka Award for Sinhala Novels and the Rajathapusthaka Awards for Short Stories, Poetry, and Young Adult Literature, further enhancing the fair's significance and appeal.",
      gradient: "from-cyan-500 to-blue-500",
    },
  ];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Cards Container */}
      <div className="relative overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="min-w-full px-4">
              <div
                className={`bg-gradient-to-br ${slide.gradient}/20 backdrop-blur-xl p-8 md:p-12 rounded-2xl border border-white/20 shadow-[0_0_40px_rgba(6,182,212,0.2)] hover:shadow-[0_0_60px_rgba(6,182,212,0.4)] transition-all duration-500`}
              >
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                  {slide.text}
                </p>

                {/* Decorative corners */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-400/50"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-400/50"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-cyan-400/50"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-400/50"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-black/60 backdrop-blur-xl p-3 rounded-full border border-cyan-500/30 hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-black/60 backdrop-blur-xl p-3 rounded-full border border-cyan-500/30 hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 group"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-3 mt-8">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index
                ? "w-12 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 shadow-[0_0_10px_rgba(6,182,212,0.6)]"
                : "w-3 h-3 bg-gray-600 hover:bg-gray-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
