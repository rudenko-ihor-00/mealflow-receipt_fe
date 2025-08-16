import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: "chevron" | "slash" | "arrow";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = "chevron",
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const separatorClasses = {
    chevron: "text-gray-400",
    slash: "text-gray-400",
    arrow: "text-gray-400",
  };

  const renderSeparator = () => {
    switch (separator) {
      case "chevron":
        return <ChevronRight className="w-4 h-4" />;
      case "slash":
        return <span>/</span>;
      case "arrow":
        return <span>→</span>;
      default:
        return <ChevronRight className="w-4 h-4" />;
    }
  };

  const renderItem = (item: BreadcrumbItem, index: number, isLast: boolean) => {
    const Icon = item.icon;

    if (isLast) {
      return (
        <span className={`font-medium text-gray-900 ${sizeClasses[size]}`}>
          {Icon && <Icon className="w-4 h-4 inline mr-2" />}
          {item.label}
        </span>
      );
    }

    if (item.href) {
      return (
        <motion.a
          href={item.href}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`text-gray-600 hover:text-primary-600 transition-colors duration-200 ${sizeClasses[size]}`}
        >
          {Icon && <Icon className="w-4 h-4 inline mr-2" />}
          {item.label}
        </motion.a>
      );
    }

    return (
      <span className={`text-gray-500 ${sizeClasses[size]}`}>
        {Icon && <Icon className="w-4 h-4 inline mr-2" />}
        {item.label}
      </span>
    );
  };

  return (
    <nav
      className={`flex items-center space-x-2 ${className}`}
      aria-label="Breadcrumb"
    >
      {/* Home Icon */}
      <motion.a
        href="/"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`text-gray-600 hover:text-primary-600 transition-colors duration-200 ${sizeClasses[size]}`}
      >
        <Home className="w-4 h-4" />
      </motion.a>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span className={separatorClasses[separator]}>
            {renderSeparator()}
          </span>
          {renderItem(item, index, index === items.length - 1)}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
