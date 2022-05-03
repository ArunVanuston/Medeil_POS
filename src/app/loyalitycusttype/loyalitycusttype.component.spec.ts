import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyalitycusttypeComponent } from './loyalitycusttype.component';

describe('LoyalitycusttypeComponent', () => {
  let component: LoyalitycusttypeComponent;
  let fixture: ComponentFixture<LoyalitycusttypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyalitycusttypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyalitycusttypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
