/**
 * @author Calvin Galbaw
 */

import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import { Link } from "react-router-dom";

function CarouselTab() {
  const [carouselData, setCarouselData] = useState([]);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  /**
   * @description This is used to get the images of each category from the server
   * @returns sets array of images to carousel data
   */
  useEffect(() => {
    axios
      .get("http://180.149.241.208:3022/getAllCategories")
      .then((res) => {
        setCarouselData(res.data.category_details);
      })
      .catch((e) => {
        alert(e.response);
      });
  }, []);
  /**
   * @description It uses the Carousel of the react bootstrap
   */
  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      style={{ marginTop: "50px" }}
    >
      {carouselData.map((category) => {
        return (
          <Carousel.Item key={category.category_id}>
            <Link
              to={`/products/${category.category_id}`}
              style={{ textDecoration: "none" }}
            >
              <img
                className="d-block w-100"
                height="400px"
                src={`http://180.149.241.208:3022/${category.product_image}`}
                alt={category.category_name}
              />
            </Link>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default CarouselTab;
