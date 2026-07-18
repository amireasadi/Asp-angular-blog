import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IAddBlogPostRequest, IBlogPost, IEditBlogPostRequest } from '../models/addBlogpostRequest';

@Injectable({
  providedIn: 'root',
})
export class BlogpostService {
  private http = inject(HttpClient);
  private apiBaseUrl = environment.API_BASE_URL;

  addBlogPost(body: IAddBlogPostRequest) {
    return this.http.post<IBlogPost>(`${this.apiBaseUrl}/api/blogposts`, body);
  }

  getAllBlogPosts() {
    return httpResource<IBlogPost[]>(() => `${this.apiBaseUrl}/api/blogposts`);
  }

  getBlogPostById(id: string) {
    return this.http.get<IBlogPost>(`${this.apiBaseUrl}/api/blogposts/${id}`);
  }

  editBlogPost(id: string, body: IEditBlogPostRequest) {
    return this.http.put<IBlogPost>(`${this.apiBaseUrl}/api/blogposts/${id}`, body);
  }

  deleteBlogPost(id: string) {
    return this.http.delete<IBlogPost>(`${this.apiBaseUrl}/api/blogposts/${id}`);
  }
}
