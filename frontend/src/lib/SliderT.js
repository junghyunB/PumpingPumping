import React from "react";
import "./Slider.css";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const SliderT = ({ ticketArr }) => {
  const responsive = {
    1024: { items: 1 },
  };

  return (
    <div>
      <AliceCarousel
        mouseTracking
        items={ticketArr}
        responsive={responsive}
        controlsStrategy="alternate"
        disableDotsControls
        paddingLeft={170}
      >
      </AliceCarousel>
    </div>
  );
};

export default SliderT;
