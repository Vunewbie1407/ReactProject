// page_cart.js
'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, removeCart, updateItem } from '@/redux/slices/cartSlice';
import Link from 'next/link';

export default function PageCart() {

    let cart = useSelector((state) => state.cart)
    const dispatch = useDispatch();

    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)


    return (
        <>
            <h3>Giỏ hàng của bạn</h3>
            <div className="row">
                <div className="col-sm-9">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Hình Ảnh</th>
                                <th>Tên sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Giá</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((product) => (
                                <tr key={product.id}>
                                    <td style={{ width: '250px' }}>
                                        <img className="d-block w-100" src={`http://localhost:4000/img/${product.image}`} alt="" />
                                    </td>
                                    <td>
                                        {product.name}
                                        - Size: {product.size}
                                    </td>
                                    <td>
                                        <input
                                            className='form-control'
                                            min="1"
                                            type="number"
                                            value={product.quantity}
                                            onChange={(e) => dispatch(
                                                updateItem({
                                                    product, quantity: e.target.value, size: product.size
                                                }))}
                                        />
                                    </td>
                                    <td className='text-end'>{(product.price * product.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-danger" onClick={(e) => dispatch(removeItem({ product, size: product.size }))}>
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={5} className='text-end' onClick={(e) => dispatch(removeCart())}>
                                    <button className='btn btn-sm btn-outline-danger'>Xóa hết</button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="col-sm-3 bordercard">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Tổng thành tiền</h5>
                            <div className="d-flex justify-content-between">
                                <p>Tổng thành tiền :</p>
                                <span>{total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p>Tổng tiền ship :</p>
                                <span>2000</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p>Voucher :</p>
                                <span>2000</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <p>Tổng thành tiền :</p>
                                <span>{total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                            </div>
                            
                            <Link href={'/checkout'} className="btn btn-primary" >
                                Thanh Toán
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
