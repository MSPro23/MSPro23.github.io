/**
 * @author Calvin Galbaw
 */

import Axios from "axios";
import {
  ADD_PRODUCTTO_CART,
  ADD_QUANTITY_CART,
  REMOVE_QUANTITY_CART,
  REMOVE_PRODUCTFROM_CART,
  CART_DETAILS_GET,
  CART_DETAILS_SUCCESS,
  CART_DETAILS_ERROR,
  RESTORE_CART,
  LOGOUT_CART,
} from "./cartType.js";
/**
 *@description when product is added
 * @param data is the product detail
 * @returns Object containing the type and payload
 */
export const addProductToCart = (data) => {
  return {
    type: ADD_PRODUCTTO_CART,
    payload: data,
  };
};
/**
 *@description when the product quantity is incremented
 * @param data is the product detail
 * @returns Object containing the type and payload
 */
export const addQuantityCart = (data) => {
  return {
    type: ADD_QUANTITY_CART,
    payload: data,
  };
};
/**
 *@description when the product quantity is decremented
 * @param data is the product detail
 * @returns Object containing the type and payload
 */
export const removeQuantityCart = (data) => {
  return {
    type: REMOVE_QUANTITY_CART,
    payload: data,
  };
};
/**
 *@description when product is removed
 * @param data is the product detail
 * @returns Object containing the type and payload
 */
export const removeProductFromCart = (data) => {
  return {
    type: REMOVE_PRODUCTFROM_CART,
    payload: data,
  };
};
/**
 *@description get the cart details
 * @returns Object containing the type
 */
export const cartDetailsGet = () => {
  return {
    type: CART_DETAILS_GET,
  };
};
/**
 *@description at get cart success
 * @param data is the product detail
 * @returns Object containing the type and payload
 */
export const cartDetailsSuccess = (data) => {
  return {
    type: CART_DETAILS_SUCCESS,
    payload: data,
  };
};
/**
 *@description at get cart failure
 * @param data is the product detail
 * @returns Object containing the type and payload
 */
export const cartDetailsFailure = (data) => {
  return {
    type: CART_DETAILS_ERROR,
    payload: data,
  };
};
/**
 *
 * @returns Object containing the type
 */
export const restoreCart = () => {
  return {
    type: RESTORE_CART,
  };
};
/**
 *
 * @returns Object containing the type
 */
export const logoutCartGo = () => {
  return {
    type: LOGOUT_CART,
  };
};
/**
 *
 * @returns Object containing the type
 */
export const resetCart = () => {
  return {
    type: LOGOUT_CART,
  };
};
/**
 * @description used to start the api call for getting the cart
 * @param data is the product detail
 */
export const fetchCart = (data) => {
  return (dispatch) => {
    Axios.get("http://180.149.241.208:3022/getCartData", {
      headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => {
        dispatch(cartDetailsSuccess(response.data, response.data.success));
      })
      .catch((error) => {
        dispatch(cartDetailsFailure([], false));
      });
  };
};
/**
 * @description used to start the api call for updating the cart and clearing it
 * @param data is the product detail
 */
export const logoutCart = (data) => {
  return (dispatch) => {
    Axios.post(
      "http://180.149.241.208:3022/addProductToCartCheckout",
      [...data, { flag: "logout" }],
      {
        headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
      }
    )
      .then((res) => dispatch(logoutCartGo(res.data, res.data.success)))
      .catch((e) => console.log(e.response.data));
  };
};
/**
 * @description used to start the api call for deleteing the product from the cart
 * @param data is the product detail
 */
export const deleteProduct = (data) => {
  return (dispatch) => {
    Axios.delete(
      `http://180.149.241.208:3022/deleteCustomerCart/${data.product_id}`,
      {
        headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
      }
    )
      .then((res) => dispatch(removeProductFromCart(data)))
      .catch((e) => removeProductFromCart(data));
  };
};
