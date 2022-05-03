import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionapprovalComponent } from './prescriptionapproval.component';

describe('PrescriptionapprovalComponent', () => {
  let component: PrescriptionapprovalComponent;
  let fixture: ComponentFixture<PrescriptionapprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriptionapprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
