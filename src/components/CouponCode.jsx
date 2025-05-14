import React, { useEffect, useState } from 'react';
import { getData } from './api';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Card, Button, Form } from 'react-bootstrap';

const CouponCode = ({ total }) => {
    const [discountedPrice, setDiscountedPrice] = useState(total);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [couponMessage, setCouponMessage] = useState("");
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        getData(`${import.meta.env.VITE_BASE_URL}/coupons`).then((res) => {
            setCoupons(res);
        }).catch((err) => {
            toast.error(err.message);
        });
    }, []);

    const [userOrders, setUserOrders] = useState([]);
    const { username } = JSON.parse(sessionStorage.getItem("3rdfeb"));

    useEffect(() => {
        const fetchUserOrders = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/orders?username=${username}`);
                setUserOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
                toast.error("Failed to load order history.");
            }
        };

        fetchUserOrders();
    }, [username]);

    const applyCoupon = (selectedCode) => {
        const couponData = coupons.find((c) => c.code === selectedCode);

        if (!couponData) {
            setSelectedCoupon(null);
            setCouponMessage("");
            return;
        }

        const hasUsedCoupon = userOrders.some((order) => order.appliedCoupon === selectedCode);
        if (hasUsedCoupon) {
            toast.error("This coupon has already been used.");
            return;
        }

        if (total < couponData.minPrice) {
            setSelectedCoupon(null);
            setCouponMessage(`❌ Coupon "${couponData.code}" applies only for orders above ₹${couponData.minPrice}.`);
            return;
        }

        setSelectedCoupon(couponData);
        setCouponMessage(`✅ Coupon "${couponData.code}" applied!`);

        let newPrice = total;
        if (couponData.type === "percentage") {
            newPrice = total - (total * couponData.value) / 100;
        } else if (couponData.type === "flat") {
            newPrice = total - couponData.value;
        }

        setDiscountedPrice(newPrice);
        sessionStorage.setItem("discountedPrice", newPrice);
        sessionStorage.setItem("appliedCoupon", couponData.code);
    };

    const cancelCoupon = () => {
        setSelectedCoupon(null);
        setCouponMessage("");
        setDiscountedPrice(total);
    };

    return (
        <Card className="shadow-lg p-3 mb-4 bg-white rounded border-primary">
            <h2 className="text-center text-success">Apply Coupon</h2>
            <hr />
            <Card.Body>
                <Form.Select onChange={(e) => applyCoupon(e.target.value)}
                    className="form-select mb-3 border-primary"
                    value={selectedCoupon ? selectedCoupon.code : ""}>
                    <option value="" >Select a Coupon</option>
                    {coupons.map((c) => (
                        <option key={c.code} value={c.code}>
                            {c.code} - {c.type === "percentage" ? `${c.value}% Off` : `₹${c.value} Off`} 
                            {` (Min: ₹${c.minprice})`}
                        </option>
                    ))}
                </Form.Select>

                {couponMessage && (
                    <p className={`text-center fw-bold ${selectedCoupon ? "text-success" : "text-danger"}`}>
                        {couponMessage}
                    </p>
                )}

                <h5 className="text-center mt-3">Total Price: <span className="text-success fw-bold">₹{discountedPrice}</span></h5>
                {selectedCoupon && (
                    <div className="text-center mt-3">
                        <Button variant="danger" onClick={cancelCoupon}>
                            Cancel Coupon
                        </Button>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default CouponCode;