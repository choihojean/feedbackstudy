import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ListGroup from "react-bootstrap/ListGroup";
import {Link} from "react-router-dom";
import styles from '../styles/PostList.module.css'

function MyPostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/post/access`,
                    {withCredentials: true});
                setPosts(response.data.data);

            } catch (error) {
                console.error("게시글 목록 가져오기 실패: ", error);
                alert("게시글 목록을 가져오는데 실패했습니다.");
            }
        };

        fetchPostData();
    }, []);


    return (
        <div>
            <h4 className={styles.title}>공개 게시글 목록</h4>
            <ListGroup>
                {
                    posts.map((post, idx) => {
                        return (
                            <ListGroup.Item key={idx} className={styles.content}>
                                <Link to={`/post/${post.id}`}>{post.title}</Link>
                            </ListGroup.Item>
                        )
                    })
                }
            </ListGroup>
        </div>
    );
}

export default MyPostList;
