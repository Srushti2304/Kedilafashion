import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import ReactPaginate from 'react-paginate'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'

const ProductItems = ({products}) => {
     ////////////////////// //pagination //////////////////////////////////////////
  const itemsPerPage =  4 //0 to 29 
  const [itemOffset,setItemOffset] =  useState(0)
  const [pageCount,setPageCount] = useState(0) //30/4 => 8
  const [currentItems, setCurrentItems] = useState([]) //[0,1,2,3]=> [4,5,6,7]

useEffect(()=>{
  const endOffset =  itemOffset+itemsPerPage // 0+4=> 4 // 4+4 => 8 ,20+4=24
  setPageCount(Math.ceil(products.length/itemsPerPage)) //30/4 => 8
  setCurrentItems(products.slice(itemOffset , endOffset)) // 0,4 4- exclude => 0 to 3 , 4,8=> 4 to 7
                // 20,24 => 20 to 23 
},[itemOffset , products])
  

const handlePageClick = (event) => { //index 1 , index 5
  const newOffset = (event.selected * itemsPerPage) % products.length; //4%30 = 4 //20%30=20
  setItemOffset(newOffset); //itemOffset =  4 , 20
};
/////////////pagination ends//////////////////////////////

  return (
    <>
     <Container>
      
      <Row>
      
        {products.length==0 && <h1> <div class="spinner-border text-danger" role="status"></div> No Product Found</h1>}
          {currentItems.map((product,index)=>
            <ProductCard product = {product} key={index}/>    )}
      </Row>


      </Container>
      <ReactPaginate breakLabel="..."  nextLabel="next >" onPageChange={handlePageClick}
          pageRangeDisplayed={5}  pageCount={pageCount} previousLabel="< previous"  renderOnZeroPageCount={null}
          containerClassName="pagination mt-5 d-flex justify-content-center" pageClassName="page-item" pageLinkClassName="page-link"
          previousClassName="page-item" nextClassName='page-item' activeClassName='page-item active'
          previousLinkClassName='page-link' nextLinkClassName='page-link'
        />
    </>
  )
}

export default ProductItems