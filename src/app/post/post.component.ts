import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
  // Define properties and methods for the PostComponent here
  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const blogId = this.route.snapshot.data['blogId']; // Replace with the actual blog ID you want to fetch posts for
    this.postService.getPostsByBlogId(blogId).subscribe({
      next: (posts) => {
        console.log('Posts fetched successfully:', posts);
      }
  });

}
}
