import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistwiseproductsComponent } from './distwiseproducts.component';

describe('DistwiseproductsComponent', () => {
  let component: DistwiseproductsComponent;
  let fixture: ComponentFixture<DistwiseproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistwiseproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistwiseproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
