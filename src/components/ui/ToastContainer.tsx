import React, { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Toast from "./Toast";

export interface ToastData {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
}

interface ToastContainerProps {
  toasts: ToastData[];
  onRemove: (id: string) => void;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onRemove,
  position = "top-right",
}) => {
  const handleRemove = useCallback(
    (id: string) => {
      onRemove(id);
    },
    [onRemove]
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={handleRemove}
            position={toast.position || position}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
