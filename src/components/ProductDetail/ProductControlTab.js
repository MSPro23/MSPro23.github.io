/**
 * @author Calvin Galbaw
 */

import {
  faFacebookF,
  faGoogle,
  faPinterest,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Snackbar } from "@material-ui/core";
import Axios from "axios";
import React, { useContext, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useDispatch, useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import { ToastContext } from "../../App";
import { addProductToCart } from "../../redux";
import RatingPage from "./RatingPage";
/**
 *
 *
 * @description This holds the controls such as rating and order of the products
 * @returns JSX of the product filter control
 */
function ProductControlTab({ details }) {
  const [ratingTab, setRatingTab] = useState(false);
  const [openSnack, setOpenSnack] = useState({ show: false, message: "" });
  const dispatch = useDispatch();
  const message = useSelector((state) => state.cartDetails.message);
  const items = useSelector((state) => state.cartDetails.items);
  /**
   * @description This checks whether the item is present in the cart or not and shows the toast message accordingly
   * and sends the product to be added to the cart
   */
  const handleClick = () => {
    if (
      items.some((item) => {
        return item.product_id === details.product_id;
      })
    ) {
      setOpenSnack({
        show: true,
        message: "Product Already added in the cart",
      });
    } else {
      setOpenSnack({ show: true, message: "Added to the cart" });
    }
    dispatch(addProductToCart(details));
  };
  /**
   * @description handles the onClose event of the toast to reset itself
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
   * @descriptiom This component contains the details of product such as name cost color rating along with add to cart button
   * and give rating button
   */
  return (
    <div className="productPriceContainer">
      <h2>{details.product_name}</h2>
      <StarRatings
        className="starRating"
        rating={parseFloat(details.product_rating)}
        starRatedColor="yellow"
        starEmptyColor="gray"
        starHoverColor="red"
        numberOfStars={5}
        name="rating"
        starDimension="18px"
        starSpacing="4px"
      />
      <hr></hr>
      <p>Price: ₹{details.product_cost}</p>
      <p>
        Color:{" "}
        <span
          style={{
            backgroundColor: details.color_id.color_code,
            width: "40px",
            height: "20px",
            display: "inline-block",
            position: "relative",
            top: "3px",
          }}
        ></span>
      </p>
      <br></br>
      {/**
       * These are social share buttons to share the products
       */}
      <p>
        Share <FontAwesomeIcon size="lg" icon={faShareAlt}></FontAwesomeIcon>
      </p>
      <Button
        className="shareButton"
        style={{ backgroundColor: "rgb(219,68,55)" }}
      >
        <FontAwesomeIcon size="lg" icon={faGoogle}></FontAwesomeIcon>
      </Button>
      <Button
        className="shareButton"
        style={{ backgroundColor: "rgb(66,103,178)", width: "45px" }}
      >
        <FontAwesomeIcon size="lg" icon={faFacebookF}></FontAwesomeIcon>
      </Button>
      <Button
        className="shareButton"
        style={{ backgroundColor: "rgb(37,211,102)" }}
      >
        <FontAwesomeIcon size="lg" icon={faWhatsapp}></FontAwesomeIcon>
      </Button>
      <Button
        className="shareButton"
        style={{ backgroundColor: "rgb(189,9,29)" }}
      >
        <FontAwesomeIcon size="lg" icon={faPinterest}></FontAwesomeIcon>
      </Button>
      <Button
        className="shareButton"
        style={{ backgroundColor: "rgb(0,172,238)" }}
      >
        <FontAwesomeIcon size="lg" icon={faTwitter}></FontAwesomeIcon>
      </Button>
      <br></br>
      <br></br>
      <Button onClick={handleClick} style={{ backgroundColor: "#00acee" }}>
        Add to Cart
      </Button>
      &nbsp;&nbsp;
      {/**
       * Rating button opens a modal which is used to give the rating of a product
       */}
      <Button
        style={{ backgroundColor: "#754b10" }}
        onClick={() => setRatingTab(true)}
      >
        Rate Product
      </Button>
      {ratingTab && (
        <RatingPage
          id={details.product_id}
          setRatingTab={setRatingTab}
        ></RatingPage>
      )}
      <Snackbar
        open={openSnack.show}
        autoHideDuration={50000}
        message={openSnack.message}
        onClose={handleClose}
      ></Snackbar>
    </div>
  );
}

export default ProductControlTab;
