import { useState, useEffect, useRef } from "react";

export function useThrottle<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    const handler = setTimeout(
      () => {
        if (Date.now() - lastExecuted.current >= delay) {
          setThrottledValue(value);
          lastExecuted.current = Date.now();
        }
      },
      delay - (Date.now() - lastExecuted.current),
    );

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return throttledValue;
}
