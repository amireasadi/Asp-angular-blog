import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IAddBlogPostRequest, IBlogPost } from '../models/addBlogpostRequest';

@Injectable({
  providedIn: 'root',
})
export class BlogpostService {
  private http = inject(HttpClient);
  private apiBaseUrl = environment.API_BASE_URL;

  addCategory(blogPost: IAddBlogPostRequest) {
    return this.http.post<IBlogPost>(`${this.apiBaseUrl}/api/blogposts`, blogPost);
  }
}
