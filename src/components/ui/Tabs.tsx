import React, { useState } from "react";
import { motion } from "framer-motion";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  variant?: "default" | "pills" | "underline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  variant = "default",
  size = "md",
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  };

  const variantClasses = {
    default: "border-b-2 border-gray-200",
    pills: "space-x-2",
    underline: "border-b border-gray-200",
  };

  const tabClasses = {
    default:
      "border-b-2 border-transparent hover:text-primary-600 hover:border-primary-300",
    pills: "rounded-xl hover:bg-gray-100",
    underline:
      "border-b-2 border-transparent hover:text-primary-600 hover:border-primary-300",
  };

  const activeTabClasses = {
    default: "border-primary-500 text-primary-600",
    pills: "bg-primary-100 text-primary-700",
    underline: "border-primary-500 text-primary-600",
  };

  const currentTab = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className={className}>
      {/* Tab Headers */}
      <div className={`flex ${variantClasses[variant]} mb-6`}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          const isDisabled = tab.disabled;

          return (
            <button
              key={tab.id}
              onClick={() => !isDisabled && setActiveTab(tab.id)}
              disabled={isDisabled}
              className={`
                ${sizeClasses[size]}
                font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                ${isActive ? activeTabClasses[variant] : tabClasses[variant]}
                ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                ${variant === "pills" ? "rounded-xl" : ""}
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="min-h-[200px]"
      >
        {currentTab?.content}
      </motion.div>
    </div>
  );
};

export default Tabs;
