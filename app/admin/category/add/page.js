"use client"

import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';

export default function CategoryAdd() {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name Category is required'),
        }),
        onSubmit: async (values) => {
            try {
                const res = await fetch('http://localhost:4000/cate/add-cate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
                const result = await res.json();
                if (result.status === 200) {
                    console.log('Category added successfully:', result.message);
                    router.push('/admin/category'); // Redirect to category list page on success
                } else {
                    console.error('Error adding category:', result.message);
                }
            } catch (error) {
                console.error('Error adding category:', error);
            }
        },
    });

    return (
        <>
            <form className="row" onSubmit={formik.handleSubmit}>
                <div className="col-md-12 mb-4">
                    <div className="card rounded-0 border-0 shadow-sm mb-4">
                        <div className="card-body">
                            <h6 className="pb-3 border-bottom">Basic Info</h6>
                            <div className="mb-3">
                                <label className="form-label">Name *</label>
                                <input
                                    type="text"
                                    className="form-control rounded-0"
                                    id="name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <div style={{ color: 'red' }}>{formik.errors.name}</div>
                                ) : null}
                            </div>
                            <button type="submit" className="btn btn-primary my-3">
                                Thêm danh mục
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
