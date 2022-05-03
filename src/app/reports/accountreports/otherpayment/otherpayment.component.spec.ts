import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherpaymentComponent } from './otherpayment.component';

describe('OtherpaymentComponent', () => {
  let component: OtherpaymentComponent;
  let fixture: ComponentFixture<OtherpaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherpaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
