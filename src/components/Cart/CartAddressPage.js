/**
 * @author Calvin Galbaw
 */

import { Button, Paper } from "@material-ui/core";
import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LoginContext, ToastContext } from "../../App";
import useLoader from "../../hooks/useLoader";
import { resetCart } from "../../redux";
import CartAddressCard from "./CartAddressCard";
/**
 * @description This is a functional component used to create the parent component for the cart address tab
 * @returns JSX containing the container to hold the address cards and order buttons
 */
function CartAddressPage() {
  const [loginStatus, setLoginStatus] = useContext(LoginContext); //getting the login state and setState using hooks
  const [open, setOpen] = useContext(ToastContext); //getting the toast component state and setState using hooks
  const [select, setSelect] = useState(true); //creates the state to control the disable prop of place order button
  const [addresses, setAddresses] = useState([]); //creates the addresses state to hold all addresses of user
  const history = useHistory(); //creates a useHistory hook to redirect page
  const dispatch = useDispatch(); //creates a dispatch function to send dispatch a action
  const [selectedValue, setSelectedValue] = useState(""); //state to hold the selected address value
  const items = useSelector((state) => state.cartDetails.items); //gets the cart items present in the cart details redux state
  const [loader, showLoader, hideLoader] = useLoader(); //gets the JSX component of the loader and its control

  /**
   * @description This function is used to initiate the order according to the address selected for delivery
   * the details of items is received from the cart redux
   * @returns The toast is set with the confirmation message, cart redux state and in local storage are cleared
   * redirects the page to order placed page
   */
  const onPlaceOrderClick = () => {
    showLoader();
    Axios.post(
      "http://180.149.241.208:3022/addProductToCartCheckout",
      [...items, { flag: "checkout" }],
      {
        headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
      }
    )
      .then((res) => {
        hideLoader();
        dispatch(resetCart());
        localStorage.removeItem("cart");
        setOpen({
          show: true,
          message: "Order has been placed",
        });
        history.push("/order-placed");
      })
      .catch((e) => console.log(e.response.data));
  };

  /**
   * @description This is used to get all the addresses from the database and store it in addresses state
   * @returns It sets the addresses state with the array of address objects
   */

  useEffect(() => {
    showLoader();
    Axios.get("http://180.149.241.208:3022/getCustAddress", {
      headers: {
        Authorization: `bearer ${loginStatus.token}`,
      },
    })
      .then((res) => {
        hideLoader();
        setAddresses(res.data.customer_address);
      })
      .catch((e) => hideLoader());
  }, []);

  /**
   * @description Control buttons for adding a new address and placing the order are present and its container using Paper component
   */
  return (
    <Paper elevation={3} style={{ padding: "15px" }}>
      <h2>Addresses</h2>
      <hr></hr>
      {addresses.length != 0 ? (
        addresses.map((address) => {
          return (
            <CartAddressCard
              key={address.address_id}
              address={address}
              setSelect={setSelect}
              setSelectedValue={setSelectedValue}
              selectedValue={selectedValue}
            ></CartAddressCard>
          );
        })
      ) : (
        <h2 style={{ textAlign: "center" }}>No Address added yet</h2>
      )}
      <hr></hr>
      <Button
        color="secondary"
        variant="contained"
        onClick={() => history.push("/MyAccount/addAddress")}
      >
        Add Address
      </Button>
      &nbsp; &nbsp;
      <Button
        disabled={select}
        color="primary"
        variant="contained"
        onClick={onPlaceOrderClick}
      >
        Place Order
      </Button>
      {loader}
    </Paper>
  );
}

export default CartAddressPage;
