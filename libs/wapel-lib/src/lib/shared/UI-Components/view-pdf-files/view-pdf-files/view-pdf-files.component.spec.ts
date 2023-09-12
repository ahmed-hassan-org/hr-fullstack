import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPdfFilesComponent } from './view-pdf-files.component';

describe('ViewPdfFilesComponent', () => {
  let component: ViewPdfFilesComponent;
  let fixture: ComponentFixture<ViewPdfFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPdfFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPdfFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
