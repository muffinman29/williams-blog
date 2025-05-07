import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { PostComponent } from './post/post.component';
import { BlogComponent } from './blog/blog.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'create-account', component: CreateAccountComponent},
  { path: 'post', component: PostComponent},
  { path: 'blog', component: BlogComponent}
];
export default routes;
