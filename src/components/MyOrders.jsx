import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getData } from './api';
import { selectorders, store_orders } from '../redux/orderSlice';
import { toast } from 'react-toastify';

const MyOrders = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        getData(`${import.meta.env.VITE_BASE_URL}/orders`).then((res) => {
            dispatch(store_orders(res));
        }).catch((err) => {
            toast.error(err.message);
        });
    }, []);

    const allorders = useSelector(selectorders);
    const { username } = JSON.parse(sessionStorage.getItem("3rdfeb"));
    const orders = allorders.filter(item => item.username === username);

    return (
        <div className='container shadow-lg p-4 rounded' style={{ marginTop: '80px', backgroundColor: "#FFC1CC", border: "2px solid #C2185B" }}>
            <h1 className='text-center' style={{ color: "#C2185B" }}>My Orders</h1>
            <hr style={{ borderColor: "#C2185B" }} />
            <div className="table-responsive mt-3">
                <table className="table table-bordered table-striped text-center" style={{ backgroundColor: "#FFE4E1" }}>
                    <thead style={{ backgroundColor: "#C2185B", color: "white" }}>
                        <tr>
                            <th scope="col">OrderId</th>
                            <th scope="col">Total Amount</th>
                            <th scope="col">Payment Method</th>
                            <th>Order Date and Time</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 && (
                            <tr>
                                <td colSpan={6} className='text-center text-danger fw-bold'>No order found</td>
                            </tr>
                        )}
                        {orders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.id}</td>
                                <td><strong style={{ color: "#C2185B" }}>₹{order.total}</strong></td>
                                <td>{order.paymentMethod}</td>
                                <td>
                                    {order.orderDate.split('/')[1].padStart(2, '0')}-{order.orderDate.split('/')[0].padStart(2, '0')}-{order.orderDate.split('/')[2]} at {order.orderTime}
                                </td>
                                <td>
                                    {order.orderStatus !== 'delivered' ? (
                                        <span className='text-danger fw-bold'>{order.orderStatus}</span>
                                    ) : (
                                        <span className='text-success fw-bold'>{order.orderStatus}</span>
                                    )}
                                </td>
                                <td>
                                    <button type="button" className="btn btn-light border border-dark mx-1" onClick={() => navigate(`/myorders/details/${order.id}`)}>
                                        📄 View
                                    </button>
                                    <button type="button" className="btn btn-light border border-dark" onClick={() => navigate(`/myorders/track/${order.id}`)}>
                                        🚚 Track
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;
