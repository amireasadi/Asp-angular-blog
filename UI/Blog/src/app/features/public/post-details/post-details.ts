import { Component, inject, input, OnInit } from '@angular/core';
import { BlogpostService } from '../../blogpost/services/blogpost-service';
import { DatePipe, JsonPipe } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-post-details',
  imports: [DatePipe, MarkdownComponent],
  templateUrl: './post-details.html',
  styleUrl: './post-details.css',
})
export class PostDetails {
  url = input<string>();
  blogpostService = inject(BlogpostService);
  getByUrlRef = this.blogpostService.getBlogPostByUrlHandle(this.url);
  isLoading = this.getByUrlRef.isLoading;
  error = this.getByUrlRef.error;
  post = this.getByUrlRef.value;
}
