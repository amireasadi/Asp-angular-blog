import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogpostService } from '../services/blogpost-service';

@Component({
  selector: 'app-blogpost-list',
  imports: [RouterLink],
  templateUrl: './blogpost-list.html',
  styleUrl: './blogpost-list.css',
})
export class BlogpostList {
  private blogPostService = inject(BlogpostService);
  private getAllBlogPostsRefrence = this.blogPostService.getAllBlogPosts();
  isLoading = this.getAllBlogPostsRefrence.isLoading;
  error = this.getAllBlogPostsRefrence.error;
  value = this.getAllBlogPostsRefrence.value;
}
