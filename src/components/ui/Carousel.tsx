import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";

interface CarouselProps {
  items: React.ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  showIndicators?: boolean;
  infinite?: boolean;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  autoPlay = false,
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = true,
  showIndicators = true,
  infinite = true,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const totalItems = items.length;

  const nextSlide = () => {
    if (infinite || currentIndex < totalItems - 1) {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }
  };

  const prevSlide = () => {
    if (infinite || currentIndex > 0) {
      setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleAutoPlay = () => {
    if (isAutoPlaying) {
      nextSlide();
    }
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(handleAutoPlay, autoPlayInterval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentIndex, autoPlayInterval]);

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const resumeAutoPlay = () => {
    setIsAutoPlaying(true);
  };

  if (totalItems === 0) return null;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
      {/* Carousel Container */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {items[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {showArrows && totalItems > 1 && (
        <>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            disabled={!infinite && currentIndex === 0}
            className={`
              absolute left-4 top-1/2 transform -translate-y-1/2 z-10
              w-12 h-12 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full shadow-lg
              flex items-center justify-center transition-all duration-200
              hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500
              ${!infinite && currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}
            `}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            disabled={!infinite && currentIndex === totalItems - 1}
            className={`
              absolute right-4 top-1/2 transform -translate-y-1/2 z-10
              w-12 h-12 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full shadow-lg
              flex items-center justify-center transition-all duration-200
              hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500
              ${!infinite && currentIndex === totalItems - 1 ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}
            `}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </>
      )}

      {/* Dots Navigation */}
      {showDots && totalItems > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
          {items.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => goToSlide(index)}
              className={`
                w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500
                ${index === currentIndex ? "bg-primary-500" : "bg-white/60 hover:bg-white/80"}
              `}
            />
          ))}
        </div>
      )}

      {/* Indicators */}
      {showIndicators && totalItems > 1 && (
        <div className="absolute top-4 right-4 z-10 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
          {currentIndex + 1} / {totalItems}
        </div>
      )}
    </div>
  );
};

export default Carousel;
