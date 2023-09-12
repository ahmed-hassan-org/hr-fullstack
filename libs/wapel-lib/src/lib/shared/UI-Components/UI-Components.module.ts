import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedWapelModule } from '../SharedWapel.module';
import { TableMenuActionsComponent } from './table-menu-actions/table-menu-actions.component';

@NgModule({
  declarations: [TableMenuActionsComponent],
  imports: [CommonModule, SharedWapelModule],
  exports: [TableMenuActionsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UiComponentsModule {}
