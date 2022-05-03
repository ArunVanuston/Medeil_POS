import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewschedulelistComponent } from './viewschedulelist.component';

describe('ViewschedulelistComponent', () => {
  let component: ViewschedulelistComponent;
  let fixture: ComponentFixture<ViewschedulelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewschedulelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewschedulelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
