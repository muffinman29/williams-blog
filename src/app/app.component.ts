import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { PostComponent } from './post/post.component';
import { AppServiceService } from './services/app-service.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isLoggedIn = this.authService.isLoggedIn();
  blogId: number | null = null;

  title = 'williams-blog';
  constructor(
    private authService: AuthService,
    private router: Router,
    private appService: AppServiceService
  ) {
    this.appService.currentBlogId.subscribe(id => this.blogId = id);
  }

  ngOnInit(): void {

  }

  logout(): void {
    this.authService.logout();
  }
}
