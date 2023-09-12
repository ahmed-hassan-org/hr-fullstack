import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimePipe } from './time.pipe';
import { ArrayIncludePipe } from './array-include.pipe';
import { Base64SanitizePipe } from './base64-sanitize.pipe';
import { CheckArrayItemPipe } from './check-array-item.pipe';
import { SanitizePipe } from './sanitize.pipe';

@NgModule({
  declarations: [
    TimePipe,
    ArrayIncludePipe,
    Base64SanitizePipe,
    CheckArrayItemPipe,
    SanitizePipe,
  ],
  imports: [CommonModule],
  exports: [
    TimePipe,
    ArrayIncludePipe,
    Base64SanitizePipe,
    CheckArrayItemPipe,
    SanitizePipe,
  ],
  providers: [],
})
export class PipesModule {}
