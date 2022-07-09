import { useDiscountContext } from "../../contexts/DiscountContext";
import { DiscountHeading, DiscountItems, DiscountItem } from "./Styles";

const Discount = () => {
  const { days, hours, minutes, seconds } = useDiscountContext();
  return (
    <>
      <DiscountHeading as="h2">
        Massive discount on all products! Don't miss it!
      </DiscountHeading>
      <DiscountItems>
        <DiscountItem>
          {days} {days === "01" ? "day" : "days"}
        </DiscountItem>
        <DiscountItem>
          {hours} {hours === "01" ? "hour" : "hours"}
        </DiscountItem>
        <DiscountItem>
          {minutes} {minutes === "01" ? "minute" : "minutes"}
        </DiscountItem>
        <DiscountItem>
          {seconds} {seconds === "01" ? "second" : "seconds"}
        </DiscountItem>
      </DiscountItems>
    </>
  );
};

export default Discount;
