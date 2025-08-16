import { useEffect } from "react";

export function useMountEffect(effect: React.EffectCallback) {
  useEffect(effect, []);
}
