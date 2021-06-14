import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "reactstrap";
import TotalProducts from "./totalProduct";
// import OrdersToday from "./components/OrdersToday";
import { getdatasstart } from "../../../redux/actions/dashboardActions";

const ECommerceDashboard = ({
  newOrder,
  todoElements,
  rtl,
  editTodoElementAction,
  fetchTodoListDataAction,
}) => {
  const { t } = useTranslation("common");

  // useEffect(() => {
  //   if (todoElements.length === 0) { // You can delete it if you need
  //     fetchTodoListDataAction();
  //   }
  // }, [fetchTodoListDataAction, todoElements.length]);
  const dispatch = useDispatch();

  var token = localStorage.getItem("token");
  // update this line
  const { done, datatoput, loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    if (!done && datatoput.length === 0) {
      console.log();
      // api call
      dispatch(getdatasstart(token));
    }
  });
  let amt = 0;
  let pamt = 0;
  let aamt = 0;
  let samt = 0;
  let tord = 0;
  let pord = 0;
  let cord = 0;
  let dord = 0;
  let sord = 0;
  let compord = 0;
  let reford = 0;
  if (done && !loading) {
    if (datatoput) {
      amt = datatoput.totalProducts || 0;
      pamt = datatoput.pendingProducts || 0;
      aamt = datatoput.approvedProducts || 0;
      samt = datatoput.suspendedProducts || 0;
      tord = datatoput.totalOrders || 0;
      pord = datatoput.pendingOrders || 0;
      cord = datatoput.cancelledOrders || 0;
      dord = datatoput.declinedOrders || 0;
      sord = datatoput.shippedOrders || 0;
      compord = datatoput.completedOrders || 0;
      reford = datatoput.refundedOrders || 0;
    }
  }

  return (
    <Container className="dashboard">
      <Row>
        <Col md={12}>
          <h3 className="page-title">Dashboard page</h3>
        </Col>
      </Row>
      <Row>
        <TotalProducts title="Total Products" amt={amt} />
        <TotalProducts title="Pending Products" amt={pamt} />
        <TotalProducts title="Approved Products" amt={aamt} />
        <TotalProducts title="Suspended Products" amt={samt} />
        {/* <TotalProfit /> */}
        {/* <OrdersToday title="Total Orders" amt={tord} />
        <OrdersToday title="Pending Orders" amt={pord} />
        <OrdersToday title="Cancelled Orders" amt={cord} />
        <OrdersToday title="Declined Orders" amt={dord} />
        <OrdersToday title="Shipped Orders" amt={sord} />
        <OrdersToday title="Completed Orders" amt={compord} />
        <OrdersToday title="Refunded Orders" amt={reford} /> */}
        {/* <Subscriptions /> */}
      </Row>
    </Container>
  );
};

// ECommerceDashboard.propTypes = {
//   newOrder: NewOrderTableProps.isRequired,
//   todoElements: PropTypes.arrayOf(todoCard).isRequired,
//   fetchTodoListDataAction: PropTypes.func.isRequired,
//   editTodoElementAction: PropTypes.func.isRequired,
//   rtl: RTLProps.isRequired,

// };

export default ECommerceDashboard;
