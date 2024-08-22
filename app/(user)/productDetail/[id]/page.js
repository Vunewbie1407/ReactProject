"use client"
import { useMemo, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import useSWR from 'swr';
import AddCardButton from "../../component/addCartButton"
const fetcher = (...args) => fetch(...args)
  .then(res => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  })
  .then(data => Array.isArray(data) ? data[0] : data);

// const [cart,setCart] = useState([]);
export default function ProductDetail({ params }) {

    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("S")

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    console.log(cart);

    const { data: product, error, isLoading } = useSWR(
        `http://localhost:4000/product/${params.id}`,
        fetcher,
        {
            refreshInterval: 6000,
        }
    );
    if (error) return <div>Lỗi load dữ liệu.</div>;
    if (isLoading) return <div>Đang tải</div>;
    console.log("check detail: ", product)

    // const handleAddToCart = (product, quantity) => {
    //     dispatch(addToCart({ item: product, quantity: quantity }));
    //     console.log("Thêm thành công!");
    // };

    return (
        <>
            <main className="container mt-3">
                <div className="row">
                    <div className="col-md-5">
                        <img className="d-block w-100" src={`http://localhost:4000/img/${product.image}`} alt="" />
                    </div>
                    <div className="col-md-7">
                        <h2>{product.name}</h2>
                        <div className="d-flex justify-content-between">
                            <span className="text-left">Mã sản phẩm : <strong>ABC</strong></span>
                            <span className="text-right">Tình Trạng : <strong>ABC</strong></span>
                        </div>
                        <div className="text-danger fs-2">{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                        <hr />
                        <div style={{ margin: '30px 0px' }}>
                            {product.dec}
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-md-6">
                                <h5>Size</h5>
                                <select className="form-select mb-3"  onChange={(e) => setSize(e.target.value)}>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                </select>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-6">
                                <h5>Số lượng</h5>
                                <input className="form-control w-25" min="1" type="number" defaultValue={1} onChange={(e) => setQuantity(e.target.value)} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-md-6">
                                {/* <button style={{ width: '100%' }} className="btn btn-primary my-2" onClick={() => dispatch(addToCart({product,quantity,size}))}>
                                    Thêm vào giỏ hàng
                                </button> */}
                                <AddCardButton className="btn-lg mb-3" product={product} quantity={quantity} size={size}>
                                    Thêm vào giỏ hàng
                                </AddCardButton>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-6">
                                <a style={{ width: '100%' }} href="" className="btn btn-outline-danger mt-2 mb-2">Thanh toán</a>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <h3 className="text-center">Những sản phẩm liên quan</h3>
                <div className="row">
                    {/* Các sản phẩm liên quan */}
                </div>
            </main>
        </>
    );
}
