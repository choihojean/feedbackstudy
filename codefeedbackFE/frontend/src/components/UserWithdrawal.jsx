import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {Button, Modal} from "react-bootstrap";

function UserWithdrawal({showModal, setShowModal}) {
    const [password, setPassword] = useState();

    const handleClose = () => setShowModal(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = localStorage.getItem('loggedInUserEmail');

        try {
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/user`, {
                data: {
                    email: email,
                    password: password,
                }, withCredentials:true
            });
            alert("회원탈퇴 성공.");
            localStorage.removeItem('loggedInUserEmail');
            localStorage.removeItem('loggedInUserNickname');
            navigate("/");

        } catch (error) {
            console.error("회원탈퇴 실패: ", error);
            alert("회원탈퇴 실패.");
        }
    };

    return (
        <div>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>회원 탈퇴</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <label>비밀번호: </label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        탈퇴
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>
    );
}

export default UserWithdrawal;
