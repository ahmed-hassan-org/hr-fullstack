import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hr-subtitle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subtitle.component.html',
  styleUrls: ['./subtitle.component.scss'],
})
export class SubtitleComponent {
  @Input() extraClass!: string;
}
