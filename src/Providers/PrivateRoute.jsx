import React from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {loading,user} = useContext(AuthContext)
    if(loading){
        <Loading/>
    }
    if(user){
        return children
    }
    return <Navigate to='/'></Navigate>
};

export default PrivateRoute;