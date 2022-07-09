import Rating from "../rating/Rating";
import { shortenText } from "../../helpers/shortenText";
import { ProductReviewContainer, ProductReviewComment } from "./Styles";

const Review = ({ name, rating, createdAt, comment, underline }) => {
  return (
    <ProductReviewContainer underline={underline}>
      <strong>{name}</strong>
      <Rating value={rating} />
      <p>{shortenText(createdAt.replaceAll("-", "."))}</p>
      {comment && <ProductReviewComment>{comment}</ProductReviewComment>}
    </ProductReviewContainer>
  );
};

export default Review;
