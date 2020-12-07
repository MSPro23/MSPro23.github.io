/**
 * @author Calvin Galbaw
 */

import React from "react";
import Button from "react-bootstrap/esm/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import "../../css/SocialLogin.css";
/**
 * @description Creates the social login buttons
 * @returns JSX
 */
function SocialLogin() {
  return (
    <div className="socialLoginContainer">
      <Button className="socialButton" style={{ backgroundColor: "#395998" }}>
        <FontAwesomeIcon size="3x" icon={faFacebookF}></FontAwesomeIcon>
        <span style={{ position: "relative", bottom: "12px" }}>
          &nbsp;&nbsp;&nbsp;&nbsp; Login with Facebook
        </span>
      </Button>
      <Button className="socialButton" style={{ backgroundColor: "#ea4335" }}>
        <FontAwesomeIcon size="3x" icon={faGoogle}></FontAwesomeIcon>
        <span style={{ position: "relative", bottom: "12px" }}>
          &nbsp;&nbsp;&nbsp;&nbsp; Login with Google
        </span>
      </Button>
      <Button className="socialButton" style={{ backgroundColor: "#00acee" }}>
        <FontAwesomeIcon size="3x" icon={faTwitter}></FontAwesomeIcon>
        <span style={{ position: "relative", bottom: "12px" }}>
          &nbsp;&nbsp;&nbsp;&nbsp; Login with Twitter
        </span>
      </Button>
    </div>
  );
}

export default SocialLogin;
