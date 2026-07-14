import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogpostService } from '../services/blogpost-service';
import { IAddBlogPostRequest } from '../models/addBlogpostRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blogpost',
  imports: [ReactiveFormsModule],
  templateUrl: './add-blogpost.html',
  styleUrl: './add-blogpost.css',
})
export class AddBlogpost {
  blogpostService = inject(BlogpostService);
  router = inject(Router);

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
    let formValue = this.addBlogpostFormGroup.value;
    let blogPostReq: IAddBlogPostRequest = {
      title: formValue.title!,
      shortDescription: formValue.shortDescription!,
      content: formValue.content!,
      featuredImageUrl: formValue.featuredImageUrl!,
      urlHandle: formValue.urlHandle!,
      publishedDate: new Date(formValue.publishedDate!),
      author: formValue.author!,
      isVisible: formValue.isVisible!,
    };

    this.blogpostService.addCategory(blogPostReq).subscribe({
      next: (result) => {
        console.log(result);
        this.router.navigate(['admin/blogposts']);
      },
      error: () => {
        console.error('Something went wring trying to creaet new blog post');
      },
    });
  }
}
