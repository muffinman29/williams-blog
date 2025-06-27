import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { Blog } from '../models/blog';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent {
  blogs: Blog[] = [];
  errorMessage = '';
  constructor(
    private blogService: BlogService,
    private authService: AuthService,
    private userService: UserService
  ) {}
  ngOnInit() {
    const token = this.authService.getToken() ? this.authService.getToken() : null;
    if (token) {
      this.userService.getUserFromToken(token).subscribe((user) => {
        const userId = user ? user.userId : -1;
        this.blogService.getBlogsByUserId(userId).subscribe((data) => {
            this.blogs = data;
          });
      });
    }
  }
}
