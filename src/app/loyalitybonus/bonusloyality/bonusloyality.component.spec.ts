import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusloyalityComponent } from './bonusloyality.component';

describe('BonusloyalityComponent', () => {
  let component: BonusloyalityComponent;
  let fixture: ComponentFixture<BonusloyalityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonusloyalityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusloyalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
