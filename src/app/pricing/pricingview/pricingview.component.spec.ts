import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingviewComponent } from './pricingview.component';

describe('PricingviewComponent', () => {
  let component: PricingviewComponent;
  let fixture: ComponentFixture<PricingviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
