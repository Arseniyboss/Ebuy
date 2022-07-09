import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTimeout } from "../../hooks/useTimeout";
import { useInterval } from "../../hooks/useInterval";
import {
  SliderContainer,
  Slider,
  IndicatorContainer,
  Indicator,
  LeftArrow,
  RightArrow,
} from "./Styles";
import CarouselSkeleton from "../../skeletons/carousel/CarouselSkeleton";
import Message from "../message/Message";
import Slide from "./Slide";
import { listTopProducts } from "../../actions/product/topProducts";
import { FiChevronRight } from "react-icons/fi";
import { PRODUCT_TOP_RATED_RESET } from "../../constants/product/topRated";

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const [pause, setPause] = useState(false);
  const [active, setActive] = useState(true);

  const dispatch = useDispatch();

  const { loading, error, products } = useSelector(
    (state) => state.product.productTopRated
  );

  useEffect(() => {
    dispatch(listTopProducts());
    return () => {
      dispatch({ type: PRODUCT_TOP_RATED_RESET });
    };
  }, [dispatch]);

  useEffect(() => {
    const lastIndex = products.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, products]);

  useInterval(
    () => {
      if (!pause) {
        setIndex((prevIndex) => prevIndex + 1);
        setActive(false);
      }
    },
    3000,
    [pause]
  );

  useTimeout(
    () => {
      if (!active) {
        setActive(true);
        setPause(false);
      }
    },
    600,
    [active]
  );

  const handleClick = () => {
    setActive(false);
    setPause(true);
  };

  const prevButton = () => {
    active && setIndex((prevIndex) => prevIndex - 1);
    handleClick();
  };

  const nextButton = () => {
    active && setIndex((prevIndex) => prevIndex + 1);
    handleClick();
  };

  return loading ? (
    <CarouselSkeleton />
  ) : error ? (
    <Message variant="error">{error}</Message>
  ) : (
    <SliderContainer>
      <Slider>
        {products.map((product, productIndex) => (
          <Slide
            products={products}
            setPause={setPause}
            index={index}
            productIndex={productIndex}
            key={product._id}
            {...product}
          />
        ))}
        <LeftArrow onClick={prevButton} />
        <RightArrow as={FiChevronRight} onClick={nextButton} />
        <IndicatorContainer>
          {products.map((product, productIndex) => (
            <Indicator
              key={product._id}
              onClick={() => {
                setIndex(productIndex);
                handleClick();
              }}
              active={productIndex === index && true}
            />
          ))}
        </IndicatorContainer>
      </Slider>
    </SliderContainer>
  );
};

export default Carousel;
