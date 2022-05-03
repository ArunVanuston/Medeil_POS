import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugqaComponent } from './drugqa.component';

describe('DrugqaComponent', () => {
  let component: DrugqaComponent;
  let fixture: ComponentFixture<DrugqaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugqaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugqaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
