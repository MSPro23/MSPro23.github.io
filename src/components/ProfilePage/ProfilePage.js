/**
 * @author Calvin Galbaw
 */

import { Grid, Paper } from "@material-ui/core";
import React, { useContext } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import "../../css/ProfileSidePane.css";
import Button from "react-bootstrap/Button";
import { LoginContext } from "../../App";
import { useHistory } from "react-router-dom";
function ProfilePage({ profileData }) {
  const history = useHistory();
  /**
   * @description This shows the profile details of the user using Paper as a container and row and
   * col from bootstrap to create columns
   */
  return (
    <Paper
      elevation={3}
      style={{ padding: "15px", width: "90%" }}
      className="profilePaper"
    >
      <h2>Profile</h2>
      <hr></hr>
      <Row>
        <Col lg={3} sm={3} className="UserDetailProfileTab">
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
        <Col lg={3} sm={3} className="UserDetailProfileTab">
          <p>{profileData.first_name}</p>
          <p>{profileData.last_name}</p>
          <p>{profileData.gender}</p>
          <p>{new Date(profileData.dob).toDateString()}</p>
          <p>{profileData.phone_no}</p>
          <p>{profileData.email}</p>
        </Col>
      </Row>
      <hr></hr>
      <Button
        style={{ backgroundColor: "white", color: "black" }}
        onClick={() => history.push("/MyAccount/editProfile")}
      >
        {" "}
        Edit
      </Button>
    </Paper>
  );
}

export default ProfilePage;
