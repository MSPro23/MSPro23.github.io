import {
  PRODUCT_TOPRATING_GET,
  PRODUCT_TOPRATING_SUCCESS,
  PRODUCT_TOPRATING_ERROR,
  PRODUCT_ALL_GET,
  PRODUCT_ALL_SUCCESS,
  PRODUCT_ALL_ERROR,
} from "./productTypes";
import axios from "axios";

export const productTopRatingGet = () => {
  return {
    type: PRODUCT_TOPRATING_GET,
  };
};

export const productTopRatingSuccess = (data, success) => {
  return {
    type: PRODUCT_TOPRATING_SUCCESS,
    payload: data,
    success,
  };
};

export const productTopRatingError = (error, success) => {
  return {
    type: PRODUCT_TOPRATING_ERROR,
    payload: error,
    success,
  };
};

export const getTopRating = () => {
  return (dispatch) => {
    dispatch(productTopRatingGet());
    axios
      .get("http://180.149.241.208:3022/defaultTopRatingProduct")
      .then((response) => {
        dispatch(productTopRatingSuccess(response.data, response.data.success));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(
          productTopRatingError(
            error.response.data.message,
            error.response.data.success
          )
        );
      });
  };
};

export const productAllGet = () => {
  return {
    type: PRODUCT_ALL_GET,
  };
};

export const productAllSuccess = (data, success) => {
  return {
    type: PRODUCT_ALL_SUCCESS,
    payload: data,
    success,
  };
};

export const productAllError = (error, success) => {
  return {
    type: PRODUCT_ALL_ERROR,
    payload: error,
    success,
  };
};

export const getAllProducts = (data) => {
  return (dispatch) => {
    dispatch(productAllGet());
    axios
      .get("http://180.149.241.208:3022/commonProducts", { params: data })
      .then((response) => {
        console.log(response);
        dispatch(productAllSuccess(response.data, response.data.success));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(
          productAllError(
            error.response.data.message,
            error.response.data.success
          )
        );
      });
  };
};
