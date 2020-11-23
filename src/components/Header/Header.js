import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import "../../css/Header.css";
import ReactDom from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import Badge from "@material-ui/core/Badge";
import useInput from "../../hooks/useInput";

function Header() {
  const [search, searchBind] = useInput("");

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
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Products</Nav.Link>
          <Nav.Link href="#hello">Order</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            value={search}
            {...searchBind}
          />
          <Button variant="light">
            <Badge badgeContent={1} color="secondary">
              <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
            </Badge>
            &nbsp;&nbsp;&nbsp;Cart
          </Button>
          &nbsp;&nbsp;
          <Dropdown alignRight>
            <Dropdown.Toggle
              variant="light"
              id="dropdown-basic"
              className="userButton"
            >
              <FontAwesomeIcon icon={faUserCircle} size="lg"></FontAwesomeIcon>
              {/* <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon> */}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
