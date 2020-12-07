/**
 * @author Calvin Galbaw
 */

import { Button, Grid, Paper } from "@material-ui/core";
import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { LoginContext } from "../../App";
import OrderInvoice from "./OrderInvoice";
import Moment from "react-moment";
import useLoader from "../../hooks/useLoader";
/**
 * @description creates the order page component which displays all the orders done by the user
 * @returns JSX of the order page having order details in a card
 */
function OrderList() {
  const [loginStatus, setLoginStatus] = useContext(LoginContext);
  const [loader, showLoader, hideLoader] = useLoader();
  const [orders, setOrders] = useState([]);
  /**
   * @description This is used to get the orders and update the state of orders
   */
  useEffect(() => {
    showLoader();
    let mount = true;
    Axios.get("http://180.149.241.208:3022/getOrderDetails", {
      headers: {
        Authorization: `bearer ${loginStatus.token}`,
      },
    })
      .then((res) => {
        if (mount) {
          hideLoader();
          setOrders(res.data.product_details);
        }
      })
      .catch((e) => {
        hideLoader();
        console.log(e.response);
      });
    return () => {
      mount = false;
    };
  }, []);

  return orders.length !== 0 ? (
    /**
     * we map through each order placed by the user and display them
     */
    orders.map((order) => (
      <Paper
        key={order._id}
        elevation={3}
        style={{ padding: "15px", margin: "10px" }}
      >
        <p>
          <span style={{ color: "#CB7C13", fontWeight: "600" }}>TRANSIT</span>{" "}
          Order By: {order._id}
        </p>
        <p style={{ fontSize: "11px" }}>
          Placed on{" "}
          <Moment format="DD/MM/YYYY">
            {order.product_details[0].createdAt}
          </Moment>{" "}
          / ₹{order.product_details[0].total_cartCost}
        </p>
        <hr></hr>
        <Row>
          {/** this is used to map through each order in the orders state */}
          {order.product_details.map((product) => (
            <Col key={product.product_details[0].product_id} lg={3} sm={4}>
              <img
                src={`http://180.149.241.208:3022/${product.product_details[0].product_image}`}
                alt="Order"
                style={{ width: "100px", height: "80px", margin: "auto" }}
              ></img>
            </Col>
          ))}
        </Row>
        <hr></hr>
        <OrderInvoice
          createdAt={order.product_details[0].createdAt}
          product_details={order.product_details}
          id={order._id}
        ></OrderInvoice>
        {loader}
      </Paper>
    ))
  ) : (
    /**
     * This is in case no order was placed by the user
     */
    <Grid container justify="center" alignItems="center" direction="column">
      <h1>No Orders Placed Yet</h1>
      <h2>Please head to Cart Page</h2>
      {loader}
    </Grid>
  );
}

export default OrderList;
