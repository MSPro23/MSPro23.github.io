/**
 * @author Calvin Galbaw
 */

import { Button, Paper, TextField } from "@material-ui/core";
import Axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { LoginContext, ToastContext } from "../../App";
import useInput from "../../hooks/useInput";

/**
 * @description This is a functional component used to create the add address form of the add address Page
 * @returns JSX containing the form components of Material UI
 */

function AddAddress() {
  const history = useHistory(); // creates a useHistory hook to redirect page

  /**
   * States and binds of controlled form data is initialized
   */
  const [city, cityBind] = useInput("");
  const [state, stateBind] = useInput("");
  const [country, countryBind] = useInput("");
  const [address, setAddress] = useState(""); //Normal useState is used
  const [pincode, setPincode] = useState(""); //Normal useState is used

  /**
   *
   * @param {e} e is the synthetic event passed by react
   * @description This checks the limit of the characters used and accordingly sets the address form value
   */
  const onAddressChange = (e) => {
    e.target.value.length > 100
      ? setAddress(address)
      : setAddress(e.target.value);
  };

  /**
   *
   * @param {e} e is the synthetic event passed by react
   * @description This checks the limit of the characters used and accordingly sets the pincode form value
   */
  const onPincodeChange = (e) => {
    e.target.value.length > 6
      ? setPincode(pincode)
      : setPincode(e.target.value);
  };

  const [open, setOpen] = useContext(ToastContext); //getting the toast component state and setState using hooks
  const [loginStatus, setLoginStatus] = useContext(LoginContext); //getting the login state and setState using hooks

  /**
   * These define the state of errors and its messages for each input element,
   */

  const [errorState, setErrorState] = useState({
    countryError: false,
    countryErrorMessage: "",
    cityError: false,
    cityErrorMessage: "",
    pincodeError: false,
    pincodeErrorMessage: "",
    stateError: false,
    stateErrorMessage: "",
    addressError: false,
    addressErrorMessage: "",
  });

  /**
   *  Similarly submitStatus holds the truth value for enabling or disabling the submit button
   */

  const [submitStatus, setSubmitStatus] = useState({
    addressStatus: true,
    stateStatus: true,
    pincodeStatus: true,
    cityStatus: true,
    countryStatus: true,
  });

  /**
   *
   * @description This checks the validity of address and updates the state and the error message accordingly
   * @returns The error message and the error state is set depending on validity of address value
   */

  const addressValidation = () => {
    if (address === "") {
      setErrorState({
        ...errorState,
        addressErrorMessage: "This feild is compulsory",
        addressError: true,
      });
      setSubmitStatus({ ...submitStatus, addressStatus: true });
    } else {
      setErrorState({
        ...errorState,
        addressErrorMessage: "",
        addressError: false,
      });
      setSubmitStatus({ ...submitStatus, addressStatus: false });
    }
  };

  /**
   *
   * @description This checks the validity of pincode and updates the state and the error message accordingly
   * @returns The error message and the error state is set depending on validity of pincode value
   */
  const pincodeValidation = () => {
    if (pincode === "") {
      setErrorState({
        ...errorState,
        pincodeErrorMessage: "This feild is compulsory",
        pincodeError: true,
      });
      setSubmitStatus({ ...submitStatus, pincodeStatus: true });
    } else {
      if (pincode.length < 6 || pincode.length > 6) {
        setErrorState({
          ...errorState,
          pincodeErrorMessage: "Length should be 6 characters long",
          pincodeError: true,
        });
        setSubmitStatus({ ...submitStatus, pincodeStatus: true });
      } else {
        let alphanumeric = /^[0-9]+$/; //This pattern should be matched
        if (!pincode.match(alphanumeric)) {
          setErrorState({
            ...errorState,
            pincodeErrorMessage: "Only digits allowed",
            pincodeError: true,
          });
          setSubmitStatus({ ...submitStatus, pincodeStatus: true });
        } else {
          setErrorState({
            ...errorState,
            pincodeErrorMessage: "",
            pincodeError: false,
          });
          setSubmitStatus({ ...submitStatus, pincodeStatus: false });
        }
      }
    }
  };

  /**
   *
   * @description This checks the validity of city and updates the state and the error message accordingly
   * @returns The error message and the error state is set depending on validity of city value
   */

  const cityValidation = () => {
    let pattern = /^[A-Za-z]+$/; //This pattern should be matched
    if (city === "") {
      setErrorState({
        ...errorState,
        cityError: true,
        cityErrorMessage: "This feild is necessary",
      });
      setSubmitStatus({ ...submitStatus, cityStatus: true });
    } else {
      if (!pattern.test(city)) {
        setErrorState({
          ...errorState,
          cityError: true,
          cityErrorMessage: "Only alphabets are allowed",
        });
        setSubmitStatus({ ...submitStatus, cityStatus: true });
      } else {
        setErrorState({
          ...errorState,
          cityError: false,
          cityErrorMessage: "",
        });
        setSubmitStatus({ ...submitStatus, cityStatus: false });
      }
    }
  };

  /**
   *
   * @description This checks the validity of state and updates the state and the error message accordingly
   * @returns The error message and the error state is set depending on validity of state value
   */
  const stateValidation = () => {
    let pattern = /^[A-Za-z]+$/; //This pattern should be matched
    if (state === "") {
      setErrorState({
        ...errorState,
        stateError: true,
        stateErrorMessage: "This feild is necessary",
      });
      setSubmitStatus({ ...submitStatus, stateStatus: true });
    } else {
      if (!pattern.test(state)) {
        setErrorState({
          ...errorState,
          stateError: true,
          stateErrorMessage: "Only alphabets are allowed",
        });
        setSubmitStatus({ ...submitStatus, stateStatus: true });
      } else {
        setErrorState({
          ...errorState,
          stateError: false,
          stateErrorMessage: "",
        });
        setSubmitStatus({ ...submitStatus, stateStatus: false });
      }
    }
  };

  /**
   *
   * @description This checks the validity of country and updates the state and the error message accordingly
   * @returns The error message and the error state is set depending on validity of country value
   */

  const countryValidation = () => {
    let pattern = /^[A-Za-z]+$/; //This pattern should be matched
    if (country === "") {
      setErrorState({
        ...errorState,
        countryError: true,
        countryErrorMessage: "This feild is necessary",
      });
      setSubmitStatus({ ...submitStatus, countryStatus: true });
    } else {
      if (!pattern.test(country)) {
        setErrorState({
          ...errorState,
          countryError: true,
          countryErrorMessage: "Only alphabets allowed",
        });
        setSubmitStatus({ ...submitStatus, countryStatus: true });
      } else {
        setErrorState({
          ...errorState,
          countryError: false,
          countryErrorMessage: "",
        });
        setSubmitStatus({ ...submitStatus, countryStatus: false });
      }
    }
  };

  /**
   * @description This calls the API using axios for adding the address once all the save button is clicked
   * @returns The toast is set with the confirmation message and redirects the page to address page
   */

  const onSaveClick = () => {
    Axios.post(
      "http://180.149.241.208:3022/address",
      {
        address: address,
        pincode,
        city,
        state,
        country,
      },
      {
        headers: {
          Authorization: `bearer ${loginStatus.token}`,
        },
      }
    )
      .then((res) => {
        history.push("/MyAccount/address");
        setOpen({
          show: true,
          message: "Address added successfully",
        });
      })
      .catch((e) => console.log(e.response));
  };

  /**
   * @description Input form is made used TextFeild component of material UI and its container using Paper component
   */

  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <h2>Add Address</h2>
      <hr></hr>
      <TextField
        error={errorState.addressError}
        helperText={
          errorState.addressError ? (
            errorState.addressErrorMessage
          ) : (
            <>
              Max 100 characters
              <span style={{ float: "right" }}>{`${address.length}/100`}</span>
            </>
          )
        }
        style={{ width: "55%" }}
        onBlur={addressValidation}
        value={address}
        onChange={onAddressChange}
        className="addAddressInput"
        variant="outlined"
        label="Address"
        multiline
        rows={3}
      ></TextField>
      <br></br>
      <TextField
        error={errorState.pincodeError}
        helperText={errorState.pincodeErrorMessage}
        onBlur={pincodeValidation}
        value={pincode}
        onChange={onPincodeChange}
        className="addAddressInput"
        variant="outlined"
        label="Pincode"
      ></TextField>
      <br></br>
      <TextField
        error={errorState.cityError}
        helperText={errorState.cityErrorMessage}
        onBlur={cityValidation}
        value={city}
        {...cityBind}
        className="addAddressInput"
        variant="outlined"
        label="City"
      ></TextField>
      &nbsp; &nbsp; &nbsp;
      <TextField
        error={errorState.stateError}
        helperText={errorState.stateErrorMessage}
        onBlur={stateValidation}
        value={state}
        {...stateBind}
        className="addAddressInput"
        variant="outlined"
        label="State"
      ></TextField>
      <br></br>
      <TextField
        error={errorState.countryError}
        helperText={errorState.countryErrorMessage}
        onBlur={countryValidation}
        value={country}
        {...countryBind}
        className="addAddressInput"
        variant="outlined"
        label="Country"
      ></TextField>
      <hr></hr>
      <Button
        onClick={onSaveClick}
        disabled={
          submitStatus.addressStatus ||
          submitStatus.cityStatus ||
          submitStatus.countryStatus ||
          submitStatus.pincodeStatus ||
          submitStatus.stateStatus
        }
        variant="outlined"
      >
        Save
      </Button>
      &nbsp; &nbsp;
      <Button
        onClick={() => history.push("/MyAccount/address")}
        variant="outlined"
      >
        Cancel
      </Button>
    </Paper>
  );
}

export default AddAddress;
