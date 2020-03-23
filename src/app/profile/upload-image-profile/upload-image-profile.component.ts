import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { UploadInput } from 'ngx-uploader';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-upload-image-profile',
  templateUrl: './upload-image-profile.component.html',
  styleUrls: ['./upload-image-profile.component.scss']
})
export class UploadImageComponent implements OnInit {
  uploadInput: EventEmitter<UploadInput>;
  @ViewChild('fileInput', { static: true }) fileInputVar: ElementRef;
  @Input() name: string;
  @Input() url: string;
  @Output() imageAdded: EventEmitter<File> = new EventEmitter<File>();
  @Output() imageRemoved: EventEmitter<any> = new EventEmitter<any>();
  @Input() imageToSend: File;

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {}

  changeListener($event: any): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    let error: boolean;
    const _file: File = inputValue.files[0];
    if (this.verifyImage(_file)) {
      error = true;
    } else {
      this.imageToSend = _file;
    }
    if (error) {
      this.snackBar.open(
        `File was ignored. Only png,
          jpg or jpeg files are accepted with max size of 2M per file.`,
        'Ok',
        { duration: 3000 }
      );
    }
    this.imageAdded.emit(this.imageToSend);
  }

  removeImage() {
    this.fileInputVar.nativeElement.value = '';
    this.imageRemoved.emit();
  }

  private verifyImage(_file: File) {
    return (
      (_file.type !== 'image/png' && _file.type !== 'image/jpg' && _file.type !== 'image/jpeg') ||
      _file.size / 1024 / 1024 > 2
    );
  }
}
