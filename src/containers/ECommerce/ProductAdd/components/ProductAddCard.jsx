import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import ProductAddForm from './ProductAddForm';

const PaymentCard = () => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Main Information</h5>
        </div>
        <ProductAddForm onSubmit />
      </CardBody>
    </Card>
  </Col>
);

export default PaymentCard;
