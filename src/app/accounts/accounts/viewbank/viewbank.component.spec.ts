import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbankComponent } from './viewbank.component';

describe('ViewbankComponent', () => {
  let component: ViewbankComponent;
  let fixture: ComponentFixture<ViewbankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewbankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
