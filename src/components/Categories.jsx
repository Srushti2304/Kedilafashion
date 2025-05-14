import React, { useEffect } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from './api';
import { selectCategories, store_categories } from '../redux/categorySlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const Categories = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        getData(`${import.meta.env.VITE_BASE_URL}/categories`)
            .then((res) => {
                dispatch(store_categories(res));
            })
            .catch((err) => {
                toast.error(err.message);
            });
    }, []);

    const categories = useSelector(selectCategories);

    // Inline CSS for hover effect
    const cardStyle = {
        overflow: 'hidden',
        cursor: 'pointer',
        borderRadius: '10px',
    };

    const imgStyle = {
        transition: 'transform 0.3s ease-in-out',
    };

    const handleMouseEnter = (e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.transform = 'scale(1)';
    };

    return (
        <Container fluid className="my-4 p-0" style={{ backgroundColor: "#F3D9E5", padding: "20px", minHeight: "100vh" }}>
            <h1 className='text-center my-2' style={{ color: "black" }}>Categories</h1>
            <hr />
            <Container className='col-6 p-0'>
                <Row className='d-flex justify-content-center'>
                    {categories.map((cat, index) => (
                        <Col lg={6} sm={6} xs={12} md={6} key={index} className="mb-1">
                            <Card style={cardStyle} onClick={() => navigate(`/products`, { state: cat.name })}>
                                <Card.Body>
                                    <Card.Title style={{ textAlign: "center" }}>{cat.name}</Card.Title>
                                </Card.Body>
                                <Card.Img 
                                    src={cat.image} 
                                    height={450} 
                                    style={imgStyle} 
                                    onMouseEnter={handleMouseEnter} 
                                    onMouseLeave={handleMouseLeave} 
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Container>
    );
}

export default Categories;
