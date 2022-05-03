import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasebarchartComponent } from './purchasebarchart.component';

describe('PurchasebarchartComponent', () => {
  let component: PurchasebarchartComponent;
  let fixture: ComponentFixture<PurchasebarchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasebarchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasebarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
