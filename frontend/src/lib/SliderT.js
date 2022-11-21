import React from "react";
import "./Test.css";
import Carousel from "nuka-carousel";


const SliderT = ({ticketArr}) => {
  const settings = {
    className : "slider variable-width",
    arrows: true,
      // dots: true,
      infinite: false,
      slidesToShow: 2,
      centerMode: true,
      slidesToScroll: 1,
      variableWidth: true
    }

  return (
    <div>
    <Slider {...settings}>
   {ticketArr?.map((item) => item)} 
      </Slider>
      </div>
    </div>
  );
};

export default SliderT;