import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeereceiptComponent } from './employeereceipt.component';

describe('EmployeereceiptComponent', () => {
  let component: EmployeereceiptComponent;
  let fixture: ComponentFixture<EmployeereceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeereceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeereceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
