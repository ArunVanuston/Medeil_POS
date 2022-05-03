import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccledgerComponent } from './accledger.component';

describe('AccledgerComponent', () => {
  let component: AccledgerComponent;
  let fixture: ComponentFixture<AccledgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccledgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccledgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
