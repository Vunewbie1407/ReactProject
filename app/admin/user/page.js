"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Categories() {
    const [data, setData] = useState([]);

    const fetchUsers = async () => {

        try {
            const res = await fetch('http://localhost:4000/users', {
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
        fetchUsers();
    }, []);

    const deleteUsers = async (_id) => {
        if (confirm('Bạn có chắc muốn xóa khách hàng này không?')) {
            try {
                const res = await fetch(`http://localhost:4000/users/${_id}`, {
                    method: 'DELETE',
                });
                if (!res.ok) {
                    console.error('Lỗi khi xóa', res.status);
                    return;
                }
                const result = await res.json();
                if (result.message) {
                    fetchUsers(); 
                }
            } catch (error) {
                console.error('Lỗi khi xóa:', error);
            }
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between">
                <h3 className="mb-4">Khách Hàng</h3>
                {/* <div>
                    <a href="#" className="btn btn-outline-success rounded-0">Manage Categories</a>
                    <Link href="/admin/category/add" className="btn btn-primary rounded-0">Add Category</Link>
                </div> */}
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
                                <th className="text-start">Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="align-middle">

                            {data.map((item) => (
                                <tr key={item._id}>
                                    <td className="text-start">
                                        <strong>
                                            {item.name}
                                        </strong>
                                    </td>
                                    <td>{item.email}</td>
                                    <td>
                                        <a href="#" target="_blank" className="btn btn-primary btn-sm">
                                            <i className="fas fa-eye fa-fw"></i>
                                        </a>
                                        <Link href={`/admin/user/edit/${item._id}`} className="btn btn-outline-warning btn-sm">
                                            <i className="fas fa-pencil fa-fw"></i>
                                        </Link>
                                        <button
                                        className="btn btn-outline-danger btn-sm" onClick={()=>deleteUsers(item._id)}>
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