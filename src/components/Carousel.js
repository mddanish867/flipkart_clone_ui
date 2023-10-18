
import React from "react";
import "./Carousel.css"
import NewArrivals from "./NewArrivals";
import NewTrending from "./NewTrending";
import TopTrending from "./TopTrending";
import { LiaAngleLeftSolid,LiaAngleRightSolid } from "react-icons/lia";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BestElectronics from "../components/Electronics/BestElectronics";
import MultiItemCarousel from "./MultiItemCarousel";



export default function Carousel(props) { 
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <>
    <div style={{"margin-top":"5px"}}>
        <Slider {...settings}>
          <div>
          <img src="https://m.media-amazon.com/images/G/31/img21/MA2023/accessories-fest/Sept/AF/Accesories_MA_PC._CB577800217_.gif"
          className="card-img-top" alt="Laptop" />
          </div>
          <div>
          <img src="https://m.media-amazon.com/images/G/31/img21/MA2023/BOTW23/Sept/13th/Men_Desktop_Hero2._CB577947979_.jpg"
          className="card-img-top" alt="Laptop" />
          </div>
          <div>
          <img src="https://m.media-amazon.com/images/G/31/img21/MA2023/June/s3p/3000z770._CB602728012_.jpg"
          className="card-img-top" alt="Laptop" />
          </div>
          <div>
          <img src="https://m.media-amazon.com/images/G/31/img21/MA2023/AW23/AF/AW_2023_Desktop_Men._SX3000_QL85_FMpng_.png"
          className="card-img-top" alt="Laptop" />
          </div>
          <div>
          <img src="https://m.media-amazon.com/images/G/31/img21/MA2023/EOSS/PC_PO-4PC._CB603300969_.gif"
          className="card-img-top" alt="Laptop" />
          </div>
        
        </Slider>
      </div>
<MultiItemCarousel/>
 {/* <BestElectronics /> */}

      <TopTrending />
      {/*<NewArrivals/>
      <TopTrending />
      <NewTrending/> */}
   </>
  );
}
