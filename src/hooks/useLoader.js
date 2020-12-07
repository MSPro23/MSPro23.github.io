/**
 * @author Calvin Galbaw
 * @requires useState from React Hooks
 * @description This is a custom hook for reducing the code verbose for common loader component feild
 * @param {initialValue}
 * @returns {[value,bind]} which is the initial state , setLoading on or off
 */

import React from "react";
import { useState } from "react";
import Loader from "react-loader-spinner";
import "../App.css";

function useLoader() {
  const [loading, setLoading] = useState(false);
  return [
    loading && (
      <div className="loaderContainer">
        <Loader
          type="TailSpin"
          color="#2BAD60"
          height="100"
          width="100"
          className="loader"
        />
      </div>
    ),
    () => setLoading(true),
    () => setLoading(false),
  ];
}

export default useLoader;
