import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}
  getPostsByBlogId(blogId: number) {
    return this.http.get<Post[]>(
      `${environment.apiUrl}/api/posts/blog/${blogId}`
    );
  }
  createPost(post: Post) {
    return this.http.post<Post>(`${environment.apiUrl}/api/posts/create`, post);
  }
  updatePost(post: Post) {
    return this.http.put<Post>(
      `${environment.apiUrl}/api/posts`,
      post
    );
  }
  deletePost(postId: number) {
    return this.http.delete(`${environment.apiUrl}/api/posts/${postId}`);
  }
  getPostsByUserId(userId: number) {
    return this.http.get<Post[]>(
      `${environment.apiUrl}/api/posts/user/${userId}`
    );
  }
}
