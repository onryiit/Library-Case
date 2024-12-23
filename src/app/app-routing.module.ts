import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { BooksComponent } from './books/books.component';
import { BooksDetailedComponent } from './books-detailed/books-detailed.component';
const routes: Routes = [
  { path: '', component: UserListComponent,},
  { path: 'user-list', component: UserListComponent,},
  { path: 'user-list/:id', component: UserDetailsComponent,},
  { path: 'books', component: BooksComponent,},
  { path: 'books/:id', component: BooksDetailedComponent,},
  { path: '**', redirectTo: '/404' }, // 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
