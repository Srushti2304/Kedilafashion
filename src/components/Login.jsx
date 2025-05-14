import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap'
import RegisterImg from '/src/assets/images/a.jpg'
import { Link, useLocation, useNavigate } from 'react-router'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import axios from 'axios'


const Login = () => {
  const [show,setShow] = useState(false)
  const redirect = useNavigate()
  const location  = useLocation()
  const redirectURL = location?.state ? location.state.path :'/'

  const {register , handleSubmit , formState: { errors } ,trigger ,getValues,setFocus} = useForm()
  const loginUser = async(user)=>{ 
    // alert(JSON.stringify(getValues()))

    try{
     const res =  await axios.get(`${import.meta.env.VITE_BASE_URL}/users?email=${user.email}`)
     if(res.data.length==0){toast.error("invalid credentails")}
     else if(res.data[0].password == user.password){
      let {email,username,isAdmin} = res.data[0]
      sessionStorage.setItem("3rdfeb",JSON.stringify({email,username,isAdmin , isLoggedIn:true}))
        if(isAdmin){redirect('/admin')
          }
        else { redirect(redirectURL)}
        toast.success("loggedIn succcessfully")
     }
     else { toast.error("invalid credentails") }
    }
    catch(err){toast.error(err.message)}
   }
  useEffect(()=>{ setFocus('email')},[])
  return (
      <div style={{ backgroundColor: '#F3D9E5', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container className='mt-5 shadow p-4 col-6' style={{ backgroundColor: 'white' }}>
          <h1>SignIn to your Account</h1>
          <hr />
          <Form onSubmit={handleSubmit(loginUser)}>
            <Col>
              <Form.Group className='mb-3'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  {...register('email', {
                    required: "Email is required",
                    pattern: { value: /^[\w\.]+\@[\w]+\.[a-zA-Z]{3}$/, message: "Invalid Email" }
                  })}
                  onBlur={() => trigger('email')}
                />
                {errors.email && <span className="text-danger">{errors.email.message}</span>}
              </Form.Group>
            </Col>
            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={show ? "text" : "password"}
                  name="password"
                  {...register('password', {
                    required: "Password is required",
                    minLength: { value: 5, message: "Min 5 characters" },
                    maxLength: { value: 20, message: "Max 20 characters" }
                  })}
                  onBlur={() => trigger('password')}
                />
                <Button variant='light' className='border' onClick={() => setShow(!show)}>
                  {show ? <BsEye /> : <BsEyeSlash />}
                </Button>
              </InputGroup>
              <Link to='/forgot-password'>Forgot password?</Link>
              {errors.password && <span className="text-danger">{errors.password.message}</span>}
            </Form.Group>
            <div className="d-grid gap-3">
              <Button type="submit">SignIn</Button>
            </div>
          </Form>
          <p className='mt-3'>Create an Account? &emsp; <Link to="/register">SignUp</Link></p>
        </Container>
      </div>
    );
    
  
}

export default Login