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
function DisplayProducts({ filter, setFilter }) {
  const [active, setActive] = useState(1);

  const data = useSelector((state) => state.product.data);
  const total_count = useSelector((state) => state.product.total_count);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts(filter));
  }, [filter]);

  const onClickNext = () => {
    setActive(active + 1);
    setFilter({
      ...filter,
      pageNo: active + 1,
    });
  };

  const onClickPrev = () => {
    setActive(active - 1);
    setFilter({
      ...filter,
      pageNo: active - 1,
    });
  };

  const onClickPage = (j) => {
    setActive(j);
    setFilter({
      ...filter,
      pageNo: j,
    });
  };

  const onRatingClick = () => {
    setFilter({
      ...filter,
      sortBy: "product_rating",
      sortIn: true,
      pageNo: 1,
      perPage: 8,
    });
  };

  const onIncreasingClick = () => {
    setFilter({
      ...filter,
      sortBy: "product_cost",
      sortIn: true,
      pageNo: 1,
      perPage: 8,
    });
  };

  const onDecreasingClick = () => {
    setFilter({
      ...filter,
      sortBy: "product_cost",
      sortIn: false,
      pageNo: 1,
      perPage: 8,
    });
  };

  const getPaginationItem = () => {
    let number = 8;
    let item = [];

    for (let i = 0, j = 1; i < total_count; i = i + number, j++) {
      item.push(
        <Pagination.Item onClick={() => onClickPage(j)} active={j === active}>
          {j}
        </Pagination.Item>
      );
    }
    return item;
  };

  return (
    <div className="mainProductContainer">
      <div>
        <h3 className="categoryHeading">All Categories</h3>
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
        {data.length !== 0 &&
          data.map((product) => {
            return (
              <Col lg={4} sm={12}>
                <ProductCard product={product} key={product._id}></ProductCard>
              </Col>
            );
          })}
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
    </div>
  );
}

export default DisplayProducts;
