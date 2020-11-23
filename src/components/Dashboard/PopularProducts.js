import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import "../../css/Dashboard.css";
import ProductCard from "../ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { getTopRating } from "../../redux";

function PopularProducts() {
  const data = useSelector((state) => state.topRating.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopRating());
  }, []);

  return (
    <div className="popularProductsTab">
      <h4>Popular Products</h4>
      <Button variant="outline-primary" className="viewAllButton">
        View All
      </Button>
      <Row>
        {data.length !== 0 &&
          data.map((product) => {
            return (
              <Col lg={3} sm={12}>
                <ProductCard
                  product={product.DashboardProducts[0]}
                  key={product._id}
                ></ProductCard>
              </Col>
            );
          })}
      </Row>
    </div>
  );
}

export default PopularProducts;
