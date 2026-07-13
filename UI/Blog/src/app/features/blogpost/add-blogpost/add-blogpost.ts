import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-blogpost',
  imports: [ReactiveFormsModule],
  templateUrl: './add-blogpost.html',
  styleUrl: './add-blogpost.css',
})
export class AddBlogpost {
  addBlogpostFormGroup = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    shortDescription: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(100),
    ]),
    content: new FormControl<string>('', [Validators.required, Validators.minLength(10)]),
    featuredImageUrl: new FormControl<string>('', [Validators.maxLength(200)]),
    urlHandle: new FormControl<string>('', [Validators.required, Validators.maxLength(200)]),
    publishedDate: new FormControl<string>(new Date().toISOString().split('T')[0], [
      Validators.required,
    ]),
    author: new FormControl<string>('', [Validators.required, Validators.maxLength(200)]),
    isVisible: new FormControl<boolean>(true),
  });

  onSubmit() {
    console.log(this.addBlogpostFormGroup.value);
  }
}
