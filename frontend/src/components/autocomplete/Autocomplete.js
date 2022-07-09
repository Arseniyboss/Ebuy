import { useState } from "react";
import { useInterval } from "../../hooks/useInterval";
import { AutocompleteContainer } from "./Styles";

const Autocomplete = () => {
  const [placeholder, setPlaceholder] = useState("");
  const [count, setCount] = useState(0);

  const text = "Welcome to Ebuy!";
  const delay = 150;

  useInterval(
    () => {
      setPlaceholder(text.substring(0, count));
      if (placeholder === text) {
        setPlaceholder("");
      }
    },
    delay,
    [count, placeholder]
  );

  useInterval(
    () => {
      setCount((count) => count + 1);
      if (count === text.length) {
        setCount(0);
      }
    },
    delay,
    [count]
  );

  return <AutocompleteContainer>{placeholder}</AutocompleteContainer>;
};

export default Autocomplete;
