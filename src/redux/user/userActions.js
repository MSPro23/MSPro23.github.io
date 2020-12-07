/**
 * @author Calvin Galbaw
 */

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
  RESET_FORGOTPASSWORD,
  RESET_RECOVERPASSWORD,
} from "./userTypes.js";
import axios from "axios";
/**
 * @description Actions for respective states of user login
 */
export const userLoginPost = () => {
  return {
    type: USER_LOGIN_POST,
  };
};

export const userLoginSuccess = (data, success) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: data,
    success,
  };
};

export const userLoginFailure = (error, success) => {
  return {
    type: USER_LOGIN_FAILURE,
    payload: error,
    success,
  };
};

/**
 * @description Action to reset the login state
 */

export const resetLogin = () => {
  return {
    type: RESET_LOGIN,
  };
};

/**
 * @description Action for initiating the login api call
 */
export const postLogin = (data) => {
  return (dispatch) => {
    dispatch(userLoginPost());
    axios
      .post("http://180.149.241.208:3022/login", data)
      .then((response) => {
        dispatch(userLoginSuccess(response.data, response.data.success));
      })
      .catch((error) => {
        dispatch(
          userLoginFailure(error.response.data, error.response.data.success)
        );
      });
  };
};

/**
 * @description Actions for respective states of user registeration
 */

export const userRegisterPost = () => {
  return {
    type: USER_REGISTER_POST,
  };
};

export const userRegisterSuccess = (data, success) => {
  return {
    type: USER_REGISTER_SUCCESS,
    payload: data,
    success,
  };
};

export const userRegisterFailure = (error, success) => {
  return {
    type: USER_REGISTER_FAILURE,
    payload: error,
    success,
  };
};

/**
 * @description Action to reset the register state
 */

export const resetRegister = () => {
  return {
    type: RESET_REGISTER,
  };
};

/**
 * @description Action for initiating the register api call
 */
export const postRegister = (data) => {
  return (dispatch) => {
    dispatch(userRegisterPost());
    axios
      .post("http://180.149.241.208:3022/register", data)
      .then((response) => {
        dispatch(userRegisterSuccess(response.data, response.data.success));
      })
      .catch((error) => {
        dispatch(
          userRegisterFailure(error.response.data, error.response.data.success)
        );
      });
  };
};

/**
 * @description Actions for respective states of user email authentication of forgot password
 */

export const userForgotPasswordPost = () => {
  return {
    type: USER_FORGOTPASSWORD_POST,
  };
};

export const userForgotPasswordSuccess = (data, success) => {
  return {
    type: USER_FORGOTPASSWORD_SUCCESS,
    payload: data,
    success,
  };
};

export const userForgotPasswordFailure = (error, success) => {
  return {
    type: USER_FORGOTPASSWORD_FAILURE,
    payload: error,
    success,
  };
};

/**
 * @description Action to reset the forgot Password state
 */

export const resetForgotPassword = () => {
  return {
    type: RESET_FORGOTPASSWORD,
  };
};

/**
 * @description Action for initiating the forgot password api call
 */

export const postForgotPassword = (data) => {
  return (dispatch) => {
    dispatch(userForgotPasswordPost());
    axios
      .post("http://180.149.241.208:3022/forgotPassword", data)
      .then((response) => {
        dispatch(
          userForgotPasswordSuccess(response.data, response.data.success)
        );
      })
      .catch((error) => {
        dispatch(
          userForgotPasswordFailure(
            error.response.data,
            error.response.data.success
          )
        );
      });
  };
};

/**
 * @description Actions for respective states of user recovering the password
 */

export const userRecoverPasswordPost = () => {
  return {
    type: USER_RECOVERPASSWORD_POST,
  };
};

export const userRecoverPasswordSuccess = (data, success) => {
  return {
    type: USER_RECOVERPASSWORD_SUCCESS,
    payload: data,
    success,
  };
};

export const userRecoverPasswordFailure = (error, success) => {
  return {
    type: USER_RECOVERPASSWORD_FAILURE,
    payload: error,
    success,
  };
};

/**
 * @description Action to reset the recover password state
 */

export const resetRecoverPassword = () => {
  return {
    type: RESET_RECOVERPASSWORD,
  };
};

/**
 * @description Action for initiating the recover api call
 */

export const postRecoverPassword = (data) => {
  return (dispatch) => {
    dispatch(userRecoverPasswordPost());
    axios
      .post("http://180.149.241.208:3022/recoverPassword", data, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("recover_token")}`,
        },
      })
      .then((response) => {
        dispatch(
          userRecoverPasswordSuccess(response.data, response.data.success)
        );
      })
      .catch((error) => {
        dispatch(
          userRecoverPasswordFailure(
            error.response.data,
            error.response.data.success
          )
        );
      });
  };
};
