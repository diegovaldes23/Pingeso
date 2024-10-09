import React from 'react';
import Slider from 'react-slick';
import './Slider.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function ProductSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="slider-wrapper">
      <Slider {...settings}>
        <div className="slide">
          <img src="/images/slider-1.png" alt="Slider 1" />
        </div>
        <div className="slide">
          <img src="/images/macarron.png" alt="Macarons" />
        </div>
        <div className="slide">
          <img src="/images/helado.png" alt="Helado" />
        </div>
      </Slider>
    </div>
  );
}

export default ProductSlider;
