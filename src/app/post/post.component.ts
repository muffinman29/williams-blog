import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PostService } from '../services/post.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Post } from '../models/post';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { BlogService } from '../services/blog.service';
import { AppServiceService } from '../services/app-service.service';

@Component({
    selector: 'app-post',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './post.component.html',
    styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
  posts: Post[] = [];
  blogId: number | null = null;
  isLoggedIn = this.authService.isLoggedIn();
  blogTitle: string = '';

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private blogService: BlogService,
    private appService: AppServiceService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.blogId = params['blogId'];
      if (this.blogId) {
        this.appService.setBlogId(this.blogId);
        this.blogService.getBlogById(this.blogId).subscribe({
          next: (blog) => {
            this.blogTitle = blog.title;
            console.log('Blog title fetched successfully:', this.blogTitle);
          },
          error: (error) => {
            console.error('Error fetching blog title:', error);
          },
        });
        this.postService.getPostsByBlogId(this.blogId).subscribe({
          next: (posts) => {
            this.posts = posts;
            console.log('Posts fetched successfully:', this.posts);
          },
          error: (error) => {
            console.error('Error fetching posts:', error);
          },
        });
      } else {
        console.warn('No blogId provided in query parameters.');
      }
    });
  }

  editPost(postId: number): void {
    // Logic to navigate to the edit post page
    console.log(`Edit post with ID: ${postId}`);
    // You can use a router to navigate to the edit page, e.g.:
    // this.router.navigate(['/edit-post'], { queryParams: { postId } });
  }

  deletePost(postId: number): void {
    // Logic to delete the post
    console.log(`Delete post with ID: ${postId}`);
    this.postService.deletePost(postId).subscribe({
      next: () => {
        console.log(`Post with ID ${postId} deleted successfully.`);
        this.posts = this.posts.filter((post) => post.postId !== postId);
      },
      error: (error) => {
        console.error(`Error deleting post with ID ${postId}:`, error);
      },
    });
  }
}
