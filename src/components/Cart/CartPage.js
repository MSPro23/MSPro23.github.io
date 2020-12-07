/**
 * @author Calvin Galbaw
 */

import React, { useContext } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import CartDetails from "./CartDetails";
import Review from "./Review";
import "../../css/CartPage.css";
import CartAddressPage from "./CartAddressPage";
import { Grid, Step, StepButton, Stepper, Typography } from "@material-ui/core";
import Button from "react-bootstrap/esm/Button";
import { useSelector } from "react-redux";
import { LoginContext } from "../../App";
import { useHistory } from "react-router-dom";

/**
 * @description This is a functional component used to create the parent component for the cart page
 * @returns JSX containing the stepper from material UI to hold 2 tabs
 */

function CartPage() {
  const history = useHistory(); //creates a useHistory hook to redirect page
  const cartItems = useSelector((state) => state.cartDetails.items); //gets the cart items present in the cart details redux state
  const [loginStatus, setLoginStatus] = useContext(LoginContext); //getting the login state and setState using hooks

  const [activeStep, setActiveStep] = React.useState(0); //creates the state to indicate which tab to be open
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();
  /**
   * @description used to hold the title of tabs
   * @returns array of strings about the title of the tabs
   */
  function getSteps() {
    return ["Cart", "Deliver Address"];
  }
  /**
   * @description This function handles what content should be displayed according to the step
   * It uses the switch case as the conditional code with step as the condition
   * @param step is the indication which tab is active or selected
   * @returns JSX of either the cart tab (step=0) or select address tab (step=1) depending on the step set active
   */
  function getStepContent(step) {
    switch (step) {
      case 0:
        return cartItems.length != 0 ? (
          <div className="cartContainer">
            <Row>
              <Col lg={8}>
                <CartDetails></CartDetails>
              </Col>
              <Col lg={4}>
                <Review
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                ></Review>
              </Col>
            </Row>
          </div>
        ) : (
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <img
              src="http://180.149.241.208:3023/assets/images/emptycart.png"
              style={{ width: "100px", height: "100px" }}
              alt=""
            ></img>
            <span style={{ fontSize: "24px" }}>
              YOUR CART IS CURRENTLY EMPTY
            </span>
            <span>
              {" "}
              Before proceed to checkout you must add some products to you
              shopping cart.
            </span>
            <span>
              You will find lots of intresting products on our products page
            </span>
            <Button
              color="primary"
              variant="contained"
              onClick={() => history.push("/products")}
            >
              Return to Product Page
            </Button>
          </Grid>
        );
      case 1:
        if (!loginStatus.isLoggedIn) {
          alert("Please Login First");
          history.push("/login");
          return;
        } else if (cartItems.length == 0) {
          return (
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
            >
              <img
                src="http://180.149.241.208:3023/assets/images/emptycart.png"
                alt=""
                style={{ width: "100px", height: "100px" }}
              ></img>
              <span style={{ fontSize: "24px" }}>
                YOUR CART IS CURRENTLY EMPTY
              </span>
              <span>
                {" "}
                Before proceed to checkout you must add some products to you
                shopping cart.
              </span>
              <span>
                You will find lots of intresting products on our products page
              </span>
              <Button
                color="primary"
                variant="contained"
                onClick={() => history.push("/products")}
              >
                Return to Product Page
              </Button>
            </Grid>
          );
        } else {
          return (
            <div className="cartContainer">
              <CartAddressPage></CartAddressPage>
            </div>
          );
        }
      default:
        return "Unknown step";
    }
  }
  /**
   * @description This function is to set the active step to new updated value
   * @param step is the current step needed to be active
   * @returns sets the active step to the current step value
   */
  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  /**
   * @description Stepper component of Material UI is used to create the stepper
   */
  return (
    <div style={{ marginBottom: "70px" }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton
              onClick={handleStep(index)}
              completed={completed[index]}
            >
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        <div>
          <Typography component="div">{getStepContent(activeStep)}</Typography>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
