/**
 * @author Calvin Galbaw
 */

import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import "../../css/ProductDetail.css";
import {
  MagnifierContainer,
  MagnifierPreview,
  MagnifierZoom,
} from "react-image-magnifiers";
import ReactImageMagnify from "react-image-magnify";
/**
 *
 * @param details is the product detail of a single product
 * @returns JSX for the image handling and zoom effect
 */
function ProductImageTab({ details }) {
  const [mainImage, setMainImage] = useState(details.product_image);

  const onSubImageClick = (i) => {
    setMainImage(i);
  };

  return (
    <div className="mainImageContainer">
      <ReactImageMagnify
        {...{
          smallImage: {
            src: `http://180.149.241.208:3022/${mainImage}`,
            width: 350,
            height: 250,
          },
          largeImage: {
            src: `http://180.149.241.208:3022/${mainImage}`,
            width: 2000,
            height: 600,
          },
        }}
        style={{
          zIndex: 2,
          width: "400px !important",
          height: "250px !important",
        }}
        imageStyle={{ width: "400px !important", height: "250px !important" }}
      />
      <Grid
        className="subImageContainer"
        container
        justify="space-evenly"
        alignContent="flex-start"
      >
        {/* {console.log(details)} */}
        {details.subImages_id.product_subImages.map((image) => {
          return (
            <img
              key={image}
              width="100px"
              height="50px"
              style={{
                border: image == mainImage ? "2px black solid" : "none",
              }}
              onClick={() => onSubImageClick(image)}
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
