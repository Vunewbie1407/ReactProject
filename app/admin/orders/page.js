"use client"
import React, { useState, useEffect } from 'react';

export default function Categories() {
    const [data, setData] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null); // State để lưu ID của đơn hàng được chọn
    const [selectedOrder, setSelectedOrder] = useState(null); // State để lưu chi tiết đơn hàng được chọn

    const fetchOrders = async () => {
        try {
            const res = await fetch('http://localhost:4000/orders', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!res.ok) {
                console.error('Lỗi khi lấy danh sách đơn hàng:', res.status);
                return;
            }
            const newData = await res.json();
            setData(newData);
        } catch (error) {
            console.error('Lỗi khi fetch danh sách đơn hàng:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrderDetails = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:4000/orders/${orderId}/details`);
            if (!response.ok) {
                throw new Error('Lỗi khi lấy chi tiết đơn hàng');
            }
            const data = await response.json();
            setSelectedOrder(data);
        } catch (error) {
            console.error('Lỗi khi fetch chi tiết đơn hàng:', error);
        }
    };

    const handleDetailClick = async (orderId) => {
        // Nếu đã có chi tiết đơn hàng hiển thị và đang là đơn hàng này, đóng lại bằng cách đặt lại selectedOrderId và selectedOrder
        if (selectedOrderId === orderId) {
            setSelectedOrderId(null);
            setSelectedOrder(null);
        } else {
            // Nếu chưa có hoặc là một đơn hàng khác, lấy chi tiết đơn hàng từ API
            setSelectedOrderId(orderId);
            await fetchOrderDetails(orderId);
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between">
                <h3 className="mb-4">Khách Hàng</h3>
            </div>
            <div className="row">
                {/* Các thẻ card không thay đổi */}
            </div>

            <div className="card rounded-0 border-0 shadow-sm">
                <div className="card-body">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th className="text-start">Mã hóa đơn</th>
                                <th>Email người mua</th>
                                <th>Trạng thái</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="align-middle">
                            {data.map((item) => (
                                <tr key={item._id}>
                                    <td className="text-start">{item._id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleDetailClick(item._id)}
                                        >
                                            <i className="fas fa-eye fa-fw"></i> Chi tiết đơn hàng
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedOrder && (
                <div className="card rounded-0 border-0 shadow-sm mt-4">
                    <div className="card-body">
                        <h5 className="card-title">Chi tiết đơn hàng #{selectedOrder._id}</h5>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Ảnh sản phẩm</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Tổng thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedOrder.map((item) => (
                                    <tr key={item._id}>
                                        <td style={{ width: '250px' }}>
                                            <img className="d-block w-100" src={`http://localhost:4000/img/${item.image}`} alt="" />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}
