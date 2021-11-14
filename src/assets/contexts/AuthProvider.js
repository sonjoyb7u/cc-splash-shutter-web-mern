import React, { createContext } from 'react';
import useFirebase from '../hooks/useFirebase';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const authUserInfoContext = useFirebase();

    return (
        <AuthContext.Provider value={authUserInfoContext}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;