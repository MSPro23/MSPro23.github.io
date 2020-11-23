import { TextField, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "../../css/ForgotPassword.css";
import useInput from "../../hooks/useInput";
import { useSelector, useDispatch } from "react-redux";
import { postRecoverPassword } from "../../redux";

function ForgotPasswordForm() {
  const [email, emailBind] = useInput("");
  const [password, passwordBind] = useInput("");
  const [confirmPassword, confirmPasswordBind] = useInput("");

  const [errorState, setErrorState] = useState({
    emailError: false,
    emailErrorMessage: "",
    passwordError: false,
    passwordErrorMessage: "",
    confirmPasswordError: false,
    confirmPasswordErrorMessage: "",
  });

  const [submitStatus, setSubmitStatus] = useState({
    emailStatus: true,
    passwordStatus: true,
    confirmPasswordStatus: true,
  });

  const message = useSelector((state) => state.recoverPassword.message);
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

  const passwordValidation = () => {
    if (password === "") {
      setErrorState({
        ...errorState,
        passwordErrorMessage: "This feild is compulsory",
        passwordError: true,
      });
      setSubmitStatus({ ...submitStatus, passwordStatus: true });
    } else {
      if (password.length < 8 || password.length > 12) {
        setErrorState({
          ...errorState,
          passwordErrorMessage: "Length should be 8 to 12 characters long",
          passwordError: true,
        });
        setSubmitStatus({ ...submitStatus, passwordStatus: true });
      } else {
        let alphanumeric = "^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$";
        if (!password.match(alphanumeric)) {
          setErrorState({
            ...errorState,
            passwordErrorMessage: "Only alphanumeric characters allowed",
            passwordError: true,
          });
          setSubmitStatus({ ...submitStatus, passwordStatus: true });
        } else {
          setErrorState({
            ...errorState,
            passwordErrorMessage: "",
            passwordError: false,
          });
          setSubmitStatus({ ...submitStatus, passwordStatus: false });
        }
      }
    }
  };

  const confirmPasswordValidation = () => {
    if (confirmPassword === "") {
      setErrorState({
        ...errorState,
        confirmPasswordErrorMessage: "This feild is compulsory",
        confirmPasswordError: true,
      });
      setSubmitStatus({ ...submitStatus, confirmPasswordStatus: true });
    } else {
      if (confirmPassword.length < 8 || confirmPassword.length > 12) {
        setErrorState({
          ...errorState,
          confirmPasswordErrorMessage:
            "Length should be 8 to 12 characters long",
          confirmPasswordError: true,
        });
        setSubmitStatus({ ...submitStatus, confirmPasswordStatus: true });
      } else {
        let alphanumeric = "^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$";
        if (!confirmPassword.match(alphanumeric)) {
          setErrorState({
            ...errorState,
            confirmPasswordErrorMessage: "Only alphanumeric characters allowed",
            confirmPasswordError: true,
          });
          setSubmitStatus({ ...submitStatus, confirmPasswordStatus: true });
        } else if (confirmPassword !== password) {
          setErrorState({
            ...errorState,
            confirmPasswordErrorMessage: "Passwords don't match",
            confirmPasswordError: true,
          });
          setSubmitStatus({ ...submitStatus, confirmPasswordStatus: true });
        } else {
          setErrorState({
            ...errorState,
            confirmPasswordErrorMessage: "",
            confirmPasswordError: false,
          });
          setSubmitStatus({ ...submitStatus, confirmPasswordStatus: false });
        }
      }
    }
  };

  const onRecoverPasswordSubmit = () => {
    dispatch(
      postRecoverPassword({
        otpCode: email,
        newPass: password,
        confirmPass: confirmPassword,
      })
    );
  };

  useEffect(() => {
    message && alert(message);
  }, [message]);

  return (
    <div className="forgotAuth">
      <h1>Recover Password</h1>
      <span className="forgotPasswordInfo">
        Verification code has been sent to your registration mail ID
      </span>
      <TextField
        error={errorState.emailError}
        helperText={errorState.emailErrorMessage}
        variant="outlined"
        value={email}
        onBlur={emailValidation}
        {...emailBind}
        label="Verification code"
        className="emailAuthForm"
      ></TextField>
      <TextField
        error={errorState.passwordError}
        helperText={errorState.passwordErrorMessage}
        variant="outlined"
        onBlur={passwordValidation}
        value={password}
        {...passwordBind}
        label="New Password"
        className="emailAuthForm"
      ></TextField>
      <TextField
        error={errorState.confirmPasswordError}
        helperText={errorState.confirmPasswordErrorMessage}
        variant="outlined"
        value={confirmPassword}
        onBlur={confirmPasswordValidation}
        {...confirmPasswordBind}
        label="Confirm Password"
        className="emailAuthForm"
      ></TextField>
      <Button
        variant="contained"
        color="primary"
        className="emailAuthButton"
        onClick={onRecoverPasswordSubmit}
        disabled={
          // submitStatus.emailStatus ||
          submitStatus.passwordStatus || submitStatus.confirmPasswordStatus
        }
      >
        Submit
      </Button>
    </div>
  );
}

export default ForgotPasswordForm;
