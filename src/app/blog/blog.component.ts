import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { Blog } from '../models/blog'; // Adjust the path as necessary
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StorageService } from '../services/storage-service.service';
import { UserService } from '../services/user.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [DatePipe, CommonModule, RouterLink],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent {
  viewBlog(id: number) {
    // Logic to view a specific blog by its ID
    console.log(`Viewing blog with ID: ${id}`);
  }
  blogs: Blog[] = [];
  errorMessage = '';
  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private userService: UserService
  ) {}
  ngOnInit() {
    console.log('Logged in:', this.userService.loggedIn);
    const token = this.storageService.getItem('access_token')
      ? JSON.parse(this.storageService.getItem('access_token')!).token
      : null;
    console.log('Token:', token);
    if (token) {
      console.log('Fetching blogs for user with token:', token);
      this.userService.getUserFromToken(token).subscribe((user) => {
        const userId = user ? user.userId : -1; // Default to -1 if user is not found
        console.log('User ID:', userId);
        this.blogService.getBlogsByUserId(userId).subscribe((data) => {
            this.blogs = data;
          });
      });
    }
  }
}
