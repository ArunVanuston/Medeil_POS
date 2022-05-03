import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulerankComponent } from './modulerank.component';

describe('ModulerankComponent', () => {
  let component: ModulerankComponent;
  let fixture: ComponentFixture<ModulerankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModulerankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulerankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
