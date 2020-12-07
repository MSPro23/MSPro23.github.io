/**
 * @author Calvin Galbaw
 */

import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
/**
 * @description This functional component is used to create an error page
 * @returns JSX creating a page
 */
function NoPage() {
  return (
    <Row style={{ margin: "40px 20px 200px" }}>
      <Col lg={6} sm={12}>
        <img
          src="https://i.pinimg.com/originals/de/98/9c/de989c6f892919f76f48f03c60e6ad39.png"
          style={{
            width: "500px",
            height: "400px",
          }}
          alt="Goofy"
        ></img>
      </Col>
      <Col>
        <div style={{ textAlign: "center" }}>
          <h1>OOPs </h1>
          <br></br>
          <h2>404 No page Found</h2>
          <br></br>
          <h3>We cant't seem to find the page you're looking for.</h3>
        </div>
      </Col>
    </Row>
  );
}

export default NoPage;
