import { Blog } from "./blog";

export class Post {
  postId: number;
  title: string;
  content: string;
  createdDate: Date;
  updatedDate: Date;
  blogId: number;
  blog: Blog | null = null;

  constructor(postId: number, title: string, content: string, createdDate: Date, updatedDate: Date, blogId: number, blog: Blog) {
    this.blogId = blogId;
    this.postId = postId;
    this.title = title;
    this.content = content;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.blog = blog;
  }
}
