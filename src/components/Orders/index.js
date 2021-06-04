import { Link } from "react-router-dom";
import { Table } from "../components";
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux'
import { GET_ORDERS } from '../../lib/queries'
import Row from "./Row";

function Orders() {
  const { current } = useSelector(state => state.user)
  const { loading, error, data } = useQuery(GET_ORDERS, {variables: {ownerId: current?.googleId}});
  const items = data?.orders
  return (
    <Table heading="My Orders" subheading="orders in your account" items={items}>
      <tbody>
        {!items?.length && <div>No Items in the cart yet </div>}
        {items?.map((item) => (
          <Row key={item.id} {...item} />
        ))}
      </tbody>
      <div className="row mt-4 d-flex">
        <div className="col-sm-4 mb-3 mb-m-1 text-md-left">
          <Link to="/">
            <i className="fas fa-arrow-left mr-2"></i> Continue Shopping
          </Link>
        </div>
      </div>
    </Table>
  );
}
export default Orders;
