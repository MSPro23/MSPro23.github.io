/**
 * @author Calvin Galbaw
 */

import { TextField, Button } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import "../../css/ForgotPassword.css";
import useInput from "../../hooks/useInput";
import { useSelector, useDispatch } from "react-redux";
import { postForgotPassword, resetForgotPassword } from "../../redux";
import { useHistory } from "react-router-dom";
import { LoginContext, ToastContext } from "../../App";
import useLoader from "../../hooks/useLoader";
/**
 * @description This is a functional component used to create the forgot Password auth form of the forgot address Page
 * @returns JSX containing the form components of Material UI
 */
function ForgotPasswordAuth() {
  /**
   * States and binds of controlled form data is initialized
   */
  const [email, emailBind] = useInput();
  /**
   * This defines the state of errors and its messages for each input element,
   */
  const [errorState, setErrorState] = useState({
    emailError: false,
    emailErrorMessage: "",
  });
  /**
   * Similarly submitStatus holds the truth value for enabling or disabling the submit button
   */
  const [submitStatus, setSubmitStatus] = useState({
    emailStatus: true,
  });

  const history = useHistory(); //creates a useHistory hook to redirect page
  const [open, setOpen] = useContext(ToastContext); //getting the toast component state and setState using hooks
  const [loginStatus, setLoginStatus] = useContext(LoginContext); //getting the login state and setState using hooks

  const message = useSelector((state) => state.forgotPassword.message); //gets the message string present in the forgot password redux state
  const success = useSelector((state) => state.forgotPassword.success); //gets the success value present in the forgot password redux state
  const completed = useSelector((state) => state.forgotPassword.completed); //gets the completed value present in the forgot password redux state
  const loading = useSelector((state) => state.forgotPassword.loading); //gets the loading value present in the forgot password redux state
  const dispatch = useDispatch(); //creates a dispatch function to send dispatch a action

  const [loader, showLoader, hideLoader] = useLoader(); //gets the JSX component of the loader and its control

  /**
   * @description Handles the loader of the page using loading value from redux
   */
  useEffect(() => {
    loading ? showLoader() : hideLoader();
  }, [loading]);

  /**
   * @description Checks if the user is logged in or not to be called back
   */
  useEffect(() => {
    loginStatus.isLoggedIn && history.push("/dashboard");
  });
  /**
   *
   * @description This checks the validity of email and updates the state and the error message accordingly
   * @returns The error message and the error state is set depending on validity of email value
   */
  const emailValidation = () => {
    let pattern = /^\w{1,}(\.|)\w{1,}@\w{1,}\.(com|co.in|in|net)$/;
    if (email === "") {
      setErrorState({
        ...errorState,
        emailError: true,
        emailErrorMessage: "This feild is necessary",
      });
      setSubmitStatus({ ...submitStatus, emailStatus: true });
    } else {
      if (!pattern.test(email)) {
        setErrorState({
          ...errorState,
          emailError: true,
          emailErrorMessage: "Invalid Email",
        });
        setSubmitStatus({ ...submitStatus, emailStatus: true });
      } else {
        setErrorState({
          ...errorState,
          emailError: false,
          emailErrorMessage: "",
        });
        setSubmitStatus({ ...submitStatus, emailStatus: false });
      }
    }
  };
  /**
   * @description This dispatches the action of reset password along with email data
   */
  const onForgotPasswordSubmit = () => {
    dispatch(
      postForgotPassword({
        email: email,
      })
    );
  };
  /**
   * @description This is used to check the status of the dispatch action and inform the user accordingly
   */
  useEffect(() => {
    if (success == true && completed) {
      setOpen({ show: true, message: message.message });
      localStorage.setItem("recover_token", message.token);
      // dispatch(fetchcart())
      dispatch(resetForgotPassword());
      history.push("/recover");
    } else if (success == false && completed) {
      setOpen({
        show: true,
        message: message.message,
      });
      dispatch(resetForgotPassword());
    }
  }, [success, completed, loading]);

  return (
    <div className="forgotAuth">
      <h1>Recover Password</h1>
      <TextField
        error={errorState.emailError}
        helperText={errorState.emailErrorMessage}
        variant="outlined"
        label="Email"
        value={email}
        onBlur={emailValidation}
        {...emailBind}
        className="emailAuthForm"
      ></TextField>
      <Button
        variant="contained"
        color="primary"
        className="emailAuthButton"
        onClick={onForgotPasswordSubmit}
        disabled={submitStatus.emailStatus}
      >
        Submit
      </Button>
      {loader}
    </div>
  );
}

export default ForgotPasswordAuth;
