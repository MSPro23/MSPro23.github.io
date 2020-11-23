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
} from "./userTypes.js";

const initialLoginState = {
  loading: false,
  message: "",
  error: "",
  success: null,
  show: false,
};

const initialRegisterState = {
  loading: false,
  message: "",
  error: "",
  success: null,
  show: false,
};

const initialForgotPasswordState = {
  loading: false,
  message: "",
  error: "",
  success: null,
  show: false,
};

const initialRecoverPasswordState = {
  loading: false,
  message: "",
  error: "",
  success: null,
  show: false,
};

export const userLoginReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case USER_LOGIN_POST:
      return {
        ...state,
        loading: true,
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: "",
        success: action.success,
      };

    case USER_LOGIN_FAILURE: {
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

export const userRegisterReducer = (state = initialRegisterState, action) => {
  switch (action.type) {
    case USER_REGISTER_POST:
      return {
        ...state,
        loading: true,
      };

    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        error: "",
        success: action.success,
      };

    case USER_REGISTER_FAILURE: {
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

export const userForgotPasswordReducer = (
  state = initialForgotPasswordState,
  action
) => {
  switch (action.type) {
    case USER_FORGOTPASSWORD_POST:
      return {
        ...state,
        loading: true,
      };

    case USER_FORGOTPASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        error: "",
        success: action.success,
      };

    case USER_FORGOTPASSWORD_FAILURE: {
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

export const userRecoverPasswordReducer = (
  state = initialRecoverPasswordState,
  action
) => {
  switch (action.type) {
    case USER_RECOVERPASSWORD_POST:
      return {
        ...state,
        loading: true,
      };

    case USER_RECOVERPASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        error: "",
        success: action.success,
      };

    case USER_RECOVERPASSWORD_FAILURE: {
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
