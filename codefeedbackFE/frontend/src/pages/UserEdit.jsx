import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UserEdit() {
    const [formData, setFormData] = useState({
        nickname: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const nickname = localStorage.getItem('loggedInUserNickname');
        if (nickname) {
            setFormData(prevState => ({
                ...prevState,
                nickname
            }));
        } else {
            navigate('/user/login');
        }
    }, [navigate]);

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
            const email = localStorage.getItem('loggedInUserEmail');
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/user/edit`, {
                nickname: formData.nickname,
                password: formData.password
            }, {
                headers: {
                    email: email
                }
            });
            alert("회원정보 수정 성공");
            localStorage.setItem("loggedInUserNickname", formData.nickname);
            navigate("/user/info");
        } catch (error) {
            console.error("회원정보 수정 실패: ", error);
            alert("회원정보 수정에 실패했습니다.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <button type="submit">회원정보 수정</button>
        </form>
    );
}

export default UserEdit;
