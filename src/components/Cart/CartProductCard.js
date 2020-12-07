/**
 * @author Calvin Galbaw
 */

import React, { useContext, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { useDispatch } from "react-redux";
import { LoginContext } from "../../App";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import {
  addQuantityCart,
  deleteProduct,
  removeProductFromCart,
  removeQuantityCart,
} from "../../redux";

/**
 * @description This is a functional component used to create the card component to display item details
 * @param item is an object containing details of a single cart item
 * @returns JSX containing the card having item details
 */
function CartProductCard({ item }) {
  const [loginStatus, setLoginStatus] = useContext(LoginContext); //getting the login state and setState using hooks
  const dispatch = useDispatch(); //creates a dispatch function to send dispatch a action

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
   * @description This function is used to remove the item from the cart using redux action and dispatch
   * @returns sets the show state of modal to false (hidden)
   */
  const onConfirmClick = () => {
    loginStatus.isLoggedIn
      ? dispatch(deleteProduct(item))
      : dispatch(removeProductFromCart(item));
    setShow(false);
  };
  /**
   * @description Modal component of material UI is used to create the prompt for user
   * onClick events are handled using inline calls of dispatch to redux action to update the cart according to the button
   * clicked
   */
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Cart Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Are you sure to delete ${item.product_name} from the cart?`}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" size="sm" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={onConfirmClick}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <tr>
        <td style={{ width: "58%" }}>
          <Row>
            <Col lg={3}>
              <div>
                <img
                  src={`http://180.149.241.208:3022/${item.product_image}`}
                  alt="some Imag"
                  style={{ margin: "10px" }}
                  width="65px"
                  height="65px"
                ></img>
              </div>
            </Col>
            <Col lg={8}>
              <span>{item.product_name}</span>
              <br></br>
              <span>{item.product_producer}</span>
              <br></br>
              <span>Status: In Stock</span>
              <br></br>
            </Col>
          </Row>
        </td>
        <td style={{ width: "20%" }}>
          <IconButton
            color="secondary"
            onClick={() => dispatch(removeQuantityCart(item))}
            aria-label="remove quantity"
            style={{ padding: "0" }}
          >
            <RemoveCircleIcon />
          </IconButton>
          <span
            style={{
              textAlign: "center",
              border: "1px solid black",
              padding: "4px 8px",
            }}
          >
            {item.quantity}
          </span>
          <IconButton
            color="secondary"
            onClick={() => dispatch(addQuantityCart(item))}
            aria-label="add quantity"
            style={{ padding: "0" }}
          >
            <AddCircleIcon />
          </IconButton>
        </td>
        <td style={{ width: "10%" }}>
          <span>{item.product_cost}</span>
        </td>
        <td style={{ width: "10%" }}>
          <span>{parseInt(item.product_cost) * parseInt(item.quantity)}</span>
        </td>
        <td style={{ width: "2%" }}>
          <IconButton
            color="secondary"
            onClick={onDeleteClick}
            aria-label="remove product"
            style={{ padding: "0" }}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </td>
      </tr>
    </>
  );
}

export default CartProductCard;
