import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col";
import SocialLogin from "./SocialLogin.js";
import LoginForm from "./LoginForm.js";
import Button from "@material-ui/core/Button";

function LoginPage() {
  return (
    <div className="loginPageContainer">
      <Row>
        <Col lg={6}>
          <SocialLogin></SocialLogin>
        </Col>
        <Col lg={6}>
          <LoginForm></LoginForm>
        </Col>
      </Row>
      <Row className="loginNavContainer">
        <Col lg={6}>
          <div className="dividerContainer">
            <Button color="primary"> Register Form</Button>
          </div>
        </Col>
        <Col lg={6}>
          <Button color="primary">Forgotten?</Button>
        </Col>
      </Row>
    </div>
  );
}

export default LoginPage;
