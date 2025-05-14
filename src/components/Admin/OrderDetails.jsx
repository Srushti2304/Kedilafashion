import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router'
import { selectorders } from '../../redux/orderSlice'
import { FaArrowCircleLeft } from 'react-icons/fa'
import ChangeOrderStatus from './ChangeOrderStatus'

const OrderDetails = () => {
    const {id} = useParams()
    const orders =  useSelector(selectorders)
    const order = orders.find((item)=>item.id==id)
  
    return (
       <div className='container shadow  p-4'>
         <h1>Order Details</h1><hr/>
         <div className="mb-4">
            <h4 className='text-info'>
              <ChangeOrderStatus order={order}/>             
            <Link to='/admin/orders' className='btn btn-primary mb-2 float-end'> <FaArrowCircleLeft/>Back to Orders    </Link>
            </h4>
                   <b>Shipping Address</b><br/>   
                   Name: {order.shippingAddress.name},<br/>
                   Address: {order.shippingAddress.address1},<br/>
                   City:{order.shippingAddress.city}<br/>
                   pincode :{order.shippingAddress.pincode},<br/>
                   Contact: {order.shippingAddress.mobile}
                   </div>
                   <div class="table-responsive">
         <table class="table table-bordered table-striped">
           <thead>
             <tr>
               <th scope="col">Sr. No</th>
               <th scope="col">Name</th>
               <th>Image</th>
               <th scope="col">Price</th>
               <th>Quantity</th>
               <th>Total Price</th>
             </tr>
           </thead>
           <tbody>
                {order.cartItems.map((item,index)=>
                <tr key={item.id}>
                  <td>{index+1}</td>
                  <td>{item.name}</td>
                  <td><img src={item.images[0]} height={50} width={50}/></td>
                  <td>&#8377;{item.price}</td>
                  <td>{item.qty}</td>
                  <td>&#8377;{item.price*item.qty}</td>
                </tr>
                )}
           </tbody>
           <tfoot>
            <tr>
              <td colSpan={5} className='text-end fw-bold'>Total:-</td>
              <td>&#8377;{order.total} </td>
            </tr>
           </tfoot>
         </table>
       </div>
       </div>
  )
}

export default OrderDetails
