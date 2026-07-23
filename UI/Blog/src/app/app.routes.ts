import { Routes } from '@angular/router';
import { CategoryList } from './features/category/category-list/category-list';
import { AddCategory } from './features/category/add-category/add-category';
import { EditCategory } from './features/category/edit-category/edit-category';
import { BlogpostList } from './features/blogpost/blogpost-list/blogpost-list';
import { AddBlogpost } from './features/blogpost/add-blogpost/add-blogpost';
import { EditBlogpost } from './features/blogpost/edit-blogpost/edit-blogpost';
import { Home } from './features/public/home/home';
import { PostDetails } from './features/public/post-details/post-details';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'admin/categories', component: CategoryList },
  { path: 'admin/category/add', component: AddCategory },
  { path: 'admin/categories/edit/:id', component: EditCategory },
  { path: 'admin/blogposts', component: BlogpostList },
  { path: 'admin/blogposts/add', component: AddBlogpost },
  { path: 'admin/blogposts/edit/:id', component: EditBlogpost },
  { path: 'blog/:url', component: PostDetails },
];
