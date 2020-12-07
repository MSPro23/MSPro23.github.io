/**
 * @author Calvin Galbaw
 */

import React, { useContext, useEffect, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import Paper from "@material-ui/core/Paper";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import "../../css/ProfileSidePane.css";
import { useHistory } from "react-router-dom";
import useInput from "../../hooks/useInput";
import Axios from "axios";
import { LoginContext, ToastContext } from "../../App";
import useLoader from "../../hooks/useLoader";
function EditProfile({ setProfileData, profileData }) {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [loader, showLoader, hideLoader] = useLoader();

  /**
   * States and binds of controlled form data is initialized
   */
  const [selectedDate, handleDateChange] = useState(profileData.dob);
  const [firstName, firstNameBind] = useInput(profileData.first_name);
  const [lastName, lastNameBind] = useInput(profileData.last_name);
  const [email, emailBind] = useInput(profileData.email);
  const [mobile, mobileBind] = useInput(profileData.phone_no);
  const [gender, genderBind] = useInput(profileData.gender);
  const [profilePic, setProfilePic] = useState("");
  const [resetPic, setResetPic] = useState("");

  useEffect(() => {
    setResetPic(profileData.profile_img);
  }, []);
  /**
   * This defines the state of errors and its messages for each input element,
   *
   */
  const [errorState, setErrorState] = useState({
    emailError: false,
    emailErrorMessage: "Email should not be changed",
    firstNameError: false,
    firstNameErrorMessage: "",
    lastNameError: false,
    lastNameErrorMessage: "",
    mobileError: false,
    mobileErrorMessage: "",
    genderError: false,
    genderErrorMessage: "",
    profilePicError: false,
    profilePicErrorMessage: "",
  });
  /**
   * Similarly submitStatus holds the truth value for enabling or disabling the submit button
   */
  const [submitStatus, setSubmitStatus] = useState({
    emailStatus: false,
    firstNameStatus: false,
    lastNameStatus: false,
    mobileStatus: false,
    genderStatus: false,
    profilePicStatus: false,
  });

  const [open, setOpen] = useContext(ToastContext);

  const onChangeHandler = (event) => {
    setProfilePic(event.target.files[0]);
    setProfileData({
      ...profileData,
      profile_img: URL.createObjectURL(event.target.files[0]),
    });
  };

  /**
   * @description This is the onClick handler for the save button
   * @returns this updates the details of the user using the http put call with the form data and shows a toast accordingly
   */
  const onSaveClick = () => {
    showLoader();
    let formdata = new FormData();
    formdata.append("first_name", firstName);
    formdata.append("last_name", lastName);
    formdata.append("email", email);
    formdata.append("dob", selectedDate);
    profilePic != "" && formdata.append("profile_img", profilePic);
    formdata.append("gender", gender);
    formdata.append("phone_no", mobile);
    Axios.put("http://180.149.241.208:3022/profile", formdata, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((res) => {
        hideLoader();
        setOpen({
          show: true,
          message: res.data.message,
        });
        setProfileData({
          ...profileData,
          first_name: firstName,
          last_name: lastName,
          email: email,
          dob: selectedDate,
          gender: gender,
          phone_no: mobile,
        });
        history.push("/MyAccount/profile");
      })
      .catch((e) => {
        hideLoader();
        history.push("/MyAccount/profile");
        setOpen({
          show: true,
          message: e.response,
        });
      });
    // history.push("/profile");
  };
  /**
   *
   * @description This checks the validity of profile picture and updates the state and the error message accordingly
   * @returns The error message and the error state is set depending on validity of profile picture value
   */

  const profilePicValidation = () => {
    const pattern = /(.jpg|.jpeg|.png)$/;
    const value = profilePic;
    if (!pattern.test(value)) {
      setErrorState((prev) => {
        return {
          ...prev,
          profilePicError: true,
          profilePicErrorMessage: "Must be .jpg, .jpeg and .png format",
        };
      });
      setSubmitStatus({
        ...setSubmitStatus,
        profilePicStatus: true,
      });
    } else {
      setErrorState((prev) => {
        return {
          ...prev,
          profilePicError: false,
          profilePicErrorMessage: " ",
        };
      });
      setSubmitStatus({
        ...setSubmitStatus,
        profilePicStatus: false,
      });
    }
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
          emailErrorMessage: "Email Should not be changed",
        });
        setSubmitStatus({ ...submitStatus, emailStatus: false });
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
   * @description Input form is made used TextFeild component
   * and its container using Paper component
   */
  return (
    <Paper elevation={3} className="editProfileContainer">
      <h2>Edit Profile</h2>
      <hr></hr>
      <TextField
        fullWidth
        value={firstName}
        {...firstNameBind}
        error={errorState.firstNameError}
        helperText={errorState.firstNameErrorMessage}
        onBlur={firstNameValidation}
        className="editProfileInputs"
        variant="outlined"
        size="small"
        label="First Name"
      ></TextField>
      <TextField
        value={lastName}
        {...lastNameBind}
        error={errorState.lastNameError}
        helperText={errorState.lastNameErrorMessage}
        onBlur={lastNameValidation}
        className="editProfileInputs"
        fullWidth
        variant="outlined"
        size="small"
        label="Last Name"
      ></TextField>
      <FormControl
        component="fieldset"
        className="editProfileInputs"
        error={errorState.genderError}
      >
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
      <TextField
        type="date"
        variant="outlined"
        fullWidth
        label="Date of Birth"
        value={selectedDate}
        onChange={(e) => handleDateChange(e.target.value)}
        helperText=" "
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        value={mobile}
        {...mobileBind}
        error={errorState.mobileError}
        helperText={errorState.mobileErrorMessage}
        onBlur={mobileValidation}
        className="editProfileInputs"
        fullWidth
        variant="outlined"
        size="small"
        label="Mobile"
      ></TextField>
      <TextField
        value={email}
        {...emailBind}
        error={errorState.emailError}
        helperText={errorState.emailErrorMessage}
        onBlur={emailValidation}
        className="editProfileInputs"
        fullWidth
        variant="outlined"
        size="small"
        label="Email"
      ></TextField>
      <input
        type="file"
        name="file"
        className="editProfileInputs"
        onChange={onChangeHandler}
      />
      <hr></hr>
      <Button
        onClick={onSaveClick}
        disabled={
          submitStatus.firstNameStatus ||
          submitStatus.lastNameStatus ||
          submitStatus.emailStatus ||
          submitStatus.profilePicStatus ||
          submitStatus.mobileStatus ||
          submitStatus.genderStatus
        }
      >
        Save
      </Button>
      &nbsp; &nbsp;
      <Button
        onClick={() => {
          console.log(resetPic);
          setProfileData({ ...profileData, profile_img: resetPic });
          history.push("/MyAccount/profile");
        }}
      >
        Cancel
      </Button>
      {loader}
    </Paper>
  );
}

export default EditProfile;
