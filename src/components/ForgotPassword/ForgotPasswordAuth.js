import { TextField, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "../../css/ForgotPassword.css";
import useInput from "../../hooks/useInput";
import { useSelector, useDispatch } from "react-redux";
import { postForgotPassword } from "../../redux";

function ForgotPasswordAuth() {
  const [email, emailBind] = useInput();
  const [errorState, setErrorState] = useState({
    emailError: false,
    emailErrorMessage: "",
  });

  const [submitStatus, setSubmitStatus] = useState({
    emailStatus: true,
  });

  const message = useSelector((state) => state.forgotPassword.message);
  const dispatch = useDispatch();
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

  const onForgotPasswordSubmit = () => {
    dispatch(
      postForgotPassword({
        email: email,
      })
    );
  };

  useEffect(() => {
    message && alert(message);
  }, [message]);

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
    </div>
  );
}

export default ForgotPasswordAuth;
