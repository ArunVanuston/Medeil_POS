import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpresdigitalComponent } from './viewpresdigital.component';

describe('ViewpresdigitalComponent', () => {
  let component: ViewpresdigitalComponent;
  let fixture: ComponentFixture<ViewpresdigitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewpresdigitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpresdigitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
