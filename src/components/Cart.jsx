import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calculatetotal, decrease, emptycart, increase, removefromcart, selectCart, selectTotal } from '../redux/cartSlice';
import { BsTrash } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router';

const Cart = () => {
    const cartItems = useSelector(selectCart);
    const total = useSelector(selectTotal);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        dispatch(calculatetotal());
    }, [cartItems, dispatch]);

    const handleCheckout = () => {
        if (sessionStorage.getItem("3rdfeb") != null) {
            navigate('/checkout');
        } else {
            navigate('/login', { state: { path: location.pathname } });
        }
    };

    return (
        <div className='container-fluid mt-5 shadow p-4 bg-light rounded'>
            <h1 className='text-center text-primary mt-5'>Shopping Cart</h1><hr />
            <div className="row justify-content-center">
                <div className="col-10">
                    <div className="table-responsive card p-3 shadow-lg bg-white rounded">
                        <table className="table table-bordered table-striped table-hover text-center">
                            <thead className='bg-dark text-white'>
                                <tr>
                                    <th>Sr. No</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Start Date</th> 
                                    <th>End Date</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.length === 0 && <tr><td colSpan={8} className='text-danger'>No Item in Cart</td></tr>}
                                {cartItems.map((item, index) =>
                                    <tr key={index} className='align-middle'>
                                        <td>{index + 1}</td>
                                        <td><img src={item.images[0]} height='50px' width={50} className='rounded' /> {item.name}</td>
                                        <td className='text-success'>&#8377;{item.price}</td>
                                        <td className='text-secondary'>{item.startDate || "N/A"}</td> 
                                        <td className='text-secondary'>{item.endDate || "N/A"}</td>
                                        <td>
                                            <div className="input-group justify-content-center">
                                                <button type="button" className='btn btn-success'
                                                    onClick={() => dispatch(decrease(item))}>-</button>
                                                <input type="text" className='text-center border-0 bg-light mx-2' style={{ width: '40px' }}
                                                    value={item.qty} readOnly />
                                                <button type="button" className='btn btn-success'
                                                    onClick={() => dispatch(increase(item))}>+</button>
                                            </div>
                                        </td>
                                        <td className='text-info'>&#8377;{(item.price * item.qty).toFixed(2)}</td>
                                        <td><button type="button" className='btn btn-danger'
                                            onClick={() => dispatch(removefromcart(item.id))}><BsTrash /></button></td>
                                    </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-4">
                    <div className='card p-3 shadow-lg bg-white rounded'>
                        <h4 className='text-center text-secondary'>Order Summary</h4> <hr />
                        <h5>Sub Total : <span className='float-end text-primary'>&#8377; {total.toFixed(2)}</span></h5><br />
                        <h6>Shipping : <span className='float-end text-warning'>&#8377;{total > 0 && total < 200 ? "5.00" : "0.00"} </span></h6><hr />
                        <h5>Total : <span className='float-end text-danger'>&#8377; {total > 0 && total < 200 ? <>{(total + 5.00).toFixed(2)}</> : <>{(total + 0.00).toFixed(2)}</>}</span></h5><br />
                        <div className="d-flex justify-content-between">
                            <button type="button" className='btn btn-outline-danger btn-lg' onClick={() => dispatch(emptycart())}><BsTrash /> Empty Cart</button>
                            <button type="button" className='btn btn-outline-success btn-lg'
                                onClick={handleCheckout} disabled={cartItems.length === 0}>Proceed to checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
