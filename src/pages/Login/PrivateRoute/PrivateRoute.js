import React from 'react';
import useAuth from '../../../assets/hooks/useAuth';
import { Redirect, Route } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const PrivateRoute = ({ children, ...rest }) => {

        const {user, isUserComing} = useAuth();

        if(isUserComing) {
            return <CircularProgress style={{ position: "absolute", top: "50%", left: "50%", zIndex: 999 }} color="inherit" />
        }

        return (
            <Route
            {...rest}
            render={({ location }) =>
                user?.email 
                ? 
                (children) 
                : 
                (<Redirect
                    to={{
                    pathname: "/login",
                    state: { from: location }
                    }}
                />)
            }
            >
                
            </Route>
        );

};

export default PrivateRoute;