import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesOfNumbersComponent } from './planes-of-numbers.component';

describe('PlanesOfNumbersComponent', () => {
  let component: PlanesOfNumbersComponent;
  let fixture: ComponentFixture<PlanesOfNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanesOfNumbersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanesOfNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
