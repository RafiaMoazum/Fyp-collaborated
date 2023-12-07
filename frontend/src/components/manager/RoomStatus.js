import React from 'react'
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import Navbar from '../customer/Navbar/Navbar'
import './RoomStatus.css'
import { useParams } from 'react-router-dom';
import BlueHeader2 from './BlueHeader2';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { Link } from 'react-router-dom';
import FaCheck from 'react-icons/fa';

export default function RoomStatus() {
    const { hostelId } = useParams();
    const[userData, setUserData]=useState({ name: 'Manager' });
    const navigate = useNavigate();

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
    <div>
        <Row>
            <Col xs={4} sm={4} md={2} lg={2}>
                <div>
                    <div className='side'>
                        <nav>
                            <ul>
                                <li>{userData && <h2>{userData.name}</h2>}</li>
                                <li><Link to="/hostelsPage" style={{textDecoration: "none", color: "white"}} >Home</Link></li>
                                <div style={{ border: "1px solid white", margin: "10px 0" }}></div>
                                <li><Link to={`/RoomStatus/${hostelId}`} style={{textDecoration: "none", color: "white"}} >Rooms</Link></li>
                                <div style={{ border: "1px solid white", margin: "10px 0" }}></div>
                                <li><Link to={`/CustomerInfo/${hostelId}`} style={{textDecoration: "none", color: "white"}} >Customer Information</Link></li>
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
                <section className="form-container">
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
                </section>
                <section className="form-container">
                    <div className="container">
                        <h1 style={headingStyle}>Add a Room</h1>
                        <button id="plus-button" onClick={toggleFormVisibility}>
                            {formVisible ? "-" : "+"}
                        </button>
                    </div>
                    {formVisible && (
                        <form method="POST" id="form" onSubmit={handleSubmit}>
                            <div>
                                <Row>
                                    <Col>
                                        <div className="form-group">
                                            <label htmlFor="field1"><b>Room Number</b></label>
                                            <input
                                                className="input_box"
                                                type="text"
                                                name="roomNumber"
                                                value={roomData.roomNumber}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </Col>
                                   
                                    <Col>
                                        <div className="form-group">
                                            <label htmlFor="field3"><b>Type:</b></label>
                                            <input
                                                className="input_box"
                                                type="text"
                                                name="capacity"
                                                value={roomData.capacity}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </Col>
                                    
                                    <Col>
                                        <div className="form-group">
                                            <label htmlFor="field4"><b>Remaining Capacity:</b></label>
                                            <input
                                                className="input_box"
                                                type="text"
                                                name="currentCapacity"
                                                value={roomData.currentCapacity}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                   
                                    <Col>
                                        <div className="form-group">
                                            <label htmlFor="field5"><b>Price</b></label>
                                            <input
                                                className="input_box"
                                                type="number"
                                                name="price"
                                                value={roomData.price}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="form-group">
                                            <label htmlFor="field2"><b>Images</b></label>
                                                <input
                                                        className="input_box"
                                                        type="file"
                                                        name="roomImages"
                                                        value={roomData.roomImages}
                                                        onChange={handleInputChange}
                                                    />
                                                   
                                        </div>
                                    </Col>
                                   <Col>
                                   
                                   </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <div className="form-group">
                                        <label>
                                            <b>Facilities:</b>
                                            <div className="facilities">
                                            <Row>
                                                <Col>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            name="ac"
                                                            checked={roomData.ac}
                                                            onChange={handleInputChange}
                                                            style={{marginRight: "8px"}}
                                                        />
                                                        AC
                                                    </label>
                                                </Col>
                                                <Col>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            name="workingDesk"
                                                            checked={roomData.workingDesk}
                                                            onChange={handleInputChange}
                                                            style={{marginRight: "8px"}}
                                                        />
                                                        Working Desk
                                                    </label>
                                                </Col>
                                                <Col>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            name="attachedBath"
                                                            checked={roomData.attachedBath}
                                                            onChange={handleInputChange}
                                                            style={{marginRight: "8px"}}
                                                        />
                                                        Attached Bath
                                                    </label>
                                        
                                                </Col>
                                                <Col>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            name="roomFridge"
                                                            checked={roomData.roomFridge}
                                                            onChange={handleInputChange}
                                                            style={{marginRight: "8px"}}
                                                        />
                                                        Room Fridge
                                                    </label>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            name="geyser"
                                                            checked={roomData.geyser}
                                                            onChange={handleInputChange}
                                                            style={{marginRight: "8px"}}
                                                        />
                                                        Geyser
                                                    </label>  
                                                </Col>
                                                <Col>
                                                    <label>
                                                        <input
                                                        type="checkbox"
                                                        name="Kitchenette"
                                                        checked={roomData.Kitchenette}
                                                        onChange={handleInputChange}
                                                        style={{marginRight: "8px"}}
                                                        />
                                                        Kitchenette
                                                    </label>
                                                </Col>
                                                <Col>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            name="Safe"
                                                            checked={roomData.Safe}
                                                            onChange={handleInputChange}
                                                            style={{marginRight: "8px"}}
                                                        />
                                                        Safe
                                                    </label>
                                                </Col>
                                                <Col>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            name="room_Service"
                                                            checked={roomData.room_Service}
                                                            onChange={handleInputChange}
                                                            style={{marginRight: "8px"}}
                                                        />
                                                        room_Service
                                                    </label>
                                                </Col>
                                            </Row>   
                                        </div>
                                        </label>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <input className="btn_sub" type="submit" value="Add Room" onClick={AddRoom}/>
                        </form>
                    )}
                </section>
            </Col>
          </Row>
      </div>  
    </>
  )
}
