import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useDebounce } from "../../../hooks/useDebounce";
import { useFilter } from "../../../hooks/useFilter";
import { usePagination } from "../../../hooks/usePagination";
import Pagination from "../../../components/pagination/Pagination";
import { Heading } from "../../../GlobalStyle";
import { FilterContainer, SearchInput } from "../../../styles/Filters";
import { TableContainer, Table, TableHeading } from "../../../styles/Table";
import User from "../../../components/admin/User";
import Message from "../../../components/message/Message";
import Loader from "../../../components/loader/Loader";
import Meta from "../../../components/Meta";
import { listUsers } from "../../../actions/user/list";
import { ProductText } from "../../home/Styles";
import { USER_LIST_RESET } from "../../../constants/user/list";

const UserList = () => {
  const itemsPerPage = 4;
  const [page, setPage] = useLocalStorage("userListPage", 0);
  const [debouncedPage] = useDebounce(page);

  const [filters, setFilters] = useLocalStorage("userListFilter", {
    name: "",
    email: "",
  });
  const [debouncedFilters, isFiltering] = useDebounce(filters);

  const dispatch = useDispatch();

  const { loading, users, error } = useSelector((state) => state.user.userList);

  const { error: errorDelete, success: successDelete } = useSelector(
    (state) => state.user.userDelete
  );

  useEffect(() => {
    dispatch(listUsers());
    return () => {
      dispatch({ type: USER_LIST_RESET });
    };
  }, [dispatch, successDelete, debouncedFilters, debouncedPage]);

  const filteredUsers = useFilter(users, debouncedFilters);

  const [paginatedUsers, pages] = usePagination(
    filteredUsers,
    debouncedPage,
    itemsPerPage
  );

  const resetPage = () => {
    setPage(0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    resetPage();
  };

  return (
    <>
      <Meta title="User List" />
      {error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <>
          <Heading>Users</Heading>
          {errorDelete && <Message variant="error">{errorDelete}</Message>}
          <TableContainer>
            <FilterContainer>
              <SearchInput
                placeholder="Search by name"
                name="name"
                value={filters.name}
                onChange={handleChange}
              />
              <SearchInput
                placeholder="Search by email"
                name="email"
                value={filters.email}
                onChange={handleChange}
              />
            </FilterContainer>
            {loading ? (
              <Loader variant="primary" />
            ) : !loading && filteredUsers.length === 0 ? (
              <ProductText>No users matched your search</ProductText>
            ) : (
              <Table>
                <thead>
                  <tr>
                    <TableHeading>Id</TableHeading>
                    <TableHeading>Name</TableHeading>
                    <TableHeading>Email</TableHeading>
                    <TableHeading>Admin</TableHeading>
                    <TableHeading />
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user) => (
                    <User key={user._id} resetPage={resetPage} {...user} />
                  ))}
                </tbody>
              </Table>
            )}
          </TableContainer>
          {!loading && filteredUsers.length > 0 && (
            <Pagination
              pages={pages}
              page={page}
              setPage={setPage}
              isDebouncing={isFiltering}
            />
          )}
        </>
      )}
    </>
  );
};

export default UserList;
