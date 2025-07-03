import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../models/post';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Comment } from '../models/comment'; // Assuming you have a Comment model
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-view-post',
  standalone: true,
  imports: [CommonModule, RouterModule, CommentComponent],
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.css',
})
export class ViewPostComponent implements OnInit {
  post: Post | null = null;
  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const postId = params['postId'];
      if (postId) {
        this.postService.getPostById(postId).subscribe({
          next: (post) => {
            this.post = post;
          },
          error: (error) => {
            console.error('Error fetching post:', error);
          },
        });
      } else {
        console.warn('No postId provided in query parameters.');
      }
    });
  }
}
