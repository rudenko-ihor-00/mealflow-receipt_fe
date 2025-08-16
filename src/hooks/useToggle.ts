import { useState, useCallback } from "react";

export function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  const setValueDirectly = useCallback((newValue: boolean) => {
    setValue(newValue);
  }, []);

  return {
    value,
    toggle,
    setTrue,
    setFalse,
    setValue: setValueDirectly,
  };
}
