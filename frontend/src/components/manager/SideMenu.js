import React from 'react';
import './SideMenu.css';
import { NavLink } from "react-router-dom";

const SideMenu = (props) => {
  return (
    <div className="sidebar">
      <NavLink to={props.link1} className='link'>{props.opt1}</NavLink>
      <NavLink to={props.link2} className='link'>{props.opt2}</NavLink>
      <NavLink to={props.link3} className='link'>{props.opt3}</NavLink>
      <NavLink to={props.link4} className='link'>{props.opt4}</NavLink>
      {/* <NavLink to="/HostelsPage" className='link'>{props.opt1}</NavLink>
      <NavLink to="/HostelProfile" className='link'>{props.opt2}</NavLink>
      <NavLink to="/RoomStatus" className='link'>{props.opt3}</NavLink>
      <NavLink to="/CustomerInfo" className='link'>{props.opt4}</NavLink> */}
    </div>
  );
};

export default SideMenu;