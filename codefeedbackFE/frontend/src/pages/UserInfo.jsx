import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserWithdrawal from "../components/UserWithdrawal";
import styles from '../styles/UserInfo.module.css'

function UserInfo() {
    const [userInfo, setUserInfo] = useState({
        email: '',
        nickname: ''
    });
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem('loggedInUserEmail');
        if (email) {
            axios.get(`${process.env.REACT_APP_SERVER_URL}/user/info`, {
                headers: {
                    email: email
                },
                withCredentials: true
            })
            .then(response => {
                setUserInfo(response.data.data);
            })
            .catch(error => {
                console.error("사용자 정보 가져오기 실패: ", error);
                navigate('/user/login');
            });
        } else {
            navigate('/user/login');
        }
    }, [navigate]);

    const handleShow = () => setShowModal(true);
    const handleEdit = () => navigate('/user/edit');

    return (
        <div>
            <h2>회원 정보</h2>
            <div>
                <label>이메일: </label>
                <span>{userInfo.email}</span>
            </div>
            <div>
                <label>닉네임: </label>
                <span>{userInfo.nickname}</span>
            </div>
            <button onClick={handleEdit} className={styles.navigationButton}>수정</button>
            <button onClick={handleShow} className={styles.navigationButton}>탈퇴</button>
            <UserWithdrawal showModal={showModal} setShowModal={setShowModal} />
        </div>
    );
}

export default UserInfo;
