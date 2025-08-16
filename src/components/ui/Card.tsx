import React from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "outlined" | "glass";
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = "default",
  hover = false,
  className = "",
  onClick,
}) => {
  const baseClasses = "rounded-2xl transition-all duration-300";

  const variantClasses = {
    default: "bg-white border border-gray-100 shadow-soft",
    elevated: "bg-white shadow-lg border-0",
    outlined: "bg-white border-2 border-gray-200 shadow-none",
    glass: "bg-white/80 backdrop-blur-md border border-white/20 shadow-soft",
  };

  const hoverClasses = hover
    ? "hover:shadow-xl hover:-translate-y-1 cursor-pointer"
    : "";
  const clickableClasses = onClick ? "cursor-pointer" : "";

  const classes = `${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${clickableClasses} ${className}`;

  if (onClick) {
    return (
      <motion.div
        className={classes}
        onClick={onClick}
        whileHover={hover ? { y: -4 } : {}}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={classes}>{children}</div>;
};

export default Card;
