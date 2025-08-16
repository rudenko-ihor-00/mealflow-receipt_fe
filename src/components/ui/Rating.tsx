import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface RatingProps {
  value: number;
  maxValue?: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({
  value,
  maxValue = 5,
  onChange,
  readOnly = false,
  size = "md",
  showValue = false,
  className = "",
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const handleStarClick = (starValue: number) => {
    if (!readOnly && onChange) {
      onChange(starValue);
    }
  };

  const handleStarHover = (starValue: number) => {
    if (!readOnly) {
      setHoverValue(starValue);
    }
  };

  const handleStarLeave = () => {
    if (!readOnly) {
      setHoverValue(null);
    }
  };

  const getStarColor = (starValue: number) => {
    const displayValue = hoverValue !== null ? hoverValue : value;

    if (starValue <= displayValue) {
      return "text-yellow-400 fill-current";
    }

    return "text-gray-300";
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="flex items-center space-x-1">
        {Array.from({ length: maxValue }, (_, index) => {
          const starValue = index + 1;

          return (
            <motion.button
              key={starValue}
              type="button"
              disabled={readOnly}
              onClick={() => handleStarClick(starValue)}
              onMouseEnter={() => handleStarHover(starValue)}
              onMouseLeave={handleStarLeave}
              whileHover={!readOnly ? { scale: 1.1 } : {}}
              whileTap={!readOnly ? { scale: 0.9 } : {}}
              className={`
                ${sizeClasses[size]}
                transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                ${!readOnly ? "cursor-pointer" : "cursor-default"}
              `}
            >
              <Star
                className={`${sizeClasses[size]} ${getStarColor(starValue)}`}
              />
            </motion.button>
          );
        })}
      </div>

      {showValue && (
        <span className={`font-medium text-gray-700 ${textSizeClasses[size]}`}>
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating;
