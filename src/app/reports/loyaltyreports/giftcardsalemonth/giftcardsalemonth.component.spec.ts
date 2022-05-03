import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftcardsalemonthComponent } from './giftcardsalemonth.component';

describe('GiftcardsalemonthComponent', () => {
  let component: GiftcardsalemonthComponent;
  let fixture: ComponentFixture<GiftcardsalemonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftcardsalemonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftcardsalemonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
