import axios from 'axios';
import { Post } from '../models/Post';
import { User } from '../models/User';

const apiUrl = 'https://6055216ed4d9dc001726e7ac.mockapi.io/api/cw';

class FakeDataService {
    getUser() {
        return axios.get<User[]>(`${apiUrl}/user`);
    }

    getPosts() {
        return axios.get<Post[]>(`${apiUrl}/posts`);
    }

    addPost(post: Post) {
        return axios.post(`${apiUrl}/posts`, post);
    }

    deletePost(id: string | undefined) {
        return axios.delete(`${apiUrl}/posts/${id}`);
    }

    updatePost(post: Post) {
        return axios.put(`${apiUrl}/posts/${post.id}`, post);
    }
}

const fakeDataService = new FakeDataService();

export default fakeDataService;