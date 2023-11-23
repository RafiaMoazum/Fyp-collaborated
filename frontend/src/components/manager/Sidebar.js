import React from 'react';
import './Sidebar.css';
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  return (
    <div className="sidebar">
      <Link to="/HostelsPage">{props.opt1}</Link>
      <Link to="/HostelProfile">{props.opt2}</Link>
      <Link to="/RoomStatus">{props.opt3}</Link>
      <Link to="/CustomerInfo">{props.opt4}</Link>
    </div>
  );
};

export default Sidebar;