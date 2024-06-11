import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../styles/PostEdit.module.css'

function PostEdit() {

    const navigate = useNavigate();
    const { postId } = useParams();
    const [post, setPost] = useState({
        id: null,
        nickname: '',
        title: '',
        content: '',
        access: null,
        messages: []
    })

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/post/${postId}`,
                    {withCredentials: true});
                setPost(response.data.data);

            } catch (error) {
                console.error("게시글 정보 가져오기 실패: ", error);
                alert("게시글 정보를 가져오는데 실패했습니다.");
            }
        };

        fetchPostData();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/post/${postId}`,{
                title: post.title,
                content: post.content,
                access: post.access
            }, {withCredentials: true});

            alert("게시글 수정 성공");
            navigate(`/post/${postId}`);

        } catch(error){
            console.error("게시글 수정 실패: ", error);
            alert("게시글 수정에 실패했습니다.");
        }
    };

    return (
        <div>
            <h4>게시글 수정</h4>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="access">공개여부:</label>
                    <select name="access" id="access" value={String(post.access)} onChange={handleChange}>
                        <option value="true">공개</option>
                        <option value="false">비공개</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="title">제목:</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <div >내용:</div>
                    <textarea
                        id="content"
                        name="content"
                        value={post.content}
                        onChange={handleChange}
                        rows="20"
                        cols="150"
                        required
                        className={styles.textbox}
                    />
                </div>
                <button type="submit" className={styles.navigationButton}>게시글 수정</button>
            </form>
        </div>
    );
}

export default PostEdit;
