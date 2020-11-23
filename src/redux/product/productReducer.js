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
      console.log(action.payload.product_details);
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

export const productAllReducer = (state = initialAllProductState, action) => {
  // console.log(action.payload);
  switch (action.type) {
    case PRODUCT_ALL_GET:
      return {
        ...state,
        loading: true,
      };

    case PRODUCT_ALL_SUCCESS: {
      console.log(action.payload.product_details);
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
