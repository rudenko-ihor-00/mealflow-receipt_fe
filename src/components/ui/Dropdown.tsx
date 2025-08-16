import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outlined" | "filled";
  searchable?: boolean;
  multiple?: boolean;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Виберіть опцію",
  disabled = false,
  size = "md",
  variant = "default",
  searchable = false,
  multiple = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  };

  const variantClasses = {
    default: "bg-white border border-gray-200 hover:border-primary-300",
    outlined:
      "bg-transparent border-2 border-gray-200 hover:border-primary-500",
    filled: "bg-gray-100 border border-gray-200 hover:bg-gray-50",
  };

  const selectedOption = options.find((option) => option.value === value);
  const filteredOptions = searchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (optionValue: string) => {
    if (!options.find((opt) => opt.value === optionValue)?.disabled) {
      onChange(optionValue);
      setIsOpen(false);
      setSearchQuery("");
    }
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setSearchQuery("");
      }
    }
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        disabled={disabled}
        className={`
          w-full flex items-center justify-between ${sizeClasses[size]}
          ${variantClasses[variant]} rounded-xl transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <span
          className={`${selectedOption ? "text-gray-900" : "text-gray-500"}`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </motion.div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
              {/* Search Input */}
              {searchable && (
                <div className="p-3 border-b border-gray-100">
                  <input
                    type="text"
                    placeholder="Пошук..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  />
                </div>
              )}

              {/* Options List */}
              <div className="max-h-60 overflow-y-auto">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => {
                    const isSelected = option.value === value;
                    const Icon = option.icon;

                    return (
                      <motion.button
                        key={option.value}
                        whileHover={{ backgroundColor: "#f9fafb" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleOptionClick(option.value)}
                        disabled={option.disabled}
                        className={`
                          w-full flex items-center justify-between px-4 py-3 text-left
                          transition-all duration-200 focus:outline-none focus:bg-gray-50
                          ${option.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-gray-50"}
                          ${isSelected ? "bg-primary-50 text-primary-700" : "text-gray-700"}
                        `}
                      >
                        <div className="flex items-center space-x-3">
                          {Icon && <Icon className="w-4 h-4" />}
                          <span className="font-medium">{option.label}</span>
                        </div>
                        {isSelected && (
                          <Check className="w-4 h-4 text-primary-500" />
                        )}
                      </motion.button>
                    );
                  })
                ) : (
                  <div className="px-4 py-6 text-center text-gray-500">
                    Немає результатів
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
