import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Container } from 'react-bootstrap';


const Reviews = () => {
  const { hostelId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false, autoplay: true, autoplayInterval: 5000 },
    [Autoplay()],
  );

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
          setReviews(data);

          // Fetch user information for each review
          const reviewsWithUserNames = await Promise.all(data.map(async (review) => {
            const userResponse = await fetch(`/getUser/${review.user}`);
            if (userResponse.status === 200) {
              const userData = await userResponse.json();
              return { ...review, userName: userData.name };
            } else {
              return { ...review, userName: 'Unknown User' };
            }
          }));

          setReviews(reviewsWithUserNames);
        } else {
          const error = new Error(res.error);
          throw error;
        }

         // Fetch average rating
         const averageRatingResponse = await fetch(`/averageRating/${hostelId}`);
         if (averageRatingResponse.status === 200) {
           const averageRatingData = await averageRatingResponse.json();
           
           setAverageRating(averageRatingData.averageRating);
         } else {
           const error = new Error(averageRatingResponse.error);
           throw error;
         }

      } catch (err) {
        console.error(err);
      }
    };

    fetchReviews();
  }, [hostelId]);

  const star1 = {
    color: "#FFD600",
    width: "8%",
    height: "8%",
  };

  const card_title = {
    color: "white",
    backgroundColor: "#3C6B97",
    borderRadius: "15px",
    textAlign: "center",
    justifyContent: "center",
  };

  return (
    <Container fluid>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container d-flex">
          {reviews.map((data, index) => (
            <div key={index} className="embla__slide mx-2">
              <Card style={{ width: "18rem", borderRadius: "25px" }} className="mr-3">
                <Card.Header style={card_title}>
                  <h5>{data.userName}</h5>
                </Card.Header>
                <Card.Body>
                  <div style={{ textAlign: "center" }}>
                    <Card.Title>
                    {Array(data.rating).fill(null).map((_, index) => (
                     <FaStar key={index} style={star1} />
                     ))}
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
    </Container>
  );
};

export default Reviews;
