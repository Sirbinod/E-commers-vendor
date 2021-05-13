import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ProductCard from './components/ProductCard';
import RelatedItems from './components/RelatedItems';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

export default function ProductPage()  {
  const { id } = useParams();
  const {done,items, loading} = useSelector(state=>state.items);
  

  return(
  <Container>
    <Row>
      <Col md={12}>
    {items.filter(item => item._id === id).map(fitem => (
        <h3 className="page-title">{fitem.name}</h3>
        ))}
    {items.filter(item => item._id === id).map(fitem => (
      
      <h3 className="page-subhead subhead">Get to know detailed information about {fitem.name}
        </h3>
      ))}
      </Col>
    </Row>
    <Row>
    {items.filter(item => item._id === id).map(fitem => (
      <ProductCard items={fitem} />
  ))}
    </Row>
    
   
  </Container>
  );
};

