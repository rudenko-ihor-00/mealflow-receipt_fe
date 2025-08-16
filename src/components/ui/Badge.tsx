import React from "react";
import { motion } from "framer-motion";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  onClick,
}) => {
  const baseClasses =
    "inline-flex items-center font-medium rounded-xl transition-all duration-200";

  const variantClasses = {
    default: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    primary: "bg-primary-100 text-primary-700 hover:bg-primary-200",
    success: "bg-green-100 text-green-700 hover:bg-green-200",
    warning: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
    danger: "bg-red-100 text-red-700 hover:bg-red-200",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const clickableClasses = onClick ? "cursor-pointer hover:scale-105" : "";

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${clickableClasses} ${className}`;

  if (onClick) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={classes}
      >
        {children}
      </motion.button>
    );
  }

  return <span className={classes}>{children}</span>;
};

export default Badge;
