import { RatingComponent, RatingStar, Review } from "./Styles";
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti";

const Rating = ({ value, text }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const halfStar = index + 0.5;
    return (
      <RatingStar key={index}>
        {value >= index + 1 ? (
          <TiStarFullOutline />
        ) : value >= halfStar ? (
          <TiStarHalfOutline />
        ) : (
          <TiStarOutline />
        )}
      </RatingStar>
    );
  });
  return (
    <RatingComponent>
      {stars}
      {text && <Review>{text}</Review>}
    </RatingComponent>
  );
};

export default Rating;
