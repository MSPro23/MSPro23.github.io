/**
 * @author Calvin Galbaw
 */

import { Button, Paper } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import "../../css/CartPage.css";
function Review({ activeStep, setActiveStep }) {
  const total_price = useSelector((state) => state.cartDetails.total_cost); //gets the total cost present in the cart details redux state
  /**
   * @description This function is to set the active step to next step
   * @returns sets the active step to its incremented value
   */
  const handleNext = () => {
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);
  };
  /**
   * @description It uses the paper component to create the container
   */
  return (
    <Paper className="reviewPanel" elevation={3}>
      <h2>Review Order</h2>
      <span>Subtotal</span>
      <p>{total_price}</p>
      <hr></hr>
      <span>GST(5%)</span>
      <p>{parseInt((parseInt(total_price) * 5) / 100)}</p>
      <hr></hr>
      <span>Order Total</span>
      <p>{parseInt((parseInt(total_price) * 105) / 100)}</p>
      <br></br>
      <br></br>
      <Button variant="contained" color="primary" onClick={handleNext}>
        Proceed to Buy
      </Button>
    </Paper>
  );
}

export default Review;
