import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/Post';
import { User } from '../models/User';

const apiUrl = 'https://6055216ed4d9dc001726e7ac.mockapi.io/api/cw';

@Injectable({
  providedIn: 'root'
})
export class FakeDataService {
  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get<User[]>(`${apiUrl}/user`);
  }

  getPosts() {
    return this.http.get<Post[]>(`${apiUrl}/posts`);
  }

  addPost(post: Post) {
    return this.http.post(`${apiUrl}/posts`, post);
  }

  deletePost(id: string | undefined) {
    return this.http.delete(`${apiUrl}/posts/${id}`);
  }

  updatePost(post: Post) {
    return this.http.put(`${apiUrl}/posts/${post.id}`, post);
  }
}
