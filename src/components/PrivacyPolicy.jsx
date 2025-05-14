import React from "react";
import { Container } from "react-bootstrap";

const PrivacyPolicy = () => {
  return (
    <Container className="mt-4" fluid style={{backgroundColor:"#F3D9E5",minHeight:"100vh",padding:"20px",textAlign:"center"}}>
      <h2 className="text-center" style={{marginTop:"100px"}}>Privacy Policy</h2><br/>
      <p>Last Updated: March 2025</p>

      <h4>1. Information We Collect</h4>
      <p>
        We collect personal information such as name, email, phone number,<br/>
        and address when you register or rent clothes from our website.
      </p>

      <h4>2. How We Use Your Information</h4>
      <p>
        Your data is used to process rentals, improve our services, and provide<br/>
         customer support. We do not sell your information to third parties.
      </p>

      <h4>3. Data Security</h4>
      <p>
        We implement security measures to protect your data, but we cannot <br/>
        guarantee complete security due to internet vulnerabilities.
      </p>

      <h4>4. Your Rights</h4>
      <p>
        You can request access, modification, or deletion of your data by <br/>
        contacting our support team.
      </p>

      <h4>5. Changes to This Policy</h4>
      <p>
        We may update this policy from time to time. Please review this <br/>
        page periodically.
      </p>
    </Container>
  );
};

export default PrivacyPolicy;