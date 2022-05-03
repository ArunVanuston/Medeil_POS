import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewlpointschemeComponent } from './viewlpointscheme.component';

describe('ViewlpointschemeComponent', () => {
  let component: ViewlpointschemeComponent;
  let fixture: ComponentFixture<ViewlpointschemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewlpointschemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewlpointschemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
