import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ReturnBookDialogComponent } from './return-book-dialog-component/return-book-dialog.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  id: any;
  displayedColumns: string[] = ['id', 'name', 'date', "actions"];
  dataSource: any;
  displayedColumns2: string[] = ['id', 'name', 'date', "score"];
  dataSource2: any;

  constructor(
    private userService: UserService,
    private routes: ActivatedRoute,
    private dialog: MatDialog,
    private cdr :ChangeDetectorRef
  ) {
    routes.params.subscribe((params: Params) => {
      this.id = params["id"];
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.getUserById(this.id).then((res: any) => {
      this.dataSource = res.books;
      this.dataSource2 = res.previouslyBook;
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

    dialogRef.afterClosed().subscribe(() => {
      this.loadUserData();
      // window.location.reload()
    });
  }
}
