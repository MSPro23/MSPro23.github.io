import React, { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import DisplayProducts from "./DisplayProducts";
import ProductSidePanel from "./ProductSidePanel";

function Products() {
  const [filter, setFilter] = useState({
    category_id: "",
    color_id: "",
    sortBy: "",
    sortIn: "",
    pageNo: 1,
    perPage: 8,
  });

  return (
    <div className="productsPageContainer">
      <hr></hr>
      <Row>
        <Col lg={3}>
          <ProductSidePanel
            filter={filter}
            setFilter={setFilter}
          ></ProductSidePanel>
        </Col>
        <Col lg={9}>
          <DisplayProducts
            filter={filter}
            setFilter={setFilter}
          ></DisplayProducts>
        </Col>
      </Row>
    </div>
  );
}

export default Products;
