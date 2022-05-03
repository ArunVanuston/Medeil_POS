import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesandpurchaseComponent } from './salesandpurchase.component';

describe('SalesandpurchaseComponent', () => {
  let component: SalesandpurchaseComponent;
  let fixture: ComponentFixture<SalesandpurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesandpurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesandpurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
