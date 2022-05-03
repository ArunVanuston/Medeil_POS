import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewusertaskComponent } from './viewusertask.component';

describe('ViewusertaskComponent', () => {
  let component: ViewusertaskComponent;
  let fixture: ComponentFixture<ViewusertaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewusertaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewusertaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
