import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { LayoutService } from './service/app.layout.service';

@Component({
  selector: 'hr-footer',
  templateUrl: './app.footer.component.html',
})
@UntilDestroy({ checkProperties: true })
export class AppFooterComponent {
  messageTranslationPrefix = '';
  constructor(public layoutService: LayoutService) {
    this.messageTranslationPrefix = 'LAYOUT.FOOTER.';
  }
}
