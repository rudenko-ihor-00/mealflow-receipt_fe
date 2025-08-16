import React from "react";
import { motion } from "framer-motion";

interface ProgressProps {
  value: number;
  max?: number;
  variant?: "default" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  variant = "default",
  size = "md",
  showLabel = false,
  animated = true,
  className = "",
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  const variantClasses = {
    default: "bg-primary-500",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
  };

  const labelSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span
            className={`font-medium text-gray-700 ${labelSizeClasses[size]}`}
          >
            Прогрес
          </span>
          <span
            className={`font-medium text-gray-500 ${labelSizeClasses[size]}`}
          >
            {Math.round(percentage)}%
          </span>
        </div>
      )}

      <div
        className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}
      >
        <motion.div
          className={`h-full ${variantClasses[variant]} rounded-full`}
          initial={animated ? { width: 0 } : {}}
          animate={animated ? { width: `${percentage}%` } : {}}
          transition={animated ? { duration: 0.8, ease: "easeOut" } : {}}
          style={animated ? {} : { width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default Progress;
