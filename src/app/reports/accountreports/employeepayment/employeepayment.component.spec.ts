import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeepaymentComponent } from './employeepayment.component';

describe('EmployeepaymentComponent', () => {
  let component: EmployeepaymentComponent;
  let fixture: ComponentFixture<EmployeepaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeepaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
