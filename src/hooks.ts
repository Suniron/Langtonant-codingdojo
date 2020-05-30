import { useEffect } from "react";

export const useInterval = (callback: () => any, ms: number) => {
  useEffect(() => {
    const timer = setInterval(callback, ms);
    // Cleaning:
    return () => {
      clearInterval(timer);
    };
  }, [callback, ms]);
};
