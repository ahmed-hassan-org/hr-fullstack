import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hr-title1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './title1.component.html',
  styleUrls: ['./title1.component.scss'],
})
export class Title1Component {
  @Input() extraClass!: string;
}
