import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyalitypointsettingsComponent } from './loyalitypointsettings.component';

describe('LoyalitypointsettingsComponent', () => {
  let component: LoyalitypointsettingsComponent;
  let fixture: ComponentFixture<LoyalitypointsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyalitypointsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyalitypointsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
