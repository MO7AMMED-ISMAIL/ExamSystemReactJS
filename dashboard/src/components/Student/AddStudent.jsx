import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addStudent } from '../../redux/studentSlice'; // Adjust the import path according to your project structure
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState('/user.png');
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            age: '',
            password: '',
            image: null,
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Name is required')
                .min(3, 'Name must be at least 3 characters'),
            email: Yup.string()
                .required('Email is required')
                .email('Invalid email address'),
            age: Yup.number()
                .required('Age is required')
                .min(1, 'Age must be at least 1')
                .max(100, 'Age must be less than 100'),
            password: Yup.string()
                .required('Password is required')
                .min(6, 'Password must be at least 6 characters'),
            image: Yup.mixed().required('Image is required'),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('age', values.age);
            formData.append('password', values.password);
            formData.append('image', values.image);

            dispatch(addStudent(formData))
                .unwrap()
                .then(() => {
                    setLoading(false);
                    navigate('/students');
                })
                .catch((error) => {
                    console.error('Error adding student:', error);
                    setLoading(false);
                });
        },
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            formik.setFieldValue('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='card w-full max-w-md mx-auto mt-3' style={{ width: '30rem' }}>
            <div className='card-title text-center mt-3'>
                <h2>Add Student</h2>
            </div>
            <div className='card-body'>
                <form onSubmit={formik.handleSubmit}>
                    <div className='mb-3 text-center'>
                        <img src={imagePreview} alt="Profile" className='rounded-circle' style={{ width: '150px', height: '150px' }} />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="image" className='form-label'>Change Profile Picture</label>
                        <input type="file" className='form-control' id="image" accept="image/*" onChange={handleImageChange} />
                        {formik.touched.image && formik.errors.image ? (
                            <div className="text-danger">{formik.errors.image}</div>
                        ) : null}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="name" className='form-label'>Name</label>
                        <input type="text" className='form-control' id="name" {...formik.getFieldProps('name')} />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="text-danger">{formik.errors.name}</div>
                        ) : null}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="email" className='form-label'>Email</label>
                        <input type="text" className='form-control' id="email" {...formik.getFieldProps('email')} />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-danger">{formik.errors.email}</div>
                        ) : null}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="age" className='form-label'>Age</label>
                        <input type="number" className='form-control' id="age" {...formik.getFieldProps('age')} />
                        {formik.touched.age && formik.errors.age ? (
                            <div className="text-danger">{formik.errors.age}</div>
                        ) : null}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="password" className='form-label'>Password</label>
                        <input type="text" className='form-control' id="password" {...formik.getFieldProps('password')} />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-danger">{formik.errors.password}</div>
                        ) : null}
                    </div>

                    <button type="submit" className='btn btn-primary w-100' disabled={loading}>
                        Add Student
                    </button>
                    {loading ? <div className="spinner-border text-primary m-2 text-center" role="status"></div> : ''}
                </form>
            </div>
        </div>
    );
};

export default AddStudent;
