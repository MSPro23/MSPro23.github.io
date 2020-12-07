/**
 * @author Calvin Galbaw
 */

import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import "../../css/Header.css";
// import ReactDom from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import Badge from "@material-ui/core/Badge";
import useInput from "../../hooks/useInput";
import { LoginContext, ToastContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { fetchCart, logoutCart, resetLogin, restoreCart } from "../../redux";
import { Input, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Axios from "axios";
/**
 * @description This function is used to create the search bar of the header
 * @param props which contains the array of products and an onchange handler
 * @returns JSX of the search bar along with its logic
 */
const SearchbarDropdown = (props) => {
  const { options, onInputChange } = props;

  const ulRef = useRef();
  const inputRef = useRef();
  const history = useHistory();

  /**
   * @description This function adds the functionality to the input feild of
   * the search bar by setting the display of the ul from none to flex
   */

  useEffect(() => {
    inputRef.current.addEventListener("click", (event) => {
      event.stopPropagation();
      ulRef.current.style.display = "flex";
      onInputChange(event);
    });
  }, []);
  /**
   * @description This is a event handle for the search button click
   * @returns redirects the page to the search result page
   */
  const searchClick = () => {
    let ig = inputRef.current.value;
    inputRef.current.value = "";
    onInputChange();
    history.replace(`/products/h/${ig}`);
  };

  return (
    <div className="search-bar-dropdown">
      <SearchIcon
        className="mt-1"
        style={{
          position: "absolute",
          color: "black",
          height: "1.5em",
          width: "1.5em",
        }}
        onClick={searchClick}
      />
      <input
        id="search-bar"
        type="text"
        className="form-control"
        style={{ paddingLeft: "2rem" }}
        placeholder="Search"
        ref={inputRef}
        onChange={onInputChange}
      />

      <ul
        id="results"
        className="list-group"
        style={{ zIndex: "1000", position: "absolute" }}
        ref={ulRef}
      >
        {/* This Function makes the list in dropdown menu */}
        {options.slice(0, 10).map((option) => {
          return (
            <button
              type="button"
              key={option.product_id}
              onClick={(e) => {
                inputRef.current.value = option.product_name;
              }}
              className="list-group-item list-group-item-action"
            >
              {option.product_name}
            </button>
          );
        })}
      </ul>
    </div>
  );
};
/**
 * @description creates the header of the page having nav links, cart details, search bar and profile pages
 * @return JSX of the header component with all the elements
 */
function Header() {
  const [search, searchBind] = useInput(""); //States and binds of controlled form data is initialized
  const [options, setOptions] = useState([]); //creates the state to hold the array of products according to the search input
  const history = useHistory(); //creates a useHistory hook to redirect page
  const dispatch = useDispatch(); //creates a dispatch function to send dispatch a action
  const [product, setProduct] = useState([]); //creates the state of all products
  const [loginStatus, setLoginStatus] = useContext(LoginContext); //getting the login state and setState using hooks
  const cartNumber = useSelector((state) => state.cartDetails.items); //get cart from redux
  const [open, setOpen] = useContext(ToastContext); //getting the toast state and setState using hooks
  const [pic, setPic] = useState("");

  /**
   * @description This handles the logout of the user by clearing local storage and setting the states accordingly
   * and redirecting towards login
   */
  const onLogoutClick = () => {
    dispatch(logoutCart(cartNumber));
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    dispatch(resetLogin());
    setLoginStatus({
      token: "",
      isLoggedIn: false,
    });
    history.push("/dashboard");
  };

  /**
   *
   * @para event is the synthetic event
   * @description This sets the options under the search bar using filter and includes to get them.
   */
  const onInputChange = (event) => {
    try {
      setOptions(
        product.product_details.filter((option) =>
          option.product_name
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
        )
      );
    } catch (error) {
      setOptions([]);
    }
  };

  /**
   * @description This is used to get all the products which is used to filter the search bar
   */
  useEffect(() => {
    Axios.get("http://180.149.241.208:3022/commonProducts")
      .then((res) => {
        setProduct(res.data);
      })
      .catch((e) => console.log(e.response));
  }, []);
  /**
   *  @description This is used to get the customer profile pic
   */
  useEffect(() => {
    if (localStorage.getItem("token") != undefined) {
      Axios.get("http://180.149.241.208:3022/getCustProfile", {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          setPic(res.data.customer_proile.profile_img);
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  });
  /**
   * @description This is a dispatch to restore the cart if it is saved in the local storage
   */
  useEffect(() => {
    dispatch(restoreCart());
  }, []);
  /**
   * @description Bootstrap is used to create the navbar component using its own components and
   * create the navlinks and cart along with user profile
   */
  return (
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand>
        <h1 className="logo-start">
          Neo<span className="logo">STORE</span>
        </h1>
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        style={{ backgroundColor: "white" }}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto justify-content-center" style={{ flex: 1 }}>
          <Nav.Link onClick={() => history.push("/dashboard")}>Home</Nav.Link>

          <Nav.Link onClick={() => history.push("/products/")}>
            Products
          </Nav.Link>

          <Nav.Link onClick={() => history.push("/MyAccount/orders")}>
            Order
          </Nav.Link>
        </Nav>
        <Form inline>
          <SearchbarDropdown options={options} onInputChange={onInputChange} />
          <Button variant="light" onClick={() => history.push("/cartPage")}>
            <Badge badgeContent={cartNumber.length} color="secondary">
              <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
            </Badge>
            &nbsp;&nbsp;&nbsp;Cart
          </Button>
          &nbsp;&nbsp;
          <Dropdown>
            <Dropdown.Toggle
              variant="light"
              id="dropdown-basic"
              className="userButton"
            >
              {/**
               * Render the image only if the user has uploaded on or not
               */}
              {pic != "" || pic ? (
                <img
                  src={`http://180.149.241.208:3022/${pic}`}
                  alt="User Profile"
                  style={{ borderRadius: "50%", width: "25px", height: "25px" }}
                ></img>
              ) : (
                <FontAwesomeIcon
                  icon={faUserCircle}
                  size="lg"
                ></FontAwesomeIcon>
              )}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {loginStatus.isLoggedIn ? (
                <>
                  {" "}
                  <Dropdown.Item
                    onClick={() => history.push("/MyAccount/profile")}
                  >
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={onLogoutClick}>Logout</Dropdown.Item>
                </>
              ) : (
                <>
                  <Dropdown.Item onClick={() => history.push("/register")}>
                    Register
                  </Dropdown.Item>

                  <Dropdown.Item onClick={() => history.push("/login")}>
                    Login
                  </Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
