/**
 * @author Calvin Galbaw
 */

import { faBorderNone } from "@fortawesome/free-solid-svg-icons";
import { Button, Grid, Paper } from "@material-ui/core";
import Axios from "axios";
import React, { useContext, useState } from "react";
import StarRatings from "react-star-ratings";
import { LoginContext, ToastContext } from "../../App";
import "../../css/ProductDetail.css";
function RatingPage({ setRatingTab, id }) {
  const [loginStatus, setLoginStatus] = useContext(LoginContext);
  const [open, setOpen] = useContext(ToastContext);
  const onchangeRating = () => {
    Axios.put(
      `http://180.149.241.208:3022/updateProductRatingByCustomer`,
      {
        product_id: id,
        product_rating: rating,
      },
      {
        headers: {
          Authorization: `bearer ${localStorage.token}`,
        },
      }
    )
      .then((res) => {
        setOpen({
          show: true,
          message: res.data.message,
        });
      })
      .catch((e) => {
        console.log(e);
      });

    setRatingTab(false);
  };
  const [rating, setRating] = useState(0);
  const changeRating = (newRating, name) => {
    setRating(newRating);
  };
  return loginStatus.isLoggedIn ? (
    <div className="ratingContainer">
      <Paper className="ratingBox" elevation={5}>
        <button
          onClick={() => setRatingTab(false)}
          style={{
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "0 !important",
            float: "right",
            backgroundColor: "red",
          }}
        >
          X
        </button>

        <h3 style={{ textAlign: "center" }}>Rating</h3>
        <hr></hr>
        <Grid container direction="column" alignItems="center" justify="center">
          <StarRatings
            rating={rating}
            starRatedColor="yellow"
            starEmptyColor="gray"
            starHoverColor="red"
            changeRating={changeRating}
            numberOfStars={5}
            name="rating"
          />
          <br></br>
          <br></br>
          <Button
            variant="contained"
            color="secondary"
            style={{ margin: "0 auto" }}
            onClick={onchangeRating}
          >
            Rate It
          </Button>
        </Grid>
      </Paper>
    </div>
  ) : (
    <div className="ratingContainer">
      <Paper className="ratingBox" elevation={5}>
        <button
          onClick={() => setRatingTab(false)}
          style={{
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "0 !important",
            float: "right",
            backgroundColor: "red",
          }}
        >
          X
        </button>
        <div style={{ textAlign: "center", marginTop: "25%" }}>
          <h3>You need to logged in</h3>
        </div>
      </Paper>
    </div>
  );
}

export default RatingPage;
