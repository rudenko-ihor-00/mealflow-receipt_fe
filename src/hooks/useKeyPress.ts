import { useState, useEffect } from "react";

interface UseKeyPressOptions {
  targetKey?: string;
  targetKeys?: string[];
  modifierKey?: "ctrl" | "alt" | "shift" | "meta";
  preventDefault?: boolean;
}

export function useKeyPress(options: UseKeyPressOptions = {}) {
  const [isPressed, setIsPressed] = useState(false);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  const {
    targetKey,
    targetKeys,
    modifierKey,
    preventDefault = false,
  } = options;

  useEffect(() => {
    function downHandler({
      key,
      ctrlKey,
      altKey,
      shiftKey,
      metaKey,
    }: KeyboardEvent) {
      if (preventDefault) {
        event?.preventDefault();
      }

      const modifiers = {
        ctrl: ctrlKey,
        alt: altKey,
        shift: shiftKey,
        meta: metaKey,
      };

      // Check if modifier key is pressed
      if (modifierKey && !modifiers[modifierKey]) {
        return;
      }

      // Update pressed keys
      setPressedKeys((prev) => {
        const newSet = new Set(prev);
        newSet.add(key);
        return newSet;
      });

      // Check if target key is pressed
      if (targetKey && key === targetKey) {
        setIsPressed(true);
      }

      // Check if any target keys are pressed
      if (targetKeys && targetKeys.includes(key)) {
        setIsPressed(true);
      }
    }

    const upHandler = ({ key }: KeyboardEvent) => {
      setPressedKeys((prev) => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });

      if (targetKey && key === targetKey) {
        setIsPressed(false);
      }

      if (targetKeys && targetKeys.includes(key)) {
        setIsPressed(false);
      }
    };

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [targetKey, targetKeys, modifierKey, preventDefault]);

  // Check if all target keys are pressed
  const areAllKeysPressed = (keys: string[]) => {
    return keys.every((key) => pressedKeys.has(key));
  };

  return {
    isPressed,
    pressedKeys: Array.from(pressedKeys),
    areAllKeysPressed,
  };
}

// Convenience hooks for common key combinations
export const useEnterKey = () => useKeyPress({ targetKey: "Enter" });
export const useEscapeKey = () => useKeyPress({ targetKey: "Escape" });
export const useSpaceKey = () => useKeyPress({ targetKey: " " });
export const useArrowKeys = () =>
  useKeyPress({
    targetKeys: ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"],
  });
export const useCtrlKey = () => useKeyPress({ modifierKey: "ctrl" });
export const useAltKey = () => useKeyPress({ modifierKey: "alt" });
export const useShiftKey = () => useKeyPress({ modifierKey: "shift" });
export const useMetaKey = () => useKeyPress({ modifierKey: "meta" });
