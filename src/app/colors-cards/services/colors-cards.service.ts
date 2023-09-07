import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { ColorCardDataResponse, ColorsCardsResponse } from "../../models/response.model";
import { REQUEST_URL } from "../../shared/constants";
import { ColorCard } from "../../models/color-cards.model";

@Injectable()
export class ColorsCardsService {

  constructor(
    private http: HttpClient,
  ) {}

  getColorsCards(): Observable<ColorCard[]> {
    return this.http.get<ColorsCardsResponse>(REQUEST_URL + 'cards')
      .pipe(map((res) => this.getMappedColorCards(res.data)));
  }

  private getMappedColorCards(cards: ColorCardDataResponse[]): ColorCard[] {
    return cards.map((user) => user);
  }
}
