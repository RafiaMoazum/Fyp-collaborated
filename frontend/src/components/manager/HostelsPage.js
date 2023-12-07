import React, { useEffect } from 'react'
import {useState} from 'react';
import { NavLink } from 'react-router-dom';
import './HostelsPage.css'
import Navbar from './Navbar';
import BlueHeader2 from './BlueHeader2';
import SideMenu from './SideMenu'
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { Link } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa'

export default function HostelsPage() {

  const navigate= useNavigate();
  const[userData, setUserData]=useState({ name: 'Manager' });
  const [hostelData, setHostelData] = useState([]);


  const fetchManagerData = async () =>{
      
      try{
        const res = await fetch('/managerData',{
           
          method:"GET",
          headers:{
             Accept:"application/json",
             "Content-Type":"application/json"
          },
          credentials:"include"
        });
        
         const data= await res.json();
         console.log(`name= ${data.name}`);
         //console.log(`data=: ${data}`);

         setUserData(data);
         
         

          if(res.status !== 200)
          {
            const error= new Error(res.error);
            throw error;
          }

      }catch(err){
        console.log(err);
        navigate("/loginPage");
      }
  }

  const fetchHostelData = async () => {
    try {
      const res = await fetch('/hostelData', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      if (res.status === 200) {
        const data = await res.json();
        console.log(`hostels✌: ${data.hostels}`);
        setHostelData(data.hostels);
       
      }else {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.error(err);
      navigate('/loginPage');
    }
  };



  useEffect(() =>{
      fetchManagerData();
      fetchHostelData();
  },[]);

   
  return (
    <>
      <Navbar/>
      <BlueHeader2/>
      <div>
        <Row>
          <Col xs={4} sm={4} md={2} lg={2}>
            <div>
              <div className='side'>
              <nav>
                <ul>
                  {userData && <h2>{userData.name}</h2>}
                  <li><Link to="" style={{textDecoration: "none", color: "white"}} >Profile</Link></li>
                  <div style={{ border: "1px solid white", margin: "10px 0" }}></div>
                  <li><Link to="" style={{textDecoration: "none", color: "white"}} >Notification</Link> </li>
                  <div style={{ border: "1px solid white", margin: "10px 0" }}></div>
                  <li><Link to="" style={{textDecoration: "none", color: "white"}} >Messages</Link></li>
                  <div style={{ border: "1px solid white", margin: "10px 0" }}></div>
                  <li><Link to="" style={{textDecoration: "none", color: "white"}} >Logout</Link></li>
                  <div style={{ border: "1px solid white", margin: "10px 0" }}></div>
                </ul>
              </nav>
              </div>
            </div>
          </Col>
          <Col xs={8} sm={8} md={10} lg={10}>
          <section>
            <div>
              <Row>
              <h2 className='title'>
                    <Link to="/hostel_AddForm" style={{textDecoration: "none", color: "Black"}} >
                    <FaPlusCircle/>  Add Hostel
                    </Link>
                  </h2>
              </Row>
            </div>
            {hostelData.map((hostel, index) => (
              <>      
                <div className="container" key={index}>
                  <div className="image-container">
                    <img src="hostel1.png" alt="hostel" className="rounded-image" />
                  </div>
                  <div className="content-container">
                      <h2><NavLink to={`/HostelProfile/${hostel._id}`} key={hostel._id}className='hostelNameLink'>{hostel.name}</NavLink></h2>
                      <p> {hostel.city}</p>
                      <br></br>
                    </div>
                    <div style={{ border: "1px solid black"}}>
                    </div>
                </div>
              </>
            ))}
          </section>
          </Col>
        </Row>
      </div>
    </>
  )
}