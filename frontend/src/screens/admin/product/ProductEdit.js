import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "../../../hooks/useForm";
import {
  FormContainer,
  Form,
  FormHeading,
  FormGroup,
  FormInput,
  TextArea,
  FormFileLabel,
  FormFileInput,
  FormFileText,
  FormButton,
  ErrorMessage,
} from "../../../styles/Form";
import Message from "../../../components/message/Message";
import Meta from "../../../components/Meta";
import Loader from "../../../components/loader/Loader";
import { listProductDetails } from "../../../actions/product/details";
import { updateProduct } from "../../../actions/product/update";
import { PRODUCT_UPDATE_RESET } from "../../../constants/product/update";
import { PRODUCT_DETAILS_RESET } from "../../../constants/product/details";
import {
  PRICE_INVALID,
  DISCOUNT_PRICE_INVALID,
  COUNT_IN_STOCK_INVALID,
} from "../../../constants/validation/errors";

const ProductEdit = ({ history }) => {
  const [disabled, setDisabled] = useState(false);

  const initialState = {
    name: "",
    price: 99.99,
    discountPrice: 49.99,
    description: "",
    image: "",
    brand: "",
    category: "",
    countInStock: 1,
  };

  const validationSchema = {
    price: {
      pattern: {
        value: (price) => price > 0,
        message: PRICE_INVALID,
      },
    },
    discountPrice: {
      pattern: {
        value: (discountPrice) => discountPrice > 0,
        message: DISCOUNT_PRICE_INVALID,
      },
    },
    countInStock: {
      pattern: {
        value: (countInStock) => countInStock > 0,
        message: COUNT_IN_STOCK_INVALID,
      },
    },
  };

  const submitForm = () => {
    dispatch(
      updateProduct({
        _id: productId,
        name: values.name,
        price: values.price,
        discountPrice: values.discountPrice,
        description: values.description,
        image: values.image,
        brand: values.brand,
        category: values.category,
        countInStock: values.countInStock,
        isPublished: true,
      })
    );
    setDisabled(true);
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

  const { id: productId } = useParams();

  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const {
    loading: loadingDetails,
    error: errorDetails,
    product,
  } = useSelector((state) => state.product.productDetails);

  const { error, success } = useSelector(
    (state) => state.product.productUpdate
  );

  useEffect(() => {
    if (errorDetails) return;
    if (!product.name) {
      dispatch(listProductDetails(productId));
      return;
    }
    if (success) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch({ type: PRODUCT_DETAILS_RESET });
      history.push("/admin/productlist");
      return;
    }
    setValues({
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice,
      description: product.description,
      image: product.image,
      brand: product.brand,
      category: product.category,
      countInStock: product.countInStock,
    });
  }, [errorDetails, success, product, productId, history, dispatch, setValues]);

  useEffect(() => {
    return () => {
      dispatch({ type: PRODUCT_DETAILS_RESET });
    };
  }, [dispatch]);

  const handleUploadFile = async (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      setUploading(true);

      try {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const { data } = await axios.post("/api/upload", formData, config);

        setValues({ ...values, image: data });
        setUploading(false);
      } catch (error) {
        console.log(error);
        setUploading(false);
      }
    }
  };

  return (
    <>
      <Meta title="Product Edit" />
      {errorDetails ? (
        <Message variant="error">{errorDetails}</Message>
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <FormContainer>
          {loadingDetails ? (
            <Loader variant="rainbow" />
          ) : (
            <Form onSubmit={handleSubmit}>
              <FormHeading>Edit Product</FormHeading>
              <FormGroup>
                <label htmlFor="name">Name</label>
                <FormInput
                  type="text"
                  name="name"
                  id="name"
                  value={values.name || initialState.name}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="price">Price</label>
                <FormInput
                  type="number"
                  name="price"
                  id="price"
                  value={values.price || ""}
                  onChange={handleChange}
                  required
                />
                {errors.price && <ErrorMessage>{errors.price}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <label htmlFor="discountPrice">Discount Price</label>
                <FormInput
                  type="number"
                  name="discountPrice"
                  id="discountPrice"
                  value={values.discountPrice || ""}
                  onChange={handleChange}
                  required
                />
                {errors.discountPrice && (
                  <ErrorMessage>{errors.discountPrice}</ErrorMessage>
                )}
              </FormGroup>
              <FormGroup>
                <label htmlFor="description">Description</label>
                <TextArea
                  name="description"
                  id="description"
                  as="textarea"
                  rows={5}
                  value={values.description || initialState.description}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  required
                ></TextArea>
              </FormGroup>
              <FormGroup>
                <label htmlFor="image">Image</label>
                <FormInput
                  type="text"
                  name="image"
                  id="image"
                  value={values.image || initialState.image}
                  onChange={handleChange}
                  required
                />
                <FormFileLabel>
                  <FormFileInput type="file" onChange={handleUploadFile} />
                  <FormFileText>Choose File</FormFileText>
                </FormFileLabel>
                {uploading && <Loader variant="stripe" />}
              </FormGroup>
              <FormGroup>
                <label htmlFor="brand">Brand</label>
                <FormInput
                  type="text"
                  name="brand"
                  id="brand"
                  value={values.brand || initialState.brand}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="countInStock">Count In Stock</label>
                <FormInput
                  type="number"
                  name="countInStock"
                  id="countInStock"
                  value={values.countInStock || ""}
                  onChange={handleChange}
                  required
                />
                {errors.countInStock && (
                  <ErrorMessage>{errors.countInStock}</ErrorMessage>
                )}
              </FormGroup>
              <FormGroup>
                <label htmlFor="category">Category</label>
                <FormInput
                  type="text"
                  name="category"
                  id="category"
                  value={values.category || initialState.category}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormButton disabled={disabled}>Update</FormButton>
            </Form>
          )}
        </FormContainer>
      )}
    </>
  );
};

export default ProductEdit;
