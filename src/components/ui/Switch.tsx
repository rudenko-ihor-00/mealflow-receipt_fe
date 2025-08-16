import React from "react";
import { motion } from "framer-motion";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning" | "error";
  label?: string;
  className?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  size = "md",
  variant = "default",
  label,
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-8 h-4",
    md: "w-12 h-6",
    lg: "w-16 h-8",
  };

  const thumbSizeClasses = {
    sm: "w-3 h-3",
    md: "w-5 h-5",
    lg: "w-7 h-7",
  };

  const labelSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const variantClasses = {
    default: checked ? "bg-primary-500" : "bg-gray-300",
    success: checked ? "bg-green-500" : "bg-gray-300",
    warning: checked ? "bg-yellow-500" : "bg-gray-300",
    error: checked ? "bg-red-500" : "bg-gray-300",
  };

  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <label
      className={`inline-flex items-center cursor-pointer ${disabled ? "cursor-not-allowed opacity-50" : ""} ${className}`}
    >
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleToggle}
          disabled={disabled}
          className="sr-only"
        />

        <motion.div
          className={`
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            rounded-full transition-colors duration-200 cursor-pointer
            ${disabled ? "cursor-not-allowed" : ""}
          `}
          onClick={handleToggle}
        >
          <motion.div
            className={`
              ${thumbSizeClasses[size]}
              bg-white rounded-full shadow-md
            `}
            animate={{
              x: checked ? (size === "sm" ? 16 : size === "md" ? 24 : 32) : 0,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </motion.div>
      </div>

      {label && (
        <span
          className={`ml-3 font-medium text-gray-700 ${labelSizeClasses[size]}`}
        >
          {label}
        </span>
      )}
    </label>
  );
};

export default Switch;
