import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  showLabels?: boolean;
  variant?: "default" | "success" | "warning" | "error";
  className?: string;
}

const Slider: React.FC<SliderProps> = ({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  disabled = false,
  size = "md",
  showValue = false,
  showLabels = false,
  variant = "default",
  className = "",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  const thumbSizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const variantClasses = {
    default: "bg-primary-500",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
  };

  const percentage = ((value - min) / (max - min)) * 100;

  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const sliderWidth = rect.width;
    const clickPercentage = clickX / sliderWidth;
    const newValue = min + clickPercentage * (max - min);
    const roundedValue = Math.round(newValue / step) * step;

    onChange(Math.max(min, Math.min(max, roundedValue)));
  };

  const handleMouseDown = () => {
    if (disabled) return;
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || disabled || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const sliderWidth = rect.width;
    const mousePercentage = mouseX / sliderWidth;
    const newValue = min + mousePercentage * (max - min);
    const roundedValue = Math.round(newValue / step) * step;

    onChange(Math.max(min, Math.min(max, roundedValue)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div className={`w-full ${className}`}>
      {/* Labels */}
      {showLabels && (
        <div className="flex justify-between items-center mb-2">
          <span className={`text-gray-600 ${textSizeClasses[size]}`}>
            {min}
          </span>
          {showValue && (
            <span
              className={`font-medium text-gray-900 ${textSizeClasses[size]}`}
            >
              {value}
            </span>
          )}
          <span className={`text-gray-600 ${textSizeClasses[size]}`}>
            {max}
          </span>
        </div>
      )}

      {/* Slider */}
      <div className="relative">
        <div
          ref={sliderRef}
          onClick={handleSliderClick}
          className={`
            w-full ${sizeClasses[size]} bg-gray-200 rounded-full cursor-pointer relative
            ${disabled ? "cursor-not-allowed opacity-50" : ""}
          `}
        >
          {/* Track Fill */}
          <motion.div
            className={`${sizeClasses[size]} ${variantClasses[variant]} rounded-full absolute top-0 left-0`}
            style={{ width: `${percentage}%` }}
            transition={{ duration: 0.2 }}
          />

          {/* Thumb */}
          <motion.div
            className={`
              ${thumbSizeClasses[size]}
              bg-white border-2 border-white rounded-full shadow-lg absolute top-1/2 transform -translate-y-1/2 cursor-pointer
              ${disabled ? "cursor-not-allowed" : ""}
            `}
            style={{ left: `${percentage}%` }}
            onMouseDown={handleMouseDown}
            whileHover={!disabled ? { scale: 1.1 } : {}}
            whileTap={!disabled ? { scale: 0.9 } : {}}
            transition={{ duration: 0.2 }}
          />
        </div>
      </div>

      {/* Value Display (if no labels) */}
      {showValue && !showLabels && (
        <div className="text-center mt-2">
          <span
            className={`font-medium text-gray-900 ${textSizeClasses[size]}`}
          >
            {value}
          </span>
        </div>
      )}
    </div>
  );
};

export default Slider;
