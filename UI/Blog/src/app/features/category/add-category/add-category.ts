import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory {
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
      console.log(this.addCategoryFormGroup.value);
      this.addCategoryFormGroup.reset();
    } else {
      console.log('Err');
    }
  }
}
