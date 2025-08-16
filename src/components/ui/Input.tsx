import React, { forwardRef } from "react";
import { LucideIcon } from "lucide-react";

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  className?: string;
  [key: string]: any;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      placeholder,
      type = "text",
      value,
      onChange,
      onFocus,
      onBlur,
      error,
      disabled = false,
      required = false,
      icon: Icon,
      iconPosition = "left",
      className = "",
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      "w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const stateClasses = error
      ? "border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50"
      : "border-gray-200 focus:border-primary-500 focus:ring-primary-500 bg-white/80 backdrop-blur-sm hover:bg-white focus:bg-white";

    const iconClasses = Icon
      ? iconPosition === "left"
        ? "pl-12"
        : "pr-12"
      : "";

    const classes = `${baseClasses} ${stateClasses} ${iconClasses} ${className}`;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {Icon && iconPosition === "left" && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Icon className="w-5 h-5" />
            </div>
          )}

          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            disabled={disabled}
            required={required}
            className={classes}
            {...props}
          />

          {Icon && iconPosition === "right" && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Icon className="w-5 h-5" />
            </div>
          )}
        </div>

        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
