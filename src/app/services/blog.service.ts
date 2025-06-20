import { Injectable } from '@angular/core';
import { Blog } from '../models/blog';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllBlogs(){
    const token = this.authService.getToken() ? this.authService.getToken() : null;
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    return this.http.get<Blog[]>(`${environment.apiUrl}/api/blogs/all`, { headers: header });
  }
  getBlogById(blogId: number) {
    const token = this.authService.getToken() ? this.authService.getToken() : null;
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    return this.http.get<Blog>(`${environment.apiUrl}/api/blogs/${blogId}`, { headers: header });
  }
  updateBlog(blog: Blog) {
    const token = this.authService.getToken() ? this.authService.getToken() : null;
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    return this.http.put<Blog>(`${environment.apiUrl}/api/blogs/${blog.blogId}`, blog, { headers: header });
  }
  getBlogsByUserId(userId: number) {
    const token = this.authService.getToken() ? this.authService.getToken() : null;
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    return this.http.get<Blog[]>(`${environment.apiUrl}/api/blogs/user/${userId}`, { headers: header })
  }
  deleteBlog(blogId: number) {
    return this.http.delete(`${environment.apiUrl}/api/blogs/${blogId}`);
  }
  createBlog(blog: Blog) {
    const token = this.authService.getToken() ? this.authService.getToken() : null;
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    return this.http.post<Blog>(`${environment.apiUrl}/api/blogs/create`, blog, { headers: header });
  }
}
