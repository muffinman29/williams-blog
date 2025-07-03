import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Blog } from '../models/blog';
import { AuthService } from './auth.service';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllComments() {
    const token = this.authService.getToken()
      ? this.authService.getToken()
      : null;
    const header = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<Comment[]>(`${environment.apiUrl}/api/comments/all`, {
      headers: header,
    });
  }
  getCommentById(commentId: number) {
    const token = this.authService.getToken()
      ? this.authService.getToken()
      : null;
    const header = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<Comment>(
      `${environment.apiUrl}/api/comments/${commentId}`,
      { headers: header }
    );
  }
  updateComment(comment: Comment) {
    const token = this.authService.getToken()
      ? this.authService.getToken()
      : null;
    const header = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.put<Comment>(
      `${environment.apiUrl}/api/comments/${comment.id}`,
      comment,
      { headers: header }
    );
  }
  getCommentsByBlogId(blogId: number) {
    const token = this.authService.getToken()
      ? this.authService.getToken()
      : null;
    const header = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<Comment[]>(
      `${environment.apiUrl}/api/comments/blog/${blogId}`,
      { headers: header }
    );
  }
  deleteComment(commentId: number) {
    return this.http.delete(`${environment.apiUrl}/api/comments/${commentId}`);
  }
  createComment(comment: Comment) {
    const token = this.authService.getToken()
      ? this.authService.getToken()
      : null;
    const header = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.post<Comment>(
      `${environment.apiUrl}/api/comments/create`,
      comment,
      { headers: header }
    );
  }
}
