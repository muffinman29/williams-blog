import { Blog } from "./blog";

export class Post {
  postId: number;
  title: string;
  content: string;
  createdDate: Date;
  updatedDate: Date;
  blogId: number;

  constructor(postId: number, title: string, content: string, createdDate: Date, updatedDate: Date, blogId: number) {
    this.postId = postId;
    this.title = title;
    this.content = content;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.blogId = blogId;
  }
}
