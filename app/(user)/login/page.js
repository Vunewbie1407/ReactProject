"use client"
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import jwt_decode from 'jsonwebtoken';

export default function Login() {
    const [error, setError] = useState('');
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Email không hợp lệ').required('Bắt buộc'),
            password: Yup.string().required('Bắt buộc'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const res = await fetch('http://localhost:4000/users/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || 'Đăng nhập thất bại');
                }

                const data = await res.json();
                console.log(data)
                document.cookie = `token=${data.token}; path=/; max-age=${60 * 60}`;
                const token = data.token;
                const payload = JSON.parse(atob(token.split('.')[1]));
                localStorage.setItem('userId', payload.id);
                localStorage.setItem('userFullName', payload.fullname);
                localStorage.setItem('userEmail', payload.email);
                console.log(payload)
                if (payload.role === 1) {
                    router.push('/admin')
                } else {
                  router.push('/')
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setSubmitting(false);
            }
        },
    }); 

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card border-0 shadow rounded-3 my-5">
                        <div className="card-body p-4 p-sm-5">
                            <h5 className="card-title text-center mb-5 fw-light fs-5">Đăng nhập</h5>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="form-floating mb-3">
                                    <input
                                        type="email"
                                        className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        {...formik.getFieldProps('email')}
                                    />
                                    <label htmlFor="floatingInput">Email</label>
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="invalid-feedback">{formik.errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="password"
                                        className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                        id="floatingPassword"
                                        placeholder="Password"
                                        {...formik.getFieldProps('password')}
                                    />
                                    <label htmlFor="floatingPassword">Mật khẩu</label>
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className="invalid-feedback">{formik.errors.password}</div>
                                    ) : null}
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <div className="form-check mb-3">
                                    <label className="form-check-label" htmlFor="rememberPasswordCheck">
                                        Bạn chưa có tài khoản? <Link href={'/register'}>Đăng ký</Link>
                                    </label>
                                </div>
                                <div className="d-grid">
                                    <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit" disabled={formik.isSubmitting}>
                                        Đăng nhập
                                    </button>
                                </div>
                                <hr className="my-4" />
                                <div className="d-grid mb-2">
                                    <button className="btn btn-google btn-login text-uppercase fw-bold" type="button">
                                        <i className="fab fa-google me-2" /> Đăng nhập bằng Google
                                    </button>
                                </div>
                                <div className="d-grid">
                                    <button className="btn btn-facebook btn-login text-uppercase fw-bold" type="button">
                                        <i className="fab fa-facebook-f me-2" /> Đăng nhập bằng Facebook
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
