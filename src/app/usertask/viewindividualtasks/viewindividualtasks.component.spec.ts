import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmytasksComponent } from './viewmytasks.component';

describe('ViewmytasksComponent', () => {
  let component: ViewmytasksComponent;
  let fixture: ComponentFixture<ViewmytasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewmytasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmytasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
