import { Component, effect, inject, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';
import { BlogpostService } from '../services/blogpost-service';
import { CategoryService } from '../../category/services/category-service';
import { IEditBlogPostRequest } from '../models/addBlogpostRequest';
import { Router } from '@angular/router';
import { ImageSelector } from '../../../shared/components/image-selector/image-selector';
import { ImageSelectorService } from '../../../shared/services/image-selector-service';

@Component({
  selector: 'app-edit-blogpost',
  imports: [ReactiveFormsModule, MarkdownComponent, ImageSelector],
  templateUrl: './edit-blogpost.html',
  styleUrl: './edit-blogpost.css',
})
export class EditBlogpost implements OnInit {
  id = input<string>();
  router = inject(Router);
  blogpostService = inject(BlogpostService);
  categoryService = inject(CategoryService);
  imageService = inject(ImageSelectorService);

  private getAllCategoryRefrence = this.categoryService.getAllCategories();
  categoriesResult = this.getAllCategoryRefrence.value;

  ngOnInit(): void {
    this.blogpostService.getBlogPostById(this.id()!).subscribe({
      next: (result) => {
        this.editBlogpostFormGroup.patchValue({
          title: result.title,
          author: result.author,
          categories: result.categories.map((c) => c.id),
          content: result.content,
          featuredImageUrl: result.featuredImageUrl,
          isVisible: result.isVisible,
          publishedDate: new Date(result.publishedDate).toISOString().split('T')[0],
          shortDescription: result.shortDescription,
          urlHandle: result.urlHandle,
        });
      },
      error: () => {
        console.error('Something went wrong trying to get selected post!');
      },
    });
  }

  editBlogpostFormGroup = new FormGroup({
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
    categories: new FormControl<string[]>([]),
  });

  selectedImageEffectref = effect(() => {
    const selectedImageUrl = this.imageService.selectedImage();
    if (selectedImageUrl) {
      this.editBlogpostFormGroup.patchValue({
        featuredImageUrl: selectedImageUrl,
      });
    }
  });

  onSubmit() {
    let id = this.id();
    if (this.editBlogpostFormGroup.valid && id) {
      let formValue = this.editBlogpostFormGroup.value;
      let editReq: IEditBlogPostRequest = {
        title: formValue.title!,
        author: formValue.author!,
        categories: formValue.categories ?? [],
        content: formValue.content!,
        featuredImageUrl: formValue.featuredImageUrl!,
        isVisible: formValue.isVisible!,
        publishedDate: new Date(formValue.publishedDate!),
        shortDescription: formValue.shortDescription!,
        urlHandle: formValue.urlHandle!,
      };

      this.blogpostService.editBlogPost(id, editReq).subscribe({
        next: (result) => {
          console.log(result);
          this.router.navigate(['admin/blogposts']);
        },
        error: () => {
          console.error('Something went wrong trying edit the selected post.');
        },
      });
    }
  }

  deletePost() {
    let id = this.id();
    if (id) {
      this.blogpostService.deleteBlogPost(id).subscribe({
        next: (result) => {
          console.log(result);
          this.router.navigate(['admin/blogposts']);
        },
        error: () => {
          console.error('Something went wrong trying to delete selected post.');
        },
      });
    }
  }
}
