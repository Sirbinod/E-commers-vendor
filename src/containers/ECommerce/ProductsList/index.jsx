import React, {useEffect} from "react";

import {Container, Col, Row} from "reactstrap";
import ProductsListTable from "./components/ProductsListTable";
import CreateTableData from "./components/CreateData";
import {useDispatch, useSelector} from "react-redux";
import {getme} from "../../../redux/actions/itemActions";
import DataReactTable from "../../../shared/components/table/tableBase";

const ProductsList = () => {
  const listTableData = CreateTableData();
  const {token} = useSelector((state) => state.login);
  const {loading, items} = useSelector((state) => state.items);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!items) {
      dispatch(getme(token));
    }
  }, [dispatch, items, token]);
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Products List</h3>
          <h3 className="page-subhead subhead">
            Use this elements, if you want to show some hints or additional
            information
          </h3>
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

export default ProductsList;
