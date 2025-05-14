import React, { useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";

function Footer() {
  const [hoveredLink, setHoveredLink] = useState(null);

  // Common hover styles
  const linkStyle = {
    transition: "color 0.3s ease-in-out, transform 0.2s ease-in-out",
  };

  return (
    <footer className="text-light text-center py-4" style={{ backgroundColor: "#326da8", width: "100%", minWidth: "250px", overflow: "auto" }}>
      <Container>
        
        <Row>
          <Col md={8}>
            <Nav className="justify-content-center">
              {["About", "contact", "PrivacyPolicy", "T&C"].map((path, index) => (
                <Nav.Link
                  key={index}
                  href={`/${path}`}
                  // className="text-light"
                  style={{
                    ...linkStyle,
                    color: hoveredLink === path ? "black" : "white",  // Hover color change
                    transform: hoveredLink === path ? "scale(1.1)" : "scale(1)", // Hover effect
                  }}
                  onMouseEnter={() => setHoveredLink(path)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {path.replace(/([A-Z])/g, " $1").trim()}
                </Nav.Link>
              ))}
            </Nav>
          </Col>

          <Col md={3}>
            <Nav className="justify-content-center">
              {[
                { href: "https://www.instagram.com", icon: "fab fa-instagram" },
                { href: "https://www.facebook.com", icon: "fab fa-facebook" },
                { href: "https://www.twitter.com", icon: "fab fa-twitter" },
              ].map((social, index) => (
                <Nav.Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  style={{
                    ...linkStyle,
                    transform: hoveredLink === social.href ? "scale(1.2)" : "scale(1)",
                    color: hoveredLink === social.href ? "black" : "white",
                  }}
                  onMouseEnter={() => setHoveredLink(social.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <i className={`${social.icon} fa-lg`} />
                </Nav.Link>
              ))}
            </Nav>
          </Col>
        </Row>

        <hr className="my-4 border-light" />
        <Row className="text-center">
          {[
            { icon: "fas fa-hand-pointer", title: "MAKE YOUR CHOICE", text: "Browse through our exclusive collection and pick an outfit to lease with ease." },
            { icon: "fas fa-camera", title: "STYLE YOUR LOOK", text: "Amp up your game with accessories from our specially curated collection to complement your look." },
            { icon: "fas fa-camera", title: "LOOK PICTURE PERFECT", text: "Own your look and turn heads wherever you go. Don’t worry, the pick-up is on us!" },
          ].map((item, index) => (
            <Col
              key={index}
              md={4}
              className="mb-4"
              style={{
                transition: "transform 0.3s ease-in-out, color 0.3s ease-in-out",
                transform: hoveredLink === item.title ? "scale(1.05)" : "scale(1)",
                color: hoveredLink === item.title ? "black" : "white",
              }}
              onMouseEnter={() => setHoveredLink(item.title)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <i className={`${item.icon} fa-2x mb-2`} />
              <h6>{item.title}</h6>
              <p>{item.text}</p>
            </Col>
          ))}
        </Row>

        <p>© 2025 Kedila Fashion. All Rights Reserved.</p>
      </Container>
    </footer>
  );
}

export default Footer;
