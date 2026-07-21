import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImageSelectorService } from '../../services/image-selector-service';

@Component({
  selector: 'app-image-selector',
  imports: [ReactiveFormsModule],
  templateUrl: './image-selector.html',
  styleUrl: './image-selector.css',
})
export class ImageSelector {
  imageSelectorService = inject(ImageSelectorService);

  imageSelectorFormGroup = new FormGroup({
    file: new FormControl<File | null | undefined>(null, Validators.required),
    imageName: new FormControl<string>('', Validators.required),
    title: new FormControl<string>('', Validators.required),
  });

  onFileSelected(event: Event) {
    const imagePathArr = `${this.imageSelectorFormGroup.value.file}`.split('\\');
    const input = event.target as HTMLInputElement;

    this.imageSelectorFormGroup.patchValue({
      imageName: imagePathArr[imagePathArr.length - 1].split('.')[0],
    });

    if (input.files && input.files.length > 0) {
      this.imageSelectorFormGroup.patchValue({
        file: input.files[0],
      });
    }
  }

  onSubmit() {
    if (this.imageSelectorFormGroup.valid) {
      let formValue = this.imageSelectorFormGroup.value;
      this.imageSelectorService
        .uploadImage(formValue.file!, formValue.imageName!, formValue.title!)
        .subscribe({
          next: (result) => console.log(result),
          error: () => console.log('Something went wrong trying to updload image'),
        });
    }
  }
}
