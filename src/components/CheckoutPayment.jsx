import React, { useEffect, useState } from 'react'
import CheckoutSummary from './CheckoutSummary'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { emptycart, selectCart, selectTotal } from '../redux/cartSlice'
import { selectAddress } from '../redux/checkoutSlice'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import StripePayment from './StripePayment'
import emailjs from '@emailjs/browser';

const stripePromise = loadStripe(`${import.meta.env.VITE_PK}`)

const CheckoutPayment = () => {
    const [paymentMethod,setPaymentMethod] = useState('')
    const [clientSecret,setClientSecret] = useState('')
    const navigate =  useNavigate()
    const dispatch =  useDispatch()

    const cartItems =  useSelector(selectCart)
    const total =  useSelector(selectTotal)
    const shippingAddress =  useSelector(selectAddress)
    const {username , email} = JSON.parse(sessionStorage.getItem("3rdfeb"))
    const handleCODorder = async()=>{
        try{
           const res =  await axios.post(`${import.meta.env.VITE_BASE_URL}/orders` , {cartItems , total, username,email , 
                paymentMethod:'cod' , orderStatus:"placed" , orderDate:new Date().toLocaleDateString() , orderTime:new Date().toLocaleTimeString() ,shippingAddress ,  createdAt:new Date()
            })
            console.log(res)
            if(res.status==200 || res.status==201){
                 emailjs.send("service_3fk7lyr", 'template_m5n9zpv', {
                    status :res.data.orderStatus ,
                    email:res.data.email , 
                    payment :"Cash on Delivery",
                    order_id : res.data.id , 
                    orders :res.data.cartItems ,
                    total:res.data.total } , {
                    publicKey: 'wGoqBwM45BIWErU0s',
                  }).then(()=>{
                    toast.success("order placed")
                    navigate('/thankyou')     
                    dispatch(emptycart())            
                  }).catch((err)=>{toast.error(err.message)})   
              
            }
      
        }
        catch(err){toast.error(err.messge)}
    }

    useEffect(()=>{
        if(paymentMethod=="online"){ handleonlinePayment()}
    },[paymentMethod])

    const handleonlinePayment = async()=>{
        try{
            const res= await fetch(`${import.meta.env.VITE_NODE_URL}/create-payment-intent` ,{
                method:"POST",
                headers:{'content-type':'application/json'},
                body :JSON.stringify({total}) } )
            const data =  await res.json()
            console.log(data)
            setClientSecret(data.clientSecret)
        }
        catch(err){toast.error(err.messge)}
    }

    if(cartItems.length != 0) {
        return (
            <Elements stripe={stripePromise}>
                <div className='container mt-5 shadow p-4'>
                    <div className="row">
                        <div className="col card">
                            <h1>Checkout Payment</h1><hr/>
                            <div className='list-group mb-4 p-4'>
                            <div className="mb-3 form-check">
                                <input type="radio" name="payment" value="cod" className='form-check-input'
                                onClick={()=>setPaymentMethod('cod')}/>
                                <label htmlFor="" className='form-check-label'>Cash On Delivery</label>
                            </div>
                            {paymentMethod=='cod' && 
                            <div>
                                <button type="button" className='btn btn-primary me-3' onClick={handleCODorder}>Place Order</button>
                                <button type="button" className='btn btn-danger me-3'>Cancel</button>
                            </div> }
                            </div>
                            <div className='list-group mb-4 p-4'>
                            <div className="mb-3 form-check">
                                <input type="radio" name="payment" value="online" className='form-check-input' onClick={()=>setPaymentMethod('online')}/>
                                <label htmlFor="" className='form-check-label'>Pay Online</label>
                            </div>
                            {(paymentMethod=="online" && clientSecret) && 
                            <div className='card p-2'>
                                <h3 className='mb-4'>Enter Payment Details</h3>
                                <StripePayment clientSecret={clientSecret}></StripePayment>
                            </div>
                            }
                            </div>  
                        </div>
                        <div className="col"><CheckoutSummary/></div>
                    </div>
                </div>
            </Elements>
          )
    }
   else return <Navigate to='/Thankyou'/> 
}

export default CheckoutPayment