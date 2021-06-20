import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinyByNameComponent } from './destiny-by-name.component';

describe('DestinyByNameComponent', () => {
  let component: DestinyByNameComponent;
  let fixture: ComponentFixture<DestinyByNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinyByNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinyByNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
