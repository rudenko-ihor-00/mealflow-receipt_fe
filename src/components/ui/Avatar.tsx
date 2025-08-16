import React from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  fallback,
  size = "md",
  className = "",
  onClick,
}) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg",
  };

  const baseClasses = `${sizeClasses[size]} rounded-xl flex items-center justify-center font-semibold transition-all duration-200`;

  const contentClasses = onClick
    ? `${baseClasses} cursor-pointer hover:scale-105 ${className}`
    : `${baseClasses} ${className}`;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  if (src) {
    return (
      <motion.img
        src={src}
        alt={alt || "Avatar"}
        className={contentClasses}
        onClick={handleClick}
        whileHover={onClick ? { scale: 1.05 } : {}}
        whileTap={onClick ? { scale: 0.95 } : {}}
      />
    );
  }

  if (fallback) {
    return (
      <motion.div
        className={`${contentClasses} bg-gradient-to-br from-primary-100 to-accent-100 text-primary-700`}
        onClick={handleClick}
        whileHover={onClick ? { scale: 1.05 } : {}}
        whileTap={onClick ? { scale: 0.95 } : {}}
      >
        {fallback}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`${contentClasses} bg-gray-100 text-gray-600`}
      onClick={handleClick}
      whileHover={onClick ? { scale: 1.05 } : {}}
      whileTap={onClick ? { scale: 0.95 } : {}}
    >
      <User className="w-1/2 h-1/2" />
    </motion.div>
  );
};

export default Avatar;
