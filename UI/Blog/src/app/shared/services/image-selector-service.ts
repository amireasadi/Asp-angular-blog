import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageSelectorService {
  http = inject(HttpClient);
  private apiBaseUrl = environment.API_BASE_URL;

  uploadImage(file: File, fileName: string, title: string) {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('title', title);
    return this.http.post(`${this.apiBaseUrl}/api/images`, formData);
  }
}
