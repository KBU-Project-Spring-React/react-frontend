import React, { useContext, useState } from 'react';
import CustomInput from '../components/CustomInput';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const loginHandler = async (e) => {
        try {
            e.preventDefault();
            const result = await axios.post('/login', { username, password });
            switch (result.data.status) {
                case '200':
                    toast.success(result.data.message);
                    console.log(result.data.message);
                    navigate('/');
                    break;
                case '400':
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
