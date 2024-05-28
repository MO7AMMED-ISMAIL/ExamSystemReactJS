import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../layouts/Loader';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (status === 'succeeded') {
      navigate('/');
    }
  }, [status]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 vw-100">
      <div className="row login-form-wrapper">
        <div className="col-md-12">
          <div className=" p-5 ">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-1">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {status === 'loading' && <Loader />}
              {status === 'failed' && (
                <div className="text-center text-danger">
                 <span>
                      Invalid email or password. Please check your credentials and try again.
                    </span>
                </div>
              )}
              <div className="text-center my-5">
                <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={status === 'loading'}>
                  Login
                </button>
                <div className='my-3'>
                  <Link className="text-decoration-none" to={`/register`}>Sign Up</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
