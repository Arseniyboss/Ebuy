import {
  ProductContainer,
  ProductLink,
  ProductFooter,
  ProductImage,
  ProductName,
  ProductRating,
  ProductPrice,
} from "./Styles";
import { useDiscountContext } from "../../contexts/DiscountContext";
import Rating from "../rating/Rating";
import { useState } from "react";

const Product = ({
  _id,
  image,
  name,
  numReviews,
  rating,
  price,
  discountPrice,
}) => {
  const { expired } = useDiscountContext();
  const [imageLoading, setImageLoading] = useState(true);
  return (
    <ProductContainer>
      <ProductLink to={`/product/${_id}`}>
        <ProductImage
          src={image}
          alt={name}
          onLoad={() => setImageLoading(false)}
        />
      </ProductLink>
      {!imageLoading && (
        <ProductFooter>
          <ProductLink to={`/product/${_id}`}>
            <ProductName>{name}</ProductName>
          </ProductLink>
          <ProductRating>
            <Rating
              value={rating}
              text={`${numReviews} ${numReviews === 1 ? "review" : "reviews"}`}
            />
          </ProductRating>
          {!expired ? (
            <>
              <ProductPrice discount>${price}</ProductPrice>
              <ProductPrice>${discountPrice}</ProductPrice>
            </>
          ) : (
            <ProductPrice>${price}</ProductPrice>
          )}
        </ProductFooter>
      )}
    </ProductContainer>
  );
};

export default Product;
