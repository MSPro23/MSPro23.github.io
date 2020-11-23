import {
  faFacebookF,
  faGoogle,
  faPinterest,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "react-bootstrap/esm/Button";
import StarRatings from "react-star-ratings";
function ProductControlTab({ details }) {
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
      <Button style={{ backgroundColor: "#00acee" }}>Add to Cart</Button>
      &nbsp;&nbsp;
      <Button style={{ backgroundColor: "#754b10" }}>Rate Product</Button>
    </div>
  );
}

export default ProductControlTab;
