// "use client"
import Link from 'next/link';
import React from 'react';
function ProductCard({ products }) {
  return (
    <div className="row">
      {products.map((product) => {
        const { id, name, image, price } = product; 
        return (
          <div className="col-sm-6 col-md-4 col-lg-3 my-3" key={id}>
            <div className="card">
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
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductCard;
