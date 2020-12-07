/**
 * @author Calvin Galbaw
 */

import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  TextField,
} from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import MailIcon from "@material-ui/icons/Mail";
import useInput from "../../hooks/useInput";
import { fetchCart, postLogin, resetLogin } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { LoginContext, ToastContext } from "../../App";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import useLoader from "../../hooks/useLoader";

function LoginForm() {
  /**
   * States and binds of controlled form data is initialized
   */
  const [loader, showLoader, hideLoader] = useLoader(); //gets the JSX component of the loader and its control
  /**
   * States and binds of controlled form data is initialized
   */
  const [email, emailBind] = useInput("");
  const [password, passwordBind] = useInput("");

  const history = useHistory(); //creates a useHistory hook to redirect page
  const [loginStatus, setLoginStatus] = useContext(LoginContext); //getting the login state and setState using hooks

  const message = useSelector((state) => state.login.message);
  const success = useSelector((state) => state.login.success);
  const completed = useSelector((state) => state.login.completed);
  const loading = useSelector((state) => state.login.loading);
  const [open, setOpen] = useContext(ToastContext);
  const dispatch = useDispatch();
  /**
   * @description These functions handle the password visibility control using state and event listener on button
   */
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    loading ? showLoader() : hideLoader();
  }, [loading]);
  /**
   * @description this checks the status of the dispatched action and updates the states according to the response and
   * diplays it to the user
   */
  useEffect(() => {
    if (success == true && completed) {
      setOpen({ show: true, message: "Login Successful" });
      localStorage.setItem("token", message.token);
      dispatch(fetchCart());
      setLoginStatus({
        token: message.token,
        isLoggedIn: true,
      });
      dispatch(resetLogin());
    } else if (success == false && completed) {
      setOpen({
        show: true,
        message: message.message,
      });
      dispatch(resetLogin());
    }
  }, [success, completed, loading]);

  useEffect(() => {
    loginStatus.isLoggedIn && history.push("/dashboard");
  });
  /**
   * This defines the state of errors and its messages for each input element,
   *
   */
  const [errorState, setErrorState] = useState({
    emailError: false,
    emailErrorMessage: "",
    passwordError: false,
    passwordErrorMessage: "",
  });
  /**
   * Similarly submitStatus holds the truth value for enabling or disabling the submit button
   */
  const [submitStatus, setSubmitStatus] = useState({
    emailStatus: true,
    passwordStatus: true,
  });
  /**
   * @description Dispatches the redux action along with the data required
   */
  const onLoginSubmit = () => {
    dispatch(
      postLogin({
        email: email,
        pass: password,
      })
    );
  };

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
            passwordErrorMessage: "",
            passwordError: false,
          });
          setSubmitStatus({ ...submitStatus, passwordStatus: false });
        }
      }
    }
  };
  /**
   * @description This is the main login form created using textfeild and inputAdornment for icons
   *
   */
  return (
    <div className="loginFormContainer">
      <h2>Login to NeoSTORE</h2>
      <TextField
        error={errorState.emailError}
        helperText={errorState.emailErrorMessage}
        className="loginFormInput"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <MailIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        onBlur={emailValidation}
        value={email}
        {...emailBind}
        label="Email password"
      ></TextField>
      <FormControl variant="outlined" className="loginFormInput">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={password}
          error={errorState.passwordError}
          onBlur={passwordValidation}
          {...passwordBind}
          endAdornment={
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
          }
          labelWidth={70}
        />
        <FormHelperText
          error={errorState.passwordError}
          id="standard-weight-helper-text"
        >
          {errorState.passwordErrorMessage}
        </FormHelperText>
      </FormControl>
      <Button
        className="loginSubmitButton"
        variant="contained"
        disabled={submitStatus.emailStatus || submitStatus.passwordStatus}
        onClick={onLoginSubmit}
      >
        Login
      </Button>
      {loader}
    </div>
  );
}

export default LoginForm;
