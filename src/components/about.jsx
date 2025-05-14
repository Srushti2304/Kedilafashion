import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import aboutUsImage from '/src/assets/alag/about.jpg'
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <>
    <Container className="my-5" fluid style={{backgroundColor:"#F3D9E5",minHeight:"100vh",padding:"20px"}}>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card  style={{width:"105%",maxWidth:"1000px", margin:"auto"}} className="shadow border-0 p-4 text-center" >

            <img 
              src={aboutUsImage}
              alt="About Us Banner"
              className="img-fluid mb-4"
              style={{marginTop:"20px"}}
            />
            <Card.Body>
              <h2 className="text-center fw-bold mb-3">About Us</h2><br/>
              <p className="text-center text-muted">
                Welcome to <strong>RentClothes</strong> – Your go-to platform for renting stylish outfits at affordable prices. 
                We provide a wide range of fashionable clothing for every occasion. Our goal is to make fashion accessible and sustainable.
                We understand that buying expensive outfit for every occasion isn't always practical.That's why we offer a Wide range of trendy, high-quality for rent at budget-friendly prices.Whether it's wedding,party,corporate event, or casual outing, we have something for everyone.
                <br/><br/>
                Follow us to a world where your closet never ends A new avatar for every party you attend<br/>
                Life's too exquisite to repeat what you wore That's why we've curated the best of drop-<br/>
                dead-gorgeous coutureLife's too exquisite to repeat what you wore That's why we've curated<br/>
                 the best of drop-dead-gorgeous couture
 
 
              </p><br/>
              <hr /><br/>
              <Row className="text-center">
                <Col md={6}>
                  <h5>🎯 Our Mission</h5>
                  <p>
                    To make premium fashion available to everyone while promoting sustainability in the fashion industry.
                  </p>
                </Col>
                <Col md={6}>
                  <h5>💡 Why Choose Us?</h5>
                  <p>
                    ✅ High-quality clothes <br />
                    ✅ Affordable rental prices <br />
                    ✅ Eco-friendly fashion
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Container>
    <Footer/>
    </>
  );
};
  
export default AboutUs;
