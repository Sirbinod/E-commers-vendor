import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import CartCard from './components/CartCard';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';


export default function Cart () {
  const { id } = useParams();
  console.log(id)
  const {orders, loading} = useSelector(state=>state.orders);
  return (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Order No {id}</h3>
      </Col>
    </Row>
    <Row>
    {orders.filter(order => order._id === id).map(forder => (
      <CartCard data={forder}/>
    ))};
    </Row>
  </Container>
);
  };
