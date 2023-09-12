import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hr-title2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './title2.component.html',
  styleUrls: ['./title2.component.scss'],
})
export class Title2Component {
  /** @description additional class to extend element class list */
  @Input() extraClass!: string;
}
