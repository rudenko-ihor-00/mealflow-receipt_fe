import React, { forwardRef } from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  [key: string]: any;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      checked = false,
      onChange,
      disabled = false,
      required = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.checked);
      }
    };

    return (
      <label
        className={`inline-flex items-center cursor-pointer ${disabled ? "cursor-not-allowed opacity-50" : ""} ${className}`}
      >
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            className="sr-only"
            {...props}
          />

          <motion.div
            className={`w-5 h-5 border-2 rounded-lg flex items-center justify-center transition-colors duration-200 ${
              checked
                ? "bg-primary-500 border-primary-500"
                : "bg-white border-gray-300 hover:border-primary-400"
            }`}
            whileHover={!disabled ? { scale: 1.05 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
          >
            {checked && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Check className="w-3 h-3 text-white" />
              </motion.div>
            )}
          </motion.div>
        </div>

        {label && (
          <span className="ml-3 text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
