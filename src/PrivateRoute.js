/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
const PrivateRoute = ({ children }) => {

    const { user, looding } = useSelector(state => ({ ...state.auth }))
    let location = useLocation();
    if (looding) {
        return <div className="spinner-border w-full d-block mx-auto mt-5" role="status">
            <div className="visually-hidden w-full mx-auto"></div>
        </div>
    }
    if (user?.user) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
