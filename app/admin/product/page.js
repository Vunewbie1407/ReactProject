"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Product() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        const res = await fetch('http://localhost:4000/product');
        const data = await res.json();
        setProducts(data);
    };

    const getCategories = async () => {
        const res = await fetch('http://localhost:4000/cate');
        const data = await res.json();
        setCategories(data);
    };
    
    useEffect(() => {
        getCategories();
        getProducts();
    }, []);

    const getCategoryName = (cate_id) => {
        const category = categories.find(category => category.id === cate_id);
        return category ? category.name : "Unknown Category";
    };


    
    const deleteProduct = async (id) =>{
        if (confirm('Bạn có chắc muốn xóa sản phẩm này không?')) {
            const res = await fetch(`http://localhost:4000/product/${id}`, {
              method: 'DELETE',
            });
            const result = await res.json();
            if (result.message) {
              getProducts(); 
            }
          }

    }
    return (
        <>
            <div className="d-flex justify-content-between">
                <h3 className="mb-4">Products</h3>
                <div>
                    <a href="#" className="btn btn-outline-success rounded-0">Manage Categories</a>
                    <Link href="/admin/product/add" className="btn btn-primary rounded-0">Add Product</Link>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3 mb-4">
                    <div className="card border-0 rounded-0 bg-primary-subtle text-primary">
                        <div className="card-body text-end">
                            <div className="display-6 d-flex justify-content-between">
                                <i className="fal fa-box"></i>
                                20
                            </div>
                            PRODUCTS
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card border-0 rounded-0 bg-danger-subtle text-danger">
                        <div className="card-body text-end">
                            <div className="display-6 d-flex justify-content-between">
                                <i className="fal fa-box-open"></i>
                                3
                            </div>
                            RUNNING OUT
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card border-0 rounded-0 bg-success-subtle text-success">
                        <div className="card-body text-end">
                            <div className="display-6 d-flex justify-content-between">
                                <i className="fal fa-boxes"></i>
                                5
                            </div>
                            CATEGORIES
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card border-0 rounded-0 bg-dark-subtle text-dark">
                        <div className="card-body text-end">
                            <div className="display-6 d-flex justify-content-between">
                                <i className="fal fa-archive"></i>
                                0
                            </div>
                            ARCHIVE
                        </div>
                    </div>
                </div>
            </div>

            <div className="card rounded-0 border-0 shadow-sm">
                <div className="card-body">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th className="text-start" colSpan="2">Product</th>
                                <th>Price</th>
                                <th>Instock</th>
                                <th>Rating</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="align-middle">

                            {products.map((products) => (
                                <tr key={products.id}>
                                    <td style={{ width: "64px" }}>
                                        <img src={`http://localhost:4000/img/${products.image}`} className="w-100" />
                                    </td>
                                    <td className="text-start">
                                        <strong>
                                            {products.name}
                                        </strong>
                                        <br />
                                        <small>
                                            Id: <strong>{products.id}</strong> |
                                            Category: <a href="#" className="text-decoration-none fw-bold">{getCategoryName(products.cate_id)}</a>
                                        </small>
                                    </td>
                                    <td>
                                        {products.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                        {/* <br /><del>25,000,000đ</del> */}
                                    </td>
                                    <td>
                                        50
                                    </td>
                                    <td>
                                        4.6<br />
                                        <i className="fas fa-star fa-xs text-warning"></i>
                                        <i className="fas fa-star fa-xs text-warning"></i>
                                        <i className="fas fa-star fa-xs text-warning"></i>
                                        <i className="fas fa-star fa-xs text-warning"></i>
                                        <i className="far fa-star fa-xs text-warning"></i>
                                    </td>
                                    <td>
                                        <a href="#" target="_blank" className="btn btn-primary btn-sm">
                                            <i className="fas fa-eye fa-fw"></i>
                                        </a>
                                        <Link href={`/admin/product/edit/${products.id}`} className="btn btn-outline-warning btn-sm">
                                            <i className="fas fa-pencil fa-fw"></i>
                                        </Link>
                                        <button
                                        className="btn btn-outline-danger btn-sm" onClick={()=>deleteProduct(products.id)}>
                                            <i className="fas fa-times fa-fw"></i> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}