import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';
import { Post } from '../models/post';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  headerInformation() {
    const token = this.authService.getToken()
      ? this.authService.getToken()
      : null;
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }
  getPostsByBlogId(blogId: number) {
    console.log(`Fetching posts for blog ID: ${blogId}`);
    return this.http.get<Post[]>(
      `${environment.apiUrl}/api/posts/blog/${blogId}`,
      { headers: this.headerInformation() }
    );
  }
  createPost(post: Post) {
    console.log('Creating post:', post);
    return this.http.post<Post>(
      `${environment.apiUrl}/api/posts/create`,
      post,
      { headers: this.headerInformation() }
    );
  }
  updatePost(post: Post) {
    return this.http.put<Post>(`${environment.apiUrl}/api/posts`, post, {
      headers: this.headerInformation(),
    });
  }
  deletePost(postId: number) {
    return this.http.delete(`${environment.apiUrl}/api/posts/${postId}`, {
      headers: this.headerInformation(),
    });
  }
  getPostsByUserId(userId: number) {
    return this.http.get<Post[]>(
      `${environment.apiUrl}/api/posts/user/${userId}`,
      { headers: this.headerInformation() }
    );
  }
  getPostById(postId: number) {
    return this.http.get<Post>(`${environment.apiUrl}/api/posts/${postId}`, {
      headers: this.headerInformation(),
    });
  }
}
