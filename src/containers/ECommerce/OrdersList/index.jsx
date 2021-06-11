import React, {useEffect} from "react";
import {Container, Col, Row} from "reactstrap";
import OrdersListTable from "./components/OrdersListTable";
import CreateTableData from "./components/CreateData";
import {useDispatch, useSelector} from "react-redux";
import {getorderstart} from "../../../redux/actions/orderActions";
import DataReactTable from "../../../shared/components/table/tableBase";

const OrdersList = () => {
  const listTableData = CreateTableData();
  const {token} = useSelector((state) => state.login);
  const {done, loading, orders} = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!orders) {
      dispatch(getorderstart(token));
    }
  }, [dispatch, orders, token]);
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Orders List</h3>
        </Col>
      </Row>
      <Row>
        {loading ? (
          <div style={{padding: "5%", "margin-left": "40%"}}>
            <h6>
              <i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i>
            </h6>
          </div>
        ) : (
          <DataReactTable listTableData={listTableData} />
        )}
      </Row>
    </Container>
  );
};

export default OrdersList;
