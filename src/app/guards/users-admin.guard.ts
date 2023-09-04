import { inject } from "@angular/core";
import { UserDataService } from "../user-data.service";
import { Router } from "@angular/router";
import { map, take } from "rxjs";

export const authGuard = () => {

  const userDataService = inject(UserDataService);
  const router = inject(Router);

  return userDataService.isLoggedInUser$
    .pipe(
      take(1),
      map((res) => {
        if (!res) {
          router.navigate(['/']).then();
          return false;
        }
        return true;
      })
    )
}
