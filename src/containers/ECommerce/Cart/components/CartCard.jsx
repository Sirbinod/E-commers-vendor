import React from 'react';
import {
  Card, CardBody, Col, Table, Row
} from 'reactstrap';
import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';
import CartPurchase from './CartPurchase';

// import cartList from './cart_list';

export default function CartCard (data) {
  console.log(data)
  const cartList = data.data.products;
  return (
   [
(<Col md={12} lg={12}>
  <Row>
  <Col md={6} lg={6}>
  <Card className="cart">
      <CardBody>
        <div className="card__title">
          <h4 className="bold-text">Billing Details</h4>
        </div>
       
        <h5 className="cart__sub-total">Name: {data.data.billingDetails.name}</h5>
        <h5 className="cart__sub-total">Email: {data.data.billingDetails.email}</h5>
        <h5 className="cart__sub-total">Address: {data.data.billingDetails.address}</h5>
        <h5 className="cart__sub-total">Country: {data.data.billingDetails.country}</h5>
        <h5 className="cart__sub-total">Phone: {data.data.billingDetails.phone}</h5>
        <h5 className="cart__sub-total">Postal Code: {data.data.billingDetails.postalCode}</h5>
        
      </CardBody>
    </Card>
  </Col>
  <Col md={6} lg={6}>
  <Card className="cart">
      <CardBody>
        <div className="card__title">
          <h4 className="bold-text">Shipping Details</h4>
        </div>
       
        <h5 className="cart__sub-total">Name: {data.data.shippingDetails.name}</h5>
        <h5 className="cart__sub-total">Email: {data.data.shippingDetails.email}</h5>
        <h5 className="cart__sub-total">Address: {data.data.shippingDetails.address}</h5>
        <h5 className="cart__sub-total">Country: {data.data.shippingDetails.country}</h5>
        <h5 className="cart__sub-total">Phone: {data.data.shippingDetails.phone}</h5>
        <h5 className="cart__sub-total">Postal Code: {data.data.shippingDetails.postalCode}</h5>
        
      </CardBody>
    </Card>
  </Col>
  </Row>
</Col>),   
    
  (<Col md={12} lg={12}>
    <Card className="cart">
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Ordered Items</h5>
        </div>
        <Table className="table--bordered cart__table" responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            
            {cartList.map((ct, i) => (
               
              <tr key={`index_${ct._id}`}>
                <td>{i + 1}</td>
                <td>
                  <span className="cart__preview-img">
                    <img src={ct.img} alt="product_preview" />
                  </span>
                  <span>{ct.product}</span>
                </td>
                <td>{ct.quantity}</td>
                <td>Rs. {ct.unitCost.toFixed(2)}</td>
                <td>Rs. {ct.totalCost.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table><hr/>
        {/* <h5 className="cart__sub-total">Sub-total: {data.data.totalCost}</h5> */}
        <h4 className="cart__total">Total Price: Rs. {data.data.totalCost}</h4>
      </CardBody>
    </Card>
  </Col>)
   ]
);
};
