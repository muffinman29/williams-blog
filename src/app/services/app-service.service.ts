import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  private blogIdSource = new BehaviorSubject<number | null>(null);
  currentBlogId = this.blogIdSource.asObservable();

  constructor() { }

  setBlogId(blogId: number | null): void {
    this.blogIdSource.next(blogId);
  }
}
