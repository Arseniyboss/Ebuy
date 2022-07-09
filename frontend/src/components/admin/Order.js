import { Link } from "react-router-dom";
import { TableRow, TableData, TableButton, Cross } from "../../styles/Table";
import { shortenText } from "../../helpers/shortenText";

const Order = ({
  _id,
  user,
  totalPrice,
  isPaid,
  paidAt,
  isDelivered,
  deliveredAt,
}) => {
  return (
    <TableRow>
      <TableData>{_id}</TableData>
      <TableData>{user ? user.name : "Anonymous"}</TableData>
      <TableData>${totalPrice}</TableData>
      <TableData>{isPaid ? shortenText(paidAt) : <Cross />}</TableData>
      <TableData>
        {isDelivered ? shortenText(deliveredAt) : <Cross />}
      </TableData>
      <TableData>
        <Link to={`/order/${_id}`}>
          <TableButton>Details</TableButton>
        </Link>
      </TableData>
    </TableRow>
  );
};

export default Order;
