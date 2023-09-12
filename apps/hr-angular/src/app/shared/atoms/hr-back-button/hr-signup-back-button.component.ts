import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'hr-signup-back-button',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './hr-signup-back-button.component.html',
  styleUrls: ['./hr-signup-back-button.component.scss'],
})
export class HrSignupBackButtonComponent {
  @Input({ required: false }) backFn!: any;

  callMethod() {
    this.backFn();
  }
}
