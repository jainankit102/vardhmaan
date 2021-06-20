import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KuaComponent } from './kua.component';

describe('KuaComponent', () => {
  let component: KuaComponent;
  let fixture: ComponentFixture<KuaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KuaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
