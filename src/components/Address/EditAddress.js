/**
 * @author Calvin Galbaw
 */

import { Button, makeStyles, Paper, TextField } from "@material-ui/core";
import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { LoginContext, ToastContext } from "../../App";
import "../../css/ProfileSidePane.css";
import useInput from "../../hooks/useInput";
/**
 * @description This is a functional component used to create the edit address form of the edit address Page
 * @param props which contains the match object for the react router to get the id of the address to be editted
 * @returns JSX containing the form components of Material UI
 */
function EditAddress(props) {
  /**
   * @description This gets the address which needs to be editted using the axios
   * @returns This sets the initial form data to be editted
   */
  const match1 = props.match;
  useEffect(() => {
    Axios.get("http://180.149.241.208:3022/getCustAddress", {
      headers: {
        Authorization: `bearer ${loginStatus.token}`,
      },
    })
      .then((res) => {
        /**
         * Sets the default saved values of the input form
         */
        let i = res.data.customer_address.filter((address) => {
          return address.address_id == match1.params.id;
        })[0];
        setAddress(i.address);
        setPincode("" + i.pincode);
        setCity(i.city);
        setState(i.state);
        setCountry(i.country);
      })
      .catch((e) => alert(e.response.data.error_message));
  }, []);

  const history = useHistory(); //creates a useHistory hook to redirect page

  /**
   * States and binds of controlled form data is initialized
   */
  const [country, setCountry] = useState("");

  /**
   * @description This the country onChange event handler to update its value
   * @param e is the synthetic event
   * @returns sets the value of country form input
   */

  const onCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const [state, setState] = useState("");
  /**
   * @description This the state onChange event handler to update its value
   * @param e is the synthetic event
   * @returns sets the value of state form input
   */
  const onStateChange = (e) => {
    setState(e.target.value);
  };

  const [city, setCity] = useState("");
  /**
   * @description This the city onChange event handler to update its value
   * @param e is the synthetic event
   * @returns sets the value of city form input
   */
  const onCityChange = (e) => {
    setCity(e.target.value);
  };

  const [address, setAddress] = useState("");

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

  const [pincode, setPincode] = useState("");

  /**
   *
   * @param {e} e is the synthetic event passed by react
   * @description This checks the limit of the characters used and accordingly sets the address form value
   */

  const onPincodeChange = (e) => {
    e.target.value.length > 6
      ? setPincode(pincode)
      : setPincode(e.target.value);
  };
  const [open, setOpen] = useContext(ToastContext); //getting the toast component state and setState using hooks
  const [loginStatus, setLoginStatus] = useContext(LoginContext); //getting the login state and setState using hooks
  /**
   * This defines the state of errors and its messages for each input element,
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
   * Similarly submitStatus holds the truth value for enabling or disabling the submit button
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
        let alphanumeric = /^[0-9]+$/;
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
    let pattern = /^[A-Za-z]+$/;
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
    let pattern = /^[A-Za-z]+$/;
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
    let pattern = /^[A-Za-z]+$/;
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
   * @description This calls the API using axios for editing the address once all the save button is clicked
   * @returns The toast is set with the confirmation message and redirects the page to address page
   */

  const onSaveClick = () => {
    Axios.put(
      "http://180.149.241.208:3022/updateAddress",
      {
        address_id: match1.params.id,
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
          message: "Address editted successfully",
        });
      })
      .catch((e) => console.log(e.response));
  };

  /**
   * @description Input form is made used TextFeild component of material UI and its container using Paper component
   */

  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <h2>Edit Address</h2>
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
        onChange={onCityChange}
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
        onChange={onStateChange}
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
        onChange={onCountryChange}
        className="addAddressInput"
        variant="outlined"
        label="Country"
      ></TextField>
      <hr></hr>
      <Button onClick={onSaveClick} variant="outlined">
        Save
      </Button>
      &nbsp; &nbsp;
      <Button
        variant="outlined"
        onClick={() => {
          history.push("/MyAccount/address");
        }}
      >
        Cancel
      </Button>
    </Paper>
  );
}

export default EditAddress;
