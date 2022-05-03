import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingtasksComponent } from './pendingtasks.component';

describe('PendingtasksComponent', () => {
  let component: PendingtasksComponent;
  let fixture: ComponentFixture<PendingtasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingtasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingtasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
