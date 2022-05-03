import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugqcComponent } from './drugqc.component';

describe('DrugqcComponent', () => {
  let component: DrugqcComponent;
  let fixture: ComponentFixture<DrugqcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugqcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugqcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
