import { Component, effect, inject, input } from '@angular/core';
import { CategoryService } from '../services/category-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.css',
})
export class EditCategory {
  private categoryService = inject(CategoryService);
  id = input<string>();
  private getCategoryByIdRef = this.categoryService.getCategoryById(this.id);
  isLoading = this.getCategoryByIdRef.isLoading;
  error = this.getCategoryByIdRef.error;
  value = this.getCategoryByIdRef.value;

  editCategoryFormGroup = new FormGroup({
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
    return this.editCategoryFormGroup.controls.title;
  }
  get urlFormControl() {
    return this.editCategoryFormGroup.controls.url;
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
  effectRef = effect(() => {
    this.editCategoryFormGroup.controls.title.patchValue(this.value()?.name ?? '');
    this.editCategoryFormGroup.controls.url.patchValue(this.value()?.urlHandle ?? '');
  });

  onSubmit() {
    console.log(this.editCategoryFormGroup.value);
  }
}
