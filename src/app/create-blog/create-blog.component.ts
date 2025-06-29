import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { Blog } from '../models/blog';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-create-blog',
    imports: [CommonModule, RouterLink, ReactiveFormsModule],
    templateUrl: './create-blog.component.html',
    styleUrl: './create-blog.component.css'
})
export class CreateBlogComponent implements OnInit {
  title = 'Create Blog';
  form!: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private blogService: BlogService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  // Add methods for creating a blog, handling form submission, etc.
  createBlog(): void {
    if (this.form.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      console.error('Form is invalid:', this.form.errors);
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';
    console.log('Creating blog with data:', this.form.value);

    if (!this.authService.isLoggedIn()) {
      this.errorMessage = 'You must be logged in to create a blog.';
      this.loading = false;
      return;
    }

    const token = this.authService.getToken()
      ? this.authService.getToken()
      : null;

    if (token) {
      this.userService.getUserFromToken(token).subscribe((user) => {
        if (user) {
          let blog: Blog = new Blog(
            0,
            this.form.value.title,
            this.form.value.description,
            'placeholder',
            `${user.firstName} ${user.lastName}`,
            [],
            user.userId
          );

          console.log('Blog object to be created:', blog);

          this.blogService.createBlog(blog).subscribe({
            next: (response) => {
              this.successMessage = 'Blog created successfully!';
              this.loading = false;
              console.log('Blog created:', response);
            },
            error: (error) => {
              this.errorMessage = 'Failed to create blog. Please try again.';
              this.loading = false;
              console.error('Error creating blog:', error);
            },
          });
        }
      });
    }
  }
}
