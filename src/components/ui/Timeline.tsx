import React from "react";
import { motion } from "framer-motion";

interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date?: string;
  icon?: React.ComponentType<{ className?: string }>;
  status?: "completed" | "current" | "upcoming";
  variant?: "default" | "success" | "warning" | "error";
}

interface TimelineProps {
  items: TimelineItem[];
  variant?: "default" | "vertical" | "horizontal";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Timeline: React.FC<TimelineProps> = ({
  items,
  variant = "default",
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const iconSizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const statusConfig = {
    completed: {
      iconColor: "text-green-500",
      bgColor: "bg-green-100",
      borderColor: "border-green-200",
      lineColor: "bg-green-500",
    },
    current: {
      iconColor: "text-primary-500",
      bgColor: "bg-primary-100",
      borderColor: "border-primary-200",
      lineColor: "bg-primary-500",
    },
    upcoming: {
      iconColor: "text-gray-400",
      bgColor: "bg-gray-100",
      borderColor: "border-gray-200",
      lineColor: "bg-gray-300",
    },
  };

  const renderVerticalTimeline = () => (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2" />

      {items.map((item, index) => {
        const config = statusConfig[item.status || "upcoming"];
        const Icon = item.icon;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative flex items-start mb-8 last:mb-0"
          >
            {/* Icon */}
            <div
              className={`relative z-10 flex-shrink-0 ${iconSizeClasses[size]} ${config.bgColor} ${config.borderColor} border-2 rounded-full flex items-center justify-center`}
            >
              {Icon ? (
                <Icon
                  className={`${iconSizeClasses[size]} ${config.iconColor}`}
                />
              ) : (
                <div className={`w-2 h-2 ${config.lineColor} rounded-full`} />
              )}
            </div>

            {/* Content */}
            <div className="ml-6 flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3
                  className={`font-semibold text-gray-900 ${sizeClasses[size]}`}
                >
                  {item.title}
                </h3>
                {item.date && (
                  <span className={`text-gray-500 ${sizeClasses[size]}`}>
                    {item.date}
                  </span>
                )}
              </div>
              {item.description && (
                <p className={`text-gray-600 ${sizeClasses[size]}`}>
                  {item.description}
                </p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  const renderHorizontalTimeline = () => (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200" />

      <div className="flex justify-between">
        {items.map((item, index) => {
          const config = statusConfig[item.status || "upcoming"];
          const Icon = item.icon;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div
                className={`relative z-10 ${iconSizeClasses[size]} ${config.bgColor} ${config.borderColor} border-2 rounded-full flex items-center justify-center mb-4`}
              >
                {Icon ? (
                  <Icon
                    className={`${iconSizeClasses[size]} ${config.iconColor}`}
                  />
                ) : (
                  <div className={`w-2 h-2 ${config.lineColor} rounded-full`} />
                )}
              </div>

              {/* Content */}
              <div className="max-w-32">
                <h3
                  className={`font-semibold text-gray-900 ${sizeClasses[size]} mb-1`}
                >
                  {item.title}
                </h3>
                {item.description && (
                  <p
                    className={`text-gray-600 ${sizeClasses[size]} text-xs line-clamp-2`}
                  >
                    {item.description}
                  </p>
                )}
                {item.date && (
                  <span
                    className={`text-gray-500 ${sizeClasses[size]} text-xs block mt-1`}
                  >
                    {item.date}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  if (variant === "horizontal") {
    return (
      <div className={`w-full ${className}`}>{renderHorizontalTimeline()}</div>
    );
  }

  return (
    <div className={`w-full ${className}`}>{renderVerticalTimeline()}</div>
  );
};

export default Timeline;
