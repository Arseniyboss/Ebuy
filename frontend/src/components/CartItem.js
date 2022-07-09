import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  CartItemContainer,
  ProductImage,
  ProductName,
  ProductDetails,
  ProductPrice,
  ProductQuantity,
  Trashcan,
} from "../screens/product/summary/Styles";
import { useDiscountContext } from "../contexts/DiscountContext";
import { removeFromCart } from "../actions/cart/remove";
import { updateCartItem } from "../actions/cart/update";

const CartItem = ({
  _id,
  image,
  name,
  discountPrice,
  price,
  quantity,
  countInStock,
  underline,
}) => {
  const [disabled, setDisabled] = useState(false);

  const { expired } = useDiscountContext();

  const dispatch = useDispatch();

  const deleteItem = () => {
    if (disabled) return;
    dispatch(removeFromCart(_id));
    setDisabled(true);
  };

  const handleChange = (e) => {
    if (disabled) return;
    dispatch(
      updateCartItem(_id, {
        _id,
        image,
        name,
        discountPrice,
        price,
        quantity: Number(e.target.value),
        countInStock,
      })
    );
    setDisabled(true);
  };

  return (
    <CartItemContainer underline={underline}>
      <Link to={`/product/${_id}`}>
        <ProductImage src={image} alt={name}></ProductImage>
      </Link>
      <ProductName to={`/product/${_id}`}>{name}</ProductName>
      <ProductDetails>
        {!expired ? (
          <ProductPrice>${discountPrice}</ProductPrice>
        ) : (
          <ProductPrice>${price}</ProductPrice>
        )}
        <ProductQuantity value={quantity} onChange={handleChange}>
          {[...Array(countInStock).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </ProductQuantity>
        <Trashcan onClick={deleteItem} />
      </ProductDetails>
    </CartItemContainer>
  );
};

export default CartItem;
