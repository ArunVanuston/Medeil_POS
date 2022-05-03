import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignhsncodeComponent } from './assignhsncode.component';

describe('AssignhsncodeComponent', () => {
  let component: AssignhsncodeComponent;
  let fixture: ComponentFixture<AssignhsncodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignhsncodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignhsncodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
