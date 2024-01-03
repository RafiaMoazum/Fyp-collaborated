import React, { useState,useEffect } from 'react';
import './Hostel_AddForm.css'; // Create a corresponding CSS file
import BlueHeader2 from './BlueHeader2';
import Navbar from './Navbar'
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import { useParams } from 'react-router-dom';


function UpdateHostel() {
   const[userData, setUserData]=useState({ name: 'Manager' });
    const navigate = useNavigate();
    const{hostelId}= useParams();
    const [hostelData, setHostelData] = useState({
        name: '',
        address: '',
        city:'',
        phone: '',
        email: '',
        description: '',
        customersGender:'',
        NoOfFloors:'',
        NoOfRooms:'',
        parking: false,
        wifi: false,
        laundry:false,
        Elevator:false,
        mess:false,
        livingArea:false,
        hostelImages: [], // Array to store selected image files
    });

    const [coordinates, setCoordinates] = useState(null);
    const geocodeAddress = async () => {
    const address = hostelData.address;

    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyBCPI0UR1KaQeH1FsXrtSzjUXZtUwCxO6k`);
      const data = await response.json();

      if (response.ok && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        setCoordinates(`${location.lat}, ${location.lng}`);
        console.log(`Coordinates: ${location.lat}, ${location.lng}`);
      } else {
        console.error('Error fetching coordinates:', data.error_message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

    let name, value;
    const handleInputChange = (event) => {
      const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        setHostelData({ ...hostelData, [name]: newValue });
        // name = event.target.name;
        // value = event.target.value;
        // setHostelData({ ...hostelData, [name]: value });
      }

      const handleImageChange = (event) => {
        const selectedImages = event.target.files;
        // Convert the FileList to an array
        const selectedImagesArray = Array.from(selectedImages);
        // Concatenate the new images to the existing array
        setHostelData({ ...hostelData, hostelImages: [...hostelData.hostelImages, ...selectedImagesArray] });
    };
    
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

  useEffect(() => {
  const fetchHostelData = async () => {
    try {
        const response = await fetch(`/getHostel/${hostelId}`);
        const data = await response.json();

        if (response.ok) {
            setHostelData(data);
        } else {
            console.error(`Error fetching hostel data: ${data.error}`);
        }
    } catch (error) {
        console.error('Error fetching hostel data:', error);
    }
};
fetchManagerData();
fetchHostelData();
}, [hostelId]);
    
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData();
  
      // Append managerId to formData
      // formData.append("managerId", userData._id);
  
      Object.entries(hostelData).forEach(([key, value]) => {
          if (key !== 'hostelImages') {
              formData.append(key, value);
          }
      });
  
      hostelData.hostelImages.forEach((image, index) => {
          formData.append('hostelImages', image);
      });

      formData.append('coordinates', coordinates);


      try {
          const response = await fetch(`/updateHostel/${hostelId}`, {
              method: "POST",
              credentials: "include",
              body: formData
          });
  
          const responseData = await response.json();
          console.log(responseData);
  
          if (response.ok) {
              window.alert("Hostel added successfully✌");
              console.log("Hostel added successfully✌");
              navigate("/hostelsPage");
          } else {
              const errorData = await response.json();
              window.alert(`Hostel couldn't be added: ${errorData.error}`);
              console.log(`Hostel couldn't be added: ${errorData.error}`);
          }
      } catch (error) {
          console.error('Error:', error);
      }
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
                <div className="form-container">
                    <div className="container">
                      <form method="POST" enctype="multipart/form-data" onSubmit={handleSubmit}>
                        <Row>
                        <Col>
                        <div className="form-group">
                          <label className="form-label">
                            Name:
                            <input
                              className="input_box"
                              type="text"
                              name="name"
                              value={hostelData.name}
                              onChange={handleInputChange}
                            />
                          </label>
                        </div>
                        </Col>
                        <Col>
                        <div className="form-group">
                          <label className="form-label">
                            Address:
                            <input
                              className="input_box"
                              type="address"
                              name="address"
                              value={hostelData.address}
                              onChange={(e) => setHostelData({ ...hostelData, address: e.target.value })}
                              onBlur={geocodeAddress}
                            />
                          </label>
                        </div>
                        </Col>
                        <Col>
                        <div className="form-group">
                          <label className="form-label">
                            City:
                            <input
                              className="input_box"
                              type="text"
                              name="city"
                              value={hostelData.city}
                              onChange={handleInputChange}
                            />
                          </label>
                        </div>
                        </Col>
                        <Col>
                        <div className="form-group">
                          <label className="form-label">
                            Phone:  
                            <input
                              className="input_box"
                              type="text"
                              name="phone"
                              value={hostelData.phone}
                              onChange={handleInputChange}
                            />
                          </label>
                        </div>
                        </Col>  
                        </Row>
                        <Row>
                          <Col>
                            
                          </Col>
                        </Row>
                        <Row>
                        <Col>
                        <div className="form-group">
                          <label className="form-label">
                            Description:<br></br>
                            <textarea
                              className="input_box_desc"
                              type="text"
                              name="description"
                              value={hostelData.description}
                              onChange={handleInputChange}
                            />
                          </label>
                        </div>
                        </Col>
                        <Col>
                        <div className="form-group">
                          <label className="form-label">Customers Gender:</label>
                          <div className="radio-group">
                              <Row>
                              <Col>
                              <label>
                                  <input
                                      type="radio"
                                      name="customersGender"
                                      value="Male"
                                      checked={hostelData.customersGender === 'Male'}
                                      onChange={handleInputChange}
                                  /> Male
                              </label>
                              </Col>
                              <Col>
                              <label>
                                  <input
                                      type="radio"
                                      name="customersGender"
                                      value="Female"
                                      checked={hostelData.customersGender === 'Female'}
                                      onChange={handleInputChange}
                                  /> Female
                              </label>
                              </Col>
                              <Col>
                              <label>
                                  <input
                                      type="radio"
                                      name="customersGender"
                                      value="Other"
                                      checked={hostelData.customersGender === 'Other'}
                                      onChange={handleInputChange}
                                  /> Other
                              </label>
                              </Col>
                              </Row>
                          </div>
                        </div>
                        </Col>
                        </Row>
                        <Row>
                        <Col>
                        <div className="form-group">
                          <label className="form-label">
                            No of Floors:
                            <input
                              className="input_box"
                              type="number"
                              name="NoOfFloors"
                              value={hostelData.NoOfFloors}
                              onChange={handleInputChange}
                            />
                          </label>
                        </div>
                        </Col>
                        <Col>
                        <div className="form-group">
                          <label className="form-label">
                            No of Rooms:
                            <input
                              className="input_box"
                              type="number"
                              name="NoOfRooms"
                              value={hostelData.NoOfRooms}
                              onChange={handleInputChange}
                            />
                          </label>
                        </div>
                        </Col>
                        <Col>
                        <div className="form-group">
                                <label className="form-label">
                                  Images:
                                  <input
                                      className="input_box"
                                      type="file"
                                      name="hostelImages"
                                      onChange={handleImageChange}
                                      multiple
                                  />
                                </label>
                              </div> 
                        </Col>
                        <Col></Col>
                        </Row>
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
                                        name="parking"
                                        checked={hostelData.parking}
                                        onChange={handleInputChange}
                                        style={{marginRight: "8px"}}
                                    />
                                    Parking
                                </label>
                            </Col>
                            <Col>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="wifi"
                                        checked={hostelData.wifi}
                                        onChange={handleInputChange}
                                        style={{marginRight: "8px"}}
                                    />
                                    Wifi
                                </label>
                            </Col>
                            <Col>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="laundry"
                                        checked={hostelData.laundry}
                                        onChange={handleInputChange}
                                        style={{marginRight: "8px"}}
                                      />
                                      Laundry
                                </label>
                      
                            </Col>
                        </Row>
                        <Row>
                        <Col>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="Elevator"
                                        checked={hostelData.Elevator}
                                        onChange={handleInputChange}
                                        style={{marginRight: "8px"}}
                                      />
                                      Elevator
                                </label>
                            </Col>
                          <Col>
                              <label>
                                  <input
                                      type="checkbox"
                                      name="mess"
                                      checked={hostelData.mess}
                                      onChange={handleInputChange}
                                      style={{marginRight: "8px"}}
                                    />
                                    Mess
                              </label>  
                          </Col>
                          <Col>
                              <label>
                                  <input
                                  type="checkbox"
                                  name="livingArea"
                                  checked={hostelData.livingAreaArea}
                                  onChange={handleInputChange}
                                  style={{marginRight: "8px"}}
                              />
                              Living Area
                                  </label>
                              </Col>
                              
                        </Row>   
                        </div>
                        </label>
                        </div>
                        </Col>
                        <input className="btn_sub" type="submit" value="Submit" />
                      </form>
                      </div>
                    </div>
                </Col>
              </Row>
            </Container>
          </>
    );
}
export default UpdateHostel;
