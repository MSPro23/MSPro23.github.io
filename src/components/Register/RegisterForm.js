/**
 * @author Calvin Galbaw
 */

import {
  TextField,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
  Button,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import PhoneIcon from "@material-ui/icons/Phone";
import React, { useState, useEffect, useContext } from "react";
import "../../css/RegisterPage.css";
import useInput from "../../hooks/useInput";
import { postRegister, resetRegister } from "../../redux";
import { useSelector, useDispatch } from "react-redux";
import { LoginContext, ToastContext } from "../../App";
import { useHistory } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import useLoader from "../../hooks/useLoader";
import { makeStyles } from "@material-ui/core/styles";
/**
 * @description This is a functional component used to create the register form of the register Page
 * @returns JSX containing the form components of Material UI
 */
function RegisterForm() {
  /**
   * @description makeStyles is used to give custom style to material UI components
   * Here helptext is styled to get margin in it
   */
  const useStyles = makeStyles({
    helperPass: {
      "& .MuiFormHelperText-contained": {
        margin: "0 0 0 79%",
        "@media (max-width:400px)": {
          margin: "0 0 0 40%",
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
  const [firstName, firstNameBind] = useInput("");
  const [lastName, lastNameBind] = useInput("");
  const [email, emailBind] = useInput("");
  const [password, passwordBind] = useInput("");
  const [confirmPassword, confirmPasswordBind] = useInput("");
  const [mobile, setMobile] = useState("");
  const [gender, genderBind] = useInput("");
  /**
   *
   * @param e is the synthetic event
   *
   * @description This checks the limit of the characters used and accordingly updates the form data
   */
  const onMobileChange = (e) => {
    e.target.value.length > 10 ? setMobile(mobile) : setMobile(e.target.value);
  };

  const [loader, showLoader, hideLoader] = useLoader();
  /**
   * This defines the state of errors and its messages for each input element,
   *
   */
  const [errorState, setErrorState] = useState({
    emailError: false,
    emailErrorMessage: "",
    firstNameError: false,
    firstNameErrorMessage: "",
    lastNameError: false,
    lastNameErrorMessage: "",
    passwordError: false,
    passwordErrorMessage: "8-12 Alphanumeric characters",
    confirmPasswordError: false,
    confirmPasswordErrorMessage: "8-12 Alphanumeric characters",
    mobileError: false,
    mobileErrorMessage: `${mobile.length}/10`,
    genderError: false,
    genderErrorMessage: "",
  });
  /**
   * Similarly submitStatus holds the truth value for enabling or disabling the submit button
   */
  const [submitStatus, setSubmitStatus] = useState({
    emailStatus: true,
    passwordStatus: true,
    confirmPasswordStatus: true,
    firstNameStatus: true,
    lastNameStatus: true,
    mobileStatus: true,
    genderStatus: true,
  });
  /**
   * Getting required states from the redux using useSelector hooks
   */
  const message = useSelector((state) => state.register.message);
  const success = useSelector((state) => state.register.success);
  const completed = useSelector((state) => state.register.completed);
  const loading = useSelector((state) => state.register.loading);

  const dispatch = useDispatch(); //creates a dispatch function to send dispatch a action
  const [loginStatus, setLoginStatus] = useContext(LoginContext); //getting the login state and setState using hooks

  const [open, setOpen] = useContext(ToastContext); //getting the toast component state and setState using hooks

  const history = useHistory(); //creates a useHistory hook to redirect page
  /**
   * These functions handle the password visibility control using state and event listener on button
   */
  const [values, setValues] = React.useState({
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
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
   *
   * @description This checks the validity of first name and updates the state and the error message accordingly
   * @returns The error message and the error state is set depending on validity of first name value
   */

  const firstNameValidation = () => {
    let pattern = /^[A-Za-z]+$/;
    if (firstName === "") {
      setErrorState({
        ...errorState,
        firstNameErrorMessage: "This field is compulsory",
        firstNameError: true,
      });
      setSubmitStatus({ ...submitStatus, firstNameStatus: true });
    } else {
      if (firstName.match(pattern)) {
        setErrorState({
          ...errorState,
          firstNameErrorMessage: "",
          firstNameError: false,
        });
        setSubmitStatus({ ...submitStatus, firstNameStatus: false });
      } else {
        setErrorState({
          ...errorState,
          firstNameErrorMessage: "Only alphabets are allowed",
          firstNameError: true,
        });
        setSubmitStatus({ ...submitStatus, firstNameStatus: true });
      }
    }
  };
  /**
   *
   * @description This checks the validity of last name and updates the state and the error message accordingly
   * @returns The error message and the error state is set depending on validity of last name value
   */

  const lastNameValidation = () => {
    let pattern = /^[A-Za-z]+$/;
    if (lastName === "") {
      setErrorState({
        ...errorState,
        lastNameErrorMessage: "This field is compulsory",
        lastNameError: true,
      });
      setSubmitStatus({ ...submitStatus, lastNameStatus: true });
    } else {
      if (lastName.match(pattern)) {
        setErrorState({
          ...errorState,
          lastNameErrorMessage: "",
          lastNameError: false,
        });
        setSubmitStatus({ ...submitStatus, lastNameStatus: false });
      } else {
        setErrorState({
          ...errorState,
          lastNameErrorMessage: "Only alphabets are allowed",
          lastNameError: true,
        });
        setSubmitStatus({ ...submitStatus, lastNameStatus: true });
      }
    }
  };

  /**
   *
   * @description This checks the validity of mobile and updates the state and the error message accordingly
   * @returns The error message and the error state is set depending on validity of mobile value
   */

  const mobileValidation = () => {
    let pattern = /^[0-9]+$/;
    if (mobile[0] == 6 || mobile[0] == 7 || mobile[0] == 8 || mobile[0] == 9) {
      if (mobile.length < 10 || mobile.length > 10) {
        setErrorState({
          ...errorState,
          mobileErrorMessage: "Phone number should be 10 digits long",
          mobileError: true,
        });
        setSubmitStatus({ ...submitStatus, mobileStatus: true });
      } else {
        if (mobile.match(pattern)) {
          setErrorState({
            ...errorState,
            mobileErrorMessage: `${mobile.length}/10`,
            mobileError: false,
          });
          setSubmitStatus({ ...submitStatus, mobileStatus: false });
        } else {
          setErrorState({
            ...errorState,
            mobileErrorMessage: "Enter valid phone number",
            mobileError: true,
          });
          setSubmitStatus({ ...submitStatus, mobileStatus: true });
        }
      }
    } else if (mobile === "") {
      setErrorState({
        ...errorState,
        mobileErrorMessage: "this field is compulsory",
        mobileError: true,
      });
      setSubmitStatus({ ...submitStatus, mobileStatus: true });
    } else {
      setErrorState({
        ...errorState,
        mobileErrorMessage: "Enter valid phone number",
        mobileError: true,
      });
      setSubmitStatus({ ...submitStatus, mobileStatus: true });
    }
  };

  /**
   *
   * @description This checks the validity of gender and updates the state and the error message accordingly
   * @returns The error message and the error state is set depending on validity of gender value
   */

  const genderValidation = () => {
    if (gender === "") {
      setErrorState({
        ...errorState,
        genderErrorMessage: "this field is compulsory",
        genderError: true,
      });
      setSubmitStatus({ ...submitStatus, genderStatus: true });
    } else {
      setErrorState({
        ...errorState,
        genderErrorMessage: "",
        genderError: false,
      });
      setSubmitStatus({ ...submitStatus, genderStatus: false });
    }
  };

  /**
   * @description Dispatches the redux action of post register along with the data required
   */
  const onRegisterSubmit = () => {
    dispatch(
      postRegister({
        first_name: firstName,
        last_name: lastName,
        email: email,
        pass: password,
        confirmPass: confirmPassword,
        phone_no: mobile,
        gender: gender,
      })
    );
  };

  /**
   * @description Handles the loader of the page using loading value from redux
   */
  useEffect(() => {
    loading ? showLoader() : hideLoader();
  }, [loading]);

  /**
   * @description this checks the status of the dispatched action and updates the states according to the response and
   * diplays it to the user
   */
  useEffect(() => {
    if (success == true && completed) {
      setOpen({ show: true, message: "Registeration Successful" });
      dispatch(resetRegister());
      history.push("/login");
    } else if (success == false && completed) {
      setOpen({ show: true, message: message.message });
      dispatch(resetRegister());
    }
  }, [success, completed, loading]);
  /**
   *
   * @description Checks if the user is logged in or not to be called back
   */
  useEffect(() => {
    loginStatus.isLoggedIn && history.push("/dashboard");
  });

  /**
   * @description Input form is made used TextFeild component and InputAdornment for icons of material UI
   * and its container using div
   */
  return (
    <div className="registerFormContainer">
      <h2> Register to NeoSTORE</h2>
      <TextField
        error={errorState.firstNameError}
        helperText={errorState.firstNameErrorMessage}
        className="textRegisterInput"
        variant="outlined"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <TextFieldsIcon />
            </InputAdornment>
          ),
        }}
        onBlur={firstNameValidation}
        value={firstName}
        {...firstNameBind}
        fullWidth
        label="First Name"
      ></TextField>
      <TextField
        error={errorState.lastNameError}
        helperText={errorState.lastNameErrorMessage}
        className="textRegisterInput"
        variant="outlined"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <TextFieldsIcon />
            </InputAdornment>
          ),
        }}
        onBlur={lastNameValidation}
        value={lastName}
        {...lastNameBind}
        label="Last Name"
        fullWidth
      ></TextField>
      <TextField
        error={errorState.emailError}
        helperText={errorState.emailErrorMessage}
        className="textRegisterInput"
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <MailIcon />
            </InputAdornment>
          ),
        }}
        size="small"
        fullWidth
        onBlur={emailValidation}
        value={email}
        {...emailBind}
        label="Email email"
      ></TextField>
      {/* <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel> */}
      <TextField
        fullWidth
        variant="outlined"
        className={`textRegisterInput ${
          !errorState.passwordError && classes.helperPass
        }`}
        size="small"
        label="Password"
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
        className={`textRegisterInput ${
          !errorState.confirmPasswordError && classes.helperPass
        }`}
        size="small"
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
      <TextField
        error={errorState.mobileError}
        helperText={
          errorState.mobileError
            ? errorState.mobileErrorMessage
            : `${mobile.length}/10`
        }
        className={`textRegisterInput ${
          !errorState.mobileError && classes.helperMobile
        }`}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <PhoneIcon />
            </InputAdornment>
          ),
        }}
        fullWidth
        variant="outlined"
        onBlur={mobileValidation}
        size="small"
        value={mobile}
        onChange={onMobileChange}
        label="Mobile No."
      ></TextField>
      <FormControl component="fieldset" error={errorState.genderError}>
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          row
          aria-label="gender"
          name="gender1"
          value={gender}
          {...genderBind}
          onBlur={genderValidation}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>
        <FormHelperText>{errorState.genderErrorMessage}</FormHelperText>
      </FormControl>
      <Button
        className="textRegisterInput"
        variant="contained"
        color="secondary"
        onClick={onRegisterSubmit}
        disabled={
          submitStatus.firstNameStatus ||
          submitStatus.lastNameStatus ||
          submitStatus.emailStatus ||
          submitStatus.passwordStatus ||
          submitStatus.confirmPasswordStatus ||
          submitStatus.mobileStatus ||
          submitStatus.genderStatus
        }
      >
        Register
      </Button>
      {loader}
    </div>
  );
}

export default RegisterForm;
