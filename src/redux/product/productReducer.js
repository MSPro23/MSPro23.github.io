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

const initialTopRatingState = {
  loading: false,
  data: [],
  message: "",
  error: "",
  success: null,
  show: false,
};
/**
 *
 * @param {intialCartDetails} state is the state object consisiting of top product
 * @param {*} action is the action dispatched
 *
 * @description This is used to reduce the state according to the action dispatched
 * It is a reducer to get popular products
 * @returns an object having updated state according to the action
 */
export const productTopRatingReducer = (
  state = initialTopRatingState,
  action
) => {
  //   console.log(action.payload);
  switch (action.type) {
    case PRODUCT_TOPRATING_GET:
      return {
        ...state,
        loading: true,
      };

    case PRODUCT_TOPRATING_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload.product_details,
        message: action.payload.message,
        error: "",
        success: action.success,
      };
    }

    case PRODUCT_TOPRATING_ERROR: {
      return {
        ...state,
        loading: false,
        message: "",
        error: action.payload,
        success: action.success,
      };
    }

    default:
      return state;
  }
};

const initialAllProductState = {
  loading: false,
  data: [],
  total_count: 0,
  message: "",
  error: "",
  success: null,
  show: false,
};
/**
 *
 * @param {intialCartDetails} state is the state object consisiting of products
 * @param {*} action is the action dispatched
 *
 * @description This is used to reduce the state according to the action dispatched
 * It is a reducer to get and display the products
 * @returns an object having updated state according to the action
 */
export const productAllReducer = (state = initialAllProductState, action) => {
  // console.log(action.payload);
  switch (action.type) {
    case PRODUCT_ALL_GET:
      return {
        ...state,
        loading: true,
      };

    case PRODUCT_ALL_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload.product_details,
        total_count: action.payload.total_count,
        message: action.payload.message,
        error: "",
        success: action.success,
      };
    }

    case PRODUCT_ALL_ERROR: {
      return {
        ...state,
        loading: false,
        message: "",
        error: action.payload,
        success: action.success,
      };
    }

    default:
      return state;
  }
};
