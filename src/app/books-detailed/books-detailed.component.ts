import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LendBookDialogComponent } from './lend-book-dialog-component/lend-book-dialog.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-books-detailed',
  templateUrl: './books-detailed.component.html',
  styleUrls: ['./books-detailed.component.scss']
})
export class BooksDetailedComponent implements OnInit {
  id:any;
  displayedColumns: string[] = ['id', 'name',"year","author","rating","owner","actions"];
  dataSource: any;
  userList:any;
    constructor(private bookService:BookService,private routes:ActivatedRoute, private dialog: MatDialog,private userService:UserService){
      routes.params.subscribe((params:Params)=>{
        this.id = params["id"]
      })
    }
  ngOnInit(): void {
    this.userService.getUserList().then((res:any)=>{
      this.userList = res
    })
    this.bookService.getBookById(this.id).then((res:any)=>{
      const param = [{
        id:res.id,
        name:res.name,
        year: res.book_detail[0].year,
        author:res.book_detail[0].author,
        rating:res.book_detail[0].rating,
        owner:res.book_detail[0].owner,
      }]
      this.dataSource = param
    })

  }
  lendTheBook(element: any) {
    const params = {
      bookId: element.id,
      bookName: element.name
    };
    const dialogRef = this.dialog.open(LendBookDialogComponent, {
      width: '500px',
      height: '300px',
      data: params
    });

    dialogRef.afterClosed().subscribe(() => {
      window.location.reload()
    });
  }
  getOwnerName(owner:any){
    const filtereUser = this.userList.filter((val:any)=> val.id === owner)[0]
    return filtereUser.name
  }
  }

