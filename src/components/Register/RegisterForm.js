import {
  TextField,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
  Button,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "../../css/RegisterPage.css";
import useInput from "../../hooks/useInput";
import { postRegister } from "../../redux";
import { useSelector, useDispatch } from "react-redux";

function RegisterForm() {
  const [firstName, firstNameBind] = useInput("");
  const [lastName, lastNameBind] = useInput("");
  const [email, emailBind] = useInput("");
  const [password, passwordBind] = useInput("");
  const [confirmPassword, confirmPasswordBind] = useInput("");
  const [mobile, mobileBind] = useInput("");
  const [gender, genderBind] = useInput("");

  const [errorState, setErrorState] = useState({
    emailError: false,
    emailErrorMessage: "",
    firstNameError: false,
    firstNameErrorMessage: "",
    lastNameError: false,
    lastNameErrorMessage: "",
    passwordError: false,
    passwordErrorMessage: "",
    confirmPasswordError: false,
    confirmPasswordErrorMessage: "",
    mobileError: false,
    mobileErrorMessage: "",
    genderError: false,
    genderErrorMessage: "",
  });

  const [submitStatus, setSubmitStatus] = useState({
    emailStatus: true,
    passwordStatus: true,
    confirmPasswordStatus: true,
    firstNameStatus: true,
    lastNameStatus: true,
    mobileStatus: true,
    genderStatus: true,
  });

  const message = useSelector((state) => state.register.message);
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

  const mobileValidation = () => {
    let pattern = /^[0-9]+$/;
    if (mobile[0] == 6 || mobile[0] == 7 || mobile[0] == 8 || mobile[0] == 9) {
      if (mobile.length < 10) {
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
            mobileErrorMessage: "",
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

  useEffect(() => {
    message && alert(message);
  }, [message]);

  return (
    <div className="registerFormContainer">
      <h2> Register to NeoSTORE</h2>
      <TextField
        error={errorState.firstNameError}
        helperText={errorState.firstNameErrorMessage}
        className="textRegisterInput"
        variant="outlined"
        size="small"
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
        size="small"
        fullWidth
        onBlur={emailValidation}
        value={email}
        {...emailBind}
        label="Email Address"
      ></TextField>
      <TextField
        error={errorState.passwordError}
        helperText={errorState.passwordErrorMessage}
        className="textRegisterInput"
        variant="outlined"
        size="small"
        onBlur={passwordValidation}
        value={password}
        {...passwordBind}
        fullWidth
        label="Password"
      ></TextField>
      <TextField
        error={errorState.confirmPasswordError}
        helperText={errorState.confirmPasswordErrorMessage}
        className="textRegisterInput"
        variant="outlined"
        size="small"
        value={confirmPassword}
        onBlur={confirmPasswordValidation}
        {...confirmPasswordBind}
        label="Confirm Password"
        fullWidth
      ></TextField>
      <TextField
        error={errorState.mobileError}
        helperText={errorState.mobileErrorMessage}
        className="textRegisterInput"
        fullWidth
        variant="outlined"
        onBlur={mobileValidation}
        size="small"
        value={mobile}
        {...mobileBind}
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
    </div>
  );
}

export default RegisterForm;
