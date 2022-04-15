import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [me, setMe] = useState();

    useEffect(() => {
        const sessionId = localStorage.getItem('sessionId');
        if (me) {
            axios.defaults.headers.common.Jsession = me.sessionId;
            localStorage.setItem('sessionId', me.sessionId);
        } else if (sessionId) {
            axios
                .get('/Auth/me', { headers: { Jsession: sessionId } })
                .then((result) =>
                    setMe({
                        sessionId: result.data.sessionId,
                    })
                )
                .catch((err) => {
                    console.error(err);
                    localStorage.removeItem('sessionId');
                    delete axios.defaults.headers.common.Jsession;
                });
        } else delete axios.defaults.headers.common.Jsession;
    }, [me]);

    return <AuthContext.Provider value={[me, setMe]}>{children}</AuthContext.Provider>;
};
