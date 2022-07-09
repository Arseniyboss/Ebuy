import { useState } from "react";
import { useUpdateEffect } from "./useUpdateEffect";
import { useTimeout } from "./useTimeout";

export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isDebouncing, setIsDebouncing] = useState(false);

  useUpdateEffect(() => {
    setIsDebouncing(true);
  }, [value]);

  useTimeout(
    () => {
      setDebouncedValue(value);
      setIsDebouncing(false);
    },
    delay,
    [value]
  );

  return [debouncedValue, isDebouncing];
};
