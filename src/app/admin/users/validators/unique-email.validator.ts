import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { DataService } from "../../../services/data.service";
import { catchError, map, Observable, of } from "rxjs";

@Injectable()
export class UniqueEmailValidator implements AsyncValidator {

  constructor(private userDataService: DataService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.userDataService.isEmailTaken(control.value)
      .pipe(
        map(isTaken => (isTaken ? {existingEmail: true} : null)),
        catchError(() => of(null))
      );
  }
}
