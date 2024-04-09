import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, Subject, takeUntil, throwError } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { CookieService } from "ngx-cookie-service";
import { LoginComponent } from "../../../auth/components/login/login.component";
import { StoreService } from "../../../services/store.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {

  isLoggedIn = false;
  userName = 'Login';

  private notifier$: Subject<null> = new Subject();

  constructor(
    public dialog: MatDialog,
    private storeService: StoreService,
    private cookie: CookieService,
  ) {}

  ngOnInit() {
    this.setLoginStatus();
  }

  ngOnDestroy() {
    this.notifier$.next(null);
    this.notifier$.complete();
  }

  onLogin() {
    this.dialog.open(LoginComponent, {width: '350px'});
  }

  private setLoginStatus() {
    this.storeService.isLoggedInUser$
      .pipe(
        takeUntil(this.notifier$),
        catchError((err) => throwError(() => err))
      )
      .subscribe((res) => {
        if (res) {
          this.isLoggedIn = true;
          this.userName = JSON.parse(this.cookie.get('user')).userName;
        } else {
          this.isLoggedIn = false;
          this.userName = 'Login';
        }
      });
  }
}
