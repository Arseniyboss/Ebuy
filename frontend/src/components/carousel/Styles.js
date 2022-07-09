import styled from "styled-components";
import { FiChevronLeft } from "react-icons/fi";
import { BaseSliderContainer } from "../../GlobalStyle";

export const SliderContainer = styled(BaseSliderContainer)`
  background: #373940;
  color: #fff;
`;

export const Slider = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 80vw;
  max-width: 1050px;
  height: 300px;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

export const SlideContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all 0.5s linear;
  opacity: 0;

  &.nextSlide {
    transform: translateX(100%);
  }

  &.activeSlide {
    opacity: 1;
    transform: translateX(0);
  }

  &.lastSlide {
    transform: translateX(-100%);
  }
`;

export const Image = styled.img`
  border-radius: 50%;
  margin-top: 1rem;
  width: 230px;
  height: 184px;
  border: 1px solid grey;

  @media screen and (max-width: 350px) {
    width: 175px;
    height: 140px;
  }
`;

export const IndicatorContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  position: absolute;
  bottom: 10px;
`;

export const Indicator = styled.div`
  height: 5px;
  width: 30px;
  background: ${({ active }) => (active ? "white" : "#8f9194")};
  margin: 0 1rem;
  cursor: pointer;
`;

export const LeftArrow = styled(FiChevronLeft)`
  position: absolute;
  border: none;
  outline: none;
  background: none;
  color: #fff;
  font-size: 1.4rem;
  cursor: pointer;
`;

export const RightArrow = styled(LeftArrow)`
  right: 0;
`;
