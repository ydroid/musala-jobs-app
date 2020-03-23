import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogOptions {
  title: string;
  content: string;
  showNoBtn?: boolean;
  noBtnText?: string;
  yesBtnText?: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  options: DialogOptions;

  constructor(public dialogRef: MatDialogRef<DialogComponent>) {}

  ngOnInit() {}

  accept() {
    this.dialogRef.close(true);
  }
  cancel() {
    this.dialogRef.close(false);
  }
}
