import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategories, store_categories } from '../../redux/categorySlice';
import { toast } from 'react-toastify';
import { getData } from '../api';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { selectProducts } from '../../redux/productSlice';
import { Card, Button, Spinner, Form } from 'react-bootstrap';

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [pics, setPics] = useState([]);
  const { id } = useParams();
  
  let initialData = { name: '', category: '', price: '', size: '', stock: 0, images: [], desc: '' };
  const [product, setProduct] = useState({ ...initialData });
  const categories = useSelector(selectCategories);
  const products = useSelector(selectProducts);
  const productEdit = products.find(item => item.id == id);

  useEffect(() => {
    getData(`${import.meta.env.VITE_BASE_URL}/categories`)
      .then((res) => dispatch(store_categories(res)))
      .catch((err) => toast.error(err.message));

    if (id) {
      setProduct({ ...productEdit });
      setPics([...productEdit.images]);
    }
  }, [id]);

  const handleImage = async (e) => {
    let images = e.target.files;
    if (images.length > 5) return toast.error("Max 5 images only");
    
    for (let img of images) {
      if (img.size > 1048576 * 40) return toast.error("File size exceeded");
      if (!["image/jpg", "image/jpeg", "image/png", "image/webp"].includes(img.type)) return toast.error("Invalid extension");
      
      setIsLoading(true);
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "3rdfebreact");

      try {
        const res = await axios.post("https://api.cloudinary.com/v1_1/kishan22/image/upload", data);
        setPics(prev => [...prev, res.data.url]);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...product, stock: Number(product.stock), price: Number(product.price), images: [...pics], editedAt: new Date() };
      if (id) await axios.put(`${import.meta.env.VITE_BASE_URL}/products/${id}`, payload);
      else await axios.post(`${import.meta.env.VITE_BASE_URL}/products`, { ...payload, createdAt: new Date() });
      
      toast.success(id ? "Product updated" : "Product added");
      navigate('/admin/view');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Card className='p-4 shadow-lg'>
      <h3 className='text-center text-primary'>{id ? "Edit" : "Add"} Product</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Select value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })}>
            <option value='' disabled>Select one</option>
            {categories.map((cat, index) => <option key={index}>{cat.name}</option>)}
          </Form.Select>
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>Brand</Form.Label>
          <Form.Control type='text' value={product.brand} onChange={(e) => setProduct({ ...product,brand: e.target.value })}/>
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>Price</Form.Label>
          <Form.Control type='number' value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>Size</Form.Label>
          <Form.Select value={product.size} onChange={(e) => setProduct({ ...product, size: e.target.value })}>
            <option value=''>Select Size</option>
            {["S", "M", "L", "XL", "XXL"].map(size => <option key={size}>{size}</option>)}
          </Form.Select>
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>Stock</Form.Label>
          <Form.Control type='number' value={product.stock} onChange={(e) => setProduct({ ...product, stock: e.target.value })} />
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>Images</Form.Label>
          <Form.Control type='file' multiple onChange={handleImage} />
          <div className='mt-2 d-flex gap-2 flex-wrap'>
            {pics.map((img, index) => (
              <div key={index} className='position-relative'>
                <img src={img} height={100} width={100} className='rounded shadow' alt='Product' />
              </div>
            ))}
          </div>
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>Description</Form.Label>
          <Form.Control as='textarea' rows={3} value={product.desc} onChange={(e) => setProduct({ ...product, desc: e.target.value })} />
        </Form.Group>

        <Button variant='primary' type='submit' className='mt-4 w-100' disabled={isLoading}>
          {isLoading ? <Spinner animation='border' size='sm' /> : id ? "Update Product" : "Add Product"}
        </Button>
      </Form>
    </Card>
  );
};

export default AddProduct;