"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function ProductEdit({ params }) {
    const router = useRouter();
    const { id } = params;
    const { register, handleSubmit, setValue } = useForm();
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("http://localhost:4000/cate");
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:4000/product/${id}`);
                const data = await res.json();
                setProduct(data);
                console.log("check data",data);
                setValue('name', data[0].name);
                setValue('dec', data[0].dec);
                setValue('price', data[0].price);
                setValue('category', data[0].cate_id);
            } catch (error) {
                console.error(`Error fetching product with ID ${id}:`, error);
            }
        };

        if (id) {
            fetchCategories();
            fetchProduct();
        }
    }, [id, setValue]);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('dec', data.dec);
        formData.append('price', data.price);
        formData.append('cate_id', data.category);
        if (data.image[0]) {
            formData.append('image', data.image[0]);
        }

        try {
            const res = await fetch(`http://localhost:4000/product/${id}`, {
                method: 'PUT',
                body: formData,
            });
            const result = await res.json();
            if (!result.error) {
                console.log(result);
                router.push('/admin/product')
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
                <h3 className="mb-4">Edit Product</h3>
                <div>
                    <button className="btn btn-outline-secondary rounded-0" onClick={() => router.back()}>
                        <i className="far fa-long-arrow-left"></i> Back
                    </button>
                </div>
            </div>
            <form className="row" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-md-8 mb-4">
                    <div className="card rounded-0 border-0 shadow-sm mb-4">
                        <div className="card-body">
                            <h6 className="pb-3 border-bottom">Basic Info</h6>
                            <div className="mb-3">
                                <label className="form-label">Name *</label>
                                <input
                                    type="text"
                                    className="form-control rounded-0"
                                    {...register('name', { required: true })}
                                    defaultValue={product ? product.name : ''}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-control rounded-0"
                                    {...register('dec')}
                                    rows="6"
                                    defaultValue={product ? product.dec : ''}
                                ></textarea>
                            </div>
                            <div className="row">
                                <div className="col-mb-3">
                                    <label className="form-label">Category *</label>
                                    <select
                                        className="form-select rounded-0"
                                        {...register('category', { required: true })}
                                        value={product ? product.cate_id : ''}
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
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
                                        {...register('price', { required: true, min: 0 })}
                                        defaultValue={product ? product.price : ''}
                                    />
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
                                    type="file"
                                    className="form-control rounded-0"
                                    {...register('image')}
                                />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg rounded-0 mt-4 w-100">
                        Update Product
                    </button>
                </div>
            </form>
        </>
    );
}
