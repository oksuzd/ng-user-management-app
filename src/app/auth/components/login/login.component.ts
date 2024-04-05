import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { UserDataService } from "../../../services/user-data.service";
import { UserLogin, userToken } from "../../../models/login.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, map, mergeMap, Subject, take, takeUntil, throwError } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { User } from "../../../models/user.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {

  isUserLoggedIn = false;
  loginForm: FormGroup = this.fb.group({
    email: ['eve.holt@reqres.in', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  private notifier$: Subject<null> = new Subject();

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private userDataService: UserDataService,
    private cookie: CookieService,
    private router: Router
  ) {
  }

  ngOnInit() {
    if (this.cookie.check('user')) {
      const loggedUser = JSON.parse(this.cookie.get('user'));
      this.loginForm.setValue({
        email: loggedUser.email,
        password: ''
      });
      this.loginForm.get('email')?.disable();
      this.isUserLoggedIn = true;
    }
  }

  ngOnDestroy() {
    this.notifier$.next(null);
    this.notifier$.complete();
  }

  onCancelClick() {
    this.dialogRef.close();
  }


  onLogInClick(userLoginData: UserLogin) {
    this.userDataService.logInUser(userLoginData)
      .pipe(
        mergeMap((token: userToken) => {
          return this.userDataService.getUsersFromServer()
            .pipe(
              map((users: User[]) => {
                const loggedUser = users.filter((userFullData) => userFullData.email === userLoginData.email);
                return this.getStringCookieValue(loggedUser[0], token);
              })
            );
        }),
        take(1),
        takeUntil(this.notifier$),
        catchError(err => {
          if (err.status === 400) {
            this.snackBar.open('User not found', ' X ');
          }
          return throwError(() => err);
        })
      )
      .subscribe((res) => {
        if (res) {
          this.cookie.set('user', res, {expires: 3});
          this.userDataService.setUserLoginStatus(!!res);
          this.dialogRef.close();
        }
      });
  }

  onLogOutClick() {
    this.userDataService.isLoggedInUser$
      .pipe(
        take(1),
        takeUntil(this.notifier$),
        catchError((err) => throwError(() => err))
      )
      .subscribe((res) => {
        if (res) {
          this.cookie.deleteAll();
          this.loginForm.setValue({
            email: '',
            password: ''
          });
          this.isUserLoggedIn = false;
          this.loginForm.get('email')?.enable();
          this.userDataService.setUserLoginStatus(false);
          this.router.navigate(['/']).then();
        }
      });
  }

  isValid(controlName: string): boolean | undefined {
    const control = this.loginForm.get(controlName);
    return !(control?.invalid && (control?.dirty || control?.touched));
  }

  hasError(controlName: string, error: string): boolean | undefined {
    const control = this.loginForm.get(controlName);
    return control?.hasError(error) && (control?.dirty || control?.touched);
  }

  private getStringCookieValue(user: User, tokenData: userToken): string {
    return JSON.stringify({
      email: user.email,
      userName: `${user.firstName} ${user.lastName}`,
      token: tokenData.token
    });
  }
}
