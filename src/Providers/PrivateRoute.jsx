import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Loading2 from '../Home/Loading2';

const PrivateRoute = ({children}) => {
    const {loading,user} = useContext(AuthContext)

    if(loading){
        return <Loading2/>
    }
    if(user){
        return children
    }
    return <Navigate to='/'></Navigate>
};

export default PrivateRoute;