import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const ImageSlider = ({ images }) => {
    const style1 =
    {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    };
  return (
    <div style={style1}>
      <Carousel>
      {images.map((image, index) => (
        <div key={index}>
          <img className="d-block w-100" src={image} alt={`Image ${index}`} />
        </div>
      ))}
    </Carousel>
    </div>
  );
};

export default ImageSlider;
