import { Button, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import useInput from "../../hooks/useInput";
import { postLogin } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
function LoginForm() {
  const [email, emailBind] = useInput("");
  const [password, passwordBind] = useInput("");

  const message = useSelector((state) => state.login.error);
  const dispatch = useDispatch();

  useEffect(() => {
    alert(message);
  }, [message]);

  const [errorState, setErrorState] = useState({
    emailError: false,
    emailErrorMessage: "",
    passwordError: false,
    passwordErrorMessage: "",
  });

  const [submitStatus, setSubmitStatus] = useState({
    emailStatus: true,
    passwordStatus: true,
  });

  const onLoginSubmit = () => {
    dispatch(
      postLogin({
        email: email,
        pass: password,
      })
    );
  };
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

  return (
    <div className="loginFormContainer">
      <h2>Login to NeoSTORE</h2>
      <TextField
        error={errorState.emailError}
        helperText={errorState.emailErrorMessage}
        className="loginFormInput"
        variant="outlined"
        onBlur={emailValidation}
        value={email}
        {...emailBind}
        label="Email Address"
      ></TextField>
      <TextField
        error={errorState.passwordError}
        helperText={errorState.passwordErrorMessage}
        className="loginFormInput"
        variant="outlined"
        onBlur={passwordValidation}
        label="Password"
        value={password}
        {...passwordBind}
      ></TextField>
      <Button
        className="loginSubmitButton"
        variant="contained"
        disabled={submitStatus.emailStatus || submitStatus.passwordStatus}
        onClick={onLoginSubmit}
      >
        Login
      </Button>
    </div>
  );
}

export default LoginForm;
