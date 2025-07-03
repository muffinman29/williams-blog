import { Post } from "./post";

export class Blog {
  blogId: number;
  title: string;
  description: string;
  url: string;
  author: string;
  posts: Post[] = [];
  userId: number;

  constructor(blogId: number, title: string, description: string, url: string, author: string, posts: Post[], userId: number) {
    this.blogId = blogId;
    this.title = title;
    this.description = description;
    this.author = author;
    this.url = url;
    this.posts = posts;
    this.userId = userId;
  }

}
