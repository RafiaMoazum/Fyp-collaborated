import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import "./About.css"
import { Container } from 'react-bootstrap';

const About = () => {

    return(
        <>
        <Header/>
        <Navbar/>
            <div>
            <img src="./images/About_us.png" width="100%" height="auto" alt="Logo" className="d-inline-block align-text-top"></img>  
            </div>
            <Container fluid className='style1'>
                <Row>
                    <h3 className='h_style'>
                        Welcome to HostelExplorer.pk - Your Trusted Hostel Booking Partner in Pakistan!
                    </h3>
                    <Col xs={12} sm={1} md={2} lg={3}>
                    
                    </Col>
                    <Col xs={12} sm={10} md={8} lg={6}>
                        <h4>
                            Discover Comfort Away From Home
                        </h4>
                        <p >
                            At HostelExplorer.pk, we believe that travel is a journey of self-discovery and 
                            exploration. Our mission is to provide you with a comfortable and affordable stay 
                            during your travels across Pakistan. Whether you're a solo traveler, an adventure 
                            enthusiast, or a group of friends seeking new experiences, we're here to make your 
                            stay memorable and hassle-free.
                        </p>
                        <h4 style={{paddingTop: '20px'}}>
                            Why Choose HostelExplorer.pk?
                        </h4>
                        <p className='style2'>
                            <b>Wide Selection:</b> Our platform brings together a diverse range of hostels from all corners of Pakistan. From bustling city centers to serene hill stations, we have options to suit every traveler's preference.
                        </p>
                        <p className='style2'>
                            <b>Quality and Safety:</b> Your safety and comfort are our top priorities. We partner with hostels that meet our strict quality standards, ensuring a secure and enjoyable stay.
                        </p>
                        <p className='style2'>
                            <b>Local Experience:</b> We're passionate about showcasing the beauty and culture of Pakistan. Through our hostels, you can connect with locals, learn about traditions, and explore hidden gems off the beaten path.
                        </p>
                        <h4 style={{paddingTop: '20px'}}>
                            Our Commitment to You
                        </h4>
                        <p className='style2'>
                            <b>Transparent Booking:</b> With HostelExplorer.pk, you get transparent and upfront pricing. No hidden fees or surprises upon check-in.
                        </p>
                        <p className='style2'>
                            <b>User-Friendly Platform:</b> Our user-friendly website makes it easy to search, compare, and book hostels across Pakistan. Find detailed descriptions, photos, and reviews to help you make an informed decision.
                        </p>
                        <p className='style2'>
                            <b>24/7 Support:</b> Whether you have questions about booking or need assistance during your stay, our dedicated customer support team is available around the clock to help you out.
                        </p>
                        <h4 style={{paddingTop: '20px'}}>
                            Join the HostelExplorer.pk Community
                        </h4>
                        <p className='style2'>
                            We invite you to be a part of our growing community of travelers who choose to explore Pakistan in an authentic and immersive way. With HostelExplorer.pk, you're not just booking a bed; you're unlocking a world of experiences.

                            So, pack your bags, let go of your worries, and embark on a journey with HostelExplorer.pk. Your next adventure awaits!

                            Feel free to reach out to us with any inquiries or feedback. We're excited to be a part of your travel story.

                        </p>
                        <p className='style2'>
                            Happy traveling,
                        </p>
                        <p className='style2'>
                            The HostelExplorer.pk Team
                        </p>
                    </Col>
                    <Col xs={12} sm={1} md={2} lg={3}>
                    
                    </Col>
                </Row>
            <br></br>
            <br></br>
            </Container>
            <div style={{ padding: "20px" }}>
                <Row>
                    <Col xs={6} className='general'>
                    <img
                        src="./images/mobapp.jpg"
                        alt="Logo"
                        className="d-inline-block align-text-top img-responsive"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    </Col>
                    <Col xs={6} style={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
                    <Row>
                        <h3>
                        <b className='general' style={{ paddingBottom: "30px" }}>Download the App now!</b>
                        <div className="row-border"></div>
                        <p>
                            Best hostels considering your safety and comfort
                            -all at your fingertips. Download the app for an improved experience.
                        </p>
                        </h3>
                    </Row>
                    </Col>
                </Row>
            </div>

        </>
    );
}
export default About;