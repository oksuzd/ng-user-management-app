import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { map, take } from "rxjs";
import { StoreService } from "../services/store.service";

export const authGuard = () => {

  const storeService: StoreService = inject(StoreService);
  const router: Router = inject(Router);

  return storeService.isLoggedInUser$
    .pipe(
      take(1),
      map((res) => {
        if (!res) {
          router.navigate(['/']).then();
          return false;
        }
        return true;
      })
    );
};
