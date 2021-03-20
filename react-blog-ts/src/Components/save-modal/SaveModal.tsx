import React, { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, useEffect, useState } from 'react';
import { Post } from '../../models/Post';
import Modal from 'react-modal';
import styles from './styles.module.scss';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

interface Props {
    isModalOpened: boolean;
    closeModal: () => void;
    onSave: (post: Post) => void;
    editedPost: Post | undefined;
}
const SaveModal: React.FunctionComponent<Props> = ({ 
    isModalOpened,
    closeModal,
    onSave,
    editedPost
}: Props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    
    useEffect(() => {
        setTitle(editedPost?.title || '');
        setDescription(editedPost?.description || '');
    }, [editedPost]);

    const closeModalFunc = () => {
        closeModal();
    };

    const submitSave = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        if (title.length < 5) {
            setError('Title min length is 5 symbols');
            return;
        }

        const post: Post = {
            title,
            description,
            createdAt: new Date()
        };

        if (!!editedPost) {
            post.likes = editedPost.likes;
            post.id = editedPost.id; 
        }

        onSave(post);
        setTitle('');
        setDescription('');
        closeModalFunc();
    };

    const handleTitleChange = (e: any) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e: any) => {
        setDescription(e.target.value);
    };

    return (
        <Modal
          isOpen={isModalOpened}
          onRequestClose={closeModalFunc}
          style={customStyles}
          contentLabel="Example Modal"
        >
            <div className={styles.form}>
                <h2>{!editedPost ? 'Create' : 'Edit'} post</h2>
                <form onSubmit={submitSave}>
                    <div className={styles.title}>
                        <label>Title</label>
                        <input placeholder="Title" name="title" minLength={5} defaultValue={title} onChange={handleTitleChange} /> 
                    </div>
                    <div className={styles.description}>
                        <label>Description</label>
                        <textarea name="description" defaultValue={description} onChange={handleDescriptionChange} /> 
                    </div>
                    <div className={styles.error}>{error}</div>
                    <button type="submit">{!editedPost ? 'Create' : 'Edit'}</button>
                </form>
            </div>
        </Modal>
    );
}

export default SaveModal;
