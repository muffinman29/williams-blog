import { Blog } from './blog';

export class Comment {
  id: number;
  name: string;
  commentText: string;
  blogId: number;
  blog: Blog;

  constructor(
    id: number,
    name: string,
    commentText: string,
    blogId: number,
    blog: Blog
  ) {
    this.id = id;
    this.name = name;
    this.commentText = commentText;
    this.blogId = blogId;
    this.blog = blog;
  }
}
