import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltysalemonthComponent } from './loyaltysalemonth.component';

describe('LoyaltysalemonthComponent', () => {
  let component: LoyaltysalemonthComponent;
  let fixture: ComponentFixture<LoyaltysalemonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltysalemonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltysalemonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
