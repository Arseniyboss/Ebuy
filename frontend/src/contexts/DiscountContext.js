import { useContext, createContext } from "react";
import { useCountdown } from "../hooks/useCountdown";

export const DiscountContext = createContext();

const DiscountContextProvider = ({ children }) => {
  const { days, hours, minutes, seconds, expired } = useCountdown(
    "May 12, 2022 18:20:50"
  );

  const value = {
    days,
    hours,
    minutes,
    seconds,
    expired,
  };
  return (
    <DiscountContext.Provider value={value}>
      {children}
    </DiscountContext.Provider>
  );
};

export const useDiscountContext = () => {
  return useContext(DiscountContext);
};

export default DiscountContextProvider;
