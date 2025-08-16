import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  disabled = false,
  loading = false,
  className = "",
  onClick,
  type = "button",
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-500 hover:shadow-lg hover:-translate-y-0.5",
    secondary:
      "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 focus:ring-accent-500 hover:shadow-soft hover:-translate-y-0.5",
    ghost:
      "text-gray-600 hover:text-primary-600 hover:bg-gray-100 focus:ring-primary-500",
    outline:
      "border-2 border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white focus:ring-primary-500",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-xl",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-2xl",
  };

  const iconSizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const IconComponent = Icon && (
    <Icon
      className={`${iconSizeClasses[size]} ${iconPosition === "left" ? "mr-2" : "ml-2"}`}
    />
  );

  const LoadingSpinner = (
    <motion.div
      className={`${iconSizeClasses[size]} border-2 border-current border-t-transparent rounded-full`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );

  const content = (
    <>
      {loading ? (
        <>
          {LoadingSpinner}
          <span className="ml-2">Завантаження...</span>
        </>
      ) : (
        <>
          {iconPosition === "left" && IconComponent}
          {children}
          {iconPosition === "right" && IconComponent}
        </>
      )}
    </>
  );

  if (type === "submit") {
    return (
      <button type="submit" disabled={disabled || loading} className={classes}>
        {content}
      </button>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={classes}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
    >
      {content}
    </motion.button>
  );
};

export default Button;
