import React from 'react'
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import './RoomStatus.css'
import { useParams } from 'react-router-dom';
import BlueHeader2 from './BlueHeader2';
import Navbar from './Navbar'
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { Link } from 'react-router-dom';
import {FaEdit} from 'react-icons/fa';
import { Container } from 'react-bootstrap';
import RoomForm from './RoomForm';

export default function RoomStatus() {
    const { hostelId } = useParams();
    const[userData, setUserData]=useState({ name: 'Manager' });
    const navigate = useNavigate();
    
    const [isModalVisible, setModalVisible] = useState(false);
    const roomNumbers = [1, 2, 3, 4];
    const handleRoomClick = () => {
        setModalVisible(true);
      };
    
      const closeModal = () => {
        setModalVisible(false);
      };

    //const navigate = useNavigate();
    const [roomData, setRoomData] = useState({
        roomNumber: '',
        type: '',
        capacity: '',
        currentCapacity:'',
        price: '',
        ac: false,
        workingDesk: false,
        attachedBath: false,
        roomFridge: false,
        geyser: false,
        Kitchenette: false,
        Safe: false,
        Iron: false,
        room_Service: false,
        roomImages: []
    });

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

    const [displayrooms, setDisplayRooms] = useState([]);

     
    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        setRoomData({ ...roomData, [name]: newValue });
    }


    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle form submission
    }

    const AddRoom = async (e) => {
    e.preventDefault();
    const { roomNumber,capacity,currentCapacity,price,
    ac,
    workingDesk,
    attachedBath,
    roomFridge,
    geyser,
    Kitchenette,
    Safe,
    Iron,
    room_Service,
     } = roomData;

    const res = await fetch(`/addRoom/${hostelId}`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          roomNumber,capacity,currentCapacity,price,
          ac,
          workingDesk,
          attachedBath,
          roomFridge,
          geyser,
          Kitchenette,
          Safe,
          Iron,
          room_Service
        })
    });

    // Check response status
    if (res.status === 422) {
        // Handle the error case
        const errorData = await res.json();
        window.alert(`Room couldn't be registered: ${errorData.error}`);
        console.log(`Room couldn't be registered: ${errorData.error}`);
    } else {
        // Handle the success case
        //const data = await res.json();
        window.alert("Room registered successfully✌");
        console.log("Room registered successfully✌");
        //navigate("/hostelsPage");
    }
}


  const DisplayRoomData = async () => {
    try {
      const res = await fetch(`/showRooms/${hostelId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      console.log('Response:', res);

      if (res.status === 200) {
        const data = await res.json();
        console.log(`Room✌: ${data}`);
        setDisplayRooms(data);
        
      }
      else {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.error(err);
    
    }
    
  };
  useEffect(() =>{
    DisplayRoomData();
},[AddRoom]);

  
    const [formVisible, setFormVisible] = useState(false);

    function toggleFormVisibility() {
      setFormVisible(!formVisible);
    }
    const headingStyle = {
        color: 'black',
        textAlign: 'left'
      };
  return (
   <>
    <Navbar/>
    <BlueHeader2/>
    <Container fluid>
        <Row>
            <Col xs={4} sm={4} md={2} lg={2}>
                <div>
                    <div className='side'>
                        <nav>
                            <ul>
                                <li>{userData && <h2>{userData.name}</h2>}</li>
                                <li><Link to="" style={{textDecoration: "none", color: "black"}} >Profile</Link></li>
                                <div style={{ border: "1px solid black", margin: "10px 0" }}></div>
                                <li><Link to="" style={{textDecoration: "none", color: "black"}} >Notification</Link> </li>
                                <div style={{ border: "1px solid black", margin: "10px 0" }}></div>
                                <li><Link to="" style={{textDecoration: "none", color: "black"}} >Messages</Link></li>
                                <div style={{ border: "1px solid black", margin: "10px 0" }}></div>
                                <li><Link to="" style={{textDecoration: "none", color: "black"}} >Logout</Link></li>
                                <div style={{ border: "1px solid black", margin: "10px 0" }}></div>
                            </ul>
                        </nav>
                    </div>
              </div>
            </Col>
            <Col xs={8} sm={8} md={10} lg={10}>
                <Container>
                <Row>
                                <h1 style={{ textAlign: "left" }}>Rooms</h1>
                                <br></br>
                                {displayrooms.map((room) => (
                                    <Col key={room._id}>
                                        <div className='rooms'>
                                            <h1 style={{ color: "white", paddingTop: "8px", cursor: "pointer" }} onClick={handleRoomClick}>
                                                {room.roomNumber}
                                            </h1>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                    {isModalVisible && (
                        <div className="modal-overlay" onClick={closeModal}>
                        <div className="modal-content">
                            <div style={{backgroundColor: "#3C6B97",display: "flex", justifyContent: "flex-end"}}>
                                <button style={{ color: "white", backgroundColor: "#3C6B97", border: "none", fontWeight: "bold"}} >    
                                    <FaEdit/>
                                </button>
                                <button style={{ color: "white", backgroundColor: "#3C6B97", border: "none", fontWeight: "bold"}} onClick={closeModal}>x</button>
                            </div>
                            <div className="roomTable">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Room No.</th>
                                        <th>Room Type</th>
                                        <th>Total Capacity</th>
                                        <th>Current Capacity</th>
                                        <th>Price</th>
                                        <th>Facilities</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayrooms.map((room) => (
                                        <tr key={room._id}>
                                        <td>{room.roomNumber}</td>
                                        <td>{room.type}</td>
                                        <td>{room.capacity}</td>
                                        <td>{room.currentCapacity}</td>
                                        <td>{room.price}</td>
                                        <td>
                                            <ul>
                                            {room.facilities.ac && <li>AC</li>}
                                            {room.facilities.workingDesk && <li>Working Desk</li>}
                                            {room.facilities.attachedBath && <li>Attached Bath</li>}
                                            {room.facilities.roomFridge && <li>Room Fridge</li>}
                                            {room.facilities.geyser && <li>Geyser</li>}
                                            {room.facilities.Kitchenette && <li>Kitchenette</li>}
                                            {room.facilities.Safe && <li>Safe</li>}
                                            {room.facilities.Iron && <li>Iron</li>}
                                            {room.facilities.room_Service && <li>Room Service</li>}
                                            </ul>
                                        </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <table>
                            <thead>
                                    <tr>
                                        <th >Tenant Name</th>
                                        <th>Phone</th>
                                        <th>CNIC</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                {displayrooms.map((room) => (
                                        <tr key={room._id}>
                                        <td>{room.roomNumber}</td>
                                        <td>{room.type}</td>
                                        <td>{room.capacity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <table>
                            <thead>
                                <tr>
                                    <th >Room Images</th>
                                </tr>
                            </thead>
                                <tbody>
                                {displayrooms.map((room) => (
                                        <tr key={room._id}>
                                        <td>{room.roomNumber}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
                    )}
                </Container>
                {/*<section className="form-container">
                    <div className="roomTable">
                        <table>
                            <thead>
                                <tr>
                                    <th>Room No.</th>
                                    <th>Room Type</th>
                                    <th>Total Capacity</th>
                                    <th>Current Capacity</th>
                                    <th>Price</th>
                                    <th>Facilities</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayrooms.map((room) => (
                                    <tr key={room._id}>
                                    <td>{room.roomNumber}</td>
                                    <td>{room.type}</td>
                                    <td>{room.capacity}</td>
                                    <td>{room.currentCapacity}</td>
                                    <td>{room.price}</td>
                                    <td>
                                        <ul>
                                        {room.facilities.ac && <li>AC</li>}
                                        {room.facilities.workingDesk && <li>Working Desk</li>}
                                        {room.facilities.attachedBath && <li>Attached Bath</li>}
                                        {room.facilities.roomFridge && <li>Room Fridge</li>}
                                        {room.facilities.geyser && <li>Geyser</li>}
                                        {room.facilities.Kitchenette && <li>Kitchenette</li>}
                                        {room.facilities.Safe && <li>Safe</li>}
                                        {room.facilities.Iron && <li>Iron</li>}
                                        {room.facilities.room_Service && <li>Room Service</li>}
                                        </ul>
                                    </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    </section>*/}
                <section className="form-container">
                    <div className="container">
                        <h1 style={headingStyle}>Add a Room</h1>
                        <button id="plus-button" onClick={toggleFormVisibility}>
                            {formVisible ? "-" : "+"}
                        </button>
                    </div>
                    {formVisible && (
                        <RoomForm/>
                    )}
                </section>
            </Col>
          </Row>
      </Container>  
    </>
  )
}
