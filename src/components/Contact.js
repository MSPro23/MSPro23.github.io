/**
 * @author Calvin Galbaw
 */

import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import useInput from "../hooks/useInput";
/**
 * @description This is a functional component used to create the edit address form of the edit address Page
 * @returns JSX containing the form components of Material UI
 */
function Contact() {
  /**
   * States and binds of controlled form data is initialized
   */
  const [name, nameBind] = useInput("");
  const [email, emailBind] = useInput("");
  const [subject, subjectBind] = useInput("");
  const [message, messageBind] = useInput("");
  const [mobile, setMobile] = useState("");
  /**
   *
   * @param {e}
   *
   * This checks the limit of the characters used and accordingly updates the form data
   */
  const onMobileChange = (e) => {
    e.target.value.length > 10 ? setMobile(mobile) : setMobile(e.target.value);
  };
  /**
   * This defines the state of errors and its messages for each input element,
   */
  const [errorState, setErrorState] = useState({
    emailError: false,
    nameError: false,
    messageError: false,
    mobileError: false,
    subjectError: false,
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
      });
    } else {
      if (!pattern.test(email)) {
        setErrorState({
          ...errorState,
          emailError: true,
        });
      } else {
        setErrorState({
          ...errorState,
          emailError: false,
        });
      }
    }
  };
  /**
   *
   * @description This checks the validity of name and updates the state and the error message accordingly
   * @returns The error message and the error state is set depending on validity of name value
   */
  const nameValidation = () => {
    if (name === "") {
      setErrorState({
        ...errorState,
        nameError: true,
      });
    } else {
      setErrorState({
        ...errorState,
        nameError: false,
      });
    }
  };
  /**
   *
   * @description This checks the validity of message and updates the state and the error message accordingly
   * @returns The error message and the error state is set depending on validity of message value
   */
  const messageValidation = () => {
    if (message === "") {
      setErrorState({
        ...errorState,
        messageError: true,
      });
    } else {
      setErrorState({
        ...errorState,
        messageError: false,
      });
    }
  };
  /**
   *
   * @description This checks the validity of subject and updates the state and the error message accordingly
   * @returns The error message and the error state is set depending on validity of subject value
   */

  const subjectValidation = () => {
    if (subject === "") {
      setErrorState({
        ...errorState,
        subjectError: true,
      });
    } else {
      setErrorState({
        ...errorState,
        subjectError: false,
      });
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
          mobileError: true,
        });
      } else {
        if (mobile.match(pattern)) {
          setErrorState({
            ...errorState,
            mobileError: false,
          });
        } else {
          setErrorState({
            ...errorState,
            mobileError: true,
          });
        }
      }
    } else if (mobile === "") {
      setErrorState({
        ...errorState,
        mobileError: true,
      });
    } else {
      setErrorState({
        ...errorState,
        mobileError: true,
      });
    }
  };
  /**
   * Input form is made used TextFeild component of material UI and its container using Paper component
   */

  return (
    <div className="forgotAuth">
      <h1>Contact Form</h1>
      <TextField
        error={errorState.nameError}
        variant="outlined"
        value={name}
        size="small"
        onBlur={nameValidation}
        {...nameBind}
        label="Name"
        className={`emailAuthForm`}
      ></TextField>
      <TextField
        error={errorState.emailError}
        variant="outlined"
        value={email}
        size="small"
        onBlur={emailValidation}
        {...emailBind}
        label="Email"
        className={`emailAuthForm`}
      ></TextField>
      <TextField
        error={errorState.mobileError}
        className={`emailAuthForm`}
        variant="outlined"
        onBlur={mobileValidation}
        size="small"
        value={mobile}
        onChange={onMobileChange}
        label="Mobile No."
      ></TextField>
      <TextField
        error={errorState.subjectError}
        variant="outlined"
        value={subject}
        size="small"
        onBlur={subjectValidation}
        {...subjectBind}
        label="Subject"
        className={`emailAuthForm`}
      ></TextField>
      <TextField
        error={errorState.messageError}
        variant="outlined"
        value={message}
        size="small"
        onBlur={messageValidation}
        {...messageBind}
        label="Message"
        className={`emailAuthForm`}
      ></TextField>
      <Button variant="contained" color="primary" className="emailAuthButton">
        Submit
      </Button>
    </div>
  );
}

export default Contact;
