import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccpayableComponent } from './accpayable.component';

describe('AccpayableComponent', () => {
  let component: AccpayableComponent;
  let fixture: ComponentFixture<AccpayableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccpayableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccpayableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
