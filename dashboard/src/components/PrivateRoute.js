import React ,{useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import {useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import {isTokenExpired} from '../utils/auth'

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('expirationTime');
    const dispatch = useDispatch();

    useEffect(() => {
        if(isTokenExpired(expirationTime)){
            dispatch(logout());
            localStorage.clear();
            <Navigate to="/login"/>
        }
    },[token, expirationTime, dispatch]);

    return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
