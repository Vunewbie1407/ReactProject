"use client"
import { useRouter } from "next/navigation";  // Correct import statement
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function EditUser({ params }) {
    const router = useRouter();
    const { id } = params;
    const { register, handleSubmit, setValue } = useForm();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`http://localhost:4000/users/${id}`);
                const data = await res.json();
                setUserData(data[0]);  // Set userData correctly
                setValue('fullname', data[0].fullname);
                setValue('email', data[0].email);
                setValue('role', data[0].role);  // Convert role to string
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        if (id) {
            fetchUser();
        }
    }, [id, setValue]);

    const onSubmit = async (data) => {
        try {
            const res = await fetch(`http://localhost:4000/users/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (res.ok) {
                alert(result.message); 
                router.push('/admin/user'); 
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Error updating user:", error);
            alert("An error occurred, please try again"); 
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between">
                <h3 className="mb-4">Edit Category</h3>
                <div>
                    <button className="btn btn-outline-secondary rounded-0" onClick={() => router.back()}>
                        <i className="far fa-long-arrow-left"></i> Back
                    </button>
                </div>
            </div>
            <form className="row" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-md-12 mb-4">
                    <div className="card rounded-0 border-0 shadow-sm mb-4">
                        <div className="card-body">
                            <h6 className="pb-3 border-bottom">Basic Info</h6>
                            <div className="mb-3">
                                <label className="form-label">Họ và tên</label>
                                <input
                                    type="text"
                                    className="form-control rounded-0"
                                    {...register('fullname', { required: true })}
                                    defaultValue={userData ? userData.fullname : ''}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="text"
                                    className="form-control rounded-0"
                                    {...register('email', { required: true })}
                                    defaultValue={userData ? userData.email : ''}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Role</label>
                                <select
                                    className="form-control rounded-0"
                                    {...register('role', { required: true })}
                                    defaultValue={userData ? userData.role : ''}
                                >
                                    <option value="0">User</option>
                                    <option value="1">Admin</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary my-3">
                                Update Category
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
