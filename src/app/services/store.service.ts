import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user.model";
import { CookieService } from "ngx-cookie-service";
import { UserLogin, userToken } from "../models/login.model";
import { REQUEST_URL } from "../shared/constants";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private cookie: CookieService,
    private http: HttpClient,
  ) {}

  private _isLoggedInUser$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.cookie.check('user'));
  readonly isLoggedInUser$: Observable<boolean> = this._isLoggedInUser$.asObservable();

  private _usersList$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  logInUser(user: UserLogin): Observable<userToken> {
    return this.http.post<userToken>(REQUEST_URL + 'login', user);
  }

  setUserLoginStatus(status: boolean) {
    this._isLoggedInUser$.next(status);
  }

  setUsersList(data: User[]) {
    this._usersList$.next(data);
  }

  addUserToTheList(newUser: User) {
    const userList = this.getUsersList();
    userList.push(newUser);
    this.setUsersList(userList);
  }

  getUsersList(): User[] {
    return this._usersList$.getValue();
  }
}
