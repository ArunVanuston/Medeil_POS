import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccreceivableComponent } from './accreceivable.component';

describe('AccreceivableComponent', () => {
  let component: AccreceivableComponent;
  let fixture: ComponentFixture<AccreceivableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccreceivableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccreceivableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
