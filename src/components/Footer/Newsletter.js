import React, { useState } from "react";
import "../../css/Footer.css";
import useInput from "../../hooks/useInput";
function Newsletter() {
  const [email, emailBind] = useInput("");

  return (
    <div className="footerTab">
      <h5>Newsletter</h5>
      <p>
        Signup to get exclusive offer from our favorite brands and to be well up
        in the news
      </p>
      <input
        type="text"
        value={email}
        {...emailBind}
        placeholder="Your email"
      ></input>
      <button className="subscribeButton">Subscribe</button>
    </div>
  );
}

export default Newsletter;
