import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.auth);
    const [AuthError , setAuthError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password })).then((result) => {
            console.log(result);
            if(result.payload.success === true && result.payload.role === 'admin'){
                localStorage.setItem('token',result.payload.token);
                localStorage.setItem('role', result.payload.role);
                localStorage.setItem('expirationTime',result.payload.expirationTime);
                localStorage.setItem('id',result.payload.id);
                localStorage.setItem('name',result.payload.name);
                localStorage.setItem('email',result.payload.email);
                localStorage.setItem('image',result.payload.image);
                navigate('/home');
            }else{
                setAuthError('You are not admin');
                navigate('/login');
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className='card w-50' style={{ marginTop: '100px' }}>
                    <div className='card-body'>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password:</label>
                                <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                        {status === 'loading' && <div className="spinner-border text-primary" role="status"></div>}
                        {status === 'failed' && <p className='alert alert-danger text-center mt-2'>{error}</p>}
                        {AuthError && <p className='alert alert-danger text-center mt-2'>{AuthError}</p>}
                    </div>
                </div>
            </div>
        </>
    )
}
