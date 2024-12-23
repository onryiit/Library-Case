import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import { PipeModule } from './core/pipes/pipe.module';
import { UserDetailsComponent } from './user-details/user-details.component';
import { BooksComponent } from './books/books.component';
import { BooksDetailedComponent } from './books-detailed/books-detailed.component';
import { UserService } from './user.service';
import { BookService } from './book.service';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ReturnBookDialogComponent } from './user-details/return-book-dialog-component/return-book-dialog.component';
import { LendBookDialogComponent } from './books-detailed/lend-book-dialog-component/lend-book-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailsComponent,
    BooksComponent,
    BooksDetailedComponent,
    ReturnBookDialogComponent,
    LendBookDialogComponent,

  ],
  imports: [
    HttpClientModule,
    PipeModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatChipsModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [UserService,BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
