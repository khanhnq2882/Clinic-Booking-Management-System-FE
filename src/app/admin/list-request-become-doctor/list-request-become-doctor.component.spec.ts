import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRequestBecomeDoctorComponent } from './list-request-become-doctor.component';

describe('ListRequestBecomeDoctorComponent', () => {
  let component: ListRequestBecomeDoctorComponent;
  let fixture: ComponentFixture<ListRequestBecomeDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRequestBecomeDoctorComponent]
    });
    fixture = TestBed.createComponent(ListRequestBecomeDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
