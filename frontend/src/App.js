import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignupPage from './components/manager/SignupPage';
import LoginPage from './components/manager/LoginPage';
import HostelsPage from './components/manager/HostelsPage';
import HostelProfile from './components/manager/HostelProfile';
import CustomerInfo from './components/manager/CustomerInfo';
import RoomStatus from './components/manager/RoomStatus';
import Hostel_AddForm from './components/manager/Hostel_AddForm';
import Footer from './components/customer/Footer/Footer';
import Mainpage from './components/customer/MainPage/Mainpage';
import Lahore from './components/customer/Lahore/Lahore';
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

// import Contact_us from './components/customer/Contact_us';

function App() {
  return (
    <div className="App" >
      <RoomProvider>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/about" element={<About/>}/> 
        {/* <Route path="/contact_us" element={<Contact_us/>} /> */}
        <Route path="/hostel_ad" exact element={<Hostel_ad />} /> 
        <Route path="/lahore" element={<Lahore />} /> 
        <Route path="/signupPage" exact element={<SignupPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/userSignupPage" exact element={<UserSignupPage />} />
        <Route path="/loginPageC" exact element={<LoginPageC />} />
        <Route path="/hostelsPage" element={<HostelsPage />} />
        <Route path='hostelProfile/:hostelId' element={<HostelProfile/>} />
        <Route path='customerInfo/:hostelId' element={<CustomerInfo/>} />
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
      </Routes>
      </RoomProvider>
      <Footer/>
    </div>
  );
}

export default App;