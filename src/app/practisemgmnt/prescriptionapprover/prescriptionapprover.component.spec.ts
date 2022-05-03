import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionapproverComponent } from './prescriptionapprover.component';

describe('PrescriptionapproverComponent', () => {
  let component: PrescriptionapproverComponent;
  let fixture: ComponentFixture<PrescriptionapproverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriptionapproverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionapproverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
