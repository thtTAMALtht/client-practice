import React, { use } from 'react';
import AuthContext from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({children}) => {
    const location = useLocation();
    const {user,loading} = use(AuthContext)
    if(user){
        return children;
    }

    if(loading){
        return <p>Loding Spinner.............</p>
    }
    return <Navigate to="/register" state={location.pathname}></Navigate>
};

export default PrivateRoutes;