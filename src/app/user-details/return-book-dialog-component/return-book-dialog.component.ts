import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from 'src/app/book.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-return-book-dialog',
  templateUrl: './return-book-dialog.component.html',
  styleUrls: ['./return-book-dialog.component.scss']
})
export class ReturnBookDialogComponent implements OnInit {
  rating: number = 0;

  constructor(
    public dialogRef: MatDialogRef<ReturnBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private bookService: BookService,
    public snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {}

  validateRating(): void {
    if (this.rating < 1) {
      this.rating = 1;
    } else if (this.rating > 5) {
      this.rating = 5;
    }
  }

  onCancel(): void {
    this.dialogRef.close({ confirmed: false });
  }

  onConfirm(): void {

    if (!this.rating || this.rating < 1 || this.rating > 5) {
      this.snackBar.open("Please enter a valid rating between 1 and 5.", "Close", {
        duration: 3000,
      });
      return;
    }

    this.userService.updateUserById(this.data.userId, this.data.bookId, this.rating).then(() => {
      return this.bookService.uptadeOwner(this.data.bookId, "");
    }).then(() => {
      this.snackBar.open("The book has been returned successfully!", "Close", {
        duration: 3000,
      });
      this.dialogRef.close({ confirmed: true });
    }).catch((error) => {
      console.error("Error during book return process:", error);
      this.snackBar.open("An error occurred while returning the book. Please try again later.", "Close", {
        duration: 5000,
      });
    });
  }
}
