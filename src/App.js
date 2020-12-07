import "./App.css";
import React, { createContext, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Dashboard from "./components/Dashboard/Dashboard";
import LoginPage from "./components/Login/LoginPage";
import RegisterPage from "./components/Register/RegisterPage";

import ProductDetail from "./components/ProductDetail/ProductDetail";
import store from "./redux/store.js";
import { Provider, useDispatch } from "react-redux";
import Products from "./components/Products/Products";
import ContainerPage from "./components/SidePane/ContainerPage";
import CartPage from "./components/Cart/CartPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container, Snackbar } from "@material-ui/core";
import ForgotPasswordAuth from "./components/ForgotPassword/ForgotPasswordAuth";
import ForgotPasswordForm from "./components/ForgotPassword/ForgotPasswordForm";
import OrderPlaced from "./components/Cart/OrderPlaced";
import Contact from "./components/Contact";
import NoPage from "./components/NoPage";
/**
 * Two context is created to share the login status and token of the user in case of user login and also
 * for toast notification throughout the website
 */

export const LoginContext = createContext(); //Creating the context using Context API
export const ToastContext = createContext(); //Creating the context using Context API

function App() {
  /**
   * States for login and toast are initialized along with their setState methods
   *
   */
  const [loginStatus, setLoginStatus] = useState({
    token: "",
    isLoggedIn: false,
    isFirstLogin: false,
  });

  const [open, setOpen] = useState({
    show: false,
    message: "",
  });

  const handleClose = () => {
    setOpen({
      ...open,
      show: false,
      message: "",
    });
  };

  /**
   * This checks whether the user had logged in before by checking the local storage of token
   */
  useEffect(() => {
    if (loginStatus.isLoggedIn !== true) {
      const token = localStorage.getItem("token") || "";
      if (token !== "") {
        setLoginStatus({
          token: token,
          isLoggedIn: true,
        });
      } else {
        setOpen({
          show: open,
          message: "You are not logged in",
        });
      }
    }
  }, []);

  return (
    <LoginContext.Provider value={[loginStatus, setLoginStatus]}>
      <ToastContext.Provider value={[open, setOpen]}>
        <Provider store={store}>
          <Router>
            <Header />
            {/**
             *
             * Since header and footer are common in all the pages, they are not added to the routing
             *
             */}
            <Switch>
              <Route path={["/", "/dashboard"]} exact component={Dashboard} />
              <Route path="/login" exact component={LoginPage} />
              <Route path="/register" exact component={RegisterPage} />
              <Route path="/products/" exact component={Products} />
              <Route path="/products/:id" exact component={Products} />
              <Route path="/products/:id/:name" exact component={Products} />
              <Route
                path="/forgotpassword"
                exact
                component={ForgotPasswordAuth}
              />
              <Route path="/cartPage" exact component={CartPage} />
              <Route path="/login" exact component={LoginPage} />

              <Route path="/recover" exact component={ForgotPasswordForm} />
              <Route path="/productDetail/:id" component={ProductDetail} />
              <Route path="/login" exact component={LoginPage} />
              <Route path="/order-placed" exact component={OrderPlaced} />
              <Route path="/contactUs" exact component={Contact} />
              {/**
               * Similar to the header, ContainerPage containing the details and the profile picture is a commom component
               * to other pages hence the route goes to it but later the routing gets further divided
               *
               */}
              <Route path={"/MyAccount/:page/:id?"} component={ContainerPage} />
              <Route component={NoPage}></Route>
            </Switch>

            <Footer></Footer>
            {/**
             * This is the toast component which resides in the main App page but the state and control is
             * sent to children using Context API
             *
             */}
            <Snackbar
              open={open.show}
              autoHideDuration={3000}
              message={open.message}
              onClose={handleClose}
            ></Snackbar>
          </Router>
        </Provider>
      </ToastContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
