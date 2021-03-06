import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; //해당 url로 이동시켜주는 API
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ToolBar = () => {
    const [me, setMe] = useContext(AuthContext);

    const logoutHandler = async () => {
        try {
            await axios.patch('/logout');
            setMe(); //초기화
            toast.success('로그아웃 성공');
        } catch (err) {
            console.error(err);
            toast.error(err.message);
        }
    };

    return (
        <div style={{ borderBottom: '1px solid' }}>
            <Link to="/">
                <span>홈</span>
            </Link>

            {me ? (
                <>
                    <span onClick={logoutHandler} style={{ float: 'right', cursor: 'pointer' }}>
                        로그아웃({me.loginId})
                    </span>
                    <Link to="/mypage">
                        <span style={{ float: 'right', marginRight: 15 }}>마이페이지</span>
                    </Link>
                </>
            ) : (
                <>
                    <Link to="/login">
                        <span style={{ float: 'right' }}>로그인</span>
                    </Link>
                    <Link to="/register">
                        <span style={{ float: 'right', marginRight: 15 }}>회원가입</span>
                    </Link>
                </>
            )}
        </div>
    );
};

export default ToolBar;
