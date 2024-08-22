"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Register() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      fullname: '',
      name: '',
      email: '',
      password: '',
      rePassword: '',
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required('Fullname is required'),
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Email không hợp lệ').required('Email is required'),
      password: Yup.string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ và số')
        .required('Mật khẩu là bắt buộc'),
      rePassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
        .required('Vui lòng nhập lại mật khẩu')
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const res = await fetch('http://localhost:4000/users/api/register', { // URL API tương đối
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fullname: values.fullname, name: values.name, email: values.email, password: values.password }),
        });
        
        if (!res.ok) {
          const errorData = await res.json();
          if (res.status === 400 && errorData.message === "Email đã tồn tại") {
            setFieldError('email', 'Email đã tồn tại');
          } else {
            throw new Error(errorData.message || 'Đăng ký thất bại');
          }
        } else {
          // Redirect to login page or show success message
          router.push('/login'); // Assuming you want to redirect to login after successful registration
        }
      } catch (error) {
        setFieldError('general', error.message);
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">Đăng ký</h5>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nguyễn Văn A"
                    autoComplete="fullname"
                    {...formik.getFieldProps('fullname')}
                  />
                  <label htmlFor="floatingInput">Họ và tên</label>
                  {formik.touched.fullname && formik.errors.fullname ? (
                    <div className='text-danger'>{formik.errors.fullname}</div>
                  ) : null}
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tên đăng nhập"
                    autoComplete="name"
                    {...formik.getFieldProps('name')}
                  />
                  <label htmlFor="floatingInput">Tên đăng nhập</label>
                  {formik.touched.name && formik.errors.name ? (
                    <div className='text-danger'>{formik.errors.name}</div>
                  ) : null}
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="name@example.com"
                    autoComplete="email"
                    {...formik.getFieldProps('email')}
                  />
                  <label htmlFor="floatingInput">Email</label>
                  {formik.touched.email && formik.errors.email ? (
                    <div className='text-danger'>{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Mật khẩu"
                    autoComplete="current-password"
                    {...formik.getFieldProps('password')}
                  />
                  <label htmlFor="floatingPassword">Mật khẩu</label>
                  {formik.touched.password && formik.errors.password ? (
                    <div className='text-danger'>{formik.errors.password}</div>
                  ) : null}
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Nhập lại mật khẩu"
                    autoComplete="current-password"
                    {...formik.getFieldProps('rePassword')}
                  />
                  <label htmlFor="floatingPassword">Nhập lại mật khẩu</label>
                  {formik.touched.rePassword && formik.errors.rePassword ? (
                    <div className='text-danger'>{formik.errors.rePassword}</div>
                  ) : null}
                </div>
                <div className="form-check mb-3">
                  <label className="form-check-label" htmlFor="rememberPasswordCheck">
                    Bạn đã có tài khoản? <Link href={"/login"}>Đăng nhập</Link>
                  </label>
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">
                    Đăng ký
                  </button>
                  {formik.errors.general && (
                    <p className="my-3 text-danger">{formik.errors.general}</p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
