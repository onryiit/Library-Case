import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookService } from 'src/app/book.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-return-book-dialog',
  templateUrl: './return-book-dialog.component.html',
  styleUrls: ['./return-book-dialog.component.scss']
})
export class ReturnBookDialogComponent implements OnInit {
  rating: number = 0; // Kullanıcı tarafından girilen puan (1-5 arası)

  constructor(
    public dialogRef: MatDialogRef<ReturnBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService:UserService,
    private bookService:BookService
  ) {}

  ngOnInit(): void {
  }

  validateRating(): void {
    if (this.rating < 1) {
      this.rating = 1;
    } else if (this.rating > 5) {
      this.rating = 5;
    }
  }

  onCancel(): void {
    this.dialogRef.close({ confirmed: false});
  }

  onConfirm(): void {
    this.userService.updateUserById(this.data.userId,this.data.bookId,this.rating)
    this.bookService.uptadeOwner(this.data.bookId,"")
    this.dialogRef.close();
  }
}
