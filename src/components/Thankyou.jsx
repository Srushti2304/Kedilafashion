import React from 'react'
import { FaCheckCircle, FaArrowLeft } from 'react-icons/fa'


const Thankyou = () => {
  return (
    <div
      className='d-flex justify-content-center align-items-center flex-column text-center'
      style={{
        height: '100vh',
        background: 'linear-gradient(135deg, #ffe4ec, #ffe0f0)',
        color: '#880e4f',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <FaCheckCircle size={100} color="#c2185b" className="mb-4 animate__animated animate__bounceIn" />
      <h1 className="mb-3 animate__animated animate__fadeInDown">Thank You!</h1>
      <p className="mb-4 fs-4">Your order has been placed successfully.</p>
      <Link
        to="/"
        className="btn btn-lg"
        style={{
          backgroundColor: '#c2185b',
          color: '#fff',
          borderRadius: '30px',
          padding: '10px 30px',
          textDecoration: 'none',
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#d81b60')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#c2185b')}
      >
        <FaArrowLeft className="me-2" />
        Continue Shopping
      </Link>
    </div>
  )
}

export default Thankyou
