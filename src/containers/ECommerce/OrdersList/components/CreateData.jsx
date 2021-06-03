import React, {useMemo, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getorderstart} from "../../../../redux/actions/orderActions";
import {Link} from "react-router-dom";

import PropTypes from "prop-types";

const MoneyFormatter = ({value}) => <div>${value}</div>;
const ActionFormatter = (val) => [
  <Link
    to={`./orderdetails?orderId=${val}`}
    className="btn btn-outline-primary btn-sm"
  >
    <span class="lnr lnr-eye"></span>
  </Link>,
];
ActionFormatter.propTypes = {
  value: PropTypes.string.isRequired,
};
MoneyFormatter.propTypes = {
  value: PropTypes.string.isRequired,
};

const StatusFormatter = (value) =>
  value === 0 ? (
    <span className="badge badge-primary">Pending</span>
  ) : value === 1 ? (
    <span className="badge badge-danger">Canceled</span>
  ) : value === 2 ? (
    <span className="badge badge-danger">Declined</span>
  ) : value === 3 ? (
    <span className="badge badge-success">Shipped</span>
  ) : value === 4 ? (
    <span className="badge badge-success">Completed</span>
  ) : (
    <span className="badge badge-warning">Refunded</span>
  );

StatusFormatter.propTypes = {
  value: PropTypes.string.isRequired,
};

let data = [];
const CreateDataOrderListTable = () => {
  const dispatch = useDispatch();

  var token = localStorage.getItem("token");
  // update this line
  const {done, orders} = useSelector((state) => state.orders);
  console.log(orders);
  useEffect(() => {
    if (!done && orders.length === 0) {
      // api call
      dispatch(getorderstart(token));
    }
  });

  if (done && orders.length !== 0) {
    data = [];
    let coun = 1;
    orders.map((order) => {
      data.push({
        id: coun,
        date: order.orderedDate,
        name: order.shippingAddress ? order.shippingAddress.name : "",
        price: order.totalCost.toString(),
        address: order.shippingAddress.address,
        phone: order.shippingAddress.phone.toString(),
        quantity: order.totalProducts.toString(),
        status: StatusFormatter(order.status),
        actionn: [ActionFormatter(order.orderId)],
      });
      coun++;
    });
  }

  const columns = useMemo(
    () => [
      {
        accessor: "id",
        Header: "ID",
        width: 80,
        disableGlobalFilter: true,
      },
      {
        accessor: "date",
        Header: "Date",
        disableSortBy: true,
        disableGlobalFilter: true,
      },
      {
        accessor: "name",
        Header: "Customer Name",
      },
      {
        accessor: "price",
        Header: "Price",
        formatter: MoneyFormatter,
      },
      {
        accessor: "address",
        Header: "Address",
      },
      {
        accessor: "phone",
        Header: "Phone",
      },
      {
        accessor: "quantity",
        Header: "Product Count",
      },
      {
        accessor: "status",
        Header: "Status",
        disableGlobalFilter: true,
        disableSortBy: true,
        formatter: StatusFormatter,
        width: 110,
      },
      {
        Header: "Action",
        accessor: "actionn",
        disableGlobalFilter: true,
        disableSortBy: true,
        formatter: ActionFormatter,
        width: 110,
      },
    ],
    []
  );

  const orderListTableData = {tableHeaderData: columns, tableRowsData: data};
  return orderListTableData;
};

export default CreateDataOrderListTable;
