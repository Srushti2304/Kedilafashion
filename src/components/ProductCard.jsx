import React from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addtocart } from '../redux/cartSlice'
import { Link, useNavigate } from 'react-router'


const ProductCard = ({product}) => {
  const dispatch = useDispatch()
  const redirect = useNavigate()
  const handleCart = ()=>{
    dispatch(addtocart(product))
    window.scrollTo(0,0)
  }
  return (
    <Col lg={3} sm={6} xs={12}  md={4}> 
        <Card style={{opacity:`${product.stock <=0  && '0.7' }` }}>
          <div style={{position:'relative'}}>
          <Card.Img src={product.images[0]} fluid height={200} 

        onClick={()=>redirect(`/product/details/${product.id}` , {state:product } )}/>
        <span class={`badge rounded-pill float-end ${product.stock > 0 ? 'text-bg-success' :'text-bg-danger'}`}  
          style={{position:'absolute',top:'5px',right:'5px'}}>
        {product.stock > 0 ? "In stock" :"out of stock"}</span  >
          </div>
     
        <Card.Body>
            <Card.Title>{product.name}
     
      

            </Card.Title>
            <Card.Text>{product.category}<br/>
           {product.brand}<br/>
           &#8377; {product.price}</Card.Text>
           {product.stock > 0  &&
            <Button onClick={handleCart}>Add to Cart</Button> }
        </Card.Body>
        </Card>
  </Col>
  )
}

export default ProductCard