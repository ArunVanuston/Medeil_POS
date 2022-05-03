import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyreportsComponent } from './loyaltyreports.component';

describe('LoyaltyreportsComponent', () => {
  let component: LoyaltyreportsComponent;
  let fixture: ComponentFixture<LoyaltyreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltyreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
