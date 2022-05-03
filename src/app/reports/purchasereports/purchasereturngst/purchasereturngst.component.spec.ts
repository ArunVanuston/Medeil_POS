import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasereturngstComponent } from './purchasereturngst.component';

describe('PurchasereturngstComponent', () => {
  let component: PurchasereturngstComponent;
  let fixture: ComponentFixture<PurchasereturngstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasereturngstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasereturngstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
