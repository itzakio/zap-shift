import React from 'react';
import useAuth from '../hook/useAuth';
import Loader from '../components/Loader';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, userLoading} = useAuth();
    const location = useLocation();
    if(userLoading){
        return <Loader/>;
    }
    if(user && user.email){
        return children;
    }
    else{
        return <Navigate to="/login" state={location.pathname}/>
    }
};

export default PrivateRoute;