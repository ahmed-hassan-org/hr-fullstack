import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpCounterComponent } from './otp-counter.component';

describe('OtpCounterComponent', () => {
  let component: OtpCounterComponent;
  let fixture: ComponentFixture<OtpCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
