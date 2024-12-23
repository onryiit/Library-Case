import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'date'];
  dataSource: any;
  constructor(private userService:UserService) {}
  ngOnInit(): void {
    this.userService.getUserList().then((res:any)=>{
      this.dataSource = res
    })

  }
}
