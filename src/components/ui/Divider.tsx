import React from "react";

interface DividerProps {
  orientation?: "horizontal" | "vertical";
  variant?: "solid" | "dashed" | "dotted";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Divider: React.FC<DividerProps> = ({
  orientation = "horizontal",
  variant = "solid",
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: orientation === "horizontal" ? "h-px" : "w-px",
    md: orientation === "horizontal" ? "h-0.5" : "w-0.5",
    lg: orientation === "horizontal" ? "h-1" : "w-1",
  };

  const variantClasses = {
    solid: "bg-gray-200",
    dashed:
      "bg-gradient-to-r from-gray-200 via-gray-200 to-gray-200 bg-[length:8px_100%] bg-repeat-x",
    dotted:
      "bg-gradient-to-r from-gray-200 via-gray-200 to-gray-200 bg-[length:4px_100%] bg-repeat-x",
  };

  const orientationClasses = {
    horizontal: "w-full",
    vertical: "h-full",
  };

  const classes = `${sizeClasses[size]} ${variantClasses[variant]} ${orientationClasses[orientation]} ${className}`;

  return <div className={classes} />;
};

export default Divider;
