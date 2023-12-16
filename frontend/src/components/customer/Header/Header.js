import React from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import './Header.css';

const header = () => {

    return (
        <div className ='headerstyle' >
            <p><b> 
            Continue as a hostel manager? 
             <Link to="/loginPage" className='Link_style'>
                Login
              </Link>
            </b></p>
        </div>
    );
}

export default header;