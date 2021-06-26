import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimateRealityComponent } from './ultimate-reality.component';

describe('UltimateRealityComponent', () => {
  let component: UltimateRealityComponent;
  let fixture: ComponentFixture<UltimateRealityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UltimateRealityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UltimateRealityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
