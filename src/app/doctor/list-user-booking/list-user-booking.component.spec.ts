import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserBookingComponent } from './list-user-booking.component';

describe('ListUserBookingComponent', () => {
  let component: ListUserBookingComponent;
  let fixture: ComponentFixture<ListUserBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListUserBookingComponent]
    });
    fixture = TestBed.createComponent(ListUserBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
