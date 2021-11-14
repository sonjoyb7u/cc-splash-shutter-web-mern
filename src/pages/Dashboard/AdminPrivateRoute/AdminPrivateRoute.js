import { CircularProgress } from '@mui/material';
import React from 'react';
import useAuth from '../../../assets/hooks/useAuth';
import { Redirect, Route } from 'react-router-dom';

const AdminPrivateRoute = ({ children, ...rest }) => {
    const {user, isUserComing, isAdmin} = useAuth();

    if(isUserComing) {
        return <CircularProgress style={{ position: "absolute", top: "50%", left: "50%", zIndex: 999 }} color="inherit" />
    }

    return (
        <Route
        {...rest}
        render={({ location }) =>
            user.email && isAdmin 
            ? 
            (children) 
            : 
            (<Redirect
                to={{
                    pathname: "/dashboard",
                    state: { from: location }
                }}
            />)
        }
        >
            
        </Route>
    );
};

export default AdminPrivateRoute;