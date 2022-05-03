import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustloyaltypointsComponent } from './custloyaltypoints.component';

describe('CustloyaltypointsComponent', () => {
  let component: CustloyaltypointsComponent;
  let fixture: ComponentFixture<CustloyaltypointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustloyaltypointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustloyaltypointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
