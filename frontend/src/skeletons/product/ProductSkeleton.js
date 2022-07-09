import {
  SkeletonContainer,
  SkeletonCard,
  SkeletonTextContainer,
  SkeletonText,
} from "./Styles";

const ProductSkeleton = () => {
  return (
    <SkeletonContainer>
      <SkeletonCard />
      <SkeletonTextContainer>
        <SkeletonText long />
        <SkeletonText />
      </SkeletonTextContainer>
    </SkeletonContainer>
  );
};

export default ProductSkeleton;
