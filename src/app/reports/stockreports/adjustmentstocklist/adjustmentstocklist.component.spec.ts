import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustmentstocklistComponent } from './adjustmentstocklist.component';

describe('AdjustmentstocklistComponent', () => {
  let component: AdjustmentstocklistComponent;
  let fixture: ComponentFixture<AdjustmentstocklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjustmentstocklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjustmentstocklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
