import React from 'react';
import Slider from 'react-slick';
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
    <div className="w-full max-w-3xl mx-auto my-8">
      <Slider {...settings}>
        <div className="flex justify-center items-center h-[300px] overflow-hidden">
          <img src="/images/slider-1.png" alt="Slider 1" className="inline-block max-w-full max-h-[250px] object-cover rounded-lg mx-auto" />
        </div>
        <div className="flex justify-center items-center h-[300px] overflow-hidden">
          <img src="/images/macarron.png" alt="Macarons" className="inline-block max-w-full max-h-[250px] object-cover rounded-lg mx-auto" />
        </div>
        <div className="flex justify-center items-center h-[300px] overflow-hidden">
          <img src="/images/helado.png" alt="Helado" className="inline-block max-w-full max-h-[250px] object-cover rounded-lg mx-auto" />
        </div>
      </Slider>
    </div>
  );
}

export default ProductSlider;
