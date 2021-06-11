import moment from "moment";
import qs from "qs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  Table,
} from "reactstrap";
import { orderDetails } from "../../../redux/actions/orderActions";
import { baseapi } from "../../../utils/baseApi/baseapi";

const OrderDetails = ({ location }) => {
  var token = localStorage.getItem("token");
  const [config, setConfig] = useState({
    loading: false,
    success: false,
    order: null,
    error: null,
  });
  const id = qs.parse(location.search.substring(1)).orderId;

  // api call
  useEffect(async () => {
    setConfig({
      ...config,
      loading: true,
    });
    try {
      const response = await orderDetails(token, id);
      if (response.data.success) {
        setConfig({
          ...config,
          loading: false,
          error: null,
          order: response.data.data,
        });
      } else {
        setConfig({
          ...config,
          loading: false,
          error: response.data.message,
        });
      }
    } catch (err) {
      setConfig({
        ...config,
        loading: false,
        error: err.toString(),
      });
    }
  }, []);
  return (
    <Container>
      <Col>
        {config.loading ? (
          <p>Loading ....</p>
        ) : config.error ? (
          <p>{config.error}</p>
        ) : (
          config.order && (
            <>
              <Row>
                <Card>
                  <CardHeader>
                    <h3>Order Details</h3>
                  </CardHeader>
                  <CardBody>
                    <p>
                      Order Number:&nbsp;&nbsp;&nbsp;
                      <b>{config.order.orderId}</b>
                    </p>
                    <p>
                      Order Status:&nbsp;&nbsp;
                      <b>{config.order.status}</b>
                    </p>
                    <p>
                      Order Date:&nbsp;&nbsp;
                      <b>
                        {moment(config.order.orderedDate).format(
                          "DD-MM-YYYY  HH:MM"
                        )}
                      </b>
                    </p>
                  </CardBody>
                </Card>
              </Row>
              <Row>
                <Card>
                  <CardHeader>
                    <h3>Shipping Details</h3>
                  </CardHeader>
                  <CardBody>
                    <Col sm={5} lg={5} md={5}>
                      Name:&nbsp;&nbsp;&nbsp;{" "}
                      <b>{config.order.shippingAddress.name}</b>
                      <br />
                      Email:&nbsp;&nbsp;&nbsp;{" "}
                      <b>{config.order.shippingAddress.email}</b>
                      <br />
                      Phone:&nbsp;&nbsp;&nbsp;{" "}
                      <b>{config.order.shippingAddress.phone}</b>
                      <br />
                    </Col>
                    <Col sm={5} lg={5} md={5}>
                      Addres:&nbsp;&nbsp;&nbsp;{" "}
                      <b>{config.order.shippingAddress.address}</b>
                      <br />
                      Country:&nbsp;&nbsp;&nbsp;{" "}
                      <b>{config.order.shippingAddress.country}</b>
                      <br />
                      PostalCode:&nbsp;&nbsp;&nbsp;
                      <b>{config.order.shippingAddress.postalCode}</b>
                      <br />
                    </Col>
                  </CardBody>
                </Card>
              </Row>

              <Row>
                <Card>
                  <CardHeader>
                    <h3>Product Details</h3>
                  </CardHeader>
                  <CardBody>
                    <Table>
                      <thead>
                        <th>Product Image</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Unit Cost</th>
                        <th>Total Cost</th>
                      </thead>
                      <tbody>
                        {config.order.products.map((e) => (
                          <tr>
                            <td>
                              <img
                                src={baseapi + "/" + e.product.image}
                                style={{
                                  objectFit: "cover",
                                  height: "100px",
                                  width: "100px",
                                }}
                              />
                            </td>
                            <td>{e.product.name}</td>
                            <td>{e.quantity}</td>
                            <td>{e.unitCost}</td>
                            <td>{e.totalCost}</td>
                          </tr>
                        ))}
                        <hr
                          style={{
                            width: "100%",
                          }}
                        ></hr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>Total Product</td>
                          <td>
                            <b> {config.order.totalQuantity}</b>
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>Total Cost</td>
                          <td>
                            <b>Rs {config.order.totalCost}</b>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Row>
            </>
          )
        )}
      </Col>
    </Container>
  );
};

export default OrderDetails;
