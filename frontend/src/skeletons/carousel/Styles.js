import styled from "styled-components";
import { BaseSliderContainer } from "../../GlobalStyle";

export const SkeletonContainer = styled(BaseSliderContainer)`
  height: 300px;
  background: var(--skeleton-background);
  animation: var(--loading-animation);
`;
