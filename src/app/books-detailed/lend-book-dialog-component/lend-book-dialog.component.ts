import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/user.service';
import { LendBook } from './lend-book-dialog.model';
import { BookService } from 'src/app/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lend-book-dialog',
  templateUrl: './lend-book-dialog.component.html',
  styleUrls: ['./lend-book-dialog.component.scss'],
})
export class LendBookDialogComponent implements OnInit {
  currentForm: FormGroup;
  lendDetails: any;
  userList: any;
  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<LendBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private bookService: BookService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.lendDetails = new LendBook({});
    this.currentForm = this.formBuilder.group({
      user: [this.lendDetails.user || [], Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadUserList();
  }

  loadUserList(): void {
    this.isLoading = true;
    this.userService
      .getUserList()
      .then((res) => {
        this.userList = res;
        this.isLoading = false;
      })
      .catch((error) => {
        this.isLoading = false;
        this.snackBar.open('Failed to load user list. Please try again.', 'Close', {
          duration: 3000,
        });
        console.error('Error loading user list:', error);
      });
  }

  onCancel(): void {
    this.dialogRef.close({ confirmed: false });
  }

  onConfirm(): void {
    if (this.currentForm.invalid) {
      this.snackBar.open('Please select a user to lend the book.', 'Close', {
        duration: 3000,
      });
      return;
    }

    const formValue = this.currentForm.getRawValue();
    this.isLoading = true;

    this.userService
      .lendBookById(formValue.user, this.data.bookId, this.data.bookName)
      .then(() => {
        return this.bookService.uptadeOwner(this.data.bookId, formValue.user);
      })
      .then(() => {
        this.snackBar.open('The book has been lent successfully.', 'Close', {
          duration: 3000,
        });
        this.dialogRef.close({ confirmed: true });
      })
      .catch((error) => {
        this.snackBar.open('Failed to lend the book. Please try again.', 'Close', {
          duration: 3000,
        });
        console.error('Error lending the book:', error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
