import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  TableRow,
  TableData,
  TableButton,
  UserEmail,
  Check,
  Cross,
  Trashcan,
} from "../../styles/Table";
import { deleteUser } from "../../actions/user/delete";
import { MdEdit } from "react-icons/md";

const User = ({ _id, name, email, isAdmin, resetPage }) => {
  const [disabled, setDisabled] = useState(false);

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(id));
      resetPage();
      setDisabled(true);
    }
  };
  return (
    <TableRow>
      <TableData>{_id}</TableData>
      <TableData>{name}</TableData>
      <TableData>
        <UserEmail href={`mailto:${email}`}>{email}</UserEmail>
      </TableData>
      <TableData>{isAdmin ? <Check /> : <Cross />}</TableData>
      <TableData>
        <Link to={`/admin/user/${_id}/edit`}>
          <TableButton>
            <MdEdit />
          </TableButton>
        </Link>
        <TableButton
          disabled={disabled || isAdmin}
          onClick={() => handleDelete(_id)}
        >
          <Trashcan />
        </TableButton>
      </TableData>
    </TableRow>
  );
};

export default User;
