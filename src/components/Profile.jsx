import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Image } from "react-bootstrap";
import { getData } from './api';
import { toast } from 'react-toastify';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({ username: '', email: '', mobile: '', address1: '', avatar: '', city: '' });
  const [isEdited, setIsEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { email } = JSON.parse(sessionStorage.getItem("3rdfeb"));

  useEffect(() => {
    getData(`${import.meta.env.VITE_BASE_URL}/users?email=${email}`)
      .then((data) => setUser(data[0]))
      .catch(err => console.log(err));
  }, []);

  const handleImage = async (e) => {
    let img = e.target.files[0];
    let ext = ["image/jpg", "image/jpeg", "image/png", "image/gif", "image/webp", "image/jfif", "image/avif"];
    if (!img) toast.error("Please choose an image");
    else if (img.size > 1048576) toast.error("File size exceeded");
    else if (!ext.includes(img.type)) toast.error("Invalid extension");
    else {
      setIsLoading(true);
      const data = new FormData();
      data.append("file", img);
      data.append("cloud_name", "harshita1");
      data.append("upload_preset", "3rdfebreact");
      data.append("folder", "3rdfebuser");
      try {
        const res = await axios.post("https://api.cloudinary.com/v1_1/harshita1/image/upload", data);
        setUser({ ...user, avatar: res.data.url });
        setIsLoading(false);
      } catch (err) {
        toast.error(err.message);
        setIsLoading(false);
      }
    }
  };

  const handleSave = async () => {
    let { mobile, username } = user;
    if (!username || !mobile) { toast.error("Please fill name and phone"); return; }
    try {
      await axios.put(`${import.meta.env.VITE_BASE_URL}/users/${user.id}`, { ...user, edited: new Date() });
      setIsEdited(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div style={{ backgroundColor: "#F3D9E5", minHeight: "100vh", paddingTop: "50px" }}>
      <Container className='col-8 p-4 mt-5'>
        <Card style={{ backgroundColor: "#fff", borderRadius: "15px", padding: "20px" }}>
          <Card.Body>
            <Card.Title><h1 className="text-center">User Profile</h1><hr /></Card.Title>
            <Row>
              <Col xs={12} md={4} className="text-center">
                <div style={{ display: "inline-block", border: "5px solid #C2185B", borderRadius: "50%", padding: "5px" }}>
                  <Image
                    src={user.avatar || "https://cdn-icons-png.flaticon.com/512/147/147142.png"}
                    height='250'
                    width='250'
                    roundedCircle
                  />
                </div>
              </Col>
              <Col xs={12} md={6} className="offset-md-1">
                {!isEdited ? (
                  <>
                    <p><strong>Name:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.mobile || "NA"}</p>
                    <p><strong>Address:</strong> {user.address1 || "NA"}</p>
                    <p><strong>City:</strong> {user.city || "NA"}</p>
                    <Button variant="primary" onClick={() => setIsEdited(true)}>Edit</Button>
                  </>
                ) : (
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Avatar</Form.Label>
                      <Form.Control type="file" name="avatar" onChange={handleImage} />
                    </Form.Group>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Name</Form.Label>
                          <Form.Control type="text" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control type="email" value={user.email} readOnly />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control type="text" value={user.mobile} onChange={(e) => setUser({ ...user, mobile: e.target.value })} />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Address</Form.Label>
                          <Form.Control type="text" value={user.address1} onChange={(e) => setUser({ ...user, address1: e.target.value })} />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control type="text" value={user.city} onChange={(e) => setUser({ ...user, city: e.target.value })} />
                    </Form.Group>
                    <Button variant="success" onClick={handleSave}>
                      {isLoading ? <div className="spinner-border" role="status"></div> : "Save"}
                    </Button>
                    <Button variant="secondary" className="ms-2" onClick={() => setIsEdited(false)}>Cancel</Button>
                  </Form>
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Profile;
