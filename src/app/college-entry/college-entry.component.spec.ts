import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeEntryComponent } from './college-entry.component';

describe('CollegeEntryComponent', () => {
  let component: CollegeEntryComponent;
  let fixture: ComponentFixture<CollegeEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollegeEntryComponent]
    });
    fixture = TestBed.createComponent(CollegeEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
