import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Comment } from '../models/comment'; // Assuming you have a Comment model
import { CommentService } from '../services/comment.service'; // Assuming you have a CommentService

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent implements OnInit {
  comments: Comment[] = [];
  @Input() blogId: number | undefined = undefined;

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments() {
    if (this.blogId !== undefined) {
      this.commentService.getCommentsByBlogId(this.blogId).subscribe({
        next: (data: Comment[]) => {
          this.comments = data;
        },
        error: (error) => {
          console.error('Error loading comments:', error);
        },
      });
    } else {
      console.error('Cannot load comments: blogId is undefined.');
    }
  }

  addComment(comment: Comment) {
    this.commentService.createComment(comment).subscribe({
      next: (newComment: Comment) => {
        this.comments.push(newComment);
      },
      error: (error) => {
        console.error('Error adding comment:', error);
      },
    });
  }

  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe({
      next: () => {
        this.comments = this.comments.filter((c) => c.id !== commentId);
      },
      error: (error) => {
        console.error('Error deleting comment:', error);
      },
    });
  }

  updateComment(comment: Comment) {
    this.commentService.updateComment(comment).subscribe({
      next: (updatedComment: Comment) => {
        const index = this.comments.findIndex(
          (c) => c.id === updatedComment.id
        );
        if (index !== -1) {
          this.comments[index] = updatedComment;
        }
      },
      error: (error) => {
        console.error('Error updating comment:', error);
      },
    });
  }

  getCommentById(commentId: number): Comment | undefined {
    return this.comments.find((c) => c.id === commentId);
  }
}
