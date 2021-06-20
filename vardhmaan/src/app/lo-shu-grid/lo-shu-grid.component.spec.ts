import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoShuGridComponent } from './lo-shu-grid.component';

describe('LoShuGridComponent', () => {
  let component: LoShuGridComponent;
  let fixture: ComponentFixture<LoShuGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoShuGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoShuGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
