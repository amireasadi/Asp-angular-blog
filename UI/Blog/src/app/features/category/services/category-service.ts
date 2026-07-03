import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { addCategoryRequest, category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private apiBaseUrl = 'http://localhost:5224';

  public addCategoryStatus = signal<'idle' | 'error' | 'loading' | 'success'>('idle');

  addCategory(category: addCategoryRequest) {
    this.addCategoryStatus.set('loading');
    this.http.post(`${this.apiBaseUrl}/api/Categories`, category).subscribe({
      next: (result) => {
        this.addCategoryStatus.set('success');
      },
      error: (err) => {
        this.addCategoryStatus.set('error');
        console.log(err);
      },
    });
  }

  getAllCategories() {
    return httpResource<category[]>(() => `${this.apiBaseUrl}/api/Categories`);
  }
}
