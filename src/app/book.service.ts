import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "./environment";

@Injectable({
    providedIn: "any",
})
export class BookService {
    routeParams: any;
    userList: any[] = [];
    onUserChanged: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(private httpClient: HttpClient) {}

    /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {}

    getBookList(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpClient.get(environment.apiEndpoint + "books/getAllBooks").subscribe((response: any) => {
                this.userList = response;
                this.onUserChanged.next(this.userList);
                resolve(this.userList);
            }, reject);
        });
    }
    getBookById(id:any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpClient.get(environment.apiEndpoint + "books/getBookById/"+id).subscribe((response: any) => {
                resolve(response);
            }, reject);
        });
    }
    uptadeOwner(book_id:any,owner_id:any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpClient.put(environment.apiEndpoint + "books/updateOwner/"+book_id,{
              owner:owner_id
            }).subscribe((response: any) => {
                resolve(response);
            }, reject);
        });
    }
  }
