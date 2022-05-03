import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistbankdetailsComponent } from './distbankdetails.component';

describe('DistbankdetailsComponent', () => {
  let component: DistbankdetailsComponent;
  let fixture: ComponentFixture<DistbankdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistbankdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistbankdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
