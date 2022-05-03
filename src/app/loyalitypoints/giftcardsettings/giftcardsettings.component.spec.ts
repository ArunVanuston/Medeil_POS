import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftcardsettingsComponent } from './giftcardsettings.component';

describe('GiftcardsettingsComponent', () => {
  let component: GiftcardsettingsComponent;
  let fixture: ComponentFixture<GiftcardsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftcardsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftcardsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
