import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpractisemngComponent } from './viewpractisemng.component';

describe('ViewpractisemngComponent', () => {
  let component: ViewpractisemngComponent;
  let fixture: ComponentFixture<ViewpractisemngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewpractisemngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpractisemngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
