import React from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import './Header.css';

const header = () => {

    return (
        <div className ='headerstyle' >
            <p><b> 
            Register as hostel manager? 
             <Link to="/signupPage" className='Link_style'>
                Sign Up Now!
              </Link>
            </b></p>
        </div>
    );
}

export default header;