import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintNumberTemplateComponent } from './print-number-template.component';

describe('PrintNumberTemplateComponent', () => {
  let component: PrintNumberTemplateComponent;
  let fixture: ComponentFixture<PrintNumberTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintNumberTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintNumberTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
