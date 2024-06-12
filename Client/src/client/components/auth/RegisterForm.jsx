import React, { useState } from 'react';
import { useDispatch , useSelector  } from 'react-redux';
import { registerUser } from '../../slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import './AuthForm.css';
import Loader from '../../layouts/Loader';
import Canvas from '../../layouts/Canvas';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    image: null,
    age: ''
  });
  const [errors, setErrors] = useState({});
  const { status} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setErrors({ ...errors, [name]: '' });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({ ...formData, image: imageFile });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    const validationErrors = {};
    if (!formData.name.trim().match(/^[A-Za-z]+$/)) {
      validationErrors.name = 'Name must contain only letters.';
    }
    if (!formData.email.trim().match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      validationErrors.email = 'Please enter a valid email address.';
    }
    if (formData.password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters.';
    }
    if (!formData.age.trim().match(/^\d+$/)) {
      validationErrors.age = 'Age must contain only numbers.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      dispatch(registerUser(formData)).then(() => {
        navigate('/login');
      }).catch(error => {
        console.error('Registration failed:', error);
      });
    }
  };

  if (status === 'loading') {
    return <Loader />;
  }

  return (

   <main className='container-fluid login'>

     <section className='row'>

       <aside className='col-5'>
        <Canvas></Canvas>
       </aside>

       <form className='col-4 offset-3' onSubmit={handleSubmit}>
         <h1 className='text-center text-light'> Register </h1>
         <div className="form-floating mb-3">
          <input
            type="text"
            id="name"
            name="name"
            className={`form-control ${errors.name && 'is-invalid'}`}
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="name">Name</label>
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            id="email"
            name="email"
            className={`form-control ${errors.email && 'is-invalid'}`}
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            id="password"
            name="password"
            className={`form-control ${errors.password && 'is-invalid'}`}
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            className="form-control"
            onChange={handleImageChange}
          />
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            id="age"
            name="age"
            className={`form-control ${errors.age && 'is-invalid'}`}
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <label htmlFor="age">Age</label>
          {errors.age && <div className="invalid-feedback">{errors.age}</div>}
        </div>
        <button type="submit" className="btn btn-primary d-block w-100 mt-3">Register</button>
        <div className='text-center my-3'>
                  <Link className="text-decoration-none" to={`/login`}>Log in</Link> 
        </div>
      </form>

    </section>
      
  </main>


  );
}
