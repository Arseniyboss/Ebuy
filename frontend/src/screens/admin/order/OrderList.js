import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useOrderStatus } from "../../../hooks/useOrderStatus";
import { useDebounce } from "../../../hooks/useDebounce";
import { usePagination } from "../../../hooks/usePagination";
import Pagination from "../../../components/pagination/Pagination";
import { Heading } from "../../../GlobalStyle";
import { FilterContainer } from "../../../styles/Filters";
import { TableContainer, Table, TableHeading } from "../../../styles/Table";
import FilterSelect from "../../../components/select/FilterSelect";
import Order from "../../../components/admin/Order";
import Loader from "../../../components/loader/Loader";
import Message from "../../../components/message/Message";
import Meta from "../../../components/Meta";
import { listOrders } from "../../../actions/order/list";
import { ProductText } from "../../home/Styles";
import { ORDER_LIST_RESET } from "../../../constants/order/list";

const OrderList = () => {
  const itemsPerPage = 4;
  const [page, setPage] = useLocalStorage("orderListPage", 0);
  const [debouncedPage] = useDebounce(page);

  const [status, setStatus] = useLocalStorage("userOrderStatus", "");
  const [debouncedStatus, isDebouncing] = useDebounce(status);
  const [isFiltering, setIsFiltering] = useState(false);

  const dispatch = useDispatch();

  const { loading, orders, error } = useSelector(
    (state) => state.order.orderList
  );

  useEffect(() => {
    dispatch(listOrders());
    return () => {
      dispatch({ type: ORDER_LIST_RESET });
    };
  }, [dispatch, debouncedStatus, debouncedPage]);

  const filteredOrders = useOrderStatus(orders, debouncedStatus);

  const [paginatedOrders, pages] = usePagination(
    filteredOrders,
    debouncedPage,
    itemsPerPage
  );

  const handleChange = (e) => {
    setStatus(e.target.value);
    setIsFiltering(true);
    setPage(0);
  };

  return (
    <>
      <Meta title="Order List" />
      {error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <>
          <Heading>Orders</Heading>
          {((!loading && orders.length > 0) || isFiltering) && (
            <FilterContainer>
              <FilterSelect
                placeholder="Status"
                value={status}
                handleChange={handleChange}
                items={["delivery"]}
              />
            </FilterContainer>
          )}
          {loading ? (
            <Loader variant="rainbow" />
          ) : orders.length === 0 ? (
            <Message variant="info">No orders</Message>
          ) : !loading && filteredOrders.length === 0 ? (
            <ProductText>No orders matched your search</ProductText>
          ) : (
            orders.length > 0 && (
              <>
                <TableContainer>
                  <Table>
                    <thead>
                      <tr>
                        <TableHeading>Id</TableHeading>
                        <TableHeading>User</TableHeading>
                        <TableHeading>Total</TableHeading>
                        <TableHeading>Paid</TableHeading>
                        <TableHeading>Delivered</TableHeading>
                        <TableHeading />
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedOrders.map((order) => (
                        <Order key={order._id} {...order} />
                      ))}
                    </tbody>
                  </Table>
                </TableContainer>
                {!loading && filteredOrders.length > 0 && (
                  <Pagination
                    pages={pages}
                    page={page}
                    setPage={setPage}
                    isDebouncing={isDebouncing}
                  />
                )}
              </>
            )
          )}
        </>
      )}
    </>
  );
};

export default OrderList;
