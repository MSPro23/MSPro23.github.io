import { Button, Paper } from "@material-ui/core";
import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

function OrderList() {
  return (
    <Paper elevation={3} style={{ padding: "15px" }}>
      <p>
        <span style={{ color: "#CB7C13", fontWeight: "600" }}>TRANSIT</span>{" "}
        Order By: ORDER_NO108
      </p>
      <p style={{ fontSize: "11px" }}>Placed on</p>
      <hr></hr>
      <Row>
        <Col lg={3} sm={4}></Col>
      </Row>
      <hr></hr>
      <Button variant="contained" color="primary">
        Download Invoice as PDF
      </Button>
    </Paper>
  );
}

export default OrderList;
