import { Injectable } from '@angular/core';
import { Blog } from '../models/blog';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';
import { StorageService } from './storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  getAllBlogs(){
    return this.http.get<Blog[]>(`${environment.apiUrl}/api/blogs/all`);
  }
  getBlogById(blogId: number) {
    return this.http.get<Blog>(`${environment.apiUrl}/api/blogs/${blogId}`);
  }
  updateBlog(blog: Blog) {
    return this.http.put<Blog>(`${environment.apiUrl}/api/blogs/${blog.blogId}`, blog);
  }
  getBlogsByUserId(userId: number) {
    const token = this.storageService.getItem('access_token') ? JSON.parse(this.storageService.getItem('access_token')!).token : null;
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
    const token = this.storageService.getItem('access_token') ? JSON.parse(this.storageService.getItem('access_token')!).token : null;
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    return this.http.post<Blog>(`${environment.apiUrl}/api/blogs/create`, blog, { headers: header });
  }
}
