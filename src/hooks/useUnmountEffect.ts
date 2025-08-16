import { useEffect } from "react";

export function useUnmountEffect(effect: () => void) {
  useEffect(() => {
    return effect;
  }, [effect]);
}
