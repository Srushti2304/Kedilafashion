import React, { Fragment, useState } from 'react'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";


const ProductImages = ({images}) => {
    const [pic , setPic] = useState(images[0])
    const [index ,  setIndex] = useState(0)
    const handleImg = (i)=>{
        setPic(images[i])
        setIndex(i)
    }
    const handlePrev = ()=>{
        if(index > 0 ){
        setIndex(index-1)
        setPic(images[index-1]  )
        }
    }
    const handleNext = ()=>{
        if(images.length-1 > index){
            setIndex(index+1)
            setPic(images[index+1]  )
            }
    }

  return (
    <>
      {/* <img src={pic} className='mb-3' height='300px' width={500} /> */}

      <Zoom>
        <img
          src={pic}
          alt="Product"
          width="500"
          height="600"
          style={{ borderRadius: "10px", cursor: "zoom-in" }}
        />
      </Zoom>
    <br/>
    <FaArrowCircleLeft className='me-3' onClick={handlePrev}/>
      {images.map((img,i)=><Fragment key={i}> 
        <img src={img} height={100} width={100} 
        className={`me-3 ${index == i && 'border border-dark border-2'}`} 
        onClick={()=>handleImg(i)}/>
      </Fragment>)}
      <FaArrowCircleRight className='ms-3'  onClick={handleNext}/>
    </>
  )
}

export default ProductImages