import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../layouts/Loader';
import './AuthForm.css';
import Canvas from '../../layouts/Canvas';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (status === 'succeeded') {
      navigate('/subject');
    }
  }, [status, navigate]);
  
  if (status === 'loading') {
    return <Loader />;
  }


  return (
    <main className='container-fluid login'>

      <section className='row'>

        <aside className='col-5'>
          <Canvas></Canvas>
        </aside>


        <form  className='col-4 offset-3' onSubmit={handleLogin}>
           <h1 className='text-center text-light'>Login</h1>

              <div className="mb-1">
                <label htmlFor="email" className="form-label text-light h6">Email</label>
                <input type="email" id="email" className="form-control" value={email}
                 onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label text-light h6">Password</label>
                <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>

              {status === 'failed' && (
                <div className="text-center text-danger">
                  <span>Invalid email or password. Please check your credentials and try again.</span>
                </div>
              )}
              
              <div className="text-center my-5">
                <button type="submit" className="btn btn-success btn-lg btn-block col-12 " disabled={status === 'loading'}>
                  Login
                </button>
                <div className='my-3'>
                <Link className="text-decoration-none dark-link" to={`/register`}>Sign Up</Link>

                </div>
              </div>
            </form>

       </section>

   </main>         
         
  );
};

export default LoginForm;
