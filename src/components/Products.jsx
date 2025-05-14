import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'

import { getData } from './api'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts, store_products } from '../redux/productSlice'
import { APPLY_FILTER, selectFilterProducts, selectSearchVal } from '../redux/filterSlice'
import ProductItems from './ProductItems'

const Products = () => {
  const location = useLocation()
  const cat = location.state
  const dispatch = useDispatch()

  const [brands, setBrands] = useState([])  
  const [categories, setCategories] = useState([])  
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [price, setPrice] = useState([0, 60000])

  const [allProducts, setAllProducts] = useState([])

  useEffect(() => {
    getData(`${import.meta.env.VITE_BASE_URL}/products`).then((res) => {
      setAllProducts(res) 
      if (!cat) {
        dispatch(store_products(res))
      } else {
        handleCategory(cat)
      }
      setCategories(Array.from(new Set(res.map((item) => item.category))))
    })
    .catch((err) => { toast.error(err.message) })
  }, [])

  const products = useSelector(selectProducts)

  const handleCategory = (category) => {
    setSelectedCategories(prev => {
      const newCategories = prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]

    
      const filteredBrands = allProducts
        .filter(item => newCategories.includes(item.category))
        .map(item => item.brand)
      setBrands(Array.from(new Set(filteredBrands)))

      return newCategories
    })
  }

  const handleBrand = (brand) => {
    setSelectedBrands(prev => prev.includes(brand)
      ? prev.filter(c => c !== brand)
      : [...prev, brand]
    )
  }

  const handlePriceChange = (e, type) => {
    const value = Number(e.target.value)
    setPrice(prev => type === "min" ? [value, prev[1]] : [prev[0], value])
  }

  const searchVal = useSelector(selectSearchVal)
  const filterProducts = useSelector(selectFilterProducts)

  useEffect(() => {
    dispatch(APPLY_FILTER({
      products,
      category: selectedCategories,
      brands: selectedBrands,
      priceRange: price,
      search: searchVal
    }))
  }, [products, selectedCategories, selectedBrands, price, searchVal])

  const resetFilter = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setPrice([0, 60000])
    setBrands([]) 
    dispatch(APPLY_FILTER({
      products,
      category: [],
      brands: [],
      priceRange: [],
      search: ''
    }))
  }

  return (
    <Container className="my-5" fluid style={{ backgroundColor: "#FFF0F5", minHeight: "100vh", padding: "20px" }}>
      <div className='container-fluid'> 
        <Row>
          {/* Sidebar */}
          <Col xs={3} style={{ marginTop: '100px' }}>
            <Card className='mb-3' style={{ backgroundColor: "#FFC1CC", borderRadius: "10px" }}>
              <Card.Header style={{ backgroundColor: "#C2185B", color: "white", textAlign: "center" }}>Categories</Card.Header>
              <Card.Body>
                {categories.map((category, index) => (
                  <div key={index} className="mb-2">
                    <input
                      type="checkbox"
                      onClick={() => handleCategory(category)}
                      checked={selectedCategories.includes(category)}
                    />
                    <label className="ms-3">{category}</label>
                  </div>
                ))}
              </Card.Body>
            </Card>

            <Card className='mb-3' style={{ backgroundColor: "#FFC1CC", borderRadius: "10px" }}>
              <Card.Header style={{ backgroundColor: "#C2185B", color: "white", textAlign: "center" }}>Sub Categories</Card.Header>
              <Card.Body>
                {brands.map((brand, index) => (
                  <div key={index} className="mb-2">
                    <input
                      type="checkbox"
                      onClick={() => handleBrand(brand)}
                      checked={selectedBrands.includes(brand)}
                    />
                    <label className="ms-3">{brand}</label>
                  </div>
                ))}
              </Card.Body>
            </Card>

            <Card className='mb-3' style={{ backgroundColor: "#FFC1CC", borderRadius: "10px" }}>
              <Card.Header style={{ backgroundColor: "#C2185B", color: "white", textAlign: "center" }}>Price</Card.Header>
              <Card.Body>
                <input
                  type="number"
                  value={price[0]}
                  min="0"
                  max="60000"
                  className='me-1'
                  style={{ height: '50px', textAlign: 'center', width: '70px', borderRadius: '5px' }}
                  onChange={(e) => handlePriceChange(e, "min")}
                /> :
                <input
                  type="number"
                  value={price[1]}
                  min="0"
                  max="60000"
                  className='ms-1'
                  style={{ height: '50px', textAlign: 'center', width: '70px', borderRadius: '5px' }}
                  onChange={(e) => handlePriceChange(e, "max")}
                />
              </Card.Body>
            </Card>

            <Card className='mb-3 p-3' style={{ backgroundColor: "#FFC1CC", borderRadius: "10px" }}>
              <div className="d-grid gap-2">
                <Button
                  type="button"
                  onClick={resetFilter}
                  style={{ backgroundColor: "#C2185B", border: "none", color: "white" }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#D81B60"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "#C2185B"}
                >
                  Reset All
                </Button>
              </div>
            </Card>
          </Col>

          {/* Main Content */}
          <Col style={{ marginTop: '100px' }}>
            {cat ? <h1>{cat} products :</h1> : <h1 style={{ color: "black" }}>Products Page</h1>}
            <hr />
            {(searchVal || selectedBrands.length !== 0 || selectedCategories.length !== 0 || price[1] !== 60000) ? (
              <>
                {filterProducts.length === 0 ? (
                  <h1 style={{ color: "black" }}>No product found</h1>
                ) : (
                  <ProductItems products={filterProducts} />
                )}
              </>
            ) : (
              <ProductItems products={products} />
            )}
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default Products
