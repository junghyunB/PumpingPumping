import React from "react";
import "./Slider.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const SliderT = ({ticketArr}) => {
  const settings = {
    className : "slider variable-width",
    arrows: true,
      // dots: true,
      infinite: true,
      slidesToShow: 1,
      centerMode: true,
      slidesToScroll: 3,
      variableWidth: true
    }

  return (
    <div>
    <Slider {...settings}>
   {ticketArr?.map((item) => item)} 
      </Slider>
      </div>
  );
};

export default SliderT;