/**
 * @author Calvin Galbaw
 */

import { faLastfmSquare } from "@fortawesome/free-brands-svg-icons";
import {
  USER_LOGIN_POST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_REGISTER_POST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_FORGOTPASSWORD_POST,
  USER_FORGOTPASSWORD_SUCCESS,
  USER_FORGOTPASSWORD_FAILURE,
  USER_RECOVERPASSWORD_POST,
  USER_RECOVERPASSWORD_SUCCESS,
  USER_RECOVERPASSWORD_FAILURE,
  RESET_LOGIN,
  RESET_REGISTER,
  RESET_RECOVERPASSWORD,
  RESET_FORGOTPASSWORD,
} from "./userTypes.js";
/**
 * four states used
 * 1. Login State for the login action
 * 2. Register call state for the registeration process
 * 3. Forgot Password state for the email authentication phase
 * 4. Recover password state for the change of password
 */
const initialLoginState = {
  loading: false,
  message: "",
  error: "",
  success: false,
  completed: false,
};

const initialRegisterState = {
  loading: false,
  message: "",
  error: "",
  success: false,
  completed: false,
};

const initialForgotPasswordState = {
  loading: false,
  message: "",
  error: "",
  success: false,
  completed: false,
};

const initialRecoverPasswordState = {
  loading: false,
  message: "",
  error: "",
  success: false,
  completed: false,
};

export const userLoginReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    /**
     * when the api call takes place
     */
    case USER_LOGIN_POST:
      return {
        ...state,
        loading: true,
      };
    /**
     * when the api call is successfull
     */
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: "",
        success: action.success,
        completed: true,
      };
    /**
     * when the api call is not successfull
     */
    case USER_LOGIN_FAILURE: {
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: "",
        success: action.success,
        completed: true,
      };
    }
    /**
     * This occurs when one wants to reset the message state after login for repeating it
     */
    case RESET_LOGIN: {
      return {
        ...state,
        message: "",
        completed: false,
        success: false,
      };
    }

    default:
      return state;
  }
};

export const userRegisterReducer = (state = initialRegisterState, action) => {
  switch (action.type) {
    /**
     * when the api call takes place
     */
    case USER_REGISTER_POST:
      return {
        ...state,
        loading: true,
      };
    /**
     * when the api call is successfull
     */
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: "",
        success: action.success,
        completed: true,
      };
    /**
     * when the api call is not successfull
     */
    case USER_REGISTER_FAILURE: {
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: "",
        success: action.success,
        completed: true,
      };
    }
    /**
     * This occurs when one wants to reset the message state after login for repeating it
     */
    case RESET_REGISTER: {
      return {
        ...state,
        message: "",
        completed: false,
        success: false,
      };
    }

    default:
      return state;
  }
};

export const userForgotPasswordReducer = (
  state = initialForgotPasswordState,
  action
) => {
  switch (action.type) {
    /**
     * when the api call takes place
     */
    case USER_FORGOTPASSWORD_POST:
      return {
        ...state,
        loading: true,
      };
    /**
     * when the api call is successfull
     */
    case USER_FORGOTPASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: "",
        success: action.success,
        completed: true,
      };
    /**
     * when the api call is not successfull
     */
    case USER_FORGOTPASSWORD_FAILURE: {
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: "",
        success: action.success,
        completed: true,
      };
    }
    /**
     * This occurs when one wants to reset the message state after login for repeating it
     */
    case RESET_FORGOTPASSWORD: {
      return {
        ...state,
        message: "",
        completed: false,
        success: false,
      };
    }
    default:
      return state;
  }
};

export const userRecoverPasswordReducer = (
  state = initialRecoverPasswordState,
  action
) => {
  switch (action.type) {
    /**
     * when the api call takes place
     */
    case USER_RECOVERPASSWORD_POST:
      return {
        ...state,
        loading: true,
      };
    /**
     * when the api call is successfull
     */
    case USER_RECOVERPASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: "",
        success: action.success,
        completed: true,
      };
    /**
     * when the api call is not successfull
     */
    case USER_RECOVERPASSWORD_FAILURE: {
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: "",
        success: action.success,
        completed: true,
      };
    }
    /**
     * This occurs when one wants to reset the message state after login for repeating it
     */
    case RESET_RECOVERPASSWORD: {
      return {
        ...state,
        message: "",
        completed: false,
        success: false,
      };
    }

    default:
      return state;
  }
};
