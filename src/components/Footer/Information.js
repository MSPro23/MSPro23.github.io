/**
 * @author Calvin Galbaw
 */

import React from "react";
import { useHistory } from "react-router-dom";
import "../../css/Footer.css";
import axios from "axios";
/**
 * @description This creates the component of Information tab
 */
function Information() {
  const history = useHistory();
  /**
   * @description These are used to get the files of repective category
   */
  const handleTandC = () => {
    axios
      .get("http://180.149.241.208:3022/getTermsAndConditions")
      .then((response) => {
        console.log(response.data);
        window.open(
          `http://180.149.241.208:3022/${response.data.termsAndConditions_details[0].fileName}`,
          "_blank"
        );
      });
  };

  const handlereturnPolicy = () => {
    axios.get("http://180.149.241.208:3022/getGuarantee").then((response) => {
      console.log(response.data);
      window.open(
        `http://180.149.241.208:3022/${response.data.guarantee_details[0].fileName}`,
        "_blank"
      );
    });
  };

  return (
    <div className="footerTab">
      <h5>Information</h5>
      <p className="hoverLink" onClick={handleTandC}>
        Terms and Condition
      </p>
      <p className="hoverLink" onClick={handlereturnPolicy}>
        Gurantee and Return Policy
      </p>
      <p className="hoverLink" onClick={() => history.push("/contactUs")}>
        Contact Us
      </p>
      <p className="hoverLink">Privacy Policy</p>
      <p className="hoverLink">Locate Us</p>
    </div>
  );
}

export default Information;
