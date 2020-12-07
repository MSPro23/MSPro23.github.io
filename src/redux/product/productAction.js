/**
 * @author Calvin Galbaw
 */

import {
  PRODUCT_TOPRATING_GET,
  PRODUCT_TOPRATING_SUCCESS,
  PRODUCT_TOPRATING_ERROR,
  PRODUCT_ALL_GET,
  PRODUCT_ALL_SUCCESS,
  PRODUCT_ALL_ERROR,
} from "./productTypes";
import axios from "axios";

/**
 *  @description  Action when the http call begins
 * @returns Object containing the type of action required
 */
export const productTopRatingGet = () => {
  return {
    type: PRODUCT_TOPRATING_GET,
  };
};
/**
 *  @description  Action when the list of products is successfully returned
 *@param data is the api data payload
 * @param success of the api call
 * @returns Object containing the type, success and payload
 */
export const productTopRatingSuccess = (data, success) => {
  return {
    type: PRODUCT_TOPRATING_SUCCESS,
    payload: data,
    success,
  };
};
/**
 *  @description  Action when the http fails due to some error or no data fetched
 * @param error is the api error payload
 * @param success of the api call
 * @returns Object containing the type, success and payload
 */
export const productTopRatingError = (error, success) => {
  return {
    type: PRODUCT_TOPRATING_ERROR,
    payload: error,
    success,
  };
};

/**
 * @description Redux action to initiate an http call to get the products having top rating
 * The fucntion dispatches other actions for each stage like when the call starts, call is successful
 * and the call is failed
 * @returns a dispatch function for getting all the products
 */

export const getTopRating = () => {
  return (dispatch) => {
    dispatch(productTopRatingGet());
    axios
      .get("http://180.149.241.208:3022/defaultTopRatingProduct")
      .then((response) => {
        dispatch(productTopRatingSuccess(response.data, response.data.success));
      })
      .catch((error) => {
        dispatch(
          productTopRatingError(
            error.response.data.message,
            error.response.data.success
          )
        );
      });
  };
};
/**
 *  @description  Action when the http call get commonProducts begins
 * @returns Object containing the type
 */
export const productAllGet = () => {
  return {
    type: PRODUCT_ALL_GET,
  };
};
/**
 *  @description  Action when the list of products is successfully returned
 *   @param data is the api data payload
 * @param success of the api call
 * @returns Object containing the type, success and payload
 */
export const productAllSuccess = (data, success) => {
  return {
    type: PRODUCT_ALL_SUCCESS,
    payload: data,
    success,
  };
};
/**
 *  @description  Action when the http fails due to some error or no data fetched
 *  @param error is the api error payload
 * @param success of the api call
 * @returns Object containing the type, success and payload
 */
export const productAllError = (error, success) => {
  return {
    type: PRODUCT_ALL_ERROR,
    payload: error,
    success,
  };
};

/**
 * @description Redux action to initiate an http call to get the products according to the filter set
 * The fucntion dispatches other actions for each stage like when the call starts, call is successful
 * and the call is failed
 * @returns a dispatch function for getting all the products
 */

export const getAllProducts = (data) => {
  return (dispatch) => {
    dispatch(productAllGet());
    axios
      .get("http://180.149.241.208:3022/commonProducts", { params: data })
      .then((response) => {
        dispatch(productAllSuccess(response.data, response.data.success));
      })
      .catch((error) => {
        dispatch(
          productAllError(
            error.response.data.message,
            error.response.data.success
          )
        );
      });
  };
};
