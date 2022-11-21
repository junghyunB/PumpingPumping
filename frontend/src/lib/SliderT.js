import React from "react";
import "./Test.css";
import Carousel from "nuka-carousel";


const SliderT = () => {

  return (
    <div className="mode2BuyPageContainer">
      <div className="mode2BuyPageSection">
        <div className="center">
          <Carousel  disableAnimation={true} scrollMode="remainder" cellSpacing={120}   defaultControlsConfig={{
    nextButtonText: 'Next',
    nextButtonStyle: {
    
    },
    prevButtonText: 'Prev',
    pagingDotsStyle: {
      fill: 'red',
    }
  }}>
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default SliderT;
