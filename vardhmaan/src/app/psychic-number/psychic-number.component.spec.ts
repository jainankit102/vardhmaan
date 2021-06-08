import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsychicNumberComponent } from './psychic-number.component';

describe('PsychicNumberComponent', () => {
  let component: PsychicNumberComponent;
  let fixture: ComponentFixture<PsychicNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsychicNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsychicNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
