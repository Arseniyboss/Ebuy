import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  CartItemContainer,
  ProductImage,
  ProductName,
  CalculatedPrice,
} from "../screens/product/summary/Styles";
import { useDiscountContext } from "../contexts/DiscountContext";
import { formatPrice } from "../helpers/formatPrice";

const OrderItem = ({
  product,
  image,
  name,
  quantity,
  discountPrice,
  price,
  isPlacedOrder,
  underline,
}) => {
  const { expired } = useDiscountContext();
  const { order } = useSelector((state) => state.order.orderDetails);
  return (
    <CartItemContainer underline={underline}>
      <Link to={`/product/${product}`}>
        <ProductImage src={image} alt={name} />
      </Link>
      <ProductName to={`/product/${product}`}>{name}</ProductName>
      {isPlacedOrder ? (
        order.itemsPrice <
        order.orderItems.reduce((acc, item) => acc + item.price, 0) ? (
          <CalculatedPrice>
            {quantity} x ${discountPrice} = $
            {formatPrice(quantity * discountPrice)}
          </CalculatedPrice>
        ) : (
          <CalculatedPrice>
            {quantity} x ${price} = ${formatPrice(quantity * price)}
          </CalculatedPrice>
        )
      ) : !expired ? (
        <CalculatedPrice>
          {quantity} x ${discountPrice} = $
          {formatPrice(quantity * discountPrice)}
        </CalculatedPrice>
      ) : (
        <CalculatedPrice>
          {quantity} x ${price} = ${formatPrice(quantity * price)}
        </CalculatedPrice>
      )}
    </CartItemContainer>
  );
};

export default OrderItem;
