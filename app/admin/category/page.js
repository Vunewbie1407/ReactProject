"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Categories() {
    const [data, setData] = useState([]);

    const fetchCategories = async () => {

        try {
            const res = await fetch('http://localhost:4000/cate', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!res.ok) {
                console.error('Lỗi khi lấy danh sách danh mục:', res.status);
                return;
            }
            const newData = await res.json();
            setData(newData);
        } catch (error) {
            console.error('Lỗi khi fetch danh sách danh mục:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const deleteCategory = async (id) => {
        if (confirm('Bạn có chắc muốn xóa danh mục này không?')) {
            try {
                const res = await fetch(`http://localhost:4000/cate/${id}`, {
                    method: 'DELETE',
                });
                if (!res.ok) {
                    console.error('Lỗi khi xóa danh mục:', res.status);
                    return;
                }
                const result = await res.json();
                if (result.message) {
                    fetchCategories(); 
                }
            } catch (error) {
                console.error('Lỗi khi xóa danh mục:', error);
            }
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between">
                <h3 className="mb-4">Categories</h3>
                <div>
                    <a href="#" className="btn btn-outline-success rounded-0">Manage Categories</a>
                    <Link href="/admin/category/add" className="btn btn-primary rounded-0">Add Category</Link>
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
                            CATEGORIES
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
                                <th className="text-start" colSpan="1">Category</th>
                                {/* <th>Instock</th> */}
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="align-middle">

                            {data.map((category) => (
                                <tr key={category.id}>
                                    <td className="text-start">
                                        <strong>
                                            {category.name}
                                        </strong>
                                    </td>
                                    {/* <td>
                                        4.6<br />
                                        <i className="fas fa-star fa-xs text-warning"></i>
                                        <i className="fas fa-star fa-xs text-warning"></i>
                                        <i className="fas fa-star fa-xs text-warning"></i>
                                        <i className="fas fa-star fa-xs text-warning"></i>
                                        <i className="far fa-star fa-xs text-warning"></i>
                                    </td> */}
                                    <td>
                                        <a href="#" target="_blank" className="btn btn-primary btn-sm">
                                            <i className="fas fa-eye fa-fw"></i>
                                        </a>
                                        <Link href={`/admin/category/edit/${category.id}`} className="btn btn-outline-warning btn-sm">
                                            <i className="fas fa-pencil fa-fw"></i>
                                        </Link>
                                        <button
                                        className="btn btn-outline-danger btn-sm" onClick={()=>deleteCategory(category.id)}>
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