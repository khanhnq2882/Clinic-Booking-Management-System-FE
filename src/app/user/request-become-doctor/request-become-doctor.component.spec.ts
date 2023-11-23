import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestBecomeDoctorComponent } from './request-become-doctor.component';

describe('RequestBecomeDoctorComponent', () => {
  let component: RequestBecomeDoctorComponent;
  let fixture: ComponentFixture<RequestBecomeDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestBecomeDoctorComponent]
    });
    fixture = TestBed.createComponent(RequestBecomeDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
