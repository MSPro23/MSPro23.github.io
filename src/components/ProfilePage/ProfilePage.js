import { Grid, Paper } from "@material-ui/core";
import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import "../../css/ProfileSidePane.css";
import Button from "react-bootstrap/Button";
function ProfilePage() {
  return (
    <Paper elevation={3} style={{ padding: "15px" }}>
      <h2>Heading</h2>
      <hr></hr>
      <Row>
        <Col lg={3} className="UserDetailProfileTab">
          <p>
            <b>First Name</b>
          </p>
          <p>
            <b>Last Name</b>
          </p>
          <p>
            <b>Gender</b>
          </p>
          <p>
            <b>Date of Birth</b>
          </p>
          <p>
            <b>Mobile Number</b>
          </p>
          <p>
            <b>Email</b>
          </p>
        </Col>
        <Col lg={6} className="UserDetailProfileTab">
          <p>First Name</p>
          <p>Last Name</p>
          <p>Gender</p>
          <p>Date of Birth</p>
          <p>Mobile Number</p>
          <p>Email</p>
        </Col>
      </Row>
      <hr></hr>
      <Button style={{ backgroundColor: "white", color: "black" }}>
        {" "}
        Edit
      </Button>
    </Paper>
  );
}

export default ProfilePage;
