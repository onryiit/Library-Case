import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReturnBookDialogComponent } from './return-book-dialog-component/return-book-dialog.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  id: any;
  displayedColumns: string[] = ['id', 'name', 'date', "actions"];
  dataSource: any = [];
  displayedColumns2: string[] = ['id', 'name', 'date', "score"];
  dataSource2: any = [];

  constructor(
    private userService: UserService,
    private routes: ActivatedRoute,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {
    routes.params.subscribe((params: Params) => {
      this.id = params["id"];
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.getUserById(this.id)
      .then((res: any) => {
        this.dataSource = res.books || [];
        this.dataSource2 = res.previouslyBook || [];
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        this.snackBar.open("An error occurred while loading user data. Please try again later.", "Close", {
          duration: 5000,
        });
      });
  }

  returnTheBook(element: any): void {
    const params = {
      bookId: element.id,
      userId: this.id
    };
    const dialogRef = this.dialog.open(ReturnBookDialogComponent, {
      width: '500px',
      height: '250px',
      data: params
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.confirmed) {
        this.snackBar.open("Book returned successfully!", "Close", {
          duration: 3000,
        });
        this.loadUserData();
      } else if (result && !result.confirmed) {
        this.snackBar.open("Book return was canceled.", "Close", {
          duration: 3000,
        });
      } else {
        console.warn("Dialog closed without any result.");
      }
    }, (error) => {
      console.error("Error after dialog close:", error);
      this.snackBar.open("An unexpected error occurred.", "Close", {
        duration: 5000,
      });
    });
  }
}
