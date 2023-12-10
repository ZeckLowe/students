import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramEntryComponent } from './program-entry.component';

describe('ProgramEntryComponent', () => {
  let component: ProgramEntryComponent;
  let fixture: ComponentFixture<ProgramEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramEntryComponent]
    });
    fixture = TestBed.createComponent(ProgramEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
