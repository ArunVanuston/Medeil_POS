import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusloyalityviewComponent } from './bonusloyalityview.component';

describe('BonusloyalityviewComponent', () => {
  let component: BonusloyalityviewComponent;
  let fixture: ComponentFixture<BonusloyalityviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonusloyalityviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusloyalityviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
