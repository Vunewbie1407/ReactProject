// "use client"
import Link from 'next/link';
import React from 'react';
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import AddCardButton from "../../component/addCartButton"
import AddCartButton from './addCartButton';
// import { addToCart } from "@/redux/slices/cartslice";
function ProductCard({ products }) {
  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'flex',
          background: '#b1b1b165',
          height: '50px',
          alignItems: 'center',
        }}
        onClick={onClick}
      >
        Previous
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'flex',
          background: '#b1b1b165',
          height: '50px',
          alignItems: 'center',
        }}
        onClick={onClick}
      >
        Next
      </div>
    );
  };
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,

  };
  return (
    <div className="row">
      <Slider {...settings}>
        {products.map((product) => {
          const { id, name, image, price } = product;
          return (
            <div className="col-sm-6 col-md-4 col-lg-3 my-3" key={id}>
              <div className="card ml-3">
                <img
                  className="card-img-top"
                  src={`http://localhost:4000/img/${image}`}
                  alt={name}
                />
                <div className="card-body">
                  <div className='text-center'>
                    <h5 className="card-title">{name}</h5>
                  </div>
                  <div className='text-center'>
                    <p className="card-text text-danger"><b>Giá: {price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</b></p>
                  </div>

                  <div className="text-center">
                    <Link href={`/productDetail/${id}`} className="btn btn-success text-white mt-2" >Xem chi tiết</Link>
                  </div>
                  <AddCartButton className="btn btn-success text-white mt-2" product={product} quantity={1} size={"S"}>
                    Thêm vào giỏ hàng
                  </AddCartButton>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>

    </div>
  );
}

export default ProductCard;
