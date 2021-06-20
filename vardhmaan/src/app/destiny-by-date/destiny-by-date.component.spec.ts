import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinyByDateComponent } from './destiny-by-date.component';

describe('DestinyByDateComponent', () => {
  let component: DestinyByDateComponent;
  let fixture: ComponentFixture<DestinyByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinyByDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinyByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
