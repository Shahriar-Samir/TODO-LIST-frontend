import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Loading2 from '../Home/Loading2';


const HideRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const location = useLocation()

    if(loading){
        return <Loading2/>
    }

    if(user){
        if(location.pathname === '/' || location.pathname === '/signup'){
                return <Navigate to='/app/today'></Navigate>
        }
    }
    return children
};

export default HideRoute;