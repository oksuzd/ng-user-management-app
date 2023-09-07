import { Component, Input } from '@angular/core';
import { ColorCard } from "../../../models/color-cards.model";
import { Position, TitleBorder, AngleRotate, Expand } from "./color-card-item.animations";

@Component({
  selector: 'app-color-card-item',
  templateUrl: './color-card-item.component.html',
  styleUrls: ['./color-card-item.component.scss'],
  animations: [Position, TitleBorder, AngleRotate, Expand],
})
export class ColorCardItemComponent {
  @Input() public card!: ColorCard;
  isExpanded = false;
  state: string = 'default';

  expand() {
    this.isExpanded = !this.isExpanded;
    this.state = (this.state === 'default' ? 'changed' : 'default');
  }
}
