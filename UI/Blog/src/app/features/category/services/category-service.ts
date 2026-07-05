import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, InputSignal, signal } from '@angular/core';
import { addCategoryRequest, category, editCategoryRequest } from '../models/category.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private apiBaseUrl = environment.API_BASE_URL;

  addCategory(category: addCategoryRequest) {
    return this.http.post(`${this.apiBaseUrl}/api/Categories`, category);
  }

  getAllCategories() {
    return httpResource<category[]>(() => `${this.apiBaseUrl}/api/Categories`);
  }

  getCategoryById(id: InputSignal<string | undefined>) {
    return httpResource<category>(() => `${this.apiBaseUrl}/api/Categories/${id()}`);
  }

  editCategory(id: string, category: editCategoryRequest) {
    return this.http.put(`${this.apiBaseUrl}/api/Categories/${id}`, category);
  }

  deleteCategory(id: string) {
    return this.http.delete<category | null>(`${this.apiBaseUrl}/api/Categories/${id}`);
  }
}
