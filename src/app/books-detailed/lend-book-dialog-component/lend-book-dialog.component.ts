import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/user.service';
import { LendBook } from './lend-book-dialog.model';
import { BookService } from 'src/app/book.service';

@Component({
  selector: 'app-lend-book-dialog',
  templateUrl: './lend-book-dialog.component.html',
  styleUrls: ['./lend-book-dialog.component.scss']
})
export class LendBookDialogComponent implements OnInit {
  currentForm: FormGroup;
  lendDetails: any;
  userList: any;

  constructor(
    public dialogRef: MatDialogRef<LendBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private bookService: BookService,
    private formBuilder: FormBuilder,
  ) {
    this.lendDetails = new LendBook({});
    this.currentForm = this.formBuilder.group({
      user: [this.lendDetails.user || [], Validators.required],
    });
  }

  ngOnInit(): void {
    this.userService.getUserList().then((res) => {
      this.userList = res;
    });
  }

  onCancel(): void {
    this.dialogRef.close({ confirmed: false });
  }

  onConfirm(): void {
    const formValue = this.currentForm.getRawValue();
    this.userService.lendBookById(formValue.user,this.data.bookId,this.data.bookName)
    this.bookService.uptadeOwner(this.data.bookId,formValue.user)
    this.dialogRef.close();
  }
}
