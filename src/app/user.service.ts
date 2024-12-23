import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "./environment";

@Injectable({
    providedIn: "any",
})
export class UserService {
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

    getUserList(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpClient.get(environment.apiEndpoint + "users/getAllUsers").subscribe((response: any) => {
                this.userList = response;
                this.onUserChanged.next(this.userList);
                resolve(this.userList);
            }, reject);
        });
    }
    getUserById(id:any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpClient.get(environment.apiEndpoint + "users/getUserById/"+id).subscribe((response: any) => {
                resolve(response);
            }, reject);
        });
    }
    updateUserById(user_id:any,bookId:any,rating:any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpClient.put(environment.apiEndpoint + "users/returnBook/"+user_id,{
              bookId:bookId,
              rating:rating
            }).subscribe((response: any) => {
                resolve(response);
            }, reject);
        });
    }
    lendBookById(user_id:any,bookId:any,name:any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpClient.put(environment.apiEndpoint + "users/lendBook/"+user_id,{
              bookId:bookId,
              name:name
            }).subscribe((response: any) => {
                resolve(response);
            }, reject);
        });
    }
  }
