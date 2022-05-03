import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockcheckinglistComponent } from './stockcheckinglist.component';

describe('StockcheckinglistComponent', () => {
  let component: StockcheckinglistComponent;
  let fixture: ComponentFixture<StockcheckinglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockcheckinglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockcheckinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
