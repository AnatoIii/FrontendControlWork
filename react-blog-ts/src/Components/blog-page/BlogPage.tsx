import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Post } from '../../models/Post';
import { User } from '../../models/User';
import fakeDataService from '../../services/fakeDataService';
import styles from './styles.module.scss';
import heart from '../../heart.svg';
import SaveModal from '../save-modal/SaveModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogPage: React.FunctionComponent = () => {
    const [user, setUser] = useState<User>();
    const [posts, setPosts] = useState<Post[]>();
    const [editedPost, setEditedPost] = useState<Post>();
    const [isModalOpened, setModalOpened] = useState<boolean>(false);
    
    useEffect(() => {
        fakeDataService.getUser()
            .then(res => {
                setUser(res.data[0]);
            })
    }, []);
    
    const getPosts = () => {
        fakeDataService.getPosts()
            .then(res => {
                setPosts(res.data);
            });
    }

    useEffect(() => {
        getPosts();
    }, []);

    const formatDate = (date: Date) => {
        const momentDate = moment(date);
        return momentDate.format('DD MMMM YYYY'); 
    }

    const onCreate = () => {
        setEditedPost(undefined);
        setModalOpened(true);
    };

    const onSave = (post: Post) => {
        if (!!editedPost) {
            fakeDataService.updatePost(post)
                .then(_ => {
                    getPosts();
                    toast.success('Post successfully updated');
                });

            return;
        }

        fakeDataService.addPost(post)
            .then(_ => {
                getPosts();
                toast.success('Post successfully created');
            });
    };

    const onDelete = (post: Post) => {
        fakeDataService.deletePost(post.id)
            .then(_ => {
                toast.info(`Post ${post.title} was successfully deleted!`);
                getPosts();
            });
    }

    const onEdit = (post: Post) => {
        setEditedPost(post);
        setModalOpened(true);
    }

    return (
        <div className={styles.blogPage}>
            <div className={styles.user}>
                <img src={user?.avatar} />
                <div>
                    <p>{user?.userName}</p>
                    <p>{user?.description}</p>
                </div>
            </div>
            <div className={styles.line}>
                <p>How I try to stay a float while being a frontend developer</p>
            </div>

            <div className={styles.posts}>
                <div className={`${styles.post} ${styles.newPost}`} onClick={onCreate}>
                    Create new post
                </div>
                {posts?.map(post => (
                    <div className={styles.post} key={post.id}>
                        <div className={styles.top}>
                            <p className={styles.title}>{post.title}</p>
                            <div className={styles.actions}>
                                <p className={styles.edit} onClick={() => onEdit(post)}>Edit</p>
                                <p className={styles.delete} onClick={() => onDelete(post)}>Delete</p>
                            </div>
                        </div>
                        <p className={styles.description}>{post.description}</p>
                        <div className={styles.bottom}>
                            <p>{formatDate(post.createdAt)}</p>
                            <p className={styles.likes}><img src={heart} width="10px"/>{post.likes}</p>
                        </div>
                    </div>
                ))}
            </div>
            <SaveModal 
                isModalOpened={isModalOpened} 
                closeModal={() => setModalOpened(false)} 
                onSave={onSave} 
                editedPost={editedPost}
            />
            <ToastContainer />
        </div>
    );
}

export default BlogPage;
