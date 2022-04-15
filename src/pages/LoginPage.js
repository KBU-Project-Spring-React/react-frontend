import React, { useContext, useState } from 'react';
import CustomInput from '../components/CustomInput';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [, setMe] = useContext(AuthContext);
    const navigate = useNavigate();

    const loginHandler = async (e) => {
        try {
            e.preventDefault();
            const result = await axios.post('/login', { username, password }); //request 동작
            setMe({ sessionId: result.headers.Jsession });
            switch (result.data.status) {
                case 'OK':
                    toast.success(result.data.message);
                    console.log(result.data);
                    navigate('/');
                    break;
                case 'BAD_REQUEST':
                    toast.error(result.data.message);
                    break;
            }
        } catch (err) {
            // console.log(err.respense);
            // toast.error(err.respense);
        }
    };

    return (
        <div
            style={{
                marginTop: 100,
                maxWidth: 350,
                marginLeft: 'auto',
                marginRight: 'auto',
            }}
        >
            <h3>로그인</h3>
            <form onSubmit={loginHandler}>
                <CustomInput label="회원ID" value={username} setValue={setUsername} />
                <CustomInput label="비밀번호" value={password} setValue={setPassword} type="password" />
                <button type="submit">로그인</button>
            </form>
        </div>
    );
};

export default LoginPage;
