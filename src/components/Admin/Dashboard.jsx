import { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { FaBox, FaShoppingCart, FaUser, FaThList, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router";
import SalesChart from "./SalesChart ";
const Dashboard = () => {
  const navigate =  useNavigate()
  const [data, setData] = useState({
    products: 0,
    users: 0,
    orders: 0,
    categories: 0,
    reviews: 0,
  });
  const icons = {
    products: <FaBox size={30} />,
    users: <FaUser size={30} />,
    orders: <FaShoppingCart size={30} />,
    categories: <FaThList size={30} />,
    reviews: <FaStar size={30} />,
  };
  const routes = {
    products: "/admin/view",
    users: "/admin", 
    orders: "/admin/orders",
    categories: "/admin/categories",
    reviews: "/admin/reviews",
  };

  const handleCardClick = (key) => {
    navigate(routes[key]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [products, users, orders, categories, reviews] = await Promise.all([
          fetch(`${import.meta.env.VITE_BASE_URL}/products`).then((res) => res.json()),
          fetch(`${import.meta.env.VITE_BASE_URL}/users`).then((res) => res.json()),
          fetch(`${import.meta.env.VITE_BASE_URL}/orders`).then((res) => res.json()),
          fetch(`${import.meta.env.VITE_BASE_URL}/categories`).then((res) => res.json()),
          fetch(`${import.meta.env.VITE_BASE_URL}/reviews`).then((res) => res.json()),
        ]);

        setData({
          products: products.length,
          users: users.length,
          orders: orders.length,
          categories: categories.length,
          reviews: reviews.length,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
    <Row>
      {Object.entries(data).map(([key, value]) => (
        <Col key={key} md={4} className="mb-4">
          <Card className="text-center p-3" onClick={() => handleCardClick(key)} style={{ cursor: "pointer" }}>
            <Card.Body>
              <div className="mb-2">{icons[key]}</div>
              <Card.Title className="text-capitalize">{key}</Card.Title>
              <Card.Text className="display-4">{value}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
   </Row>
   <Row className="mt-4">
       <Col md={12}>
         <Card className="p-3">
           <h5>Monthly Sales Overview</h5>
           <SalesChart />
         </Card>
       </Col>
     </Row>
  </div>
  );
};

export default Dashboard;
