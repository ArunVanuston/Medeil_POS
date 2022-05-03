import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartaccountComponent } from './chartaccount.component';

describe('ChartaccountComponent', () => {
  let component: ChartaccountComponent;
  let fixture: ComponentFixture<ChartaccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartaccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
