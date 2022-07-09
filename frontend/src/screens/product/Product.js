import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import {
  ProductContainer,
  ReturnButton,
  ProductImage,
  ProductName,
  ProductRating,
  ProductPrice,
  ProductDescription,
  ProductSummary,
  ProductSummaryItem,
  ProductQuantity,
  ProductButton,
  ProductReviewContainer,
  ProductReviewHeading,
} from "./Styles";
import {
  Form,
  FormHeading,
  FormGroup,
  FormSelect,
  TextArea,
  FormButton,
  ErrorMessage,
} from "../../styles/Form";
import Review from "../../components/review/Review";
import Rating from "../../components/rating/Rating";
import Message from "../../components/message/Message";
import Loader from "../../components/loader/Loader";
import Meta from "../../components/Meta";
import { useDiscountContext } from "../../contexts/DiscountContext";
import { listProductDetails } from "../../actions/product/details";
import { createProductReview } from "../../actions/product/createReview";
import { addCartItem } from "../../actions/cart/add";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../constants/product/createReview";
import { PRODUCT_DETAILS_RESET } from "../../constants/product/details";
import { RATING_REQUIRED } from "../../constants/validation/errors";
import { getUserDetails } from "../../actions/user/details";

const Product = ({ history }) => {
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [isReviewed, setIsReviewed] = useState(false);
  const [isAlreadyAdded, setIsAlreadyAdded] = useState(false);

  const initialState = {
    rating: 0,
    comment: "",
  };

  const validationSchema = {
    rating: {
      required: {
        value: true,
        message: RATING_REQUIRED,
      },
    },
  };

  const { id } = useParams();

  const submitForm = () => {
    dispatch(
      createProductReview(id, {
        rating: values.rating,
        comment: values.comment,
      })
    );
    setIsReviewed(true);
    setValues(initialState);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const { values, setValues, errors, handleChange, handleSubmit } = useForm(
    initialState,
    submitForm,
    validationSchema
  );

  const { expired } = useDiscountContext();

  const dispatch = useDispatch();

  const { loading, error, product } = useSelector(
    (state) => state.product.productDetails
  );

  const { userInfo } = useSelector((state) => state.user.userLogin);

  const { user: { cartItems = [] } = {}, loading: loadingDetails } =
    useSelector((state) => state.user.userDetails);

  const { success: successReview, error: errorReview } = useSelector(
    (state) => state.product.productReviewCreate
  );

  useEffect(() => {
    setIsReviewed(false);
    if (successReview) {
      alert("Review Submitted!");
    }
    dispatch(listProductDetails(id));
    return () => {
      dispatch({ type: PRODUCT_DETAILS_RESET });
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    };
  }, [successReview, setValues, dispatch, id]);

  useEffect(() => {
    if (!userInfo) return;
    dispatch(getUserDetails());
  }, [userInfo, dispatch]);

  const itemInTheCart = cartItems.find((item) => item._id === id);

  useEffect(() => {
    if (errorReview) {
      setMessage(errorReview);
      setIsReviewed(false);
    }
  }, [errorReview]);

  useEffect(() => {
    setMessage("");
  }, [errors]);

  const addToCart = () => {
    if (userInfo) {
      dispatch(addCartItem({ ...product, quantity }));
      setIsAlreadyAdded(true);
      history.push("/cart");
    } else {
      history.push("/login");
    }
  };

  return (
    <>
      {loading || (userInfo && loadingDetails) ? (
        <Loader variant="rainbow" />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <ProductContainer>
            <div>
              <div>
                <ReturnButton to="/">Go Back</ReturnButton>
              </div>
              <ProductImage src={product.image} alt={product.name} />
            </div>
            <div>
              <ProductName>{product.name}</ProductName>
              <ProductRating>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} ${
                    product.numReviews === 1 ? "review" : "reviews"
                  }`}
                />
              </ProductRating>
              {!expired ? (
                <ProductPrice>Price: ${product.discountPrice}</ProductPrice>
              ) : (
                <ProductPrice>Price: ${product.price}</ProductPrice>
              )}
              <ProductDescription>
                Description: {product.description}
              </ProductDescription>
            </div>
            <ProductSummary>
              <ProductPrice underline>
                <ProductSummaryItem>
                  <p>Price:</p>
                  {!expired ? (
                    <p>${product.discountPrice}</p>
                  ) : (
                    <p>${product.price}</p>
                  )}
                </ProductSummaryItem>
              </ProductPrice>
              <ProductSummaryItem>
                <p>Status:</p>
                {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
              </ProductSummaryItem>
              {product.countInStock > 0 && (
                <ProductSummaryItem>
                  <p>Quantity:</p>
                  <ProductQuantity
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </ProductQuantity>
                </ProductSummaryItem>
              )}
              <ProductButton
                disabled={
                  product.countInStock === 0 || isAlreadyAdded || itemInTheCart
                }
                onClick={addToCart}
              >
                Add To Cart
              </ProductButton>
            </ProductSummary>
            <ProductReviewContainer>
              <ProductReviewHeading>Reviews</ProductReviewHeading>
              {!product.reviews.length && (
                <Message variant="info">No Reviews</Message>
              )}
              <div>
                {product.reviews.map((review) =>
                  product.reviews.length === 1 ? (
                    <Review key={review._id} {...review} />
                  ) : (
                    <Review key={review._id} {...review} underline />
                  )
                )}
                {message && <Message variant="error">{message}</Message>}
                <div>
                  {userInfo ? (
                    <Form onSubmit={handleSubmit}>
                      <FormHeading>Write a review</FormHeading>
                      <FormGroup>
                        <label>Rating</label>
                        <div>
                          <FormSelect
                            as="select"
                            name="rating"
                            value={values.rating}
                            onChange={handleChange}
                          >
                            <option value="">Select</option>
                            <option value="1">1 - Terrible</option>
                            <option value="2">2 - Bad</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </FormSelect>
                        </div>
                        {errors.rating ? (
                          <ErrorMessage>{errors.rating}</ErrorMessage>
                        ) : null}
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="comment">Comment</label>
                        <TextArea
                          name="comment"
                          id="comment"
                          as="textarea"
                          rows={5}
                          value={values.comment}
                          onChange={handleChange}
                          onKeyDown={handleKeyDown}
                        />
                      </FormGroup>
                      <FormButton disabled={isReviewed}>Submit</FormButton>
                    </Form>
                  ) : (
                    <Message variant="info">
                      Please sign in to write a review
                    </Message>
                  )}
                </div>
              </div>
            </ProductReviewContainer>
          </ProductContainer>
        </>
      )}
    </>
  );
};

export default Product;
