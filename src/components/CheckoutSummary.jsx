import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectCart, selectTotal } from '../redux/cartSlice';

const CheckoutSummary = () => {
  const cartItems = useSelector(selectCart);
  const total = useSelector(selectTotal);

  return (
    <Card className='p-3 shadow-lg rounded bg-white'>
      <Card.Body>
        <h2 className='text-center text-success'>Checkout Summary</h2>
        <hr />
        <ListGroup variant='flush' className='mb-3'>
          <ListGroup.Item className='d-flex justify-content-between bg-light rounded p-2'>
            <strong>Products:</strong> <span>({cartItems.length})</span>
          </ListGroup.Item>
          <ListGroup.Item className='d-flex justify-content-between bg-light rounded p-2'>
            <strong>Total Price:</strong> <span>&#8377;{Number(total).toFixed()}</span>
          </ListGroup.Item>
        </ListGroup>
        <hr />
        {cartItems.map((item, index) => (
          <ListGroup key={index} className='mb-2 shadow-sm rounded'>
            <ListGroup.Item className='bg-primary text-white'>
              <strong>Product Name: {item.name}</strong>
            </ListGroup.Item>
            <ListGroup.Item className='d-flex justify-content-between'>
              <strong>Price:</strong> <span>&#8377;{item.price}</span>
            </ListGroup.Item>
            <ListGroup.Item className='d-flex justify-content-between'>
              <strong>Qty:</strong> <span>{item.qty}</span>
            </ListGroup.Item>
          </ListGroup>
        ))}
      </Card.Body>
    </Card>
  );
};

export default CheckoutSummary;