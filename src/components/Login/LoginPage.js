/**
 * @author Calvin Galbaw
 */

import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col";
import SocialLogin from "./SocialLogin.js";
import LoginForm from "./LoginForm.js";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
/**
 * @description This the parent component to hold the login form and other ccomponents
 * @returns JSX of the login page
 */
function LoginPage() {
  const history = useHistory();
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
            <Button color="primary" onClick={() => history.push("/register")}>
              {" "}
              Register Form
            </Button>
          </div>
        </Col>
        <Col lg={6}>
          <Button
            color="primary"
            onClick={() => history.push("/forgotPassword")}
          >
            Forgotten?
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default LoginPage;
