import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { addCategoryRequest } from '../models/category.model';
import { CategoryService } from '../services/category-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory {
  constructor() {
    effect(() => {
      if (this.categoryService.addCategoryStatus() === 'success') {
        this.categoryService.addCategoryStatus.set('idle');
        this.router.navigate(['/admin/categories']);
      }
      if (this.categoryService.addCategoryStatus() === 'error') {
        this.categoryService.addCategoryStatus.set('idle');
        console.log('Something went wrong trying to add category');
      }
    });
  }

  categoryService = inject(CategoryService);
  router = inject(Router);

  addCategoryFormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
    ]),
    url: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
    ]),
  });

  get nameFormControl() {
    return this.addCategoryFormGroup.controls.title;
  }
  get urlFormControl() {
    return this.addCategoryFormGroup.controls.url;
  }

  showError(name: FormControl): string {
    if (name.invalid && (name.dirty || name.touched)) {
      if (name.hasError('required')) {
        return `این فیلد اجباری است.`;
      }
      if (name.hasError('minlength')) {
        return `حداقل ۲ کاراکتر `;
      }
      if (name.hasError('maxlength')) {
        return `حداکثر ۱۰۰ کاراکتر`;
      }
    }
    return '';
  }

  onSubmit() {
    if (this.addCategoryFormGroup.valid) {
      let addCategoryFormValue = this.addCategoryFormGroup.value;
      let addCategoryRequst: addCategoryRequest = {
        name: addCategoryFormValue.title!,
        urlHandle: addCategoryFormValue.url!,
      };
      this.categoryService.addCategory(addCategoryRequst);
      this.addCategoryFormGroup.reset();
    } else {
      console.log('Err');
    }
  }
}
