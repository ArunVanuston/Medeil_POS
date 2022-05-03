import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpdeliverychallanComponent } from './viewpdeliverychallan.component';

describe('ViewpdeliverychallanComponent', () => {
  let component: ViewpdeliverychallanComponent;
  let fixture: ComponentFixture<ViewpdeliverychallanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewpdeliverychallanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpdeliverychallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
