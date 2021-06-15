import React, {useEffect} from "react";

import {Container, Col, Row} from "reactstrap";
import CreateTableData from "./components/CreateData";
import {useDispatch, useSelector} from "react-redux";
import {getme} from "../../../redux/actions/itemActions";
import DataReactTable from "../../../shared/components/table/tableBase";
import CreateTable from "./components/createTable";

const ProductsList = () => {
  const {token} = useSelector((state) => state.login);
  const {loading, items, listItems} = useSelector((state) => state.items);
  const dispatch = useDispatch();
  let listTableData;
  // if (!loading) listTableData = CreateTableData();

  useEffect(() => {
    if (!listItems) {
      dispatch(getme(token));
    }
  }, [dispatch, items, token]);
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Products List</h3>
          <h3 className="page-subhead subhead"></h3>
        </Col>
      </Row>
      <Row>
        {loading ? (
          <div style={{padding: "5%", "margin-left": "40%"}}>
            <h6>
              <i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i>
            </h6>
          </div>
        ) : items.length === 0 ? (
          <p>No Product Found</p>
        ) : (
          <CreateTable />
        )}
      </Row>
    </Container>
  );
};

export default ProductsList;
