import { useState } from "react";
import { useFormik } from "formik"; // Correct import
import * as Yup from 'yup';

export default function FormExample() {
    const [inputValue, setInputValue] = useState('');
    const [isFocus, setFocus] = useState(false);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            category: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().min(4,"Nhap du so luong chu"),
            email: Yup.string()
                .required('Email is required')
                .matches(
                    /^[\w-\.]+@([\w-]+\.)+[\w]{2,4}$/,
                    "Please enter a valid email address"
                ),
                category: Yup.string().required('Category is required'),
        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        }
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    style={{ backgroundColor: isFocus ? 'lightgreen' : 'white' }}
                />
                {isFocus && <strong>Enter email</strong>}
                <h1>{inputValue}</h1>
                <div>
                    <input 
                        type="text"
                        id="email"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        placeholder="name"
                    ></input>
                                        {formik.touched.name && formik.errors.name ? (
                        <div style={{ color: 'red' }}>{formik.errors.name}</div>
                    ) : null}
                </div>
                <div>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        placeholder="email"
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div style={{ color: 'red' }}>{formik.errors.email}</div>
                    ) : null}
                </div>
                <div>
                <select
                id="category"
                name="category"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.category}
            >
                <option value="">Select a category</option>
                <option value="1">Category 1</option>
                <option value="2">Category 2</option>
                <option value="3">Category 3</option>
            </select>
            {formik.touched.category && formik.errors.category ? (
                <div>{formik.errors.category}</div>
            ) : null}
                </div>

                <button type="submit">Submit</button>
            </form>
        </>
    );
}
