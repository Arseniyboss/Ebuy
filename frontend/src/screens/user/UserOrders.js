import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useDebounce } from "../../hooks/useDebounce";
import { usePagination } from "../../hooks/usePagination";
import { useOrderStatus } from "../../hooks/useOrderStatus";
import { Link } from "react-router-dom";
import { Heading } from "../../GlobalStyle";
import {
  TableContainer,
  Table,
  TableRow,
  TableHeading,
  TableData,
  TableButton,
  Cross,
} from "../../styles/Table";
import { FilterContainer } from "../../styles/Filters";
import FilterSelect from "../../components/select/FilterSelect";
import Meta from "../../components/Meta";
import Message from "../../components/message/Message";
import Loader from "../../components/loader/Loader";
import Pagination from "../../components/pagination/Pagination";
import { shortenText } from "../../helpers/shortenText";
import { listMyOrders } from "../../actions/order/listMy";
import { ORDER_LIST_MY_RESET } from "../../constants/order/listMy";

const UserOrders = () => {
  const itemsPerPage = 4;
  const [page, setPage] = useLocalStorage("myOrdersPage", 0);
  const [debouncedPage] = useDebounce(page);

  const [status, setStatus] = useLocalStorage("myOrderStatus", "");
  const [debouncedStatus, isDebouncing] = useDebounce(status);
  const [isFiltering, setIsFiltering] = useState(false);

  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector(
    (state) => state.order.orderListMy
  );

  useEffect(() => {
    dispatch(listMyOrders());
    return () => {
      dispatch({ type: ORDER_LIST_MY_RESET });
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
      <Meta title="Orders" />
      <Heading>My Orders</Heading>
      {((!loading && orders?.length > 0) || isFiltering) && (
        <FilterContainer>
          <FilterSelect
            placeholder="Status"
            value={status}
            handleChange={handleChange}
            items={["pay"]}
          />
        </FilterContainer>
      )}
      {loading ? (
        <Loader variant="rainbow" />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : filteredOrders.length > 0 ? (
        <>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeading>Id</TableHeading>
                  <TableHeading>Total</TableHeading>
                  <TableHeading>Paid</TableHeading>
                  <TableHeading>Delivered</TableHeading>
                  <TableHeading />
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order) => (
                  <TableRow key={order._id}>
                    <TableData>{order._id}</TableData>
                    <TableData>{order.totalPrice}</TableData>
                    <TableData>
                      {order.isPaid ? shortenText(order.paidAt) : <Cross />}
                    </TableData>
                    <TableData>
                      {order.isDelivered ? (
                        shortenText(order.deliveredAt)
                      ) : (
                        <Cross />
                      )}
                    </TableData>
                    <TableData>
                      <Link to={`/order/${order._id}`}>
                        <TableButton>Details</TableButton>
                      </Link>
                    </TableData>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </TableContainer>
          <Pagination
            pages={pages}
            page={page}
            setPage={setPage}
            isDebouncing={isDebouncing}
          />
        </>
      ) : (
        <Message variant="info">No orders</Message>
      )}
    </>
  );
};

export default UserOrders;
