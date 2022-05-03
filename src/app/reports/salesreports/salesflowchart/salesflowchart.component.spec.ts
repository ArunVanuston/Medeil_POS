import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesflowchartComponent } from './salesflowchart.component';

describe('SalesflowchartComponent', () => {
  let component: SalesflowchartComponent;
  let fixture: ComponentFixture<SalesflowchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesflowchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesflowchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
