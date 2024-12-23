import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'date'];
  dataSource: any = [];

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUserList();
  }

  loadUserList(): void {
    this.userService.getUserList()
      .then((res: any) => {
        this.dataSource = res || [];
      })
      .catch((error) => {
        console.error("Error fetching user list:", error);
        this.snackBar.open("An error occurred while loading the user list. Please try again later.", "Close", {
          duration: 5000,
        });
      });
  }
}
