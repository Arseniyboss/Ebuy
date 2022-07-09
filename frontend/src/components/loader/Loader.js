import {
  LoaderWrapper,
  RainbowLoader,
  StripeLoader,
  PrimaryLoader,
  LoaderComponent,
} from "./Styles";

const Loader = ({ variant }) => {
  return (
    <LoaderWrapper>
      {variant === "primary" && (
        <PrimaryLoader>
          <LoaderComponent />
        </PrimaryLoader>
      )}
      {variant === "stripe" && (
        <StripeLoader>
          <LoaderComponent />
        </StripeLoader>
      )}
      {variant === "rainbow" && (
        <RainbowLoader>
          <LoaderComponent />
        </RainbowLoader>
      )}
    </LoaderWrapper>
  );
};

export default Loader;
