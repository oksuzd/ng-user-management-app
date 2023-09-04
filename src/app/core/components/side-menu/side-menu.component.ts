import {Component, OnDestroy, OnInit} from '@angular/core';
import { catchError, Subject, takeUntil, throwError } from "rxjs";
import { UserDataService } from "../../../user-data.service";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})

export class SideMenuComponent implements OnInit, OnDestroy {

  isLoggedIn = false;
  private notifier$: Subject<null> = new Subject();

  constructor(
    private userDataService: UserDataService,
  ) {}

  ngOnInit() {
    this.userDataService.isLoggedInUser$
      .pipe(
        takeUntil(this.notifier$),
        catchError((err) => throwError(() => err))
      )
      .subscribe((res) => this.isLoggedIn = res)
  }

  ngOnDestroy() {
    this.notifier$.next(null);
    this.notifier$.complete()
  }
}

