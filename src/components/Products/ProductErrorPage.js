/**
 * @author Calvin Galbaw
 */

import React from "react";

function ProductErrorPage() {
  /**
   * @description This page is rendered if no product is found according to the filter
   */
  return (
    <div>
      <img
        src="https://dlinkmea.com/images/no-product.png"
        alt="no product"
      ></img>
    </div>
  );
}

export default ProductErrorPage;
