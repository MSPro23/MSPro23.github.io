import "./App.css";
import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Dashboard from "./components/Dashboard/Dashboard";
import LoginPage from "./components/Login/LoginPage";
import RegisterPage from "./components/Register/RegisterPage";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import Products from "./components/Products/Products";
import ContainerPage from "./components/SidePane/ContainerPage";

function App() {
  return (
    <Provider store={store}>
      <Header />
      {/* <Dashboard></Dashboard> */}
      {/* <LoginPage></LoginPage> */}
      {/* <RegisterPage></RegisterPage> */}
      {/* <ForgotPassword></ForgotPassword> */}
      {/* <ProductDetail></ProductDetail> */}
      {/* <Products></Products> */}
      <ContainerPage></ContainerPage>
      <Footer></Footer>
    </Provider>
  );
}

export default App;
