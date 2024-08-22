'use client';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';


export default function Info() {
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [fullname, setFullname] = useState('');
    const [sex, setSex] = useState('');
    const [phone, setPhone] = useState('');
    const [tokenValue, setTokenValue] = useState('');
    const [userId, setUserId] = useState('');
    // Lấy token từ cookie ở browser khi component mount
    useEffect(() => {
        const token = document.cookie.split(';').find((c) => c.trim().startsWith('token='));
        const tokenValue = token?.split('=')[1];
        
        if (!tokenValue) {
            window.location.href = '/login';
        } else {
            const storedUserId = localStorage.getItem('userId');
            if (storedUserId) {
              setUserId(storedUserId);
            }
            setTokenValue(tokenValue);
            getUser(tokenValue);
        }
    }, []);

    // Hàm gọi API để lấy thông tin người dùng
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
            setSex(data.sex);
            setPhone(data.phone);
        } catch (error) {
            console.error('Lỗi:', error);
            // Xử lý lỗi nếu cần thiết
        }
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:4000/users/api/update/${userId}`, {
                method: 'PUT', // hoặc PATCH tùy vào API của bạn
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${tokenValue}`,
                },
                body: JSON.stringify({
                    email,
                    address,
                    fullname,
                    sex,
                    phone,
                }),
            });
            if (!res.ok) {
                throw new Error('Lỗi cập nhật thông tin người dùng');
            }
            alert('Cập nhật thông tin thành công!');
            // Có thể thực hiện redirect hoặc các xử lý khác sau khi cập nhật thành công
        } catch (error) {
            console.error('Lỗi:', error);
            alert('Đã xảy ra lỗi khi cập nhật thông tin');
            // Xử lý lỗi nếu cần thiết
        }
    };


    return (
        <div className='container'>
            <h2>Thông tin cá nhân</h2>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-4'>
                        <h1>IMG USER</h1>
                    </div>
                    <div className='col-sm-8'>
                        <form onSubmit={handleUpdate}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    aria-describedby="emailHelp"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled
                                />
                            </div>
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
                                <label className="form-label">Địa chỉ</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <label className="form-label">Giới tính</label>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    value={sex}
                                    onChange={(e) => setSex(e.target.value)}
                                >
                                    <option value="">Chọn giới tính</option>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                </select>
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

                            <button type="submit" className="btn btn-primary">
                                Cập nhật thông tin
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

