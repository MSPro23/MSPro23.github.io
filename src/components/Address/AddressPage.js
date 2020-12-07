/**
 * @author Calvin Galbaw
 */

import { Button, Paper } from "@material-ui/core";
import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { LoginContext, ToastContext } from "../../App";
import useLoader from "../../hooks/useLoader";
import AddressCard from "./AddressCard";

/**
 * @description This is a functional component to display all the addresses of the user aka address page
 * @returns JSX containing the parent component of address page
 */
function AddressPage() {
  const [loginStatus, setLoginStatus] = useContext(LoginContext); //getting the login state and setState using hooks
  const [open, setOpen] = useContext(ToastContext); //getting the toast component state and setState using hooks
  const [addresses, setAddresses] = useState([]); //creates the addresses state to hold all addresses of user
  const history = useHistory(); // creates a useHistory hook to redirect page
  const [loader, showLoader, hideLoader] = useLoader(); //gets the JSX component of the loader and its control

  /**
   * @description This is used to get all the addresses from the database and store it in addresses state
   * @returns It sets the addresses state with the array of address objects
   */
  useEffect(() => {
    showLoader(); //displays the loader
    Axios.get("http://180.149.241.208:3022/getCustAddress", {
      headers: {
        Authorization: `bearer ${loginStatus.token}`,
      },
    })
      .then((res) => {
        hideLoader(); //hides the loader
        setAddresses(res.data.customer_address);
      })
      .catch((e) => {
        hideLoader(); //hides the loader
        setAddresses([]);
      });
  }, []);

  /**
   * @desciption Paper is used to create the container and holds the address card which are addresses of the user
   */

  return (
    <Paper elevation={3} style={{ padding: "15px" }}>
      <h2>Address</h2>
      <hr></hr>
      {/**
       * This maps each address passing the details to address card
       */}
      {addresses.length != 0 ? (
        addresses.map((address) => {
          return (
            <AddressCard
              key={address.address_id}
              address={address}
              setAddresses={setAddresses}
              addresses={addresses}
            ></AddressCard>
          );
        })
      ) : (
        <h2 style={{ textAlign: "center" }}>No Address added yet</h2>
      )}
      <hr></hr>
      <Button
        onClick={() => history.push("/MyAccount/addAddress")}
        style={{
          backgroundColor: "white",
          color: "black",
          border: "1px solid black",
        }}
      >
        Add Address
      </Button>
      {loader}
    </Paper>
  );
}

export default AddressPage;
