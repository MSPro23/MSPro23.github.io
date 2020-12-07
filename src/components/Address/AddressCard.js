/**
 * @author Calvin Galbaw
 */

import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import "../../css/ProfileSidePane.css";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import { LoginContext, ToastContext } from "../../App";
import Modal from "react-bootstrap/esm/Modal";
import { Button as ButtonBoot } from "react-bootstrap";

/**
 * @description This is a functional component used to create the card component to display address details
 * @param address is an object containing details of a single address
 * @param setAddresses is a drilled down function to set the parent addresses state
 * @param addresses is a array of all address objects of the user
 * @returns JSX containing the modal and the card having address details
 */
function AddressCard({ address, setAddresses, addresses }) {
  const history = useHistory(); // creates a useHistory hook to redirect page
  const [loginStatus, setloginStatus] = useContext(LoginContext); //getting the login state and setState using hooks
  const [open, setOpen] = useContext(ToastContext); //getting the toast component state and setState using hooks

  const [show, setShow] = useState(false); //creates the display state of the modal

  /**
   * @description It is event handler to close or hide the model
   * @returns sets the show state of modal to false (hidden)
   */
  const handleClose = () => {
    setShow(false);
  };

  /**
   * @description It is event handler to open or show the model when user prompts an delete address action
   * @returns sets the show state of modal to true (visible)
   */
  const onDeleteClick = () => {
    setShow(true);
  };

  /**
   * @description This function is used to delete the address of the profile using the address id
   * It is done using the delete http call using axios
   * @returns The toast is set with the confirmation message and sets the parent addresses state for re-rendering
   */

  const onConfirmClick = () => {
    Axios.delete(
      `http://180.149.241.208:3022/deladdress/${address.address_id}`,
      {
        headers: {
          Authorization: `bearer ${loginStatus.token}`,
        },
      }
    )
      .then((res) => {
        setOpen({
          show: true,
          message: "Address deleted successfully",
        });
        /**
         * Updating the addresses state
         */
        setAddresses(
          addresses.filter((address1) => {
            return address.address_id != address1.address_id;
          })
        );
      })
      .catch((e) => {
        console.log(e.response);
      });
    setShow(false);
  };

  /**
   * @description This creates the address card along with delete and edit button
   */
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Address Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Are you sure to delete this address?`}</Modal.Body>
        <Modal.Footer>
          <ButtonBoot variant="primary" size="sm" onClick={handleClose}>
            Cancel
          </ButtonBoot>
          <ButtonBoot variant="danger" size="sm" onClick={onConfirmClick}>
            Confirm
          </ButtonBoot>
        </Modal.Footer>
      </Modal>
      <Paper elevation={2} style={{ padding: "15px", marginBottom: "10px" }}>
        <span>{address.address}</span>
        <Button onClick={onDeleteClick} className="deleteAddressButton">
          X
        </Button>
        <br></br>
        <span>
          {address.city} - {address.pincode}
        </span>
        <br></br>
        <span>{address.state}</span>
        <br></br>
        <br></br>

        <Button
          onClick={() =>
            history.push(`/MyAccount/editAddress/${address.address_id}`)
          }
          variant="contained"
          color="primary"
        >
          Edit
        </Button>
      </Paper>
    </>
  );
}

export default AddressCard;
