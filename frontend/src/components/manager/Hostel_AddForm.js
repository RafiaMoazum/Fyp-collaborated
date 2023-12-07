import React, { useState } from 'react';
import './Hostel_AddForm.css'; // Create a corresponding CSS file
import Navbar from "./Navbar"
import BlueHeader from "./BlueHeader"
import SideMenu from "./SideMenu"
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { useNavigate } from 'react-router-dom';


function Hostel_AddForm() {
   
    const navigate = useNavigate();
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
  
      try {
          const response = await fetch("/addHostel", {
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
          <Navbar option1={"About Us"} option2={"Contact Us"} option3= {""}/>
    <BlueHeader/>
    
    <section className="nameSec">
        
    </section>
    <SideMenu opt1={"Home"} link1={"/hostelsPage"} opt2={"Add Hostel"} link2={"/hostel_AddForm"} opt3={"Messages"} link3={""} opt4={"Log Out"} link4={""}/>
    
    <section className="mainSec"></section>
        <form method="POST" className="form" enctype="multipart/form-data" onSubmit={handleSubmit}>
             <div className="form-group">
        <label className="form-label">
          Name:
          <input
            className="form-input"
            type="text"
            name="name"
            value={hostelData.name}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Address:
          <input
            className="form-input"
            type="tel"
            name="address"
            value={hostelData.address}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          City:
          <input
            className="form-input"
            type="text"
            name="city"
            value={hostelData.city}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Phone:
          <input
            className="form-input"
            type="text"
            name="phone"
            value={hostelData.phone}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Email:
          <input
            className="form-input"
            type="email"
            name="email"
            value={hostelData.email}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="form-group">
    <label className="form-label">Customers Gender:</label>
    <div className="radio-group">
        <label>
            <input
                type="radio"
                name="customersGender"
                value="Male"
                checked={hostelData.customersGender === 'Male'}
                onChange={handleInputChange}
            /> Male
        </label>
        <label>
            <input
                type="radio"
                name="customersGender"
                value="Female"
                checked={hostelData.customersGender === 'Female'}
                onChange={handleInputChange}
            /> Female
        </label>
        <label>
            <input
                type="radio"
                name="customersGender"
                value="Other"
                checked={hostelData.customersGender === 'Other'}
                onChange={handleInputChange}
            /> Other
        </label>
    </div>
</div>

      <div className="form-group">
        <label className="form-label">
          No of Floors:
          <input
            className="form-input"
            type="number"
            name="NoOfFloors"
            value={hostelData.NoOfFloors}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          No of Rooms:
          <input
            className="form-input"
            type="number"
            name="NoOfRooms"
            value={hostelData.NoOfRooms}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Description
          <input
            className="form-input"
            type="text"
            name="description"
            value={hostelData.description}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Facilities:
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
        </label>
      </div>
      

      <div className="form-group">
                <label className="form-label">
                    Images:
                    <input
                        className="form-input"
                        type="file"
                        name="hostelImages"
                        onChange={handleImageChange}
                        multiple
                    />
                </label>
      </div>
      
      <input className="form-register" type="submit" value="Add" />
        </form>
        </>
    );
    
}

export default Hostel_AddForm;
