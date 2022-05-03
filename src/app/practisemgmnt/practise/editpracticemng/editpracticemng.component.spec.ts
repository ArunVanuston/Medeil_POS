import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpracticemngComponent } from './editpracticemng.component';

describe('EditpracticemngComponent', () => {
  let component: EditpracticemngComponent;
  let fixture: ComponentFixture<EditpracticemngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpracticemngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpracticemngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
