import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultisalesinvoiceComponent } from './multisalesinvoice.component';

describe('MultisalesinvoiceComponent', () => {
  let component: MultisalesinvoiceComponent;
  let fixture: ComponentFixture<MultisalesinvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultisalesinvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultisalesinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
