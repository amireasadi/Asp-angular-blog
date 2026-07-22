import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IBlogImage } from '../models/BlogImage.model';

@Injectable({
  providedIn: 'root',
})
export class ImageSelectorService {
  http = inject(HttpClient);
  private apiBaseUrl = environment.API_BASE_URL;
  selectedImage = signal<string | null>(null);

  selectImage(imageUrl: string) {
    this.selectedImage.set(imageUrl);
  }

  uploadImage(file: File, fileName: string, title: string) {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('title', title);
    return this.http.post<IBlogImage>(`${this.apiBaseUrl}/api/images`, formData);
  }

  getAllImages() {
    return httpResource<IBlogImage[]>(() => `${this.apiBaseUrl}/api/images`);
  }
}
