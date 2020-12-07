import { applyMiddleware, combineReducers, createStore } from "redux";
import {
  userForgotPasswordReducer,
  userLoginReducer,
  userRecoverPasswordReducer,
  userRegisterReducer,
} from "./user/userReducer";
import {
  productAllReducer,
  productTopRatingReducer,
} from "./product/productReducer.js";
import thunk from "redux-thunk";
import { cartDetailReducer } from "./cart/cartReducer";

const rootReducer = combineReducers({
  login: userLoginReducer,
  register: userRegisterReducer,
  forgotPassword: userForgotPasswordReducer,
  recoverPassword: userRecoverPasswordReducer,
  topRating: productTopRatingReducer,
  product: productAllReducer,
  cartDetails: cartDetailReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
