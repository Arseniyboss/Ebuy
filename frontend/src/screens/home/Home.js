import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useDebounce } from "../../hooks/useDebounce";
import { useFilter } from "../../hooks/useFilter";
import { useSort } from "../../hooks/useSort";
import { usePagination } from "../../hooks/usePagination";
import { useMounted } from "../../hooks/useMounted";
import { Heading } from "../../GlobalStyle";
import {
  HomeContainer,
  HomeSearchInput,
  ProductContainer,
  ProductWrapper,
  ProductText,
  HomeFilterContainer,
  SelectContainer,
  SelectHeading,
  Price,
  PriceRange,
  FiltersButton,
} from "./Styles";
import FilterSelect from "../../components/select/FilterSelect";
import SortSelect from "../../components/select/SortSelect";
import Product from "../../components/product/Product";
import Message from "../../components/message/Message";
import Meta from "../../components/Meta";
import Autocomplete from "../../components/autocomplete/Autocomplete";
import Carousel from "../../components/carousel/Carousel";
import Discount from "../../components/discount/Discount";
import Pagination from "../../components/pagination/Pagination";
import ProductSkeleton from "../../skeletons/product/ProductSkeleton";
import { listProducts } from "../../actions/product/list";
import { getUniqueValues } from "../../helpers/getUniqueValues";
import { useDiscountContext } from "../../contexts/DiscountContext";
import { PRODUCT_LIST_RESET } from "../../constants/product/list";

const Home = () => {
  const [maxPrice, setMaxPrice] = useLocalStorage("maxPrice", 0);
  const initialFilters = {
    name: "",
    brand: "",
    range: {
      price: 0,
    },
  };

  const [filters, setFilters] = useLocalStorage("homeFilters", initialFilters);
  const [debouncedFilters, isFiltering] = useDebounce(filters);

  const initialSorts = {
    price: "",
    rating: "",
  };
  const [sorts, setSorts] = useLocalStorage("homeSorts", initialSorts);
  const [debouncedSorts, isSorting] = useDebounce(sorts);
  const [sortLabel, setSortLabel] = useLocalStorage("productSortLabel", "");

  const itemsPerPage = 3;
  const [page, setPage] = useLocalStorage("homePage", 0);
  const [debouncedPage] = useDebounce(page);

  const scrollOptions = {
    isScrollable: true,
    target: "products",
    offset: -270,
  };

  const resetPage = () => {
    setPage(0);
  };

  const disabledFilters = Object.keys(filters).every((filter) =>
    filter === "range"
      ? filters.range.price === initialFilters.range.price
      : filters[filter] === initialFilters[filter]
  );

  const disabledSorts = Object.keys(sorts).every(
    (sort) => sorts[sort] === initialSorts[sort]
  );

  const clearFilters = () => {
    setFilters(initialFilters);
    setSorts(initialSorts);
    setSortLabel("");
  };

  const { expired } = useDiscountContext();

  const mounted = useMounted();

  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.product.productList
  );

  useEffect(() => {
    dispatch({ type: PRODUCT_LIST_RESET });
  }, [dispatch]);

  useEffect(() => {
    dispatch(listProducts("published"));
    return () => {
      dispatch({ type: PRODUCT_LIST_RESET });
    };
  }, [dispatch, debouncedFilters, debouncedSorts, debouncedPage]);

  const filteredProducts = useFilter(products, debouncedFilters);

  useEffect(() => {
    if (products.length) {
      const maxPrice = Math.max(...products.map((product) => product.price));
      setMaxPrice(parseInt(maxPrice));
    }
  }, [products, setMaxPrice]);

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    resetPage();
  };

  const handleRange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, range: { [name]: parseInt(value) } });
    resetPage();
  };

  const allBrands = products.map((product) => product.brand);

  const uniqueBrands = getUniqueValues(allBrands);

  const [sortedProducts, sortBy] = useSort(filteredProducts, debouncedSorts);

  const sortOptions = [
    { sortKey: "price", label: "Price: Low - High", direction: "asc" },
    { sortKey: "price", label: "Price: High - Low", direction: "desc" },
    { sortKey: "rating", label: "Top Rated", direction: "desc" },
  ];

  const handleSort = (e) => {
    const { value } = e.target;
    if (value) {
      const sortOption = sortOptions.find((option) => option.label === value);
      const { sortKey, direction, label } = sortOption;
      setSorts({ ...initialSorts, [sortKey]: direction });
      setSortLabel(label);
      sortBy(sortKey);
    } else {
      setSorts(initialSorts);
      setSortLabel("");
    }
    resetPage();
  };

  const [paginatedProducts, pages] = usePagination(
    sortedProducts,
    debouncedPage,
    itemsPerPage
  );

  return (
    <>
      <Meta />
      <Autocomplete />
      <Carousel />
      {!loading && !expired && <Discount />}
      <Heading>Products</Heading>
      <HomeContainer>
        <HomeFilterContainer>
          <HomeSearchInput
            type="text"
            placeholder="Search products..."
            name="name"
            value={filters.name}
            onChange={handleFilter}
          />
          <SelectContainer>
            <SelectHeading>Brand</SelectHeading>
            <FilterSelect
              placeholder="All"
              name="brand"
              value={filters.brand}
              handleChange={handleFilter}
              items={uniqueBrands}
              loading={loading}
            />
          </SelectContainer>
          <SelectContainer>
            <SelectHeading>Sort by</SelectHeading>
            <SortSelect
              placeholder="Default Order"
              name="sort"
              value={sortLabel}
              handleChange={handleSort}
              items={sortOptions}
            />
          </SelectContainer>
          <div>
            <h4>Price</h4>
            <Price>
              ${filters.range.price} - ${maxPrice}
            </Price>
            <PriceRange
              type="range"
              id="price"
              name="price"
              value={filters.range.price}
              onChange={handleRange}
              min={0}
              max={maxPrice}
            />
          </div>
          <FiltersButton
            disabled={disabledFilters && disabledSorts}
            onClick={clearFilters}
          >
            Clear Filters
          </FiltersButton>
        </HomeFilterContainer>
        {loading || !mounted ? (
          <ProductContainer>
            {[...Array(3)].map((_, index) => (
              <ProductWrapper key={index}>
                <ProductSkeleton />
              </ProductWrapper>
            ))}
          </ProductContainer>
        ) : error ? (
          <Message variant="error">{error}</Message>
        ) : (
          <ProductContainer id="products">
            {paginatedProducts.map((product) => (
              <ProductWrapper key={product._id}>
                <Product {...product} />
              </ProductWrapper>
            ))}
            {!loading && filteredProducts.length === 0 && (
              <ProductText>No products matched your search</ProductText>
            )}
          </ProductContainer>
        )}
      </HomeContainer>
      {filteredProducts.length > 0 && (
        <Pagination
          pages={pages}
          page={page}
          setPage={setPage}
          isDebouncing={isFiltering || isSorting}
          scrollOptions={scrollOptions}
        />
      )}
    </>
  );
};

export default Home;
