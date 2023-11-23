import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';


const Reviews = () => {
  const { hostelId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/showReviews/${hostelId}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (res.status === 200) {
          const data = await res.json();
          console.log(`Reviews: ${JSON.stringify(data)}`);
          setReviews(data);
        } else {
          const error = new Error(res.error);
          throw error;
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchReviews();
  }, [hostelId]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('init', () => {
        emblaApi.play(); // Start autoplay
      });
    }
  }, [emblaApi]);

  const star1 = {
    color: "#FFD600",
    width: "8%",
    height: "8%"
  };
  const card_title = {
    color: "white",
    backgroundColor: "#3C6B97",
    borderRadius: "15px",
    width: "80%",
    textAlign: "center",
    justifyContent: "center"
  };

  return (
    <div>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container" style={{ display: "flex", flexDirection: "row" }}>
          {reviews.map((data, index) => (
            <div key={index} className="embla__slide" style={{ marginRight: "20px" }}>
              <Card style={{ width: "18rem", paddingTop: "20px", borderRadius: "25px" }}>
                <Card.Header style={card_title}>
                  <h5>Rafia</h5>
                </Card.Header>
                <Card.Body>
                  <div style={{ textAlign: "center" }}>
                    <Card.Title>
                      {Array(data.rating).fill(<FaStar style={star1} />)}
                    </Card.Title>
                  </div>
                  <Card.Text style={{ textAlign: "center" }}>
                    {data.comment}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reviews;
