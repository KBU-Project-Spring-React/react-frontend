import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
    return (
        <>
            <h2>메인페이지얌</h2>
            <div>
                <Link to="/login">
                    <button>로그인 페이지</button>
                </Link>
            </div>
            <div>
                <Link to="/register">
                    <button>회원가입 페이지</button>
                </Link>
            </div>
        </>
    );
};

export default MainPage;
