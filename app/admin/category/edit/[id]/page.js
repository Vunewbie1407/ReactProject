// nextjs
"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function CategoryEdit({ params }) {
    const router = useRouter();
    const { id } = params;
    const { register, handleSubmit, setValue } = useForm();
    const [category, setCategory] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`http://localhost:4000/cate/${id}`);
                const data = await res.json();
                setCategory(data);
                setValue('name', data[0].name)
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        if (id) {
            fetchCategories();        }
    }, [id, setValue]);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        try {
            const res = await fetch(`http://localhost:4000/cate/edit/${id}`, {
                method: 'PUT',
                body: formData,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            // console.log(res)
            const result = await res.json();
            if (!result.error) {
                router.push('/admin/category')
                console.log(result);
            } else {
                console.error('Error updating product:', result.error);
            }
        } catch (error) {
            console.error('Error updating product:', error);
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
                                <label className="form-label">Name *</label>
                                <input
                                    type="text"
                                    className="form-control rounded-0"
                                    {...register('name', { required: true })}
                                    defaultValue={category ? category.name : ''}
                                />
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
