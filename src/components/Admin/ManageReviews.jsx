import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import ReactStars from 'react-stars'

const ManageReviews = () => {
      const [reviews, setReviews] = useState([]);
      useEffect(() => {
          fetch(`${import.meta.env.VITE_BASE_URL}/reviews`)
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(err => console.error("Error fetching reviews:", err));
      }, []);
  return (
    <div className="mt-4">
      <h3 className="h4 mb-3">All Reviews</h3>
      {reviews.length === 0 ? (
        <p className="text-muted">No reviews available.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Username</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={review.id}>
                <td>{index + 1}</td>
                <td>{review.orderId}</td>
                <td>{review.productId}</td>
                <td>{review.productName}</td>
                <td>{review.username}</td>
                <td>
                  <ReactStars 
                    value={review.rating} 
                    count={5} 
                    size={16} 
                    edit={false} 
                  />
                  ({review.rating}/5)
                </td>
                <td>{review.comment}</td>
                <td>{new Date(review.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default ManageReviews