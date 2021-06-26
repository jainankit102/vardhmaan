import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinnaclesNumberComponent } from './pinnacles-number.component';

describe('PinnaclesNumberComponent', () => {
  let component: PinnaclesNumberComponent;
  let fixture: ComponentFixture<PinnaclesNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinnaclesNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinnaclesNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
