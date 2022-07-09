import {
  PaginationContainer,
  PaginationButton,
  PaginationText,
} from "./Styles";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Link } from "react-scroll";

const Pagination = ({
  page,
  pages,
  setPage,
  isDebouncing,
  scrollOptions: { isScrollable, target, offset } = {},
}) => {
  return (
    <PaginationContainer>
      {isScrollable ? (
        <Link to={target} offset={offset}>
          <PaginationButton
            disabled={isDebouncing || page === 0}
            onClick={() => setPage((prevPage) => prevPage - 1)}
            aria-label="left arrow"
          >
            <FiArrowLeft />
          </PaginationButton>
        </Link>
      ) : (
        <PaginationButton
          disabled={isDebouncing || page === 0}
          onClick={() => setPage((prevPage) => prevPage - 1)}
          aria-label="left arrow"
        >
          <FiArrowLeft />
        </PaginationButton>
      )}
      <PaginationText>
        {page + 1} of {pages}
      </PaginationText>
      {isScrollable ? (
        <Link to={target} offset={offset}>
          <PaginationButton
            disabled={isDebouncing || page === pages - 1}
            onClick={() => setPage((prevPage) => prevPage + 1)}
            aria-label="right arrow"
          >
            <FiArrowRight />
          </PaginationButton>
        </Link>
      ) : (
        <PaginationButton
          disabled={isDebouncing || page === pages - 1}
          onClick={() => setPage((prevPage) => prevPage + 1)}
          aria-label="right arrow"
        >
          <FiArrowRight />
        </PaginationButton>
      )}
    </PaginationContainer>
  );
};

export default Pagination;
