import * as React from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import styles from '../styles/Home.module.css'
import { CodeFeedback, Summary } from '../components/CodeFeedback';
import Spinner from 'react-bootstrap/Spinner';


export default function Home() {
    const [text, setText] = React.useState('');
    const [history, setHistory] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const email = localStorage.getItem('loggedInUserEmail');
    const nickname = localStorage.getItem('loggedInUserNickname');

    const now = new Date().getTime();

    const navigate = useNavigate();

    React.useEffect(() => {
        if (email == null) {
            navigate("/user/login");
        }
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setText('');
        setIsLoading(true);
        try {
            await CodeFeedback(text, history).then((res) => {
                setHistory([...history, [text, res]]);
            });
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    const createBoard = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            let timer = 0;
            let messages = [];
            const summary = await Summary(history);
            console.log(summary);
            Object.values(history).map((v, k) => {
                messages.push(
                    {
                        "role": "user",
                        "createdAt": now + timer,
                        "content": v[0]
                    }
                )
                timer += 1;
                messages.push(
                    {
                        "role": "system",
                        "createdAt": now + timer,
                        "content": v[1]
                    }
                )
                timer += 1;
            })
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/post`, {
                "title": `${nickname}님의 세션`,
                "content": summary,
                "access": false,
                "messages": messages
            }, {withCredentials: true});
            console.log(response);
            setIsLoading(false);
            window.location.reload();
        } catch(error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div>
                <button className={styles.navigationButton} onClick={() => {navigate("/post/public")}}>PUBLIC BOARD</button>
                <button className={styles.navigationButton} onClick={() => {navigate("/post/mine")}}>PRIVATE BOARD</button>
                <button className={styles.navigationButton} onClick={() => {navigate("/user/info")}}>MY PROFILE</button>
            </div>
            <div className={styles.chatContainer}>
                {Object.values(history).map((v, k) => {
                    return(
                        <div key={k}>
                            <div className={styles.sentMessage}>
                                {v[0]}
                            </div>
                            <div className={styles.receivedMessage}>
                                {v[1]}
                            </div>
                        </div>
                    );
                })}
                <button className={styles.boardSubmitButton} onClick={createBoard}>Submit</button>
                <form onSubmit={handleSubmit}>
                    <textarea className={styles.textbox} rows="8" value={text} onChange={(e) => setText(e.target.value)} required/>
                    <input className={styles.textsubmit} type='submit' value="입력"/>
                </form>
            </div>
            {
                isLoading ?
                    <div className={styles.centerSpinner}>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                    : null
            }

        </div>
    );
};
