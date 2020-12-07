/**
 * @author Calvin Galbaw
 */
import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import "../../css/Dashboard.css";
import ProductCard from "../ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { getTopRating } from "../../redux";
import useLoader from "../../hooks/useLoader";
import { useHistory } from "react-router-dom";

function PopularProducts() {
  const data = useSelector((state) => state.topRating.data); //gets the product details present in the product redux state
  const dispatch = useDispatch(); //creates a dispatch function to send dispatch a action
  const loading = useSelector((state) => state.topRating.loading); //gets the loading value present in the product redux state
  const history = useHistory(); //creates a useHistory hook to redirect page

  const [loader, showLoader, hideLoader] = useLoader(); //gets the JSX component of the loader and its control
  /**
   * @description Handles the loader of the page using loading value from redux
   */
  useEffect(() => {
    loading ? showLoader() : hideLoader();
  }, [loading]);

  /**
   * @description This is used the get the popular items.
   * Dispatch is used to call the redux action which does the axios get call
   */
  useEffect(() => {
    dispatch(getTopRating());
  }, []);
  return (
    <div className="popularProductsTab">
      <h4>Popular Products</h4>
      <Button
        variant="outline-primary"
        className="viewAllButton"
        onClick={() => history.push("/products")}
      >
        View All
      </Button>
      <Row>
        {data.length !== 0 &&
          data.map((product) => {
            return (
              <Col lg={3} sm={12} key={product._id}>
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
