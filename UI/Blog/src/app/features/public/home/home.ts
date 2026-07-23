import { Component, inject } from '@angular/core';
import { BlogpostService } from '../../blogpost/services/blogpost-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  blogpostService = inject(BlogpostService);
  blogpostsref = this.blogpostService.getAllBlogPosts();
  isLoading = this.blogpostsref.isLoading;
  error = this.blogpostsref.error;
  blogposts = this.blogpostsref.value;
}
