import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalYearComponent } from './personal-year.component';

describe('PersonalYearComponent', () => {
  let component: PersonalYearComponent;
  let fixture: ComponentFixture<PersonalYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
