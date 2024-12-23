import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'date'];
  dataSource: any;
  errorMessage: string | null = null;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBookList()
      .then((res: any) => {
        this.dataSource = res || [];
        this.errorMessage = null;
      })
      .catch((error: any) => {
        console.error('Error fetching book list', error);
        this.errorMessage = 'Failed to load books. Please try again later.';
      });
  }
}
