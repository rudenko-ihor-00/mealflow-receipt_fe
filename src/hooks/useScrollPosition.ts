import { useState, useEffect } from "react";

interface ScrollPosition {
  x: number;
  y: number;
}

export function useScrollPosition(): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: typeof window !== "undefined" ? window.pageXOffset : 0,
    y: typeof window !== "undefined" ? window.pageYOffset : 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    function handleScroll() {
      setScrollPosition({
        x: window.pageXOffset,
        y: window.pageYOffset,
      });
    }

    // Add event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Call handler right away so state gets updated with initial scroll position
    handleScroll();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty array ensures that effect is only run on mount

  return scrollPosition;
}
