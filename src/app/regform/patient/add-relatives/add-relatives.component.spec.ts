import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRelativesComponent } from './add-relatives.component';

describe('AddRelativesComponent', () => {
  let component: AddRelativesComponent;
  let fixture: ComponentFixture<AddRelativesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRelativesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRelativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
