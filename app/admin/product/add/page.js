"use client"
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useFormik } from "formik";
import * as Yup from 'yup';

export default function ProductAdd() {
    const router = useRouter();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await fetch('http://localhost:4000/cate');
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        getCategories();
    }, []);

    const formik = useFormik({
        initialValues: {
            name: "",
            dec: "",
            category: '',
            price: "",
            file: null,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required").min(6, "Name must be at least 6 characters"),
            dec: Yup.string().min(10, "Mô tả sản phẩm phải đủ 10 ký tự trở lên"),
            category: Yup.string().required('Chọn danh mục sản phẩm'),
            price: Yup.number().required('Giá sản phẩm không được để trống'),
            file: Yup.mixed().required('Hình sản phẩm không được để trống').test('fileSize', 'File size is too large', (value) => {
                return value && value.size <= 1024 * 1024 * 10; // 10 MB
            }),
        }),
        onSubmit: async (values) => {
            try {
                const data = new FormData();
                data.append('name', values.name);
                data.append('price', values.price);
                data.append('dec', values.dec);
                data.append('categoryId', values.category);
                data.append('cate_id', values.category);
                data.append('categoryName', categories.find(cat => cat.id === values.category)?.name);
                data.append('image', values.file);

                const res = await fetch('http://localhost:4000/product/add-product', {
                    method: 'POST',
                    body: data,
                });
                const result = await res.json();
                if (result.error) {
                    console.error('Error adding product:', result.error);
                    // Handle error state appropriately
                } else {
                    console.log('Product added successfully:', result);
                    router.push('/admin/product');
                }
            } catch (error) {
                console.error('Error adding product:', error);
                // Handle error state appropriately
            }
        },
    });

    return (
        <>
            <div className="d-flex justify-content-between">
                <h3 className="mb-4">Add Product</h3>
                <div>
                    <a href="#" className="btn btn-outline-secondary rounded-0">
                        <i className="far fa-long-arrow-left"></i> Back
                    </a>
                </div>
            </div>
            <form className="row" action="" method="POST" encType="multipart/form-data" onSubmit={formik.handleSubmit}>
                <div className="col-md-8 mb-4">
                    <div className="card rounded-0 border-0 shadow-sm mb-4">
                        <div className="card-body">
                            <h6 className="pb-3 border-bottom">Basic Info</h6>

                            <div className="mb-3">

                                <label className="form-label">Name *</label>
                                <input
                                    type="text"
                                    className="form-control rounded-0"
                                    id="name"
                                    // required
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <div style={{ color: 'red' }}>{formik.errors.name}</div>
                                ) : null}

                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-control rounded-0"
                                    id="dec"
                                    rows="6"
                                    value={formik.values.dec}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                ></textarea>
                                {formik.touched.dec && formik.errors.dec ? (
                                    <div style={{ color: 'red' }}>{formik.errors.dec}</div>
                                ) : null}
                            </div>
                            <div className="row">
                                <div className="col-mb-3">
                                    <label className="form-label">Category *</label>
                                    <div className="input-group">
                                        <select
                                            className="form-select rounded-0"
                                            id="category"
                                            // required
                                            value={formik.values.category}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        {formik.touched.category && formik.errors.category ? (
                                            <div style={{ color: 'red' }}>{formik.errors.category}</div>
                                        ) : null}
                                        {/* <button type="button" className="btn btn-outline-primary rounded-0">
                                            <i className="fal fa-boxes"></i>
                                        </button> */}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card rounded-0 border-0 shadow-sm">
                        <div className="card-body">
                            <h6 className="pb-3 border-bottom">Price</h6>
                            <div className="row">
                                <div className="col mb-3">
                                    <label className="form-label">Price *</label>
                                    <input
                                        type="number"
                                        className="form-control rounded-0"
                                        id="price"
                                        min="0"
                                        // required
                                        value={formik.values.price}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.price && formik.errors.price ? (
                                        <div style={{ color: 'red' }}>{formik.errors.price}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card rounded-0 border-0 shadow-sm">
                        <div className="card-body">
                            <h6 className="pb-3 border-bottom">Image</h6>
                            <div className="mb-3">
                                <label className="form-label">Product Image *</label>
                                <input
                                    className="form-control rounded-0"
                                    type="file"
                                    id="image"
                                    onChange={(event) => {
                                        formik.setFieldValue("file", event.currentTarget.files[0]);
                                    }}
                                />
                                {formik.touched.file && formik.errors.file ? (
                                    <div style={{ color: 'red' }}>{formik.errors.file}</div>
                                ) : null}
                                <div className="bg-secondary-subtle mb-3 p-2 text-center">
                                    <img src="assets/img/products/iphone.webp" className="w-50" alt="Product" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg rounded-0 mt-4 w-100">
                        Add Product
                    </button>
                </div>
            </form>
        </>
    );
}
