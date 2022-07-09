import { useEffect, useRef } from "react";

export const useUpdateEffect = (callback, dependencies) => {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      callback();
    } else {
      mounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};
