import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPdfFilesComponent } from './view-pdf-files/view-pdf-files.component';
import { SharedWapelModule } from '@wapelSharedLib/shared/SharedWapel.module';

@NgModule({
  declarations: [ViewPdfFilesComponent],
  imports: [CommonModule, SharedWapelModule],
  exports: [ViewPdfFilesComponent],
})
export class ViewPdfFilesModule {}
