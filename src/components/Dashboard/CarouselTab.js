import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";

function CarouselTab() {
  const [carouselData, setCarouselData] = useState([]);
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
  return (
    <Carousel indicators={false}>
      {carouselData.map((category) => {
        return (
          <Carousel.Item>
            <img
              className="d-block w-100"
              height="400px"
              src={`http://180.149.241.208:3022/${category.product_image}`}
              alt={category.category_name}
            />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default CarouselTab;
