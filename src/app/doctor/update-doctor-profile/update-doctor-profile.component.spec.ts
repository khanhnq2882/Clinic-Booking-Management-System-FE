import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDoctorProfileComponent } from './update-doctor-profile.component';

describe('UpdateDoctorProfileComponent', () => {
  let component: UpdateDoctorProfileComponent;
  let fixture: ComponentFixture<UpdateDoctorProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDoctorProfileComponent]
    });
    fixture = TestBed.createComponent(UpdateDoctorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
