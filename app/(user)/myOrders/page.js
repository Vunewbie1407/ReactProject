"use client"
import React, { useState, useEffect } from 'react';

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const userEmail = localStorage.getItem('userEmail');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch(`http://localhost:4000/orders/getOrders/?email=${userEmail}`);
            const data = await response.json();
            setOrders(data); // Lưu danh sách đơn hàng vào state
            // Sau khi lấy danh sách đơn hàng, gọi hàm để lấy chi tiết sản phẩm từ orderDetail
            fetchOrderDetails(data);
        } catch (error) {
            console.error('Lỗi lấy danh sách đơn hàng:', error);
        }
    };

    const fetchOrderDetails = async (orders) => {
        try {
            // Lặp qua từng đơn hàng và gọi API để lấy chi tiết sản phẩm từ orderDetail
            const promises = orders.map(async (order) => {
                const response = await fetch(`http://localhost:4000/orders/getOrderDetails/?orderId=${order._id}`);
                const data = await response.json();
                return { orderId: order._id, orderDetails: data };
            });

            // Đợi tất cả các promise hoàn thành
            const orderDetailsData = await Promise.all(promises);
            setOrderDetails(orderDetailsData);
        } catch (error) {
            console.error('Lỗi lấy chi tiết sản phẩm từ đơn hàng:', error);
        }
    };

    return (
        <>
            <div className="container">
                <h3>Lịch sử mua hàng</h3>
                {orderDetails.map((orderDetail, index) => (
                    <div key={index}>
                        <h4>Đơn hàng: {orderDetail.orderId}</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Ảnh sản phẩm</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Tổng thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetail.orderDetails.map((item) => (
                                    <tr key={item._id}>
                                        <td style={{ width: '250px' }}>
                                            <img className="d-block w-100" src={`http://localhost:4000/img/${item.image}`} alt="" />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </>
    );
}
