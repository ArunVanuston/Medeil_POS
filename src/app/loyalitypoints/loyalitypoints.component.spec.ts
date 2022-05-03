import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyalitypointsComponent } from './loyalitypoints.component';

describe('LoyalitypointsComponent', () => {
  let component: LoyalitypointsComponent;
  let fixture: ComponentFixture<LoyalitypointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyalitypointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyalitypointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
