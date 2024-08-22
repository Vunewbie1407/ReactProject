import React from 'react';
import ProductCard from "../component/ProductCard.js"

export default async function search(params) {
    console.log(params);
    const res = await fetch(`http://localhost:4000/product/search?keyword=${params.searchParams.keyword}`);
    const productSearch = await res.json();
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-12">
                    <h3>Kết quả tìm kiếm cho từ khóa: {params.searchParams.keyword}</h3>
                    <div className="row">
                        <ProductCard products={productSearch}/>
                    </div>
                </div>
            </div>
        </div>
    )
}