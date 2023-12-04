import React, { useState } from 'react';
import './ReviewForm.css'
import { useParams } from 'react-router-dom';

const ReviewForm = ({ onSubmit }) => {
const{hostelId}= useParams();
  const [formData, setFormData] = useState({
    rating: 1,
    comment: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const AddReview = async (e) => {
    e.preventDefault();
    const { rating,comment} = formData;

    const res = await fetch(`/addReview/${hostelId}`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          rating, comment
        })
    });

    // Check response status
    if (res.status === 422) {
        // Handle the error case
        const errorData = await res.json();
        window.alert(`Review Couldn't be submitted: ${errorData.error}`);
        console.log(`Review couldn't be submitted: ${errorData.error}`);
    } else {
        // Handle the success case
        //const data = await res.json();
        window.alert("Review submitted successfully✌");
        console.log("Review submitted successfully✌");
        //navigate("/hostelsPage");
    }
}

  return (
    <div className="review-form-container">
      <h2>Write a Review</h2>
      <div className="review-form">
       
        <div className="rating">
          <label htmlFor="rating">Rate the hostel: </label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            required
          />
        </div>
        <div className="review-text">
          <textarea
            placeholder="Leave a review"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        <br></br>
        <button className ="btn_style" type="button" onClick={AddReview}>Submit</button>
      </div>
    </div>
  );
};

export default ReviewForm;
