import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useDebounce } from "../../../hooks/useDebounce";
import { useMounted } from "../../../hooks/useMounted";
import { useFilter } from "../../../hooks/useFilter";
import { usePagination } from "../../../hooks/usePagination";
import Pagination from "../../../components/pagination/Pagination";
import { Heading } from "../../../GlobalStyle";
import { FilterContainer, SearchInput } from "../../../styles/Filters";
import { TableContainer, Table, TableHeading } from "../../../styles/Table";
import { ProductText } from "../../home/Styles";
import { ProductCreateButton } from "./Styles";
import Product from "../../../components/admin/Product";
import Message from "../../../components/message/Message";
import Loader from "../../../components/loader/Loader";
import Meta from "../../../components/Meta";
import { listProducts } from "../../../actions/product/list";
import { createProduct } from "../../../actions/product/create";
import { PRODUCT_CREATE_RESET } from "../../../constants/product/create";
import { PRODUCT_LIST_RESET } from "../../../constants/product/list";

const ProductList = ({ history }) => {
  const itemsPerPage = 4;
  const [page, setPage] = useLocalStorage("productListPage", 0);
  const [debouncedPage] = useDebounce(page);

  const [filters, setFilters] = useLocalStorage("productListFilter", {
    name: "",
  });
  const [debouncedFilters, isFiltering] = useDebounce(filters);

  const [disabled, setDisabled] = useState(false);

  const mounted = useMounted();

  const dispatch = useDispatch();

  const { loading, products } = useSelector(
    (state) => state.product.productList
  );

  const {
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = useSelector((state) => state.product.productCreate);

  const { error: errorDelete, success: successDelete } = useSelector(
    (state) => state.product.productDelete
  );

  useEffect(() => {
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
      dispatch({ type: PRODUCT_CREATE_RESET });
    } else {
      dispatch(listProducts());
    }
  }, [
    history,
    dispatch,
    createdProduct,
    successCreate,
    successDelete,
    debouncedFilters,
    debouncedPage,
  ]);

  useEffect(() => {
    dispatch({ type: PRODUCT_LIST_RESET });
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch({ type: PRODUCT_LIST_RESET });
    };
  }, [dispatch]);

  const handleCreateProduct = () => {
    dispatch(createProduct());
    setDisabled(true);
  };

  const filteredProducts = useFilter(products, debouncedFilters);

  const [paginatedProducts, pages] = usePagination(
    filteredProducts,
    debouncedPage,
    itemsPerPage
  );

  const resetPage = () => {
    setPage(0);
  };

  const handleChange = (e) => {
    setFilters({ name: e.target.value });
    resetPage();
  };

  return (
    <>
      <Meta title="Product List" />
      <>
        {errorCreate && <Message variant="error">{errorCreate}</Message>}
        {errorDelete && <Message variant="error">{errorDelete}</Message>}
        <Heading>Products</Heading>
        <TableContainer>
          <FilterContainer>
            <SearchInput
              placeholder="Search products..."
              name="name"
              value={filters.name}
              onChange={handleChange}
            />
          </FilterContainer>
          {loading || !mounted ? (
            <Loader variant="rainbow" />
          ) : !loading && filteredProducts.length === 0 ? (
            <ProductText>No products matched your search criteria</ProductText>
          ) : (
            <Table>
              <thead>
                <tr>
                  <TableHeading>Id</TableHeading>
                  <TableHeading>Name</TableHeading>
                  <TableHeading>Price</TableHeading>
                  <TableHeading>Category</TableHeading>
                  <TableHeading>Brand</TableHeading>
                  <TableHeading>
                    <ProductCreateButton
                      disabled={disabled}
                      onClick={handleCreateProduct}
                    >
                      Create Product
                    </ProductCreateButton>
                  </TableHeading>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map((product) => (
                  <Product
                    key={product._id}
                    resetPage={resetPage}
                    {...product}
                  />
                ))}
              </tbody>
            </Table>
          )}
        </TableContainer>
        {!loading && filteredProducts.length > 0 && (
          <Pagination
            pages={pages}
            page={page}
            setPage={setPage}
            isDebouncing={isFiltering}
          />
        )}
      </>
    </>
  );
};

export default ProductList;
