import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalityNumberComponent } from './personality-number.component';

describe('PersonalityNumberComponent', () => {
  let component: PersonalityNumberComponent;
  let fixture: ComponentFixture<PersonalityNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalityNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalityNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
