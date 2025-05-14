import React, { useEffect, useState } from 'react';
import { Button, Form, Image, InputGroup } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BsArrowDownLeftCircle, BsCart3, BsSearch } from "react-icons/bs";
import logo from '/src/assets/images/kf.jpg';
import { FaUser } from 'react-icons/fa';
import { NavLink, Outlet, useNavigate } from 'react-router';
import { ShowOnLogin, ShowOnLogout } from './hiddenlinks';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../redux/cartSlice';
import { getData } from './api';
import { selectProducts, store_products } from '../redux/productSlice';
import { APPLY_FILTER } from '../redux/filterSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navstyles = ({ isActive }) => ({
    backgroundColor: isActive ? "#880E4F" : "",
    color: isActive ? "white" : "",
    fontSize: isActive ? "20px" : "",
    border: isActive ? "2px solid #F48FB1" : "",
    borderRadius: isActive ? "12px" : "",
    transition: "all 0.3s ease, transform 0.3s",
    transform: "scale(1)",
    cursor: "pointer"
  });

  const redirect = useNavigate();
  const handleLogout = () => {
    if (sessionStorage.getItem("3rdfeb") != null) {
      sessionStorage.removeItem("3rdfeb");
      toast.success("Logged out successfully");
      redirect('/');
    }
  };

  const [username, setUsername] = useState("");
  useEffect(() => {
    if (sessionStorage.getItem("3rdfeb") != null) {
      let obj = JSON.parse(sessionStorage.getItem("3rdfeb"));
      setUsername(obj.username);
    }
  }, [sessionStorage.getItem("3rdfeb")]);

  const cartItems = useSelector(selectCart);
  const { catval, selectedBrands, priceRange, searchval } = useSelector(state => state.filter);
  useEffect(() => {
    getData(`${import.meta.env.VITE_BASE_URL}/products`).then((res) => {
      dispatch(store_products(res));
    })
      .catch((err) => { toast.error(err.message); });
  }, []);

  const products = useSelector(selectProducts);
  const [search, setSearch] = useState('');
  useEffect(() => {
    dispatch(APPLY_FILTER({
      products,
      search: search,
      category: catval,
      brands: selectedBrands,
      priceRange: priceRange,
    }));
  }, [search, catval, selectedBrands, priceRange]);

  return (
    <>
      <Navbar expand="lg" className="pink-200 mb-5" style={{ backgroundColor: "#EC407A" }} data-bs-theme="#pink-200" fixed="top">
        <Container fluid>
          <Navbar.Brand href="#">
            <Image src={logo} style={{ height: 50, width: "100%" }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" style={navstyles} className="hover-effect">Home</Nav.Link>
              <Nav.Link as={NavLink} to="/about" style={navstyles} className="hover-effect">About</Nav.Link>
              <Nav.Link as={NavLink} to="/products" style={navstyles} className="hover-effect">Shop</Nav.Link>
              <Nav.Link as={NavLink} to="/Contact" style={navstyles} className="hover-effect">Contact Us</Nav.Link>
            </Nav>

            <Form inline>
              <InputGroup>
                <InputGroup.Text> <BsSearch /> </InputGroup.Text>
                <Form.Control type="text" placeholder="Search" style={{ backgroundColor: "#fff" }}
                  value={search} onChange={(e) => setSearch(e.target.value)} />
              </InputGroup>
            </Form>

            <Nav className='ms-auto'>
              <Nav.Link as={NavLink} to="/cart" className="cart-icon hover-effect" 
                style={{ transition: 'transform 0.3s, background-color 0.3s', transform: 'scale(1)' }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.1)';
                  e.target.style.backgroundColor = '#F06292';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.backgroundColor = '';
                }}>
                <div style={{ position: 'relative', marginRight: '20px' }}>
                  <BsCart3 style={{ fontSize: '30px' }} />
                  <span className="badge rounded-pill text-bg-danger"
                    style={{ position: 'absolute', top: '-10px', right: "-15px" }}> {cartItems.length} </span>
                </div>
              </Nav.Link>
              
              <ShowOnLogout>
                <Nav.Link as={NavLink} to="/register" style={navstyles} className="hover-effect">Register</Nav.Link>
                <Nav.Link as={NavLink} to="/login" style={navstyles} className="hover-effect">Login</Nav.Link>
              </ShowOnLogout>

              <ShowOnLogin>
                <NavDropdown title={`Welcome ${username}`} id="basic-nav-dropdown">
                  <NavDropdown.Item as={NavLink} to="/profile" className="dropdown-hover hover-effect"> <FaUser /> Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={NavLink} to="/cart" className="dropdown-hover hover-effect"> Your Cart </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={NavLink} to="/myorders" className="dropdown-hover hover-effect">Your Orders</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} className="dropdown-hover hover-effect">
                    <BsArrowDownLeftCircle /> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </ShowOnLogin>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Header;
