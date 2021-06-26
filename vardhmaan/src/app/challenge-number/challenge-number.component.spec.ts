import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeNumberComponent } from './challenge-number.component';

describe('ChallengeNumberComponent', () => {
  let component: ChallengeNumberComponent;
  let fixture: ComponentFixture<ChallengeNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengeNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
