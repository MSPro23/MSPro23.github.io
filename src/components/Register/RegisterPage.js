/**
 * @author Calvin Galbaw
 */

import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import RegisterForm from "./RegisterForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import "../../css/RegisterPage.css";
import { Prompt, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
/**
 * @description This holds the form componenet and register by social login buttons
 * @returns JSX is the div element which holds the form and buttons
 */
function RegisterPage() {
  const completed = useSelector((state) => state.register.completed);
  return (
    <>
      <Prompt
        message={(location) => {
          return completed == true
            ? true
            : `Are you sure you want to leave the form?`;
        }}
      />
      <div>
        <div className="registerButtonContainer">
          <Button
            className="registerSocialButton"
            style={{ backgroundColor: "#395998" }}
          >
            <FontAwesomeIcon size="3x" icon={faFacebookF}></FontAwesomeIcon>
            <span style={{ position: "relative", bottom: "12px" }}>
              &nbsp;&nbsp;&nbsp;&nbsp; Login with Facebook
            </span>
          </Button>
          <Button style={{ backgroundColor: "#ea4335" }}>
            <FontAwesomeIcon size="3x" icon={faGoogle}></FontAwesomeIcon>
            <span style={{ position: "relative", bottom: "12px" }}>
              &nbsp;&nbsp;&nbsp;&nbsp; Login with Google
            </span>
          </Button>
        </div>
        <hr></hr>
        <RegisterForm></RegisterForm>
      </div>
    </>
  );
}

export default RegisterPage;
