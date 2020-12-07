/**
 * @author Calvin Galbaw
 */

import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import "../../css/ProfileSidePane.css";
import Visibility from "@material-ui/icons/Visibility";
import { useHistory } from "react-router-dom";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import useInput from "../../hooks/useInput";
import Axios from "axios";
import { ToastContext } from "../../App";
/**
 * @description This is a functional component used to create the edit password form of the edit password Page
 * @returns JSX containing the form components of Material UI
 */
function EditPassword() {
  const history = useHistory(); //creates a useHistory hook to redirect page
  const [open, setOpen] = useContext(ToastContext); //getting the toast component state and setState using hooks

  /**
   * States and binds of controlled form data is initialized
   */
  const [oldPassword, oldPasswordBind] = useInput("");
  const [password, passwordBind] = useInput("");
  const token = localStorage.getItem("token");
  const [confirmPassword, confirmPasswordBind] = useInput("");
  /**
   * This defines the state of errors and its messages for each input element,
   *
   */

  const [errorState, setErrorState] = useState({
    oldPasswordError: false,
    oldPasswordErrorMessage: "",
    passwordError: false,
    passwordErrorMessage: "",
    confirmPasswordError: false,
    confirmPasswordErrorMessage: "",
  });
  /**
   * Similarly submitStatus holds the truth value for enabling or disabling the submit button
   */
  const [submitStatus, setSubmitStatus] = useState({
    oldPasswordStatus: true,
    passwordStatus: true,
    confirmPasswordStatus: true,
  });

  /**
   * This state hold the password visibility value
   */

  const [values, setValues] = React.useState({
    showPassword: false,
    showConfirmPassword: false,
    showOldPassword: false,
  });
  /**
   * @description these 3 functions change the visibility logic of its corresponding form
   */
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
  };

  const handleClickShowOldPassword = () => {
    setValues({ ...values, showOldPassword: !values.showOldPassword });
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

  const handleMouseDownOldPassword = (event) => {
    event.preventDefault();
  };

  /**
   *
   * @description This checks the validity of old password and updates the state and the error message accordingly
   * @returns The error message and the error state is set depending on validity of old password value
   */

  const oldPasswordValidation = () => {
    if (oldPassword === "") {
      setErrorState({
        ...errorState,
        oldPasswordErrorMessage: "This feild is compulsory",
        oldPasswordError: true,
      });
      setSubmitStatus({ ...submitStatus, oldPasswordStatus: true });
    } else {
      if (oldPassword.length < 8 || oldPassword.length > 12) {
        setErrorState({
          ...errorState,
          oldPasswordErrorMessage: "Length should be 8 to 12 characters long",
          oldPasswordError: true,
        });
        setSubmitStatus({ ...submitStatus, oldPasswordStatus: true });
      } else {
        let alphanumeric = "^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$";
        if (!oldPassword.match(alphanumeric)) {
          setErrorState({
            ...errorState,
            oldPasswordErrorMessage: "Only alphanumeric characters allowed",
            oldPasswordError: true,
          });
          setSubmitStatus({ ...submitStatus, oldPasswordStatus: true });
        } else {
          setErrorState({
            ...errorState,
            oldPasswordErrorMessage: "",
            oldPasswordError: false,
          });
          setSubmitStatus({ ...submitStatus, oldPasswordStatus: false });
        }
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
            confirmPasswordErrorMessage: "",
            confirmPasswordError: false,
          });
          setSubmitStatus({ ...submitStatus, confirmPasswordStatus: false });
        }
      }
    }
  };

  /**
   * @description This calls the API using axios for editing the password once the save button is clicked
   * @returns The toast is set with the confirmation message and redirects the page to profile page
   */

  const onResetClick = () => {
    Axios.post(
      "http://180.149.241.208:3022/changePassword",
      { oldPass: oldPassword, newPass: password, confirmPass: confirmPassword },
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    )
      .then((res) => {
        setOpen({
          show: true,
          message: res.data.message,
        });
        history.push("/MyAccount/profile");
      })
      .catch((e) => {
        setOpen({
          show: true,
          message: "Password reset is unsuccessfull",
        });
      });
  };
  /**
   * @description Input form is made used TextFeild component of material UI and its container using Paper component
   */
  return (
    <Paper elevation={3} className="editPasswordInput">
      <Grid container alignItems="center" justify="center" direction="column">
        <h2>Change Password</h2>
        <br></br>
        <p>NOTE : Password must be : 8-12 Alphanumeric characters</p>
        <div style={{ width: "70%" }}>
          <FormControl variant="outlined" className="inputandbutton" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Old Password
            </InputLabel>
            <OutlinedInput
              type={values.showOldPassword ? "text" : "password"}
              value={oldPassword}
              error={errorState.oldPasswordError}
              onBlur={oldPasswordValidation}
              {...oldPasswordBind}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowOldPassword}
                    onMouseDown={handleMouseDownOldPassword}
                    edge="end"
                  >
                    {values.showOldPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
            <FormHelperText
              error={errorState.oldPasswordError}
              id="standard-weight-helper-text"
            >
              {errorState.oldPasswordErrorMessage}
            </FormHelperText>
          </FormControl>
          <FormControl variant="outlined" className="inputandbutton" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              New Password
            </InputLabel>
            <OutlinedInput
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
          <FormControl variant="outlined" className="inputandbutton" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              type={values.showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              error={errorState.confirmPasswordError}
              onBlur={confirmPasswordValidation}
              {...confirmPasswordBind}
              endAdornment={
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
              }
              labelWidth={70}
            />
            <FormHelperText
              error={errorState.confirmPasswordError}
              id="standard-weight-helper-text"
            >
              {errorState.confirmPasswordErrorMessage}
            </FormHelperText>
          </FormControl>
        </div>
        <Button
          color="primary"
          variant="contained"
          className="inputandbutton"
          onClick={onResetClick}
        >
          Submit
        </Button>
      </Grid>
    </Paper>
  );
}

export default EditPassword;
