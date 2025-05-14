import React from "react";
import { Container, Card } from "react-bootstrap";

const TermsConditions = () => {
  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title className="text-center mb-3">Terms & Conditions</Card.Title>
          <Card.Text>
            <h5>1. Usage Terms</h5>
            <p>Users must use our website and services responsibly. Illegal or unethical activities are strictly prohibited.</p>

            <h5>2. Account & Privacy</h5>
            <p>Users are responsible for securing their accounts. We take necessary steps to protect user data.</p>

            <h5>3. Payment & Refund Policy</h5>
            <p>Once a payment is made, refunds will be processed according to our refund policy.</p>

            <h5>4. Intellectual Property Rights</h5>
            <p>All content on this website belongs to us and requires permission for use.</p>

            <h5>5. Liability Limitation</h5>
            <p>We are not responsible for any damages resulting from the use of our services.</p>

            <h5>6. Modifications & Termination</h5>
            <p>We reserve the right to modify these terms at any time. Please check this page regularly for updates.</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TermsConditions;