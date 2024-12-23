import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LendBookDialogComponent } from './lend-book-dialog-component/lend-book-dialog.component';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-books-detailed',
  templateUrl: './books-detailed.component.html',
  styleUrls: ['./books-detailed.component.scss']
})
export class BooksDetailedComponent implements OnInit {
  id: any;
  displayedColumns: string[] = ['id', 'name', 'year', 'author', 'rating', 'owner', 'actions'];
  dataSource: any;
  userList: any;

  constructor(
    private bookService: BookService,
    private routes: ActivatedRoute,
    private dialog: MatDialog,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    routes.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.fetchData()
  }

  fetchData(){
        // Fetch User List
        this.userService.getUserList().then((res: any) => {
          this.userList = res;
        }).catch(error => {
          this.handleError('Failed to fetch user list', error);
        });

        // Fetch Book Details
        this.bookService.getBookById(this.id).then((res: any) => {
          if (res && res.book_detail && res.book_detail.length > 0) {
            const param = [{
              id: res.id,
              name: res.name,
              year: res.book_detail[0].year,
              author: res.book_detail[0].author,
              rating: res.book_detail[0].rating,
              owner: res.book_detail[0].owner,
            }];
            this.dataSource = param || [];
          } else {
            this.snackBar.open('No book details found!', 'Close', { duration: 3000 });
          }
        }).catch(error => {
          this.handleError('Failed to fetch book details', error);
        });
  }
  lendTheBook(element: any): void {
    const params = {
      bookId: element.id,
      bookName: element.name
    };
    const dialogRef = this.dialog.open(LendBookDialogComponent, {
      width: '500px',
      height: '300px',
      data: params
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.confirmed) {
        this.snackBar.open('Book lending process completed', 'Close', { duration: 3000 });
        this.reloadData();
      }
    });
  }

  getOwnerName(owner: any): string {
    if (!this.userList) {
      return 'Unknown';
    }
    const filteredUser = this.userList.filter((val: any) => val.id === owner)[0];
    return filteredUser ? filteredUser.name : 'Unknown';
  }

  private reloadData(): void {
    this.fetchData();
  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.snackBar.open(`${message}. Please try again later.`, 'Close', { duration: 5000 });
  }
}
