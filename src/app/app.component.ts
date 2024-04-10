import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoaderService } from "./interceptors/loader/loader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'User Management App';

  constructor(public loaderService: LoaderService) {}
}
