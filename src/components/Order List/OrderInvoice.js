/**
 * @author Calvin Galbaw
 */

import { Button } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
/**
 *
 * @param createdAt is the date string
 * @param product_details is the details of a single product
 * @param id is  the id of the order
 */
function OrderInvoice({ createdAt, product_details, id }) {
  /**
   * @description This is used to get the invoice of the order on click of the button
   */
  const [link, setLink] = useState(""); //creates the link state for the download link
  useEffect(() => {
    let mount = true;
    Axios.post(
      "http://180.149.241.208:3022/getInvoiceOfOrder",
      {
        createdAt,
        product_details,
        _id: id,
      },
      {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => mount && setLink(res.data.receipt))
      .catch((e) => mount && console.log(e.response));
    return () => {
      mount = false;
    };
  }, []);

  return (
    <a href={`http://180.149.241.208:3022/${link}`} download target="_blank">
      <Button variant="contained" color="primary">
        Download Invoice as PDF
      </Button>
    </a>
  );
}

export default OrderInvoice;
