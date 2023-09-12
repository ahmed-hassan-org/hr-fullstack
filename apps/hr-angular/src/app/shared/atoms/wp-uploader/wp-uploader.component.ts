import { ImageUtil } from './../../../../../../../libs/wapel-lib/src/lib/shared/utils/ImageUtil';
import { Component, EventEmitter, Output, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '@wapelSharedLib/shared/PrimeNg.module';

@Component({
  selector: 'hr-wp-uploader',
  standalone: true,
  imports: [CommonModule, PrimeNgModule],
  templateUrl: './wp-uploader.component.html',
  styleUrls: ['./wp-uploader.component.scss'],
})
export class WpUploaderComponent {
  /** an event emitter after upload item completed */
  @Output() afterUploadEv: EventEmitter<any> = new EventEmitter(true);
  /** an event emitter after user delete the item */
  @Output() afterRemoveEv: EventEmitter<any> = new EventEmitter(true);
  @Input() extensions = signal([]);
  selectedImage = signal('');
  selectedImageFile = signal<Blob>(new Blob());
  imageBase = signal('');
  isImageSelected = signal(false);

  // Image Preview
  async showPreview(event: any) {
    const file = event.target.files[0];
    this.selectedImageFile.set(file);
    if (file) {
      const reader = new FileReader();
      const imageBase = (await ImageUtil.blobToBase64(file)) as string;
      this.imageBase.set(imageBase);
      reader.onload = (e: any) => {
        this.selectedImage.set(e.target.result);
      };

      reader.readAsDataURL(this.selectedImageFile());
      this.isImageSelected.set(true);
    }
  }

  removeFile() {
    this.selectedImage.set('');
    this.selectedImageFile.set(new Blob());
    this.isImageSelected.set(false);
    this.imageBase.set('');
  }

  uploadSelectedFile() {
    console.log('upload start well');
    this.afterUploadEv.emit({
      uploaded: true,
      done: true,
      data: this.imageBase(),
    });
  }
}
