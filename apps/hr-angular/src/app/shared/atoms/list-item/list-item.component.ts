import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedWapelModule } from '@wapelSharedLib/shared/SharedWapel.module';

@Component({
  selector: 'hr-list-item',
  standalone: true,
  imports: [CommonModule, SharedWapelModule],
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: false }) subtitle!: string;
  @Input({ required: true }) imagePath!: string;
  @Input() size: 'large' | 'xlarge' | 'normal' = 'large';
}
