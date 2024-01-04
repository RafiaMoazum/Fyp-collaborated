import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const BackendUrl = 'http://localhost:8000';

const ImageSlider = ({ images }) => {
  
    const style1 =
    {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    };

    if (!images || images.length === 0) {
      return <p>No images available</p>; 
    }
  return (
    <div style={style1}>
      <Carousel>
      {images.map((image, index) => (
        <div key={index}>
          <img className="d-block w-100" src={`${BackendUrl}/${image}`} alt={`Image ${index + 1}`} />
        </div>
      ))}
    </Carousel>
    </div>
  );
};

export default ImageSlider;
