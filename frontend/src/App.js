import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, Router } from 'react-router-dom';
import SignupPage from './components/manager/SignupPage';
import LoginPage from './components/manager/LoginPage';
import HostelsPage from './components/manager/HostelsPage';
import HostelProfile from './components/manager/HostelProfile';
import CustomerInfo from './components/manager/CustomerInfo';
import RoomStatus from './components/manager/RoomStatus';
import Hostel_AddForm from './components/manager/Hostel_AddForm';
import Footer from './components/customer/Footer/Footer';
import Mainpage from './components/customer/MainPage/Mainpage';
import CityWise from './components/customer/Lahore/CityWise';
import About from './components/customer/About/About';
import LoginPageC from './components/customer/LoginPage/LoginPageC';
import Hostel_ad from './components/customer/Hostel_ad/Hostel_ad';
import UserSignupPage from './components/customer/UserSignupPage';
import HostelDetails from './components/customer/HostelDetails';
import RoomsDisplay from './components/customer/RoomsDisplay';
import RoomDetail from './components/customer/RoomDetail';
import BookingPage from './components/customer/BookingPage';
import { RoomProvider } from './components/customer/RoomContext';
import AllHostels from './components/customer/AllHostels';
import Reviews from './components/customer/Reviews/Reviews';
import ReviewForm from './components/customer/Reviews/ReviewForm';
import ContactUs from './components/customer/Contact_us/Contact_us';
import ContactUs2 from './components/customer/Contact_us2';
import Notification from './components/manager/Notification';
import BookVisitForm from './components/customer/BookVisitForm';
import PendingVisitReq from './components/manager/PendingVisitReq';
import UpdateHostel from './components/manager/UpdateHostel';
import UpdateRoom from './components/manager/UpdateRoom';
import { Container } from 'react-bootstrap';
import UpdateProfile from './components/manager/updateProfile';
import UpdateCustomerProfile from './components/customer/updateCustomerProfile';
import Togglebar from './components/manager/Togglebar';
import Loader from './components/customer/Loader';
import BookingsInfo from './components/customer/BookingsInfo';


 
function App() {


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    
    <div className="App">
      {loading ? (
        <Loader />
      ) : (
        <>
        <RoomProvider>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/about" element={<About/>}/> 
          <Route path="/contact_us" element={<ContactUs/>} />
          <Route path="/contact_us2" element={<ContactUs2/>} />
          <Route path="/hostel_ad" exact element={<Hostel_ad />} />  
          <Route path="/cityWise" element={<CityWise/>} /> 
          <Route path="/signupPage" exact element={<SignupPage />} />
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/userSignupPage" exact element={<UserSignupPage />} />
          <Route path="/loginPageC" exact element={<LoginPageC />} />
          <Route path="/hostelsPage" element={<HostelsPage />} />
          <Route path='hostelProfile/:hostelId' element={<HostelProfile/>} />
          <Route path='customerInfo/:hostelId' element={<CustomerInfo/>} />
          <Route path='notification/:hostelId' element={<Notification/>} />
          <Route path='BookVisitForm/:hostelId' element={<BookVisitForm/>} />
          <Route path='PendingVisitReq/:hostelId' element={<PendingVisitReq/>} />
          <Route path='roomStatus/:hostelId' element={<RoomStatus/>} />
          <Route path='hostel_AddForm' element={<Hostel_AddForm/>} />
          <Route path='/hostelDetails/:hostelId' element={<HostelDetails/>} />
          <Route path='/Hostel_ad/:hostelId' element={<Hostel_ad/>} />
          <Route path='/RoomsDisplay/:hostelId' element={<RoomsDisplay/>} />
          <Route path='/RoomDetail/:roomId' element={<RoomDetail/>} />
          <Route path='/BookingPage/:roomId' element={<BookingPage/>} />
          <Route path='/allHostels' element={<AllHostels/>} />
          <Route path='/allHostels' element={<AllHostels/>} />
          <Route path='/reviews' element={<Reviews/>} />
          <Route path='/reviewsForm' element={<ReviewForm/>} />
          <Route path='/updateHostel/:hostelId' element={<UpdateHostel/>} />
          <Route path='/updateRoom/:roomId' element={<UpdateRoom/>} />
          <Route path='/updateProfile/:managerId' element={<UpdateProfile/>} />
          <Route path='/togglebar' element={<Togglebar/>} />          
          <Route path='/bookingsInfo/:userId' element={<BookingsInfo/>} />    
          <Route path='/updateCustomerProfile/:userId' element={<UpdateCustomerProfile/>} />

        </Routes>
        </RoomProvider>
        
        <Container fluid>
        <Footer/>
        </Container>
        </>
      )}
    </div>

  );
}

export default App;
