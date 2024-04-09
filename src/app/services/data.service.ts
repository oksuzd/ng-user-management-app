import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserDataResponse, UserResponse } from "../models/response.model";
import { map, Observable, of } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { REQUEST_URL } from "../shared/constants";
import { User } from "../models/user.model";

@Injectable({providedIn: 'root'})
export class DataService {

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
  ) {
  }

  getUsersFromServer(): Observable<User[]> {
    return this.http.get<UserResponse>(REQUEST_URL + 'users')
      .pipe(
        map((res) => this.getMappedUsers(res.data))
      );
  }

  addNewUser(user: User): Observable<User> {
    return of(this.createUser(user));
  }

  /** reqres.in has no POST request, so it is emulated */
  createUser(user: User): User {
    const random: number = Math.floor(Math.random() * (70 - 7 + 1)) + 7;
    return {
      ...user,
      id: random,
      avatar: `https://i.pravatar.cc/64?img=${random}`
    };
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(REQUEST_URL + `users/${user.id}`, user);
  }

  deleteUser(id: number): Observable<boolean> {
    return this.http.delete<boolean>(REQUEST_URL + `users/${id}`);
  }

  isEmailTaken(email: string): Observable<boolean> {

    // let isEmailExist = false;
    //
    // return this.getUsersFromServer()
    //   .pipe(
    //     take(1),
    //     mergeMap((res) => {
    //       res.forEach((user) => {
    //         if (email === user.email) {
    //           isEmailExist = true;
    //         }
    //       })
    //       return of(isEmailExist)
    //     })
    //   )

    return of(false);
  }

  private getMappedUsers(users: UserDataResponse[]): User[] {
    return users.map((user) => {
      return {
        id: user.id,
        avatar: user.avatar,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email
      };
    });
  }
}
