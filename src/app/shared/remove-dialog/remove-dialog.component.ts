import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'ccd-remove-dialog',
  templateUrl: './remove-dialog.component.html',
  styleUrls: ['./remove-dialog.component.scss']
})
export class RemoveDialogComponent implements OnInit {

  result: string;

  constructor(private matDialogRef: MatDialogRef<RemoveDialogComponent>) {}

  ngOnInit() {
  }

  remove() {
    this.result = 'Remove';
    this.matDialogRef.close(this.result);
  }
  cancel() {
    this.result = 'Cancel';
    this.matDialogRef.close(this.result);
  }
}
