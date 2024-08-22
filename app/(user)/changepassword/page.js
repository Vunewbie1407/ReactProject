"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [hasToken, setHasToken] = useState(false);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if token is present in cookies
    const token = document.cookie.split(';').find(c => c.trim().startsWith('token='));
    if (token) {
      setHasToken(true);

      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
      }
    } else {
      alert ('Bạn cần đăng nhập để thay đổi mật khẩu.');
      setTimeout(() => router.push('/login'), 1000); // Redirect to login after 2 seconds
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Bạn phải nhập đầy đủ các ô yêu cầu.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu mới và mật khẩu xác nhận không khớp.');
      return;
    }

    try {
      const token = document.cookie.split(';').find(c => c.trim().startsWith('token='));
      const tokenValue = token?.split('=')[1];

      const response = await fetch(`http://localhost:4000/users/api/change-password/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenValue}`, // Include token in header
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Mật khẩu đã được thay đổi thành công.');
        setTimeout(() => router.push('/'), 2000);
      } else {
        setError(data.error || 'Đã xảy ra lỗi khi thay đổi mật khẩu.');
      }
    } catch (error) {
      setError('Đã xảy ra lỗi khi thay đổi mật khẩu.');
      console.error('Error during password change:', error);
    }
  };

  if (!hasToken) {
    return null; 
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">Thay đổi mật khẩu</h5>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingCurrentPassword"
                    placeholder="Mật khẩu hiện tại"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  <label htmlFor="floatingCurrentPassword">Mật khẩu hiện tại</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingNewPassword"
                    placeholder="Mật khẩu mới"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                  <label htmlFor="floatingNewPassword">Mật khẩu mới</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingConfirmPassword"
                    placeholder="Xác nhận mật khẩu mới"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                  <label htmlFor="floatingConfirmPassword">Xác nhận mật khẩu mới</label>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <div className="d-grid">
                  <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">
                    Thay đổi mật khẩu
                  </button>
                </div>
                <hr className="my-4" />
                <div className="form-check mb-3">
                  <label className="form-check-label" htmlFor="backToProfile">
                    Quay về trang <Link href={"/profile"}>Thông tin cá nhân</Link>
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
