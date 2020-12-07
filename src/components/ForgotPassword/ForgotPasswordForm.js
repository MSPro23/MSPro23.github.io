/**
 * @author Calvin Galbaw
 */

import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import "../../css/ForgotPassword.css";
import useInput from "../../hooks/useInput";
import { useSelector, useDispatch } from "react-redux";
import { postRecoverPassword, resetRecoverPassword } from "../../redux";
import { LoginContext, ToastContext } from "../../App";
import { useHistory } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import useLoader from "../../hooks/useLoader";

function ForgotPasswordForm() {
  /**
   * @description Create custom styles for the material UI
   */
  const useStyles = makeStyles({
    helperPass: {
      "& .MuiFormHelperText-contained": {
        margin: "0 0 0 60%",
        "@media (max-width:400px)": {
          margin: "0 0 0 15%",
        },
      },
    },
    helperMobile: {
      "& .MuiFormHelperText-contained": {
        margin: "0 0 0 95%",
        "@media (max-width:400px)": {
          margin: "0 0 0 80%",
        },
      },
    },
  });

  const classes = useStyles();
  /**
   * States and binds of controlled form data is initialized
   */
  const [email, emailBind] = useInput("");
  const [password, passwordBind] = useInput("");
  const [confirmPassword, confirmPasswordBind] = useInput("");

  /**
   * This defines the state of errors and its messages for each input element,
   *
   */
  const [errorState, setErrorState] = useState({
    emailError: false,
    emailErrorMessage: "",
    passwordError: false,
    passwordErrorMessage: "8-12 Alphanumeric characters",
    confirmPasswordError: false,
    confirmPasswordErrorMessage: "8-12 Alphanumeric characters",
  });
  /**
   * Similarly submitStatus holds the truth value for enabling or disabling the submit button
   */
  const [submitStatus, setSubmitStatus] = useState({
    emailStatus: true,
    passwordStatus: true,
    confirmPasswordStatus: true,
  });

  const history = useHistory(); //creates a useHistory hook to redirect page
  const [open, setOpen] = useContext(ToastContext); //getting the toast component state and setState using hooks
  const [loginStatus, setLoginStatus] = useContext(LoginContext); //getting the login state and setState using hooks

  const message = useSelector((state) => state.recoverPassword.message); //gets the message string present in the forgot password redux state
  const success = useSelector((state) => state.recoverPassword.success); //gets the success value present in the forgot password redux state
  const completed = useSelector((state) => state.recoverPassword.completed); //gets the completed value present in the forgot password redux state
  const loading = useSelector((state) => state.recoverPassword.loading); //gets the loading value present in the forgot password redux state
  const dispatch = useDispatch(); //creates a dispatch function to send dispatch a action

  const [loader, showLoader, hideLoader] = useLoader(); //gets the JSX component of the loader and its control
  /**
   * @description Handles the loader of the page using loading value from redux
   */
  useEffect(() => {
    loading ? showLoader() : hideLoader();
  }, [loading]);

  /**
   * This state hold the password visibility value
   */

  const [values, setValues] = React.useState({
    showPassword: false,
    showConfirmPassword: false,
  });

  /**
   * @description these 2 functions change the visibility logic of its corresponding form
   */

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
  };

  /**
   * @description prevents the form from being reset to default values
   * @param  event  is a synthetic event
   */
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  /**
   *
   * @description This checks the validity of email and updates the state and the error message accordingly
   * @returns The error message and the error state is set depending on validity of email value
   */
  const emailValidation = () => {
    if (email === "") {
      setErrorState({
        ...errorState,
        emailError: true,
        emailErrorMessage: "This feild is necessary",
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
  };
  /**
   *
   * @description This checks the validity of password and updates the state and the error message accordingly
   * @returns The error message and the error state is set depending on validity of password value
   */
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
            passwordErrorMessage: "8-12 Alphanumeric characters",
            passwordError: false,
          });
          setSubmitStatus({ ...submitStatus, passwordStatus: false });
        }
      }
    }
  };

  /**
   *
   * @description This checks the validity of confirm password and updates the state and the error message accordingly
   * @returns The error message and the error state is set depending on validity of confirm password value
   */

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
            confirmPasswordErrorMessage: "8-12 Alphanumeric characters",
            confirmPasswordError: false,
          });
          setSubmitStatus({ ...submitStatus, confirmPasswordStatus: false });
        }
      }
    }
  };
  /**
   * @description This dispatches the action of reset password along with form data
   */

  const onRecoverPasswordSubmit = () => {
    dispatch(
      postRecoverPassword({
        otpCode: email,
        newPass: password,
        confirmPass: confirmPassword,
      })
    );
  };
  /**
   * @description This is used to check the status of the dispatch action and inform the user accordingly
   */
  useEffect(() => {
    if (success == true && completed) {
      setOpen({ show: true, message: message.message });
      dispatch(resetRecoverPassword());
      localStorage.removeItem("recover_token");
      history.push("/login");
    } else if (success == false && completed) {
      setOpen({
        show: true,
        message: message.message,
      });
      dispatch(resetRecoverPassword());
    }
  }, [success, completed, loading]);

  /**
   * @description Checks if the user is logged in or not to be called back
   */
  useEffect(() => {
    loginStatus.isLoggedIn && history.push("/dashboard");
  });

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
        className={`emailAuthForm`}
      ></TextField>
      <TextField
        fullWidth
        variant="outlined"
        className={`emailAuthForm ${
          !errorState.passwordError && classes.helperPass
        }`}
        label="New Password"
        type={values.showPassword ? "text" : "password"}
        value={password}
        error={errorState.passwordError}
        onBlur={passwordValidation}
        {...passwordBind}
        helperText={errorState.passwordErrorMessage}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        variant="outlined"
        className={`emailAuthForm ${
          !errorState.confirmPasswordError && classes.helperPass
        }`}
        label="Confirm Password"
        type={values.showConfirmPassword ? "text" : "password"}
        value={confirmPassword}
        error={errorState.confirmPasswordError}
        onBlur={confirmPasswordValidation}
        {...confirmPasswordBind}
        helperText={errorState.confirmPasswordErrorMessage}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowConfirmPassword}
                onMouseDown={handleMouseDownConfirmPassword}
                edge="end"
              >
                {values.showConfirmPassword ? (
                  <Visibility />
                ) : (
                  <VisibilityOff />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
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
      {loader}
    </div>
  );
}

export default ForgotPasswordForm;
