import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SharedWapelModule } from '@wapelSharedLib/shared/SharedWapel.module';

@Component({
  standalone: true,
  selector: 'wapel-erp-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  imports: [CommonModule, SharedWapelModule],
})
export class ErrorMessageComponent {
  @Input({ required: false }) isArabicMode = false;
}
