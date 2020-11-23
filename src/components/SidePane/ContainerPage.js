import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import AddressPage from "../Address/AddressPage";
import EditPassword from "../EditPassword/EditPassword";
import OrderList from "../Order List/OrderList";
import ProfilePage from "../ProfilePage/ProfilePage";
import ProfileSidePane from "./ProfileSidePane";
function ContainerPage() {
  return (
    <div>
      <h2>My Account</h2>
      <hr></hr>
      <Row>
        <Col lg={3} sm={12}>
          <ProfileSidePane></ProfileSidePane>
        </Col>
        <Col lg={9} sm={12}>
          <EditPassword></EditPassword>
        </Col>
      </Row>
    </div>
  );
}

export default ContainerPage;
