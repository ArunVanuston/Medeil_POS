import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicetypecreditComponent } from './invoicetypecredit.component';

describe('InvoicetypecreditComponent', () => {
  let component: InvoicetypecreditComponent;
  let fixture: ComponentFixture<InvoicetypecreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicetypecreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicetypecreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
