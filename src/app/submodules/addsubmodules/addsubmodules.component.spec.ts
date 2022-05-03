import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsubmodulesComponent } from './addsubmodules.component';

describe('AddsubmodulesComponent', () => {
  let component: AddsubmodulesComponent;
  let fixture: ComponentFixture<AddsubmodulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsubmodulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsubmodulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
