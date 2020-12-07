/**
 * @author Calvin Galbaw
 */

import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Paper } from "@material-ui/core";
import { LoginContext } from "../../App";
import CartProductCard from "./CartProductCard";
/**
 * @description This is a functional component used to create the table for cart item details and control
 * @returns JSX containing the container to hold the cart items and buttons such as add, remove, etc
 */
function CartDetails() {
  const cartItems = useSelector((state) => state.cartDetails.items); //gets the cart items present in the cart details redux state
  /**
   * @description This uses table elements to create table having 5 columns
   */
  return (
    <>
      <Paper
        elevation={8}
        style={{ width: "90%", padding: "20px", margin: "auto" }}
      >
        <table>
          <tbody>
            <tr>
              <th style={{ width: "58%" }}>Product</th>
              <th style={{ width: "25%" }}>Quantity</th>
              <th style={{ width: "10%" }}>Price</th>
              <th style={{ width: "10%" }}>Total</th>
              <th style={{ width: "2%" }}></th>
            </tr>
            {cartItems.length !== 0 &&
              cartItems.map((item) => {
                return (
                  <CartProductCard
                    key={item.product_id}
                    item={item}
                  ></CartProductCard>
                );
              })}
          </tbody>
        </table>
      </Paper>
    </>
  );
}

export default CartDetails;
