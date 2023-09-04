import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _isLoad$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly isLoad$: Observable<boolean> = this._isLoad$.asObservable();

  setIsLoad(status: boolean) {
    this._isLoad$.next(status);
  }
}
