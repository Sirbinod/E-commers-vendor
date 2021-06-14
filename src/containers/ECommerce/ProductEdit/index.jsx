import React from "react";
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import {Col, Container, Row} from "reactstrap";
import ProductEditCard from "./components/ProductEditCard";

const ProductEdit = () => {
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Product Edit</h3>
        </Col>
      </Row>
      <Row>
        <ProductEditCard />
      </Row>
    </Container>
  );
};

export default ProductEdit;
