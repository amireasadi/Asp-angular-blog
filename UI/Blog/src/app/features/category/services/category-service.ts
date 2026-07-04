import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, InputSignal, signal } from '@angular/core';
import { addCategoryRequest, category } from '../models/category.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private apiBaseUrl = environment.API_BASE_URL;

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

  getCategoryById(id: InputSignal<string | undefined>) {
    return httpResource<category>(() => `${this.apiBaseUrl}/api/Categories/${id()}`);
  }
}
