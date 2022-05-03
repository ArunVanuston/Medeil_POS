import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddusertaskComponent } from './addusertask.component';

describe('AddusertaskComponent', () => {
  let component: AddusertaskComponent;
  let fixture: ComponentFixture<AddusertaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddusertaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddusertaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
