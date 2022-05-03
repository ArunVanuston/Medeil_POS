import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorreceiptComponent } from './vendorreceipt.component';

describe('VendorreceiptComponent', () => {
  let component: VendorreceiptComponent;
  let fixture: ComponentFixture<VendorreceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorreceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorreceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
