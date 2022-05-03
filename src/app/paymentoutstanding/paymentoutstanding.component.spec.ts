import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentoutstandingComponent } from './paymentoutstanding.component';

describe('PaymentoutstandingComponent', () => {
  let component: PaymentoutstandingComponent;
  let fixture: ComponentFixture<PaymentoutstandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentoutstandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentoutstandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
