import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory {
  form = new FormGroup({
    title: new FormControl(''),
    url: new FormControl(''),
  });

  onSubmit() {
    console.log(this.form.value);
    this.form.reset();
  }
}
