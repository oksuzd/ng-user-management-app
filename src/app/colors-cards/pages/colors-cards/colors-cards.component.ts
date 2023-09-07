import { Component, OnDestroy, OnInit } from '@angular/core';
import { ColorCard } from "../../../models/color-cards.model";
import { ColorsCardsService } from "../../services/colors-cards.service";
import { catchError, Subject, take, takeUntil, throwError } from "rxjs";

@Component({
  selector: 'app-colors-cards',
  templateUrl: './colors-cards.component.html',
  styleUrls: ['./colors-cards.component.scss']
})
export class ColorsCardsComponent implements OnInit, OnDestroy {

  cards: ColorCard[] = [];
  private notifier$: Subject<null> = new Subject();


  constructor(
    private colorsCardsService: ColorsCardsService
  ) {}

  ngOnInit() {
    this.colorsCardsService.getColorsCards()
      .pipe(
        take(1),
        takeUntil(this.notifier$),
        catchError((err) => throwError(() => err))
      )
      .subscribe((res) => this.cards = res);
  }

  ngOnDestroy() {
    this.notifier$.next(null);
    this.notifier$.complete();
  }
}
