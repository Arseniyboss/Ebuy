import { useState, useEffect } from "react";

// Removes flickers when navigating between cart, shipping, payment, place order screens, between user profile and user edit screen and between home screen and product list screen

export const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};
