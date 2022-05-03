import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyalitybonusComponent } from './loyalitybonus.component';

describe('LoyalitybonusComponent', () => {
  let component: LoyalitybonusComponent;
  let fixture: ComponentFixture<LoyalitybonusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyalitybonusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyalitybonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
