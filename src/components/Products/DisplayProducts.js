/**
 * @author Calvin Galbaw
 */

import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import StarIcon from "@material-ui/icons/Star";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ProductCard from "../ProductCard";
import Pagination from "react-bootstrap/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../redux";
import ProductErrorPage from "./ProductErrorPage";
import useLoader from "../../hooks/useLoader";
function DisplayProducts({ filter, setFilter }) {
  const [active, setActive] = useState(1);
  /**
   * @description Getting the required states from the product redux
   */
  const data = useSelector((state) => state.product.data);
  const total_count = useSelector((state) => state.product.total_count);
  const loading = useSelector((state) => state.product.loading);
  const dispatch = useDispatch();

  const [loader, showLoader, hideLoader] = useLoader();
  useEffect(() => {
    loading ? showLoader() : hideLoader();
  }, [loading]);
  /**
   * @description Dispatches the action get all products along with a filter everytime filter gets updated which define the
   * products required like category color etc
   */

  useEffect(() => {
    dispatch(getAllProducts(filter));
  }, [filter]);
  /**
   * @description This increments the page counter by 1 and sets the filer page number according to it
   */
  const onClickNext = () => {
    setActive(active + 1);
    setFilter({
      ...filter,
      pageNo: active + 1,
    });
  };
  /**
   * @description This decrements the page counter by 1 and sets the filer page number according to it
   */
  const onClickPrev = () => {
    setActive(active - 1);
    setFilter({
      ...filter,
      pageNo: active - 1,
    });
  };
  /**
   * @description This sets the page counter to the one which was clicked and sets the filer page number according to it
   */
  const onClickPage = (j) => {
    setActive(j);
    setFilter({
      ...filter,
      pageNo: j,
    });
  };
  /**
   * @description This sets the filter to sort the products in descending order according to ratings and reset the page to the start
   */
  const onRatingClick = () => {
    setFilter({
      ...filter,
      sortBy: "product_rating",
      sortIn: true,
      pageNo: 1,
      perPage: 8,
    });
  };
  /**
   * @description This sets the filter to sort the products in ascending order according to cost and reset the page to the start
   */
  const onIncreasingClick = () => {
    setFilter({
      ...filter,
      sortBy: "product_cost",
      sortIn: true,
      pageNo: 1,
      perPage: 8,
    });
  };
  /**
   * @description This sets the filter to sort the products in descending order according to cost and reset the page to the start
   */
  const onDecreasingClick = () => {
    setFilter({
      ...filter,
      sortBy: "product_cost",
      sortIn: false,
      pageNo: 1,
      perPage: 8,
    });
  };
  /**
   * @description This is used to get the pagination item element according to the number
   * of products present in the data that is fetched
   */
  const getPaginationItem = () => {
    let number = 8;
    let item = [];

    for (let i = 0, j = 1; i < total_count; i = i + number, j++) {
      item.push(
        <Pagination.Item
          key={i}
          onClick={() => onClickPage(j)}
          active={j === active}
        >
          {j}
        </Pagination.Item>
      );
    }
    return item;
  };
  /**
   * @description Here control buttons such as sorting and pagination are present
   * Along with the control Buttons product cards are contained in this component
   */
  return (
    <div className="mainProductContainer">
      {total_count !== 0 ? (
        <>
          <div>
            <h3 className="categoryHeading">
              {filter.category_id == ""
                ? "All Categories"
                : data[0].category_id.category_name}
            </h3>
            <span className="sortButtonContainer">
              Sort by:
              <Button className="sortButtons" onClick={onRatingClick}>
                <StarIcon></StarIcon>
              </Button>
              <Button className="sortButtons" onClick={onIncreasingClick}>
                {"₹"}
                <ArrowUpwardIcon></ArrowUpwardIcon>
              </Button>
              <Button className="sortButtons" onClick={onDecreasingClick}>
                {"₹"}
                <ArrowDownwardIcon></ArrowDownwardIcon>
              </Button>
            </span>
          </div>
          <Row>
            {
              /**
               * This is used to map each product to the product card which is to be displayed
               */
              data.map((product) => {
                return (
                  <Col lg={4} sm={12} key={product._id}>
                    <ProductCard
                      product={product}
                      key={product._id}
                    ></ProductCard>
                  </Col>
                );
              })
            }
          </Row>
          <Pagination>
            <Pagination.Prev disabled={1 === active} onClick={onClickPrev}>
              {"<"} Previous
            </Pagination.Prev>
            {getPaginationItem()}
            <Pagination.Next
              disabled={parseInt(total_count / 8) == active}
              onClick={onClickNext}
            >
              Next {">"}
            </Pagination.Next>
          </Pagination>
        </>
      ) : (
        <ProductErrorPage></ProductErrorPage>
      )}
      {loader}
    </div>
  );
}

export default DisplayProducts;
