import React from 'react'
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import './RoomStatus.css'
import { useParams } from 'react-router-dom';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

export default function UpdateRoom() {
    const { hostelId,roomId } = useParams();
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
        try {
            const response = await fetch(`/updateRoom/${roomId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(roomData),
            });

            if (response.ok) {
                window.alert('Room updated successfully');
                //navigate(`/RoomStatus/${hostelId}`);
            } else {
                const errorData = await response.json();
                window.alert(`Error updating room: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error updating room:', error);
        }
    }
    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const response = await fetch(`/getRoom/${roomId}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setRoomData(data);
                } else {
                    const errorData = await response.json();
                    window.alert(`Error fetching room details: ${errorData.error}`);
                }
            } catch (error) {
                console.error('Error fetching room details:', error);
            }
        };

        fetchRoomData();
    }, [roomId]);

   
  
  return (
   <>
        <form method="POST" id="form" onSubmit={handleSubmit}>
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
                                            <label htmlFor="field3"><b>Current Capacity:</b></label>
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
                            <input className="btn_sub" type="submit" value="Update Room" />                        </form>
    </>
  )
}
