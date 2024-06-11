import React from 'react';
import {Modal, Button} from 'react-bootstrap'

function DeletePost({show, handleClose, handleDelete}) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>게시글 삭제</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                정말로 게시글을 삭제하시겠습니까?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>취소</Button>
                <Button variant="danger" onClick={handleDelete}>삭제</Button>
            </Modal.Footer>
        </Modal>      
    );
}

export default DeletePost;