import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { StorageService } from './services/storage-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'williams-blog';
  constructor(private userService: UserService, private storageService: StorageService) { }

  isLoggedIn(): boolean {
    return this.storageService.getItem('access_token') !== null;
  }

  logout(): void {
    this.userService.logout();
  }
}
