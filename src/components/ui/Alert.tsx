import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, Info, X, XCircle } from "lucide-react";

interface AlertProps {
  type?: "success" | "error" | "warning" | "info";
  title?: string;
  message: string;
  closable?: boolean;
  onClose?: () => void;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  type = "info",
  title,
  message,
  closable = false,
  onClose,
  className = "",
}) => {
  const typeConfig = {
    success: {
      icon: CheckCircle,
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-800",
      iconColor: "text-green-400",
    },
    error: {
      icon: XCircle,
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-800",
      iconColor: "text-red-400",
    },
    warning: {
      icon: AlertCircle,
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-800",
      iconColor: "text-yellow-400",
    },
    info: {
      icon: Info,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-800",
      iconColor: "text-blue-400",
    },
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`${config.bgColor} ${config.borderColor} border rounded-2xl p-4 ${className}`}
    >
      <div className="flex items-start">
        <Icon className={`w-5 h-5 ${config.iconColor} mt-0.5 flex-shrink-0`} />

        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${config.textColor} mb-1`}>
              {title}
            </h3>
          )}
          <p className={`text-sm ${config.textColor}`}>{message}</p>
        </div>

        {closable && onClose && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className={`ml-3 p-1 rounded-lg ${config.textColor} hover:bg-white/50 transition-colors duration-200`}
          >
            <X className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default Alert;
