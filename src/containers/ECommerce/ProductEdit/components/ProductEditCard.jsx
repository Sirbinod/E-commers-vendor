import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useDispatch, useSelector, connect} from "react-redux";

import {Card, CardBody, Col} from "reactstrap";
import ProductEditForm from "./ProductEditForm";
import {baseurl} from "../../../../utils/baseApi/baseapi";

const PaymentCard = () => {
  const {id} = useParams();

  const {items} = useSelector((state) => state.items);

  const fitterItem = items.filter((item) => item._id === id)[0];
  fitterItem.gallery = fitterItem.gallery.map((x) => {
    if (x.includes("https")) return x;
    return baseurl + "/" + x;
  });

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">Main Information</h5>
          </div>
          <ProductEditForm initialValues={fitterItem} />
        </CardBody>
      </Card>
    </Col>
  );
};

export default PaymentCard;
