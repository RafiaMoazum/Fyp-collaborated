import React from 'react'
import './Navbar.css';
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <>
    <div class="topnav">
    <img className="image" src="/logo.png" alt="Logo" width="100" height="50" />
  <div class="topnav-right">
    <Link to={props.link1}>{props.option1}</Link>
    <Link to={props.link2}>{props.option2}</Link>
    <Link to={props.link3}>{props.option3}</Link>
    {/* <a href="#" class="fa fa-facebook"></a>
        <a href="#" class="fa fa-twitter"></a>
        <a href="#" class="fa fa-instagram"></a> */}
        
  </div>
</div>
    </>
  )
}
