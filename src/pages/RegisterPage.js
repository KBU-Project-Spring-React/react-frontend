import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../components/CustomInput';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        try {
            e.preventDefault();
            if (password !== passwordCheck) throw new Error('비밀번호가 달라요!');
            const result = await axios.post('/signUp', { username, password }); //request 동작
            switch (result.data.status) {
                case '200':
                    toast.success(result.data.message);
                    console.log(result.data.message);
                    navigate('/');
                    break;
                case '400':
                    toast.error(result.data.message);
                    console.log(result.data.message);
                    break;
            }
        } catch (err) {
            // err : 응답의 에러 메시지
            //toast.error(err.message);
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
            <h3>회원가입</h3>
            <form onSubmit={submitHandler}>
                <CustomInput label="회원ID" value={username} setValue={setUsername} />
                <CustomInput label="비밀번호" value={password} type="password" setValue={setPassword} />
                <CustomInput label="비밀번호확인" value={passwordCheck} type="password" setValue={setPasswordCheck} />
                <button type="submit">버튼</button>
            </form>
        </div>
    );
};

export default RegisterPage;
