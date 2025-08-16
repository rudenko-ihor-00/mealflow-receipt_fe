import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  variant?: "default" | "bordered" | "separated";
  size?: "sm" | "md" | "lg";
  allowMultiple?: boolean;
  className?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  variant = "default",
  size = "md",
  allowMultiple = false,
  className = "",
}) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const sizeClasses = {
    sm: "p-3 text-sm",
    md: "p-4 text-base",
    lg: "p-6 text-lg",
  };

  const variantClasses = {
    default: "border border-gray-200 rounded-2xl mb-3",
    bordered:
      "border-l-4 border-l-primary-500 border border-gray-200 rounded-r-2xl mb-3",
    separated: "border-b border-gray-200 pb-4 mb-4",
  };

  const toggleItem = (itemId: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(itemId)
          ? prev.filter((id) => id !== itemId)
          : [...prev, itemId],
      );
    } else {
      setOpenItems((prev) => (prev.includes(itemId) ? [] : [itemId]));
    }
  };

  const isItemOpen = (itemId: string) => openItems.includes(itemId);

  return (
    <div className={className}>
      {items.map((item) => {
        const isOpen = isItemOpen(item.id);
        const isDisabled = item.disabled;

        return (
          <div
            key={item.id}
            className={`${variantClasses[variant]} ${isOpen ? "shadow-soft" : ""}`}
          >
            <button
              onClick={() => !isDisabled && toggleItem(item.id)}
              disabled={isDisabled}
              className={`
                w-full flex items-center justify-between ${sizeClasses[size]}
                font-medium text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                ${isOpen ? "text-primary-600" : "text-gray-700 hover:text-primary-600"}
                ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              <span>{item.title}</span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className={`${sizeClasses[size]} pt-0 text-gray-600`}>
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
