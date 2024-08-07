import React from 'react'
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import './RoomStatus.css'
import { useParams } from 'react-router-dom';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

export default function RoomForm() {
    const { hostelId } = useParams();
    const navigate = useNavigate();
    
    const [roomData, setRoomData] = useState({
        roomNumber: '',
        type: '',
        capacity: '',
        remainingCapacity:'',
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
 
    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        setRoomData({ ...roomData, [name]: newValue });
    }


   

    const handleImageChange = (event) => {
        const selectedImages = event.target.files;
        // Convert the FileList to an array
        const selectedImagesArray = Array.from(selectedImages);
        // If roomImages is not an array, convert it to an array before spreading
        const roomImagesArray = Array.isArray(roomData.roomImages) ? roomData.roomImages : [roomData.roomImages];
        // Concatenate the new images to the existing array
        setRoomData({ ...roomData, roomImages: [...roomImagesArray, ...selectedImagesArray] });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        Object.entries(roomData).forEach(([key, value]) => {
            if (key !== 'roomImages') {
                formData.append(key, value);
            }
        });
    
        roomData.roomImages.forEach((image, index) => {
            formData.append('roomImages', image);
        });

        // const { roomNumber,capacity,remainingCapacity,price,
        //     ac,
        //     workingDesk,
        //     attachedBath,
        //     roomFridge,
        //     geyser,
        //     Kitchenette,
        //     Safe,
        //     Iron,
        //     room_Service,
        //      } = roomData;
        
            const res = await fetch(`/addRoom/${hostelId}`, {
                method: "POST",
                credentials: "include",
              
                body: formData
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
//     const AddRoom = async (e) => {
//     e.preventDefault();
//     const { roomNumber,capacity,remainingCapacity,price,
//     ac,
//     workingDesk,
//     attachedBath,
//     roomFridge,
//     geyser,
//     Kitchenette,
//     Safe,
//     Iron,
//     room_Service,
//      } = roomData;

//     const res = await fetch(`/addRoom/${hostelId}`, {
//         method: "POST",
//         credentials: "include",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           roomNumber,capacity,remainingCapacity,price,
//           ac,
//           workingDesk,
//           attachedBath,
//           roomFridge,
//           geyser,
//           Kitchenette,
//           Safe,
//           Iron,
//           room_Service
//         })
//     });

//     // Check response status
//     if (res.status === 422) {
//         // Handle the error case
//         const errorData = await res.json();
//         window.alert(`Room couldn't be registered: ${errorData.error}`);
//         console.log(`Room couldn't be registered: ${errorData.error}`);
//     } else {
//         // Handle the success case
//         //const data = await res.json();
//         window.alert("Room registered successfully✌");
//         console.log("Room registered successfully✌");
//         //navigate("/hostelsPage");
//     }
// }


  
  return (
   <>
        <form method="POST"  encType="multipart/form-data" id="form" onSubmit={handleSubmit}>
                            <div>
                                <Row>
                                    <Col>
                                        <div className="form-group">
                                            <label htmlFor="field1"><b>Room Number: </b></label>
                                            <input
                                                className="input_box_room"
                                                type="text"
                                                name="roomNumber"
                                                value={roomData.roomNumber}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </Col>
                                   
                                    <Col>
                                        <div className="form-group">
                                            <label htmlFor="field3"><b>Total Capacity:</b></label>
                                            <input
                                                className="input_box_room"
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
                                                className="input_box_room"
                                                type="text"
                                                name="remainingCapacity"
                                                value={roomData.remainingCapacity}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                   
                                    <Col>
                                        <div className="form-group">
                                            <label htmlFor="field5"><b>Price: </b></label>
                                            <input
                                                className="input_box_room"
                                                type="number"
                                                name="price"
                                                value={roomData.price}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="form-group">
                                            <label htmlFor="field2"><b>Images: </b></label>
                                                <input
                                                        className="input_box_room1"
                                                        type="file"
                                                        name="roomImages"
                                                        // value={roomData.roomImages}
                                                        onChange={handleImageChange}
                                                        multiple
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
                            <input className="btn_sub" type="submit" value="Add Room" />
                        </form>
    </>
  )
}
