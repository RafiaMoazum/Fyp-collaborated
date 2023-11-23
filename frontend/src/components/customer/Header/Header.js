import React from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';


const header = () => {

    const headerstyle =
        {
          color: "white",
          backgroundColor: "#3C6B97",
          padding: "20px",
          fontFamily: "Sans-Serif",
          height:"80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        };

    return (
        <div style={headerstyle}>
            <p><b> 
            Register as hostel manager?  <Link
  to="/signupPage"
  style={{
    color: 'white',
    borderRadius: '5px',
    border: '1px solid white',
    padding: '5px 10px',
    textDecoration: 'none'
  }}
>
  Sign Up Now!
</Link>
            </b></p>
        </div>
    );
}

export default header;