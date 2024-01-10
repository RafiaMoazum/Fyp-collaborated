import React, { useState,useEffect } from 'react';
import './ReviewForm.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ReviewForm = () => {
const{hostelId}= useParams();
const navigate = useNavigate();
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

  const isAuthenticated = () => {
    // Read the token from the cookie
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*=\s*([^;]*).*$)|^.*$/, "$1");
    console.log("Token from Cookie:", token);

    // Check if the token exists and is not expired
    return token ? true : false;
};
useEffect(() =>{
  isAuthenticated();
  
},[]);
  const AddReview = async (e) => {
    e.preventDefault();
    const { rating,comment} = formData;

  //   if (!isAuthenticated()) {
  //     // Redirect to the login page
  //    navigate("/loginPageC");
  //     return;
  // }
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
