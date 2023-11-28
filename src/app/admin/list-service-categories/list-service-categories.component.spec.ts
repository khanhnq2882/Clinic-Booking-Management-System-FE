import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListServiceCategoriesComponent } from './list-service-categories.component';

describe('ListServiceCategoriesComponent', () => {
  let component: ListServiceCategoriesComponent;
  let fixture: ComponentFixture<ListServiceCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListServiceCategoriesComponent]
    });
    fixture = TestBed.createComponent(ListServiceCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
