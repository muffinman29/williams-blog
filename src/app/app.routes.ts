import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { BlogComponent } from './blog/blog.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'post', component: PostComponent},
  { path: 'blog', component: BlogComponent},
  { path: 'register', component: RegisterComponent },
];
export default routes;
