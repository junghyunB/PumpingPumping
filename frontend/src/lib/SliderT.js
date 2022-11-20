import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Test.css"

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
  );
};

export default SliderT;