import { Link } from "react-router-dom";
import { ErrorContainer, ErrorImage, ErrorText, HomeButton } from "./Styles";
import Meta from "../../components/Meta";

const ErrorScreen = () => {
  return (
    <>
      <Meta title="Not Found" />
      <ErrorContainer>
        <ErrorImage src="/images/404.svg" alt="404" />
        <ErrorText>Page not found</ErrorText>
        <Link to="/">
          <HomeButton>Back Home</HomeButton>
        </Link>
      </ErrorContainer>
    </>
  );
};

export default ErrorScreen;
