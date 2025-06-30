import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { BlogComponent } from './blog/blog.component';
import { RegisterComponent } from './register/register.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ViewPostComponent } from './view-post/view-post.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'post', component: PostComponent},
  { path: 'blog', component: BlogComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'new-blog', component: CreateBlogComponent },
  { path: 'new-post', component: CreatePostComponent },
  { path: 'view-post', component: ViewPostComponent }
];
export default routes;
