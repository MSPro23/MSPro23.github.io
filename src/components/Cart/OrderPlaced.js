/**
 * @author Calvin Galbaw
 */

import { Button, Grid } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
/**
 * @description This is a functional component used to create the confirmation page of the order
 * @returns JSX containing the message and navigation button
 */
function OrderPlaced() {
  const history = useHistory();
  return (
    <Grid container justify="center" alignItems="center" direction="column">
      <h1
        style={{
          fontSize: "76px",
          fontWeight: "900",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        Thank you for your order
      </h1>
      <h6>Your order has been placed and is being processed</h6>
      <Button
        style={{ fontSize: "14px", marginBottom: "400px", marginTop: "20px" }}
        onClick={() => history.push("/dashboard")}
      >
        Back to Homepage
      </Button>
    </Grid>
  );
}

export default OrderPlaced;
