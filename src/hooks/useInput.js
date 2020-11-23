/**
 * @author Calvin Galbaw
 * @requires useState from React Hooks
 * @description This is a custom hook for reducing the code verbose for common controlled input component feild
 * @param {initialValue}
 * @returns {[value,bind]} which is the initial state from the parameter and the setState Function
 */
import { useState } from "react";

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  const bind = {
    value,
    onChange: (e) => {
      setValue(e.target.value);
    },
  };
  return [value, bind];
}

export default useInput;
