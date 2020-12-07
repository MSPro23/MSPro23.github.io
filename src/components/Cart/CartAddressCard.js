/**
 * @author Calvin Galbaw
 */

import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Radio } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { LoginContext, ToastContext } from "../../App";
import Axios from "axios";

/**
 * @description This is a functional component used to create the card component to display address details
 * @param address is an object containing details of a single address
 * @param setSelect is a drilled down function to change the state of the parent place order button
 * @param setSelectedValue is a drilled down function to change the state of the parent selectedValue
 * @param selectedValue is a state representing which address is currently selected by the user
 * @returns JSX containing the card having address details
 */
function CartAddressCard({
  setSelect,
  address,
  setSelectedValue,
  selectedValue,
}) {
  const history = useHistory(); //creates a useHistory hook to redirect page
  const [loginStatus, setloginStatus] = useContext(LoginContext); //getting the login state and setState using hooks
  const [open, setOpen] = useContext(ToastContext); //getting the toast component state and setState using hooks

  /**
   * @description This the state onChange event handler to update its value
   * @param event is the synthetic event
   * @returns sets the value of address being selected
   */

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  /**
   * @description This is used to update the address for checkout which is selected by the user
   * @returns activates the place order by setting select state to false in the parent
   */

  const onAddressSelect = () => {
    Axios.put(
      "http://180.149.241.208:3022/updateAddress",
      { ...address, isDeliveryAddress: true },
      {
        headers: {
          Authorization: `bearer ${loginStatus.token}`,
        },
      }
    )
      .then((res) => setSelect(false))
      .catch((e) => console.log(e.response));
  };
  /**
   * @description Input form is made used Radio component of Material UI and its container using Paper component
   * It consists of the details of the address
   */
  return (
    <Paper elevation={2} style={{ padding: "15px" }}>
      <span>{address.address}</span>
      <br></br>
      <span>
        {address.city} - {address.pincode}
      </span>
      <br></br>
      <span>{address.state}</span>
      <br></br>
      <br></br>
      <Radio
        value={address.address_id}
        name="radio-button-demo"
        checked={selectedValue == address.address_id}
        onChange={handleChange}
        onClick={onAddressSelect}
      />
      Select &nbsp; &nbsp;
      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          history.push(`/MyAccount/editAddress/${address.address_id}`)
        }
      >
        Edit
      </Button>
    </Paper>
  );
}

export default CartAddressCard;
