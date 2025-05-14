import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Await, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { emptycart, selectCart, selectTotal } from '../redux/cartSlice'
import { selectAddress } from '../redux/checkoutSlice'
import emailjs from '@emailjs/browser'
const StripePayment = ({clientSecret }) => {
  console.log(`***${clientSecret}***`)
  const dispatch = useDispatch()
  const navigate =  useNavigate()
  const stripe =  useStripe()
  const elements =  useElements()

  const [isLoading,setIsLoading] = useState(false)
  const [paymentId,setPaymentId]=useState('')

  const cartItems =  useSelector(selectCart)
  const total =  useSelector(selectTotal)
  const shippingAddress =  useSelector(selectAddress)
  const {username , email} = JSON.parse(sessionStorage.getItem("3rdfeb"))

  const handlePayment = ()=>{
      setIsLoading(true)
      if(!stripe || !elements) {toast.error("stripe not initailzied");return}
      const cardelement =  elements.getElement(CardElement)
      stripe.confirmCardPayment(clientSecret , {
        payment_method :{card:cardelement}
      }).then((res)=>{
        console.log(res)
        if(res.paymentIntent){
          if(res.paymentIntent.status=='succeeded'){
            setPaymentId(res.paymentIntent.id)
            toast.success("payment done")
            saveorder()
          }
        }
        setIsLoading(false)
      }).catch(err=>{toast.error(err.message) ; setIsLoading(false)})
  }

  const saveorder = async()=>{
    try{
      let res = await axios.post(`${import.meta.env.VITE_BASE_URL}/orders` , {cartItems , total, username,email , 
          paymentMethod:'online' , orderStatus:"placed" , orderDate:new Date().toLocaleDateString() , orderTime:new Date().toLocaleTimeString() ,shippingAddress ,  createdAt:new Date()
      })
      if(res.status==200 || res.status==201){
        await Promise.all(
          cartItems.map(async(item)=>{
            await axios.put(`${import.meta.env.VITE_BASE_URL}/products/${item.id}`, {...item,
              stock: item.stock - item.qty,  
          });
        })
        )
        emailjs.send("service_icah0in", 'template_m5n9zpv', {
          status :res.data.orderStatus ,
          email:res.data.email , 
          payment :"Online (Paid",
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
  return (
    <>
    <CardElement className='mb-3'/>
    <div class="d-grid gap-2">
      <button  type="button"  class="btn btn-primary"  onClick={handlePayment}  >
        {isLoading ?   <div class="spinner-border text-light" role="status"></div> :" (Pay Now)"}
      </button>
    </div>
    
    </>
  )
}

export default StripePayment
