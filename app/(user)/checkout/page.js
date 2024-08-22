// CheckOut.js
"use client"
import { removeCart } from '@/redux/slices/cartSlice';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function CheckOut() {
    const [tokenValue, setTokenValue] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [shippingMethod, setShippingMethod] = useState('normal');
    const [totalAmount, setTotalAmount] = useState(0);
    const cart = useSelector((state) => state.cart);
    const shippingFee = shippingMethod === 'express' ? 50000 : 20000;
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        const token = document.cookie.split(';').find((c) => c.trim().startsWith('token='));
        const tokenValue = token?.split('=')[1];

        if (!tokenValue) {
            alert("Bạn phải đăng nhập để có thể thanh toán sản phẩm đã mua")
            window.location.href = '/login';
        } else {
            setTokenValue(tokenValue);
            getUser(tokenValue);
        }
    }, []);

    useEffect(() => {
        const calculatedTotalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0) + shippingFee;
        setTotalAmount(calculatedTotalAmount);
    }, [cart, shippingMethod]);

    const getUser = async (tokenValue) => {
        try {
            const res = await fetch('http://localhost:4000/users/detailuser', {
                headers: {
                    Authorization: `Bearer ${tokenValue}`,
                },
            });

            if (!res.ok) {
                throw new Error('Lỗi lấy thông tin người dùng');
            }

            const data = await res.json();
            setEmail(data.email);
            setAddress(data.address);
            setFullname(data.fullname);
            setPhone(data.phone);
        } catch (error) {
            console.error('Lỗi:', error);
        }
    };

    const handleShippingMethodChange = (method) => {
        setShippingMethod(method);
    };

    const handleSubmit = async () => {
        const orderData = {
            userName: fullname,
            email: email,
            address: address,
            phone: phone,
            shippingMethod: shippingMethod,
            orderDetails: cart.map((item) => ({
                productId: item.id,
                productName: item.name,
                price: item.price,
                quantity: item.quantity,
                productImage: item.image,
            })),
            totalAmount: totalAmount,
        };

        try {
            const response = await fetch('http://localhost:4000/orders/postOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${tokenValue}`,
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error('Error placing order');
            }
            const data = await response.json();
            console.log('Order submitted successfully:', data);
            alert("Chúc mừng bạn đã thanh toán thành công");
            dispatch(removeCart());
            router.push('/')
        } catch (error) {
            console.error('Error placing order:', error);

        }
    };

    return (
        <div className="container">
            <div className="row">
                <h3>Thông tin địa chỉ giao hàng</h3>
                <div className="col-sm-8">
                    <div className="mb-3">
                        <label className="form-label">Họ và tên</label>
                        <input
                            type="text"
                            className="form-control"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Địa chỉ giao hàng</label>
                        <input
                            type="text"
                            className="form-control"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Số điện thoại</label>
                        <input
                            type="text"
                            className="form-control"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-sm-4 bordercard">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Tổng thành tiền</h5>
                            <div className="d-flex justify-content-between">
                                <p>Tổng thành tiền :</p>
                                <span>{totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p>Phí vận chuyển :</p>
                                <span>{shippingFee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <p>Tổng thanh toán :</p>
                                <span>{totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Chọn phương thức vận chuyển</label>
                                <select className="form-select" value={shippingMethod} onChange={(e) => handleShippingMethodChange(e.target.value)}>
                                    <option value="normal">Bình thường (+20,000 VNĐ)</option>
                                    <option value="express">Hỏa tốc (+50,000 VNĐ)</option>
                                </select>
                            </div>

                            <button type='button' className="btn btn-success" onClick={handleSubmit}>Thanh toán</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
