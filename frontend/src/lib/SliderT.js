import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Test.css"

const SliderT = () => {
  const settings = {
    className : "slider variable-width",
    arrows: false,
      dots: true,
      infinite: true,
      slidesToShow: 1,
      centerMode: true,
      slidesToScroll: 1,
      variableWidth: true
    }
  return (
    <div>
    <Slider {...settings}>
    	<div className='sprSlider'>
    	  <h3>1</h3>
    	</div>
    	<div className='sprSlider'>
    	  <h3>2</h3>
    	</div>
    	<div className='sprSlider'>
    	  <h3>3</h3>
    	</div>
    	<div className='sprSlider'>
    	  <h3>4</h3>
    	</div>
    	<div className='sprSlider'>
    	  <h3>5</h3>
    	</div>
      </Slider>
      </div>
  );
};

export default SliderT;
