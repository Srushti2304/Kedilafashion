import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
    const images = [
      {url:"https://cityvibes.in/cdn/shop/articles/Traditional_Styles_for_the_Modern_Groom-min.png?v=1735304505&width=2048",text:"image8"},
      {url:"https://www.mohifashion.com/cdn/shop/articles/BB_216433_Final_320eb394-2ae4-42e1-91f1-7e342fc976df.jpg?v=1718363593&width=1100", text:"image7"},
      {url:"https://glamourental.com/cdn/shop/files/5_b1d72ba0-5111-4332-ae0d-908714819777.png?v=1735576860&width=3840",text:"image5",className:"mt-50"},
      {url:"https://glamourental.com/cdn/shop/files/1_8d8a303a-7e8f-45c2-bfb5-7d3972ea4a71.png?v=1735409007&width=1100",text:"image6"},
       ]

    const CustomPrevArrow = ({ onClick }) => (
      <button className="slick-arrow slick-prev" onClick={onClick}
        style={{position: "absolute", top: "50%", left: "10px", zIndex: 10,
          border: "none", borderRadius: "50%",  padding: "10px" }} ></button> );

    const CustomNextArrow = ({ onClick }) => (
      <button className="slick-arrow slick-next" onClick={onClick}
        style={{position: "absolute", top: "50%", right: "20px", zIndex: 10,
          border: "none", borderRadius: "50%",  padding: "10px" }} ></button> );
    
    const settings = {
      dots:false, infinite: true,  speed: 500, slidesToShow: 1, slidesToScroll: 1,
      autoplay:true, autoplaySpeed:3000,    pauseOnHover:false,
      prevArrow:<CustomPrevArrow/> , nextArrow:<CustomNextArrow/>   };
  return (
   <div style={{marginTop:"62px"}}>  
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index} style={{ position: 'absolute' }}>
              <img 
                src={img.url} 
                alt={img.text} 
                className="w-100" 
                style={{ height: "600px"}}

              /> 
            </div>
          ))}
        </Slider>
   </div>
  )
}

export default ImageSlider
