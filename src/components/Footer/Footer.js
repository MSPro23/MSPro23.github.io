/**
 * @author Calvin Galbaw
 */

import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AboutCompany from "./AboutCompany.js";
import Information from "./Information.js";
import Newsletter from "./Newsletter.js";
import "../../css/Footer.css";
/**
 * @description Creates the footer using the row and col of bootstrap
 */
function Footer() {
  return (
    <div className="footer">
      <Row className="justify-content-md-center">
        <Col>
          <AboutCompany></AboutCompany>
        </Col>
        <Col>
          <Information></Information>
        </Col>
        <Col>
          <Newsletter></Newsletter>
        </Col>
      </Row>
      <Row className="justify-content-md-center copyright">
        <Col className="footerTab">
          Copyright 2017 NeoSOFT Technologies All rights reserved | Design By
          Shubham Soni
        </Col>
      </Row>
    </div>
  );
}

export default Footer;
