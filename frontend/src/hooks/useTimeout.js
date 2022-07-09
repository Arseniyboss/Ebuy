import { useEffect } from "react";

export const useTimeout = (callback, delay, dependencies = []) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      callback();
    }, delay);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};
