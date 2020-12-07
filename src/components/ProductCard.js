/**
 * @author Calvin Galbaw
 */

import { Snackbar } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { ToastContext } from "../App";
import "../css/Dashboard.css";
import { addProductToCart } from "../redux";
/**
 * @description It is used to create a card for a product
 * @param product is an object containing the details of the product to be display
 * @returns JSX which contains the image, details and the add to cart button
 */
function ProductCard({ product }) {
  const dispatch = useDispatch(); //creates a dispatch function to send dispatch a action
  const [openSnack, setOpenSnack] = useState({ show: false, message: "" }); //Creates a toast state
  const message = useSelector((state) => state.cartDetails.message); //get the message for the cart details redux
  const items = useSelector((state) => state.cartDetails.items); //gets the cart items present in the cart details redux state
  const history = useHistory(); //creates a useHistory hook to redirect page
  /**
   * @description This checks whether the item is present in the cart or not and show the toast message accordingly
   * @returns sets the toast state to visible along with its message and a dispatch action to add the product to cart
   */
  const handleClick = () => {
    if (
      items.some((item) => {
        return item.product_id === product.product_id;
      })
    ) {
      setOpenSnack({
        show: true,
        message: "Product Already added in the cart",
      });
    } else {
      setOpenSnack({ show: true, message: "Added to the cart" });
    }
    dispatch(addProductToCart(product));
  };
  /**
   * @description This handles the onClose of the toast component
   * @returns sets the toast to hide after some given time
   */
  const handleClose = () => {
    setTimeout(() => {
      setOpenSnack({
        ...openSnack,
        show: false,
        message: "",
      });
    }, 3000);
  };
  /**
   * @description This is the main card component of the product card which displays the details and image of the product
   *   and the toast required
   */
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
        <Link to={`/productDetail/${product.product_id}`}>
          <span>{product.product_name}</span>
        </Link>
        <br></br>
        <br></br>
        <b className="linkgap">{`₹${product.product_cost}`}</b>
        <br></br>
        <Button variant="danger" onClick={handleClick}>
          Add to Cart
        </Button>
      </div>
      {/**
       * This is the display rating component for react star ratings library
       */}
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
      <Snackbar
        open={openSnack.show}
        autoHideDuration={50000}
        message={openSnack.message}
        onClose={handleClose}
      ></Snackbar>
    </div>
  );
}

export default ProductCard;
