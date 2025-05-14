import React, { useState } from 'react'
import { Button, Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap'
import RegisterImg from '/src/assets/alag/groom.png'
import { Link, useNavigate } from 'react-router'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { toast } from 'react-toastify'
import axios from 'axios'

const Register = () => {
  const redirect =  useNavigate()
  const [user,setUser] = useState({username:"",email:'',password:'',cpassword:'',isAdmin:false})
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const handleSubmit = async(e)=>{
    e.preventDefault()
    let {username,email,password,cpassword} = user
    let pattern = /^[\w\.]+\@[\w]+\.[a-zA-Z]{3}$/ 
    if(!username || !email || !password ) {
      toast.error("please fill all the fields")
    }
    else if(!pattern.test(email)){
      toast.error("invalid email")
    }
    else if(password != cpassword){
      toast.error("password not match")
    }
    else {
        try{
          const res =   await axios.get(`${import.meta.env.VITE_BASE_URL}/users?email=${email}`)
          let users = res.data
          if(users.length != 0){
            toast.error(`${email} email already exists`);return
          }
        }
        catch(err){toast.error(err.mesage)}
        try{
          await axios.post(`${import.meta.env.VITE_BASE_URL}/users` , {...user, createdAt:new Date() })
          
          toast.success("registered successfully")
          redirect('/login')
        }
        catch(err){toast.error(err)}
    }
   
  }
  return (

        <Container className="my-3" fluid style={{backgroundColor:"#F3D9E5",minHeight:"100vh",padding:"20px"}}>
          
    
      <h1 style={{textAlign:"center", marginTop:"60px"}}>Create an Account</h1><hr />
      <Row> <Col xs={4}>  <Image src={RegisterImg} style={{height:"500px"}} fluid /> </Col>
        <Col>
          <Form onSubmit={handleSubmit}>
            
              <Col>
                <Form.Group className='mb-3'>
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" name="username" 
                  value={user.username} 
                  onChange={(e)=>setUser({...user, username:e.target.value})}></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='mb-3'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" name="email"
                   value={user.email} 
                   onChange={(e)=>setUser({...user, email:e.target.value})}></Form.Control>
                </Form.Group>
              </Col>
           
            <Form.Group className='mb-3'>
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                  />
                  <Button
                    variant='light'
                    className='border'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <BsEye /> : <BsEyeSlash />}
                  </Button>
                </InputGroup>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Confirm Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showCPassword ? "text" : "password"}
                    name="cpassword"
                    value={user.cpassword}
                    onChange={(e) => setUser({ ...user, cpassword: e.target.value })}
                  />
                  <Button
                    variant='light'
                    className='border'
                    onClick={() => setShowCPassword(!showCPassword)}
                  >
                    {showCPassword ? <BsEye /> : <BsEyeSlash />}
                  </Button>
                </InputGroup>
              </Form.Group>
            <div className="d-grid gap-30 mt-5">
             <Button type="submit">SignUp</Button>
            </div>
          </Form>
          <p className='mt-5'>Already an Account?? &emsp; <Link to="/login">SignIn</Link></p>
        </Col>
      </Row>
    </Container>
  )
}

export default Register