import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import "../../css/ProductDetail.css";
function ProductImageTab({ details }) {
  const [mainImage, setMainImage] = useState(details.product_image);
  // const [subImages, setSubImages] = useState(
  //   details.subImages_id.product_subImages
  // );

  const onSubImageClick = (i) => {
    setMainImage(i);
  };

  return (
    <div className="mainImageContainer">
      <img
        alt="Product item"
        width="350px"
        height="200px"
        src={`http://180.149.241.208:3022/${mainImage}`}
      ></img>
      <Grid
        className="subImageContainer"
        container
        justify="space-evenly"
        alignContent="flex-start"
      >
        {details.subImages_id.product_subImages.map((image) => {
          return (
            <img
              width="100px"
              height="50px"
              onClick={onSubImageClick}
              alt="product item"
              src={`http://180.149.241.208:3022/${image}`}
            ></img>
          );
        })}
      </Grid>
    </div>
  );
}

export default ProductImageTab;
