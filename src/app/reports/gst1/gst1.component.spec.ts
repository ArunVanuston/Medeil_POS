import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gst1Component } from './gst1.component';

describe('Gst1Component', () => {
  let component: Gst1Component;
  let fixture: ComponentFixture<Gst1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gst1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gst1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
