import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftcardsalecurdateComponent } from './giftcardsalecurdate.component';

describe('GiftcardsalecurdateComponent', () => {
  let component: GiftcardsalecurdateComponent;
  let fixture: ComponentFixture<GiftcardsalecurdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftcardsalecurdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftcardsalecurdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
