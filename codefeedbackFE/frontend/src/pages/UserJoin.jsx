import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function UserJoin() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        nickname: ''
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/user`, {
                email: formData.email,
                password: formData.password,
                nickname: formData.nickname
            });
            alert("회원가입 성공.");
            navigate("/user/login");

        } catch (error) {
            console.error("회원가입 실패: ", error);
            alert("회원가입 실패.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>이메일:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>비밀번호:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>비밀번호 확인:</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>닉네임:</label>
                <input
                    type="text"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">회원가입</button>
        </form>
    );
}

export default UserJoin;
