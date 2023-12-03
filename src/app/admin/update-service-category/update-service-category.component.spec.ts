import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateServiceCategoryComponent } from './update-service-category.component';

describe('UpdateServiceCategoryComponent', () => {
  let component: UpdateServiceCategoryComponent;
  let fixture: ComponentFixture<UpdateServiceCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateServiceCategoryComponent]
    });
    fixture = TestBed.createComponent(UpdateServiceCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
