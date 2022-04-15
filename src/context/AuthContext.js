import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [me, setMe] = useState();

    useEffect(() => {
        const sessionId = sessionStorage.getItem('sessionId');
        if (me) {
            localStorage.setItem('sessionId', me.sessionId);
        } else if (sessionId) {
            axios
                .get('/Auth/me')
                .then((result) => {
                    setMe({ loginId: result.data.loginId, sessionId: result.data.sessionId });
                })
                .catch((err) => {
                    console.log(err);
                    sessionStorage.removeItem('sessionId');
                });
        }
    }, [me]);

    return <AuthContext.Provider value={[me, setMe]}>{children}</AuthContext.Provider>;
};
