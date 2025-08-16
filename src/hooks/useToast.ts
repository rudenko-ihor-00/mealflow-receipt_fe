import { useState, useCallback } from "react";
import { ToastData } from "../components/ui/ToastContainer";

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((toast: Omit<ToastData, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastData = { ...toast, id };

    setToasts((prev) => [...prev, newToast]);

    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback(
    (title: string, message?: string, options?: Partial<ToastData>) => {
      return addToast({ type: "success", title, message, ...options });
    },
    [addToast],
  );

  const error = useCallback(
    (title: string, message?: string, options?: Partial<ToastData>) => {
      return addToast({ type: "error", title, message, ...options });
    },
    [addToast],
  );

  const warning = useCallback(
    (title: string, message?: string, options?: Partial<ToastData>) => {
      return addToast({ type: "warning", title, message, ...options });
    },
    [addToast],
  );

  const info = useCallback(
    (title: string, message?: string, options?: Partial<ToastData>) => {
      return addToast({ type: "info", title, message, ...options });
    },
    [addToast],
  );

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
    clearAll,
  };
};
