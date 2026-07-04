import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../services/category-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export class CategoryList {
  private categoryService = inject(CategoryService);
  private getAllCategoryRefrence = this.categoryService.getAllCategories();
  isLoading = this.getAllCategoryRefrence.isLoading;
  error = this.getAllCategoryRefrence.error;
  value = this.getAllCategoryRefrence.value;
}
