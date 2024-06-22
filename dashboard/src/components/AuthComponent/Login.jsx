import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status } = useSelector((state) => state.auth);
    const [authError, setAuthError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(login({ email, password }))
            .then((result) => {
                setLoading(false);
                if (result.payload.role === 'admin') {
                    if (result.payload.success === true) {
                        localStorage.setItem('token', result.payload.token);
                        localStorage.setItem('role', result.payload.role);
                        localStorage.setItem('expirationTime', result.payload.expirationTime);
                        localStorage.setItem('id', result.payload.id);
                        localStorage.setItem('name', result.payload.name);
                        localStorage.setItem('email', result.payload.email);
                        localStorage.setItem('image', result.payload.image);
                        navigate('/');
                    }
                } else {
                    setAuthError(result.payload.message);
                    navigate('/login');
                }
            })
            .catch((err) => {
                setLoading(false);
                setAuthError(err.message);
            });
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className='card w-50 shadow mb-4' style={{ marginTop: '100px' }}>
                    <div className="card-header py-3">
                        <div className="row justify-content-center align-items-center">
                            <h4 className="col text-primary text-center">Login</h4>
                        </div>
                    </div>
                    <div className='card-body'>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input type="email" className="form-control" id="email" value={email}
                                       onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password:</label>
                                <input type="password" className="form-control" id="password" value={password}
                                       onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Login'}
                            </button>
                        </form>
                        {status === 'loading' && <div className="spinner-border text-primary" role="status"></div>}
                        {authError && <p className='alert alert-danger text-center mt-2'>{authError}</p>}
                    </div>
                </div>
            </div>
        </>
    );
}
