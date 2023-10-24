import React from "react";
import "./Carousel.css";
import NewArrivals from "./NewArrivals";
import NewTrending from "./NewTrending";
import TopTrending from "./TopTrending";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BestElectronics from "../components/Electronics/BestElectronics";
import MultiItemCarousel from "./MultiItemCarousel";
import FoodBeauty from "./FoodBeauty";
import HomeAndKitchenEssential from "./HomeAndKitchenEssential";
import BestofElectronics from "./BestofElectronics";


export default function Carousel(props) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    button: true,
  };
  return (
    <>
      <div
        className="bg-light"
        style={{ marginTop: "5px", backgroundColor: "#f1f3f6" }}
      >
        <Slider {...settings}>
          <div>
            <img
              src="https://m.media-amazon.com/images/G/31/img21/MA2023/accessories-fest/Sept/AF/Accesories_MA_PC._CB577800217_.gif"
              className="card-img-top"
              alt="Laptop"
              style={{height: "200px"}}
            />
          </div>
          <div>
            <img
              src="https://m.media-amazon.com/images/G/31/img21/MA2023/BOTW23/Sept/13th/Men_Desktop_Hero2._CB577947979_.jpg"
              className="card-img-top"
              alt="Laptop"
              style={{height: "200px"}}
            />
          </div>
          <div>
            <img
              src="https://m.media-amazon.com/images/G/31/img21/MA2023/June/s3p/3000z770._CB602728012_.jpg"
              className="card-img-top"
              alt="Laptop"
              style={{height: "200px"}}
            />
          </div>
          <div>
            <img
              src="https://m.media-amazon.com/images/G/31/img21/MA2023/AW23/AF/AW_2023_Desktop_Men._SX3000_QL85_FMpng_.png"
              className="card-img-top"
              alt="Laptop"
              style={{height: "200px"}}
            />
          </div>
          <div>
            <img
              src="https://m.media-amazon.com/images/G/31/img21/MA2023/EOSS/PC_PO-4PC._CB603300969_.gif"
              className="card-img-top"
              alt="Laptop"
              style={{height: "200px"}}
            />
          </div>
        </Slider>
      </div>
      <div>
        <img
          src="	https://rukminim1.flixcart.com/fk-p-flap/520/280/image/6ae6496d87b04fbc.jpg?q=20"
          alt=""
          style={{ width: "410px", height: "200px", marginLeft: "16px" }}
        />
        <img
          src="https://rukminim1.flixcart.com/fk-p-flap/520/280/image/4ac3a2dbba18d5a9.jpg?q=20"
          alt=""
          style={{ width: "410px", height: "200px" }}
        />
        <img
          src="https://rukminim1.flixcart.com/fk-p-flap/520/280/image/338a93428849c594.jpg?q=20"
          alt=""
          style={{ width: "410px", height: "200px" }}
        />
      </div>
      <MultiItemCarousel />
      <div style={{marginTop:"10px"}}>
        <img
          src="	https://rukminim1.flixcart.com/fk-p-flap/520/280/image/6ae6496d87b04fbc.jpg?q=20"
          alt=""
          style={{ width: "410px", height: "200px", marginLeft: "16px" }}
        />
        <img
          src="https://rukminim1.flixcart.com/fk-p-flap/520/280/image/4ac3a2dbba18d5a9.jpg?q=20"
          alt=""
          style={{ width: "410px", height: "200px" }}
        />
        <img
          src="https://rukminim1.flixcart.com/fk-p-flap/520/280/image/338a93428849c594.jpg?q=20"
          alt=""
          style={{ width: "410px", height: "200px" }}
        />
      </div>
      <BestofElectronics/>
      <div>
        <img
          src="	https://rukminim1.flixcart.com/fk-p-flap/520/280/image/6ae6496d87b04fbc.jpg?q=20"
          alt=""
          style={{ width: "410px", height: "200px", marginLeft: "16px" }}
        />
        <img
          src="https://rukminim1.flixcart.com/fk-p-flap/520/280/image/4ac3a2dbba18d5a9.jpg?q=20"
          alt=""
          style={{ width: "410px", height: "200px" }}
        />
        <img
          src="https://rukminim1.flixcart.com/fk-p-flap/520/280/image/338a93428849c594.jpg?q=20"
          alt=""
          style={{ width: "410px", height: "200px" }}
        />
      </div>
      <FoodBeauty />
      <div>
        <img
          src="	https://rukminim1.flixcart.com/fk-p-flap/520/280/image/6ae6496d87b04fbc.jpg?q=20"
          alt=""
          style={{ width: "410px", height: "200px", marginLeft: "16px" }}
        />
        <img
          src="https://rukminim1.flixcart.com/fk-p-flap/520/280/image/4ac3a2dbba18d5a9.jpg?q=20"
          alt=""
          style={{ width: "410px", height: "200px" }}
        />
        <img
          src="https://rukminim1.flixcart.com/fk-p-flap/520/280/image/338a93428849c594.jpg?q=20"
          alt=""
          style={{ width: "410px", height: "200px" }}
        />
      </div>
      <HomeAndKitchenEssential />
      <div>
        <img
          src="	https://rukminim1.flixcart.com/fk-p-flap/520/280/image/6ae6496d87b04fbc.jpg?q=20"
          alt=""
          style={{ width: "410px", height: "200px", marginLeft: "16px" }}
        />
        <img
          src="https://rukminim1.flixcart.com/fk-p-flap/520/280/image/4ac3a2dbba18d5a9.jpg?q=20"
          alt=""
          style={{ width: "410px", height: "200px" }}
        />
        <img
          src="https://rukminim1.flixcart.com/fk-p-flap/520/280/image/338a93428849c594.jpg?q=20"
          alt=""
          style={{ width: "410px", height: "200px" }}
        />
      </div>
      <MultiItemCarousel />      
      <div>
        <img
          src="	https://rukminim1.flixcart.com/fk-p-flap/520/280/image/6ae6496d87b04fbc.jpg?q=20"
          alt=""
          style={{ width: "410px", height: "200px", marginLeft: "16px" }}
        />
        <img
          src="https://rukminim1.flixcart.com/fk-p-flap/520/280/image/4ac3a2dbba18d5a9.jpg?q=20"
          alt=""
          style={{ width: "410px", height: "200px" }}
        />
        <img
          src="https://rukminim1.flixcart.com/fk-p-flap/520/280/image/338a93428849c594.jpg?q=20"
          alt=""
          style={{ width: "410px", height: "200px" }}
        />
      </div>
      <TopTrending />
    </>
  );
}
