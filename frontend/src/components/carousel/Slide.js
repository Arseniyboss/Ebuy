import { Link } from "react-router-dom";
import { SlideContainer, Image } from "./Styles";
import { useDiscountContext } from "../../contexts/DiscountContext";

const Slide = ({
  products,
  index,
  productIndex,
  name,
  discountPrice,
  price,
  _id,
  image,
  setPause,
}) => {
  const { expired } = useDiscountContext();

  let position = "nextSlide";

  if (productIndex === index) {
    position = "activeSlide";
  }

  if (
    productIndex === index - 1 ||
    (index === 0 && productIndex === products.length - 1)
  ) {
    position = "lastSlide";
  }

  return (
    <SlideContainer className={position}>
      {!expired ? (
        <h4>
          {name} (${discountPrice})
        </h4>
      ) : (
        <h4>
          {name} (${price})
        </h4>
      )}
      <Link to={`/product/${_id}`}>
        <Image
          src={image}
          alt={name}
          onMouseEnter={() => setPause(true)}
          onMouseLeave={() => setPause(false)}
        />
      </Link>
    </SlideContainer>
  );
};

export default Slide;
