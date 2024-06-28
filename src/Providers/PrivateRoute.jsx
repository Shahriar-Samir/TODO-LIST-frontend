import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate } from 'react-router-dom';
import Loading from '../Home/Loading';

const PrivateRoute = ({children}) => {
    const {loading,user} = useContext(AuthContext)
    console.log(loading)
    if(loading){
        return <Loading/>
    }
    if(user){
        return children
    }
    return <Navigate to='/'></Navigate>
};

export default PrivateRoute;