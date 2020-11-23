import React from "react";
import Button from "react-bootstrap/esm/Button";
import StarRatings from "react-star-ratings";
import "../css/Dashboard.css";
function ProductCard({ product }) {
  console.log(typeof parseFloat(product.product_rating));
  return (
    <div className="productTab">
      <img
        className="productImage"
        height="120px"
        width="100%"
        src={`http://180.149.241.208:3022/${product.product_image}`}
        alt="item"
      ></img>
      <div>
        <a href="#dsa">{product.product_name}</a>
        <br></br>
        <br></br>
        <b className="linkgap">{`₹${product.product_cost}`}</b>
        <br></br>
        <Button variant="danger">Add to Cart</Button>
      </div>
      <StarRatings
        className="starRating"
        rating={parseFloat(product.product_rating)}
        starRatedColor="yellow"
        starEmptyColor="grey"
        numberOfStars={5}
        name="rating"
        starDimension="15px"
        starSpacing="2px"
      />
    </div>
  );
}

export default ProductCard;
