import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { TableRow, TableData, TableButton, Trashcan } from "../../styles/Table";
import { MdEdit } from "react-icons/md";
import { deleteProduct } from "../../actions/product/delete";

const Product = ({ _id, name, price, category, brand, resetPage }) => {
  const [disabled, setDisabled] = useState(false);

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
      resetPage();
      setDisabled(true);
    }
  };
  return (
    <TableRow key={_id}>
      <TableData>{_id}</TableData>
      <TableData>{name}</TableData>
      <TableData>${price}</TableData>
      <TableData>{category}</TableData>
      <TableData>{brand}</TableData>
      <TableData>
        <Link to={`/admin/product/${_id}/edit`}>
          <TableButton>
            <MdEdit />
          </TableButton>
        </Link>
        <TableButton disabled={disabled} onClick={() => handleDelete(_id)}>
          <Trashcan />
        </TableButton>
      </TableData>
    </TableRow>
  );
};

export default Product;
