/**
 * @author Calvin Galbaw
 */

import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import DisplayProducts from "./DisplayProducts";
import ProductSidePanel from "./ProductSidePanel";

function Products({ match }) {
  /**
   * @description Filter defines the products type selected by the user
   * It reflects the users search for the product
   * It is drilled down to its child components as props
   */
  useEffect(() => {
    setFilter({
      ...filter,
      name: match.params.name == undefined ? "" : match.params.name,
    });
  }, [match]);
  const [filter, setFilter] = useState({
    category_id:
      match.params.id == undefined || match.params.id == "h"
        ? ""
        : match.params.id,
    name: match.params.name == undefined ? "" : match.params.name,
    color_id: "",
    sortBy: "",
    sortIn: "",
    pageNo: 1,
    perPage: 8,
  });
  /**
   * @description This container has the product side panel and the main products display component
   */
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
