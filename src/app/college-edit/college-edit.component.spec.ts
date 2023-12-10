import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeEditComponent } from './college-edit.component';

describe('CollegeEditComponent', () => {
  let component: CollegeEditComponent;
  let fixture: ComponentFixture<CollegeEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollegeEditComponent]
    });
    fixture = TestBed.createComponent(CollegeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
